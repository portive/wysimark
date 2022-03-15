/** @jsx jsx  */
import { removeAllMarks, toggleMark } from "~/editor/custom"
import { compare, jsx } from "../test-utils"

describe("marks", () => {
  describe("Custom.toggleMark", () => {
    it("should toggle a bold mark on", async () => {
      const input = (
        <editor>
          <p>
            abc
            <anchor />
            def
            <focus />
            ghi
          </p>
        </editor>
      )
      const output = (
        <editor>
          <p>
            abc
            <text bold>
              <anchor />
              def
              <focus />
            </text>
            ghi
          </p>
        </editor>
      )
      compare(input, output, (editor) => toggleMark(editor, "bold"))
    })

    it("should toggle a bold mark off", async () => {
      const input = (
        <editor>
          <p>
            abc
            <text bold>
              <anchor />
              def
              <focus />
            </text>
            ghi
          </p>
        </editor>
      )
      const output = (
        <editor>
          <p>
            abc
            <anchor />
            def
            <focus />
            ghi
          </p>
        </editor>
      )
      compare(input, output, (editor) => toggleMark(editor, "bold"))
    })
  })

  describe("Custom.removeMarks", () => {
    it("should remove marks", async () => {
      const input = (
        <editor>
          <p>
            <text bold italic>
              abc
              <anchor />
              def
              <focus />
              ghi
            </text>
          </p>
        </editor>
      )
      const output = (
        <editor>
          <p>
            <text bold italic>
              abc
            </text>
            <text>
              <anchor />
              def
              <focus />
            </text>
            <text bold italic>
              ghi
            </text>
          </p>
        </editor>
      )
      compare(input, output, (editor) => removeAllMarks(editor))
    })
  })
})
