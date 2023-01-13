import { parse } from "../.."
import { check } from "../test-utils"

describe("thematic break", () => {
  it("should parse a thematic break", async () => {
    check("---", [{ type: "horizontal-rule", children: [{ text: "" }] }])
  })

  it("should parse a thematic break with any number of dashes but serialize to ---", async () => {
    check(
      "-----------",
      [{ type: "horizontal-rule", children: [{ text: "" }] }],
      "---"
    )
  })

  it("should parse a thematic break with spaces but serialize to ---", async () => {
    check(
      "- - -",
      [{ type: "horizontal-rule", children: [{ text: "" }] }],
      "---"
    )
  })

  it("should parse a thematic break with *** but serialize to ---", async () => {
    check("***", [{ type: "horizontal-rule", children: [{ text: "" }] }], "---")
  })

  it("should parse a thematic break with ___ but serialize to ---", async () => {
    check("___", [{ type: "horizontal-rule", children: [{ text: "" }] }], "---")
  })
})
