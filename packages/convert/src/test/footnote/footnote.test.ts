import { check } from "../test-utils"

describe("footnote", () => {
  it.skip("should inline a footnote", async () => {
    check(`Foonote [^1]

[^1]: alpha`)
  })
})
