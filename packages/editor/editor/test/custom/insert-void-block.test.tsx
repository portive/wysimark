/** @jsx jsx  */
import { insertVoidBlock } from "~/editor/custom/insert/insert-void-block"
import { RootBlockElement } from "~/editor/types"
import { compareWithoutNormalize as compare, jsx } from "../test-utils"

describe("insertVoidBlock", () => {
  const hr: RootBlockElement = { type: "hr", children: [{ text: "" }] }

  describe("inserting a void block", () => {
    it("should insert hr at start of paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              <cursor />
              abc
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <hr>
            <text></text>
          </hr>
          <p>
            <text>
              <cursor />
              abc
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => insertVoidBlock(editor, hr))
    })

    it("should insert hr in middle of a paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              abc
              <cursor />
              def
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text>abc</text>
          </p>
          <hr>
            <text />
          </hr>
          <p>
            <text>
              <cursor />
              def
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => insertVoidBlock(editor, hr))
    })

    it("should insert hr at end of paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              abc
              <cursor />
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text>
              abc
              <cursor />
            </text>
          </p>
          <hr>
            <text></text>
          </hr>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => insertVoidBlock(editor, hr))
    })

    it("should insert void in first empty paragraph and should put cursor in next paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <hr>
            <text />
          </hr>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => insertVoidBlock(editor, hr))
    })

    it("should insert hr in second empty paragraph and should put cursor in next paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text />
          </p>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text />
          </p>
          <hr>
            <text />
          </hr>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => insertVoidBlock(editor, hr))
    })

    it("should insert hr in a blockquote and put cursor under hr", async () => {
      const input = (
        <editor>
          <blockquote>
            <p>
              <text>
                <cursor />
              </text>
            </p>
          </blockquote>
          <p>
            <text />
          </p>
        </editor>
      )

      const output = (
        <editor>
          <blockquote>
            <hr>
              <text />
            </hr>
            <p>
              <text>
                <cursor />
              </text>
            </p>
          </blockquote>
          <p>
            <text />
          </p>
        </editor>
      )

      compare(input, output, (editor) => insertVoidBlock(editor, hr))
    })

    it("should insert hr in an img", async () => {
      const input = (
        <editor>
          <media url="url" alt="alt">
            <text>
              <cursor />
            </text>
          </media>
        </editor>
      )

      const output = (
        <editor>
          <media url="url" alt="alt">
            <text></text>
          </media>
          <hr>
            <text />
          </hr>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => insertVoidBlock(editor, hr))
    })

    it("should insert hr in a code block", async () => {
      const input = (
        <editor>
          <code-block language="text">
            <code-line>
              <text>
                <cursor />
              </text>
            </code-line>
          </code-block>
        </editor>
      )

      const output = (
        <editor>
          <code-block language="text">
            <code-line>
              <text>
                <cursor />
              </text>
            </code-line>
          </code-block>
          <hr>
            <text />
          </hr>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => insertVoidBlock(editor, hr))
    })

    // it("should insert at the end of a paragraph", async () => {
    //   const input = (
    //     <editor>
    //       <p>
    //         <text>
    //           hello
    //           <cursor />
    //         </text>
    //       </p>
    //     </editor>
    //   )

    //   const output = (
    //     <editor>
    //       <p>
    //         <text>hello</text>
    //       </p>
    //       <hr>
    //         <text />
    //       </hr>
    //       <p>
    //         <text>
    //           <cursor />
    //         </text>
    //       </p>
    //     </editor>
    //   )

    //   compare(input, output, (editor) => insertRootBlock(editor, [hr]))
    // })

    // it("should insert at the beginning of a paragraph", async () => {
    //   const input = (
    //     <editor>
    //       <p>
    //         <text>
    //           <cursor />
    //           hello
    //         </text>
    //       </p>
    //     </editor>
    //   )

    //   const output = (
    //     <editor>
    //       <hr>
    //         <text />
    //       </hr>
    //       <p>
    //         <text>hello</text>
    //       </p>
    //     </editor>
    //   )

    //   compare(input, output, (editor) => insertRootBlock(editor, [hr]))
    // })
  })
})
