/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { exec } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { PluginOption } from 'vite';
import { generateRoutes } from './generateRoutes';
import { resolveOutputFilePath, resolveSourceFilePath } from './helpers';

const pluginName = 'antribute/tanstack-routes-generator';

const defaultGeneratedFileName = 'route-tree.generated.tsx';

export interface RouteGeneratorPluginOptions {
  /** path to output the generated routes file relative to /src @default "/" */
  output: string;

  /** path to the routes directory relative to ./src @default "pages" */
  routesDir: string;

  /** whether to export the route tree as a named export or default export @default "default" */
  routeTreeExport: 'named' | 'default';

  /** whether to import modules using `import {} from "path/to/module"` or `import {} "path/to/module.ts"` @default false */
  importWithExtensions?: boolean;

  /** whether or not to format the generated file @default true */
  format: boolean;

  /** by default, the plugin attempts to format using if it exists @default prettier */
  formatCommand?: (file: string) => string;
}

const defaultOptions: RouteGeneratorPluginOptions = {
  format: true,
  output: defaultGeneratedFileName,
  routesDir: 'pages',
  routeTreeExport: 'default',
};

export interface ResolvedRouteGeneratorPluginOptions extends RouteGeneratorPluginOptions {
  pluginName: string;
}

export default function tanstackRouteGeneratorPlugin(
  options?: Partial<RouteGeneratorPluginOptions>
): PluginOption {
  const resolvedOptions: ResolvedRouteGeneratorPluginOptions = {
    pluginName,
    ...defaultOptions,
    ...options,
  };

  return {
    name: pluginName,
    configureServer(server) {
      function listener(path: string) {
        if (path.includes(`/src/${resolvedOptions.routesDir}/`)) {
          generate(resolvedOptions);
        }
      }

      server.watcher.on('add', listener);
      server.watcher.on('change', listener);
      server.watcher.on('unlink', listener);
    },
    buildStart() {
      generate(resolvedOptions);
    },
  };
}

function generate(options: ResolvedRouteGeneratorPluginOptions) {
  const { output } = options;

  try {
    const startTime = Date.now();

    const outputPath = resolveOutputFilePath(output, defaultGeneratedFileName);

    const { content } = generateRoutes(options);

    writeFileSync(outputPath, content);

    formatFile({ file: outputPath, ...options });

    const timeElapsed = Date.now() - startTime;

    console.log(
      `✅ [${pluginName}] routes generated at src/${resolveSourceFilePath(
        options.routesDir
      )} (${timeElapsed} ms)`
    );
  } catch (error) {
    console.log(`❌ [${pluginName}]: an error has occured`, error);
  }
}

function formatFile({
  file,
  format = true,
  formatCommand,
}: { file: string } & Pick<RouteGeneratorPluginOptions, 'formatCommand' | 'format'>) {
  const formatCommandStr = formatCommand?.(file) ?? prettierFormatCommand(file);

  if (!format || !formatCommandStr) return;

  exec(formatCommandStr);
}

function prettierFormatCommand(file: string) {
  const prettier = './node_modules/.bin/prettier';

  if (!existsSync(prettier)) return undefined;

  return `${prettier} --write ${file}`;
}
