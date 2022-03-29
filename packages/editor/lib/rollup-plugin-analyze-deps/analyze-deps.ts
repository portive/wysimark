import chalk from "chalk"
import pick from "lodash/pick"
import * as util from "@thesunny/script-utils"
import { CleanedModuleInfo } from "./types"
import { isNodeModule } from "./utils"

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

export function analyzeDeps(
  moduleInfos: CleanedModuleInfo[],
  pkgDeps: Record<string, string>
): { dependencies: Record<string, string> } {
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

  return destPackageJson
}
