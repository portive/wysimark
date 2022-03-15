/** @jsx jsx  */
import { Transforms } from "slate"
import { compareWithoutNormalize as compare, jsx } from "../test-utils"

describe("wrap nodes", () => {
  it("should wrap nodes", async () => {
    const input = (
      <editor>
        <text>hello</text>
      </editor>
    )
    const output = (
      <editor>
        <p>
          <text>hello</text>
        </p>
      </editor>
    )
    compare(input, output, (editor) => {
      Transforms.wrapNodes(editor, { type: "p" } as any, { at: [0] })
    })
  })

  it("should unwrap nodes", async () => {
    const input = (
      <editor>
        <td index={0}>
          <text>hello</text>
          <text bold> world</text>
        </td>
      </editor>
    )
    const output = (
      <editor>
        <text>hello</text>
        <text bold> world</text>
      </editor>
    )
    compare(input, output, (editor) => {
      Transforms.unwrapNodes(editor, { at: [0] })
    })
  })

  it("should move child nodes and cursor with it", async () => {
    const input = (
      <editor>
        <td index={0}></td>
        <p>
          <text>
            hel
            <cursor />
            lo
          </text>
          <text bold> world</text>
        </p>
      </editor>
    )
    const output = (
      <editor>
        <td index={0}>
          <text>
            hel
            <cursor />
            lo
          </text>
        </td>
        <p>
          <text bold> world</text>
        </p>
      </editor>
    )
    compare(input, output, (editor) => {
      Transforms.moveNodes(editor, { at: [1, 0], to: [0, 0] })
    })
  })
})
