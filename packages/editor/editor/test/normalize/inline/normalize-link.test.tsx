/** @jsx jsx  */
import { jsx, normalize } from "../../test-utils"

describe("normalize link", () => {
  describe("don't normalize", () => {
    it("should leave a normal link alone", async () => {
      const input = (
        <editor>
          <p>
            Hello <link url="https://www.google.com/">Google</link>.
          </p>
        </editor>
      )
      const output = (
        <editor>
          <p>
            Hello <link url="https://www.google.com/">Google</link>.
          </p>
        </editor>
      )
      normalize(input, output)
    })
  })

  describe("normalize invalid parent", () => {
    it("n/a", async () => {
      /* added for clarity */
    })
  })

  describe("normalize empty children", () => {
    it("should remove an empty link", async () => {
      const input = (
        <editor>
          <p>
            Hello{" "}
            <link url="https://www.google.com/">
              <text></text>
            </link>
            .
          </p>
        </editor>
      )
      const output = (
        <editor>
          <p>Hello .</p>
        </editor>
      )
      normalize(input, output)
    })
  })

  describe("normalize invalid children", () => {
    it("should raise up a nested link", async () => {
      const input = (
        <editor>
          <p>
            Hello{" "}
            <link url="https://www.google.com/">
              Google <link url="https://www.yahoo.com/">Yahoo</link> Google
            </link>
            .
          </p>
        </editor>
      )
      const output = (
        <editor>
          <p>
            Hello <link url="https://www.google.com/">Google </link>
            <text />
            <link url="https://www.yahoo.com/">Yahoo</link>
            <text />
            <link url="https://www.google.com/"> Google</link>.
          </p>
        </editor>
      )
      normalize(input, output)
    })
  })

  describe("normalize shape", () => {
    it("n/a", async () => {
      /* added for clarity */
    })
  })
})
