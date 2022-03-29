import { PluginContext } from "rollup"
import { CleanedModuleInfo, ModuleInfo } from "./types"
import { isNodeModule } from "./utils"

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
 * Takes the ModuleInfo and returns a smaller cleaned up version of the
 * ModuleInfo.
 *
 * In particular, it removes 2 properties that are large and that we don't use
 * and also cleans some confusing line endings that make it hard for us to
 * process the data consistently.
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
 * Returns an Array of information about each of the `node_modules` that is
 * included.
 */
export function getNodeModulesInfo(ctx: PluginContext): CleanedModuleInfo[] {
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
