import { GetModuleInfo } from "rollup"

/**
 * Type information from:
 *
 * https://rollupjs.org/guide/en/#thisgetmoduleinfo
 *
 * Removed `code` and `ast` as it's unnecessary for this analysis.
 */
export type ModuleInfo = NonNullable<ReturnType<GetModuleInfo>>

/**
 * A version of ModuleInfo with reduced information so that we can cache the
 * info without it taking too much disk space and is JSON safe.
 *
 * type ModuleInfo = {
 *   id: string // the id of the module, for convenience
 *   // code: string | null // the source code of the module, `null` if external or not yet available
 *   // ast: ESTree.Program; // the parsed abstract syntax tree if available
 *   isEntry: boolean // is this a user- or plugin-defined entry point
 *   isExternal: boolean // for external modules that are referenced but not included in the graph
 *   isIncluded?: boolean | null // is the module included after tree-shaking, `null` if external or not yet available
 *   importedIds: string[] // the module ids statically imported by this module
 *   importers: string[] // the ids of all modules that statically import this module
 *   dynamicallyImportedIds: string[] // the module ids imported by this module via dynamic import()
 *   dynamicImporters: string[] // the ids of all modules that import this module via dynamic import()
 *   implicitlyLoadedAfterOneOf: string[] // implicit relationships, declared via this.emitFile
 *   implicitlyLoadedBefore: string[] // implicit relationships, declared via this.emitFile
 *   hasModuleSideEffects: boolean | "no-treeshake" // are imports of this module included if nothing is imported from it
 *   meta: { [plugin: string]: any } // custom module meta-data
 *   syntheticNamedExports: boolean | string // final value of synthetic named exports
 * }
 */
export type CleanedModuleInfo = Omit<ModuleInfo, "code" | "ast">
