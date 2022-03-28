import { Plugin } from "rollup"
import * as util from "@thesunny/script-utils"
import { analyzeDeps, getCleanedNodeModulesInfo } from "./utils"

export default function rollupPluginAnalyzeDeps({
  packagePath,
}: {
  packagePath: string
}): Plugin {
  const plugin: Plugin = {
    name: "rollup-analyze-deps",
    buildEnd(error) {
      if (error) {
        console.error("Error in analyze")
        return
      }
      util.heading("buildEnd")
      const nodeModules = getCleanedNodeModulesInfo(this)
      // util.writeFile(analysisCachePath, JSON.stringify(nodeModules, null, 2))
      const pkg = JSON.parse(util.readFile(packagePath))

      analyzeDeps(nodeModules, pkg.dependencies)
    },
  }
  return plugin
}
