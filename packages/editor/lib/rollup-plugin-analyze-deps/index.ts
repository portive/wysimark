import { Plugin } from "rollup"
import * as util from "@thesunny/script-utils"
import { analyzeDeps } from "./analyze-deps"
import { getNodeModulesInfo } from "./get-node-modules-info"

export default function rollupPluginAnalyzeDeps({
  packagePath,
  destPackages,
}: {
  packagePath: string
  destPackages: string[]
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
      console.log(nodeModules)
      // util.writeFile(analysisCachePath, JSON.stringify(nodeModules, null, 2))
      const pkg = JSON.parse(util.readFile(packagePath))

      const destPkg = analyzeDeps(nodeModules, pkg.dependencies)
      console.log("destPkg")
      console.log(destPkg)

      for (const destPackagePath of destPackages) {
        const destPkg = JSON.parse(util.readFile(destPackagePath))
        /**
         * Sometimes a Lerna failure leaves behind a `gitHead`.
         * We clean it up here.
         */
        if ("gitHead" in destPkg) {
          delete destPkg.gitHead
        }
        console.log(destPackagePath)
        console.log(destPkg)
      }
    },
  }
  return plugin
}
