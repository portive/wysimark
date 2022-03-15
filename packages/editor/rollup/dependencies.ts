import { sortPackageJson } from "sort-package-json"
import { sortOrder } from "sort-package-json"
import * as util from "@thesunny/script-utils"
import pkg from "../package.json"

function getSortOrder() {
  const modifiedSortOrder = sortOrder.filter((item) => item !== "scripts")
  modifiedSortOrder.push("scripts")
  return modifiedSortOrder
}

export function addDependenciesToPackage(path: string) {
  util.heading(`Add dependencies to ${path}`)

  const pkg = JSON.parse(util.readFile(path))
  pkg.dependencies = getDependencies()
  const sortedPkg = sortPackageJson(pkg, { sortOrder: getSortOrder() })
  console.log(JSON.stringify(sortedPkg, null, 2))

  util.removeFileIfExists(path)
  util.writeFile(path, JSON.stringify(sortedPkg, null, 2))
}

/**
 * Build and returns a list of externals using a set of predefined externals
 * (mainly so `vue` is part of externals) and from `package.json` list of
 * dependencies.
 */

const DEFAULT_EXTERNAL = ["vue"]
export function getExternal() {
  const originalDependencies = pkg.dependencies

  const external: string[] = [...DEFAULT_EXTERNAL]

  for (const [key] of Object.entries(originalDependencies)) {
    /**
     * We want to bundle all of the FontAwesome stuff directly in the package
     */
    if (key.includes("@fortawesome")) continue
    external.push(key)
  }
  return external
}

export function getDependencies() {
  const originalDependencies = pkg.dependencies as Record<string, string>

  const dependencies: Record<string, string> = {}

  for (const [key, value] of Object.entries(originalDependencies)) {
    /**
     * We want to bundle all of the FontAwesome stuff directly in the package
     */
    if (key.includes("@fortawesome")) continue
    dependencies[key] = value
  }
  return dependencies
}
