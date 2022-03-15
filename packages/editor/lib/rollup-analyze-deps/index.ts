import chalk from "chalk"
import * as util from "@thesunny/script-utils"

// type ModuleInfo = {
//   dynamicallyImportedIds: string[]
//   dynamicImporters: string[]
//   hasModuleSideEffects: boolean
//   id: string
//   implicitlyLoadedAfterOneOf: string
//   implicitlyLoadedBefore: string
//   importedIds: string[]
//   importers: string[]
//   isEntry: boolean
//   isExternal: boolean
//   meta: Record<string, any>
//   syntheticNamedExports: string
// }

/**
 * Type information from:
 *
 * https://rollupjs.org/guide/en/#thisgetmoduleinfo
 *
 * Removed `code` and `ast` as it's unnecessary for this analysis.
 */
export type ModuleInfo = {
  id: string // the id of the module, for convenience
  // code: string | null // the source code of the module, `null` if external or not yet available
  // ast: ESTree.Program; // the parsed abstract syntax tree if available
  isEntry: boolean // is this a user- or plugin-defined entry point
  isExternal: boolean // for external modules that are referenced but not included in the graph
  isIncluded?: boolean | null // is the module included after tree-shaking, `null` if external or not yet available
  importedIds: string[] // the module ids statically imported by this module
  importers: string[] // the ids of all modules that statically import this module
  dynamicallyImportedIds: string[] // the module ids imported by this module via dynamic import()
  dynamicImporters: string[] // the ids of all modules that import this module via dynamic import()
  implicitlyLoadedAfterOneOf: string[] // implicit relationships, declared via this.emitFile
  implicitlyLoadedBefore: string[] // implicit relationships, declared via this.emitFile
  hasModuleSideEffects: boolean | "no-treeshake" // are imports of this module included if nothing is imported from it
  meta: { [plugin: string]: any } // custom module meta-data
  syntheticNamedExports: boolean | string // final value of synthetic named exports
}

/**
 * Remove null/end of string character which randomly pollutes the rollup
 * strings and causes `match` to fail silently.
 */
function clean(s: string) {
  return s.replace(/\0/g, "")
}

/**
 * Remove null/end of string on an array of strings
 */
function cleanLines(lines: string[]) {
  return lines.map(clean)
}

/**
 * Takes
 */
export function cleanModuleInfo(m: ModuleInfo) {
  return {
    id: clean(m.id),
    isEntry: m.isEntry,
    isExternal: m.isExternal,
    isIncluded: m.isIncluded,
    importedIds: cleanLines(m.importedIds),
    importers: cleanLines(m.importers),
    dynamicallyImportedIds: cleanLines(m.dynamicallyImportedIds),
    dynamicImporters: cleanLines(m.dynamicImporters),
    implicitlyLoadedAfterOneOf: cleanLines(m.implicitlyLoadedAfterOneOf),
    implicitlyLoadedBefore: cleanLines(m.implicitlyLoadedBefore),
    hasModuleSideEffects: m.hasModuleSideEffects,
    meta: m.meta,
    syntheticNamedExports: m.syntheticNamedExports,
  }
}

/**
 * Extracts a shorter identifiable package name from the `item.id`
 *
 * It does two main things:
 *
 * 1. Reduces any name with node_modules in it to either "package" or
 *    "@org/package"
 * 2. Collapses any subpaths like `lodash/last` to `lodash` for deep imports.
 */
function extractPackageName(id: string) {
  const ORG_PACKAGE_REGEXP = /.*\/node_modules\/([@][^/]+[/][^/]+)/
  const SINGLE_PACKAGE_REGEXP = /.*\/node_modules\/([^/]+)/
  const pkgMatch = id.match(ORG_PACKAGE_REGEXP)
  if (pkgMatch) return pkgMatch[1]
  const singleMatch = id.match(SINGLE_PACKAGE_REGEXP)
  if (singleMatch) return singleMatch[1]
  return id
}

export function isNodeModule(id: string) {
  if (id.match(/\/node_modules\//)) {
    return true
  }
  if (id.match(/^[^/]/)) {
    return true
  }
  return false
}

export function analyzeDeps(
  moduleInfos: ModuleInfo[],
  pkgDeps: Record<string, string>
) {
  const output: string[] = []

  function log(s: string) {
    output.push(s)
  }

  const dependencySet: Set<string> = new Set()

  for (const moduleInfo of moduleInfos) {
    const packageName = extractPackageName(moduleInfo.id)
    const isDependency = !moduleInfo.importers.every(isNodeModule)
    if (isDependency) {
      dependencySet.add(packageName)
    }
  }
  const dependencies = Array.from(dependencySet).sort()
  for (const dep of dependencies) {
    log(chalk.yellowBright(dep))
  }
  const unusedDeps = { ...pkgDeps }
  for (const dep of dependencies) {
    delete unusedDeps[dep]
  }

  util.heading("Dependencies found in rollup")
  console.log(output.join("\n"))

  util.heading("Unused dependencies")
  if (Object.keys(unusedDeps).length === 0) {
    console.log("No unused dependencies\n")
  } else {
    console.log(Object.keys(unusedDeps).sort().join("\n"))
  }

  util.heading("Dependencies we forgot to add")
  const forgottenDepSet = new Set(dependencySet)
  for (const dep of Object.keys(pkgDeps)) {
    forgottenDepSet.delete(dep)
  }
  const forgottenDeps = Array.from(forgottenDepSet)
  if (forgottenDeps.length === 0) {
    console.log("No forgotten dependencies\n")
  } else {
    console.log(forgottenDeps)
  }
}
