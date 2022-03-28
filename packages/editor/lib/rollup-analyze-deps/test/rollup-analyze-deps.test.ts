import { analyzeDeps } from "../utils"
import analysis from "./analysis.json"
import pkg from "./pkg.json"

// function clean(s: string) {
//   return s.replace(/\0/g, "")
// }

// function cleanLines(lines: string[]) {
//   return lines.map(clean)
// }

describe("rollup-analyze-deps", () => {
  it("should analyze deps", async () => {
    // const s = "\u0000commonjsHelpers.js"
    // const s2 = "commonjsHelpers.js"
    // console.log(s === s.trim())
    // console.log("match?", clean(s).match(/^commonjs/))
    // console.log("match?", s2.trim().match(/^commonjs/))
    analyzeDeps(analysis, pkg.dependencies)
  })
})
