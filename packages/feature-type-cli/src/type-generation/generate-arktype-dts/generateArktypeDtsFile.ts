import path from 'path';
import { ModuleKind, ModuleResolutionKind, Project, ScriptTarget, ts } from 'ts-morph';
import type { GenerateArktypeDtsCodeOptions } from './generateArktypeTypeDef';
import { generateArktypeDtsCode } from './generateArktypeTypeDef';

export interface GenerateArktypeDtsFileOptions extends GenerateArktypeDtsCodeOptions {
  /** Output destination for the generated d.ts file */
  output?: string;
}

// Default options
const defaultOptions = {
  output: path.join(process.cwd(), './generated/arktype-types.d.ts'),
} satisfies Partial<GenerateArktypeDtsFileOptions>;

export function generateArktypeDtsFile(options: GenerateArktypeDtsFileOptions) {
  // Resolved options
  const resolvedOptions = { ...defaultOptions, ...options };

  const { output } = resolvedOptions;

  // Create a new ts-morph project
  const project = new Project({
    compilerOptions: {
      strict: true,
      noImplicitAny: true,
      strictNullChecks: true,
      strictFunctionTypes: true,
      strictPropertyInitialization: true,
      strictBindCallApply: true,
      noImplicitThis: true,
      noImplicitReturns: true,
      alwaysStrict: true,
      esModuleInterop: true,
      declaration: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      target: ScriptTarget.ES2017,
      jsx: ts.JsxEmit.React,
      module: ModuleKind.ESNext,
      moduleResolution: ModuleResolutionKind.NodeJs,
    },
  });

  // Generate the arktype dts code string
  const code = generateArktypeDtsCode(resolvedOptions);

  // Create source file
  project.createSourceFile(output, code, { overwrite: true });

  // Emit the dts source files
  project.emitSync({ emitOnlyDtsFiles: true });

  // Format files
  project.getSourceFiles().forEach((sourceFile) => {
    sourceFile.formatText();
  });

  // Write d.ts file
  project.saveSync();
}
