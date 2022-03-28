import chalk from "chalk"
import pick from "lodash/pick"
import { GetModuleInfo, PluginContext } from "rollup"
import * as util from "@thesunny/script-utils"

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
function cleanLines(lines: Readonly<string[]>) {
  return lines.map(clean)
}

/**
 * Takes
 */
export function cleanModuleInfo(m: ModuleInfo): CleanedModuleInfo {
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
function extractPackageName(id: string): string {
  const ORG_PACKAGE_REGEXP = /.*\/node_modules\/([@][^/]+[/][^/]+)/
  const SINGLE_PACKAGE_REGEXP = /.*\/node_modules\/([^/]+)/
  const pkgMatch = id.match(ORG_PACKAGE_REGEXP)
  if (pkgMatch) return pkgMatch[1]
  const singleMatch = id.match(SINGLE_PACKAGE_REGEXP)
  if (singleMatch) return singleMatch[1]
  return id
}

/**
 * Returns true if the `moduleId` indicates that this is a `node_modules`
 * package. Otherwise, it's an import from within the project itself.
 */
export function isNodeModule(id: string): boolean {
  if (id.match(/\/node_modules\//)) {
    return true
  }
  if (id.match(/^[^/]/)) {
    return true
  }
  return false
}

export function analyzeDeps(
  moduleInfos: CleanedModuleInfo[],
  pkgDeps: Record<string, string>
): void {
  const dependencySet: Set<string> = new Set()

  for (const moduleInfo of moduleInfos) {
    const packageName = extractPackageName(moduleInfo.id)
    const isDependency = !moduleInfo.importers.every(isNodeModule)
    if (isDependency) {
      dependencySet.add(packageName)
    }
  }
  const dependencies = Array.from(dependencySet).sort()

  const unusedDeps = { ...pkgDeps }
  for (const dep of dependencies) {
    delete unusedDeps[dep]
  }

  /**
   * Destination values for `package.json`
   */
  util.heading("Analyze Dependencies")

  util.task("Find dependencies")
  const destPackageJson = { dependencies: pick(pkgDeps, ...dependencies) }
  util.pass(`Found ${dependencies.length} dependencies`)
  console.log(chalk.greenBright(JSON.stringify(destPackageJson, null, 2)))

  util.task("Find unused dependencies in package.json")
  const unusedDepCount = Object.keys(unusedDeps).length

  if (unusedDepCount === 0) {
    util.pass("No unused dependencies\n")
  } else {
    console.log(Object.keys(unusedDeps).sort())
    util.alert(
      `Found ${unusedDepCount} unused dependencies. Recommend removing them.`
    )
  }

  /**
   * Find dependencies we forgot to add.
   */
  util.task("Find missing dependencies")

  const forgottenDepSet = new Set(dependencySet)
  for (const dep of Object.keys(pkgDeps)) {
    forgottenDepSet.delete(dep)
  }

  /**
   * `tslib` is not a forgotten dependency. It is automaticaly included by
   * TypeScript. Notably it handles rest parameters and await.
   */
  forgottenDepSet.delete("tslib")

  const forgottenDeps = Array.from(forgottenDepSet)
  if (forgottenDeps.length === 0) {
    util.pass("No missing dependencies")
  } else {
    console.log(forgottenDeps)
    util.fail(
      `Found ${forgottenDeps.length} imports witout a corresponding dependency in package.json`
    )
  }
}

/**
 * Stop Rollup from warning about circular dependencies.
 */
export const onwarn = (warning: any) => {
  if (warning.code !== "CIRCULAR_DEPENDENCY") {
    console.warn(`(!) ${warning.message}`) // eslint-disable-line no-console
  }
}

export function getCleanedNodeModulesInfo(
  ctx: PluginContext
): CleanedModuleInfo[] {
  const moduleIds = ctx.getModuleIds()
  const cleanedNodeModulesInfo: CleanedModuleInfo[] = []
  for (const moduleId of moduleIds) {
    if (isNodeModule(moduleId)) {
      const m = ctx.getModuleInfo(moduleId)
      if (m) {
        cleanedNodeModulesInfo.push(cleanModuleInfo(m))
      }
    }
  }
  return cleanedNodeModulesInfo
}
