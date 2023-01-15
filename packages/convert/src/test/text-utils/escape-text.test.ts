import { escapeText } from "../../serialize/serialize-line/utils"
import { check, log } from "../test-utils"

describe("escape text", () => {
  it("should not escape text without punctuation", async () => {
    const s = escapeText("alpha bravo")
    expect(s).toEqual("alpha bravo")
  })

  it("should should escape a period at the start of a line", async () => {
    // const s = escapeText("![image](alp) alpha bravo")
    // console.log(s)
    // check("![link\\](https://localhost/image.png)", [])
  })
})
