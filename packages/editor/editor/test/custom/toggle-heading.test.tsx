/** @jsx jsx  */
import { toggleHeading } from "~/editor/custom"
import { compare, jsx } from "../test-utils"

describe("toggleHeading", () => {
  it("should toggle a paragraph to a heading", async () => {
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
        <heading level={2}>
          <cursor />
          abc
        </heading>
      </editor>
    )
    compare(input, output, (editor) => toggleHeading(editor, 2))
  })

  it("should toggle a heading 1 to a heading 2", async () => {
    const input = (
      <editor>
        <heading level={1}>
          <cursor />
          abc
        </heading>
      </editor>
    )
    const output = (
      <editor>
        <heading level={2}>
          <cursor />
          abc
        </heading>
      </editor>
    )
    compare(input, output, (editor) => toggleHeading(editor, 2))
  })

  it("should toggle a heading 2 to a paragraph", async () => {
    const input = (
      <editor>
        <heading level={2}>
          <cursor />
          abc
        </heading>
      </editor>
    )
    const output = (
      <editor>
        <p>
          <cursor />
          abc
        </p>
      </editor>
    )
    compare(input, output, (editor) => toggleHeading(editor, 2))
  })

  it("should toggle multiple paragraphs to a heading 2", async () => {
    const input = (
      <editor>
        <p>
          <anchor />
          abc
        </p>
        <p></p>
        <p>
          <focus />
        </p>
      </editor>
    )
    const output = (
      <editor>
        <heading level={2}>
          <anchor />
          abc
        </heading>
        <heading level={2}>
          <text />
        </heading>
        <heading level={2}>
          <focus />
        </heading>
      </editor>
    )
    compare(input, output, (editor) => toggleHeading(editor, 2))
  })

  it("should toggle mixed blocks that include a heading 2 to a heading 2", async () => {
    const input = (
      <editor>
        <p>
          <anchor />
          abc
        </p>
        <p></p>
        <heading level={2}>
          <focus />
        </heading>
      </editor>
    )
    const output = (
      <editor>
        <heading level={2}>
          <anchor />
          abc
        </heading>
        <heading level={2}>
          <text />
        </heading>
        <heading level={2}>
          <focus />
        </heading>
      </editor>
    )
    compare(input, output, (editor) => toggleHeading(editor, 2))
  })

  it("should toggle multiple all heading 2 to a paragraph", async () => {
    const input = (
      <editor>
        <heading level={2}>
          <anchor />
          abc
        </heading>
        <heading level={2}></heading>
        <heading level={2}>
          <focus />
        </heading>
      </editor>
    )
    const output = (
      <editor>
        <p>
          <anchor />
          abc
        </p>
        <p>
          <text />
        </p>
        <p>
          <focus />
        </p>
      </editor>
    )
    compare(input, output, (editor) => toggleHeading(editor, 2))
  })
})
