/** @jsx jsx  */
import { jsx, normalize } from "../../test-utils"

describe("normalize lists", () => {
  describe("parent", () => {
    it("n/a", async () => {
      /* added for clarity */
    })
  })

  describe("normalize empty children", () => {
    it("n/a", async () => {
      /* added for clarity */
    })
  })

  describe("normalize invalid children", () => {
    it("n/a", async () => {
      /* added for clarity */
    })
  })

  describe("normalize props", () => {
    it("should renumber a flat ordered list that is at the edges of Editor", async () => {
      const input = (
        <editor>
          <p>
            <text>abc</text>
          </p>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
          <p>
            <text>def</text>
          </p>
        </editor>
      )
      const output = (
        <editor>
          <p>
            <text>abc</text>
          </p>
          <ordered-list-item depth={0} number={1}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={2}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={3}>
            a
          </ordered-list-item>
          <p>
            <text>def</text>
          </p>
        </editor>
      )
      normalize(input, output)
    })

    it("should renumber a flat ordered list that is no at the edges", async () => {
      const input = (
        <editor>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
        </editor>
      )
      const output = (
        <editor>
          <ordered-list-item depth={0} number={1}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={2}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={3}>
            a
          </ordered-list-item>
        </editor>
      )
      normalize(input, output)
    })

    it("should renumber a list in a blockquote", async () => {
      const input = (
        <editor>
          <blockquote>
            <ordered-list-item depth={0} number={0}>
              a
            </ordered-list-item>
            <ordered-list-item depth={0} number={0}>
              a
            </ordered-list-item>
            <ordered-list-item depth={0} number={0}>
              a
            </ordered-list-item>
          </blockquote>
          <p>
            <text />
          </p>
        </editor>
      )
      const output = (
        <editor>
          <blockquote>
            <ordered-list-item depth={0} number={1}>
              a
            </ordered-list-item>
            <ordered-list-item depth={0} number={2}>
              a
            </ordered-list-item>
            <ordered-list-item depth={0} number={3}>
              a
            </ordered-list-item>
          </blockquote>
          <p>
            <text />
          </p>
        </editor>
      )
      normalize(input, output)
    })

    it("should renumber a list in root and a blockquote with the same index start position of the list", async () => {
      const input = (
        <editor>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
          <blockquote>
            <ordered-list-item depth={0} number={0}>
              a
            </ordered-list-item>
            <ordered-list-item depth={0} number={0}>
              a
            </ordered-list-item>
          </blockquote>
          <p>
            <text />
          </p>
        </editor>
      )
      const output = (
        <editor>
          <ordered-list-item depth={0} number={1}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={2}>
            a
          </ordered-list-item>
          <blockquote>
            <ordered-list-item depth={0} number={1}>
              a
            </ordered-list-item>
            <ordered-list-item depth={0} number={2}>
              a
            </ordered-list-item>
          </blockquote>
          <p>
            <text />
          </p>
        </editor>
      )
      normalize(input, output)
    })

    it("should renumber a nested ordered list", async () => {
      const input = (
        <editor>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={1} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={2} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={1} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={2} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
        </editor>
      )
      const output = (
        <editor>
          <ordered-list-item depth={0} number={1}>
            a
          </ordered-list-item>
          <ordered-list-item depth={1} number={1}>
            a
          </ordered-list-item>
          <ordered-list-item depth={2} number={1}>
            a
          </ordered-list-item>
          <ordered-list-item depth={1} number={2}>
            a
          </ordered-list-item>
          <ordered-list-item depth={2} number={1}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={2}>
            a
          </ordered-list-item>
        </editor>
      )
      normalize(input, output)
    })

    it("should renumber a mixed list", async () => {
      const input = (
        <editor>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={1} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={2} number={0}>
            a
          </ordered-list-item>
          <unordered-list-item depth={1}>a</unordered-list-item>
          <task-list-item depth={1} checked>
            a
          </task-list-item>
          <ordered-list-item depth={1} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={2} number={0}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={0}>
            a
          </ordered-list-item>
        </editor>
      )
      const output = (
        <editor>
          <ordered-list-item depth={0} number={1}>
            a
          </ordered-list-item>
          <ordered-list-item depth={1} number={1}>
            a
          </ordered-list-item>
          <ordered-list-item depth={2} number={1}>
            a
          </ordered-list-item>
          {/* included in count of number */}
          <unordered-list-item depth={1}>a</unordered-list-item>
          {/* included in count of number */}
          <task-list-item depth={1} checked>
            a
          </task-list-item>
          <ordered-list-item depth={1} number={4}>
            a
          </ordered-list-item>
          <ordered-list-item depth={2} number={1}>
            a
          </ordered-list-item>
          <ordered-list-item depth={0} number={2}>
            a
          </ordered-list-item>
        </editor>
      )
      normalize(input, output)
    })
  })
})
