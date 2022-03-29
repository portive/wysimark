import { Plugin } from "rollup"
import { sortPackageJson } from "sort-package-json"
import * as util from "@thesunny/script-utils"
import { analyzeDeps } from "./analyze-deps"
import { getNodeModulesInfo } from "./get-node-modules-info"

type DestPackage = { path: string; dependencies?: Record<string, string> }

export default function rollupPluginAnalyzeDeps({
  packagePath,
  destPackages,
}: {
  packagePath: string
  destPackages: DestPackage[]
}): Plugin {
  const plugin: Plugin = {
    name: "rollup-analyze-deps",
    buildEnd(error) {
      if (error) {
        console.error("Error in analyze")
        return
      }
      /**
       * This function is executed within the `PluginContext` and needs to be
       * because it calls both `this.getModuleIds()` and `this.getModuleInfo(id)`
       * in order to get all the `nodeModules` information.
       */
      const nodeModules = getNodeModulesInfo(this)
      const pkg = JSON.parse(util.readFile(packagePath))

      const { dependencies } = analyzeDeps(nodeModules, pkg.dependencies)
      console.log("dependencies")
      console.log(dependencies)

      for (const destPackage of destPackages) {
        const destPackageJSON = JSON.parse(util.readFile(destPackage.path))
        /**
         * Sometimes a Lerna failure leaves behind a `gitHead`.
         * We clean it up here.
         */
        if ("gitHead" in destPackageJSON) {
          delete destPackageJSON.gitHead
        }
        const destDependencies = {
          ...dependencies,
          ...destPackage.dependencies,
        }
        destPackageJSON.dependencies = destDependencies
        sortPackageJson(destPackageJSON)
        // console.log(destPackage.path)
        // console.log(destPackageJSON)
        util.removeFileIfExists(destPackage.path)
        util.writeFile(
          destPackage.path,
          JSON.stringify(destPackageJSON, null, 2)
        )
      }
    },
  }
  return plugin
}
