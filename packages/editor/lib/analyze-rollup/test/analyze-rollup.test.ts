import json from "./rollup-analyzer.json"
import { analyzeRollup } from ".."

describe("analyze-rollup", () => {
  it("should analyze", async () => {
    const analysis = analyzeRollup(json as any)
    console.log(analysis)
  })
  // it("should analyze", async () => {
  //   const analysis = extractPackageSummaries(json as any)
  //   console.log(analysis)
  // })
  // it("should extract directly imported packages", async () => {
  //   const packages = extractDirectlyImportedPackages(json as any)
  // })
})
