/** @jsx jsx  */
import { insertNewline } from "~/editor/custom"
import { compare, jsx } from "../test-utils"

describe("Custom.insertNelinew", () => {
  it("should insert a newline in the middle of paragraph", async () => {
    const input = (
      <editor>
        <p>
          a<cursor />
          bc
        </p>
      </editor>
    )
    const output = (
      <editor>
        <p>
          a{"\n"}
          <cursor />
          bc
        </p>
      </editor>
    )
    compare(input, output, (editor) => insertNewline(editor))
  })

  it("should insert a newline at the end of paragraph", async () => {
    const input = (
      <editor>
        <p>
          abc
          <cursor />
        </p>
      </editor>
    )
    const output = (
      <editor>
        <p>
          abc{"\n"}
          <cursor />
        </p>
      </editor>
    )
    compare(input, output, (editor) => insertNewline(editor))
  })

  it("should insert a newline at the start of paragraph", async () => {
    const input = (
      <editor>
        <p>
          <cursor />
          abc
        </p>
      </editor>
    )
    const output = (
      <editor>
        <p>
          {"\n"}
          <cursor />
          abc
        </p>
      </editor>
    )
    compare(input, output, (editor) => insertNewline(editor))
  })
})
