/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { Project, SyntaxKind } from 'ts-morph';
import type { ResolvedRouteGeneratorPluginOptions } from './tanstack-route-generator-plugin';
import {
  getSourceFileImportPath,
  matchStringFn,
  notEmpty,
  resolveBasePath,
  upsertToMap,
} from './helpers';

const matchers = {
  isRoute: matchStringFn('startsWith', ['new Route']),
  isRootRoute: matchStringFn('startsWith', ['new RootRoute', 'RootRoute']),
};

export function generateRoutes({
  routesDir,
  routeTreeExport,
  importWithExtensions,
}: ResolvedRouteGeneratorPluginOptions) {
  // Create ts-morph project
  const project = new Project();

  // Define route file glob
  const routesDirGlob = `${resolveBasePath(routesDir)}/**/*.route.{ts,tsx,js,jsx}`;

  // Load routes files
  const sourceFiles = project.addSourceFilesAtPaths(routesDirGlob);

  // Store the found root route name
  let foundRootRoute: string | undefined;

  // Stores route names and the names of their children
  const routeMap = new Map<string, string[]>();

  // Stores route import statements
  const importStatements = new Set<string>([]);

  // Iterate through route directory
  sourceFiles.forEach((sourceFile) => {
    const sourceFilePath = sourceFile.getFilePath();

    const { defaultExport, namedExports } = sourceFile.getVariableDeclarations().reduce<{
      defaultExport?: string;
      namedExports?: string[];
    }>((acc, variableDeclaration) => {
      const initializer = variableDeclaration.getInitializer();

      const initializerText = initializer?.getText();

      const isRootRoute = matchers.isRootRoute(initializerText);

      const isRoute = matchers.isRoute(initializerText);

      const routeVariableName = variableDeclaration.getName();

      const isNamedExport = variableDeclaration.isNamedExport();

      const isDefaultExport = variableDeclaration.isDefaultExport();

      const isExported = isNamedExport || isDefaultExport;

      // Break if neither a route or root route is found
      // Or if no export is found
      if ((!isRootRoute && !isRoute) || !isExported) return acc;

      // Set default export
      if (isDefaultExport) {
        acc.defaultExport = routeVariableName;
      }

      // Set named exports
      if (isNamedExport && acc.namedExports) {
        acc.namedExports.push(routeVariableName);
      } else if (isNamedExport && !acc.namedExports) {
        acc.namedExports = [routeVariableName];
      }

      if (isRootRoute) {
        // Set name of the root route variable
        foundRootRoute = routeVariableName;

        return acc;
      }

      if (isRoute) {
        // Extract the parent route variable name:
        // ex: new Route({ getParentRoute => {{parentRouteVariableName}} })
        const initializer = variableDeclaration.getInitializerIfKind(SyntaxKind.NewExpression);

        const routeArguments = initializer?.getArguments()[0];

        // Extract the parent route variable name:
        // ex: new Route({ getParentRoute => {{parentRouteVariableName}} })
        const parentRouteVariableName = routeArguments?.isKind(SyntaxKind.ObjectLiteralExpression)
          ? routeArguments
              .getProperty('getParentRoute')
              ?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
              ?.getBodyText()
          : undefined;

        // Add route variables to route map
        upsertToMap(routeMap, routeVariableName);

        // Add parent route and children route variables to route map
        upsertToMap(routeMap, parentRouteVariableName, routeVariableName);
      }

      // Continue
      return acc;
    }, {});

    // Add import statement for source file to the importStatements map
    const sourceFileImportPath = getSourceFileImportPath(sourceFilePath, {
      importWithExtensions,
    });

    const importStatement = generateImportStatement(sourceFileImportPath, {
      defaultExport,
      namedExports,
    });

    if (importStatement) {
      importStatements.add(importStatement);
    }
  });

  if (!foundRootRoute) {
    throw new Error('The RootRoute was not found');
  }

  function buildRecursiveRouteTree(routeName: string): string {
    const children = routeMap.get(routeName);
    if (!(children && children.length > 0)) return routeName;

    return `${routeName}.addChildren([${children.map((child) => {
      return buildRecursiveRouteTree(child) as string;
    })}])`;
  }

  function exportRouteTree(routeTree: string) {
    if (routeTreeExport === 'named') {
      return `export const routeTree = ${routeTree}`;
    }

    return `export default ${routeTree}`;
  }

  const routeTree = buildRecursiveRouteTree(foundRootRoute);

  const content = `
  ${Array.from(importStatements).join('\n')}
  
 ${exportRouteTree(routeTree)}`;

  return { content };
}

function generateImportStatement(
  importPath: string,
  {
    defaultExport,
    namedExports: namedExportsProp,
  }: {
    defaultExport?: string;
    namedExports?: string[];
  }
) {
  const namedModules = (namedExportsProp ?? []).filter((e) => Boolean(e)).join(', ');

  if (!defaultExport && !namedModules) return undefined;

  return `import ${[defaultExport, `{ ${namedModules} }`]
    .filter(notEmpty)
    .join(', ')} from '${importPath}'`;
}
