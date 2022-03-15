/** @jsx jsx  */
import { Editor, Transforms } from "slate"
import { isInlineElement, isVoidElement } from "~/editor/types"
import { jsx, shouldEqual } from "../test-utils"

/**
 * The purpose of this unit test is to detail how `Transforms.insertNodes`
 * behaves. This is important because we try to improve the behavior in
 * `insertRootBlock`. Because it behaves different depending on its use case,
 * this serves as documentation on its irregular behavior.
 *
 * Natural Behavior:
 *
 * - Slate places the cursor into the inserted node in the first Text Node
 *   at `offset: 0`
 * - When inserting into an empty Element (like an empty paragraph or a void),
 *   the empty Element ends up above the inserted one which is unexpected
 * - Slate automatically handles `isInline` elements properly
 *
 * Preferred behavior:
 *
 * THINKING ABOUT THIS!!!
 *
 * Goals:
 * - Consistent
 * - Natural
 * - Inserting multiple places insertions in insertion order (ie. no inserting
 *   above)
 * - Cursor is easier to see when it's a textual cursor, not a faked outline
 *   or something. Show a text cursor after an insert.
 *
 * The mental model may be that after doing an insertion, the cursor should be
 * after the inserted object. This is like if you type a letter, the cursor
 * is placed afterward. So how do we make this work with blocks? It may be that
 * when you insert a node, we could choose to either:
 *
 * 1. place the cursor in a new empty Paragraph always? (more consistent)
 * 2. place the cursor in the below Flush block if it exists or if not insert a
 *    Paragraph? (solves problems with least amount of adjustment to document).
 *    WARNING: Weird behavior around code blocks. Does Cursor go into the code
 *    bock which might feels more consistent to the user. Or does it create the
 *    empty P?
 *
 * Currently, 1 might be better for a not surprising UI.
 *
 * In either of these scenarios, we could have multiple inserts work in
 * succession with natural behavior.
 *
 * - When we insert a Node into an empty FlushBlockType, the FlushBlockType
 *   should be removed afterwards. An empty paragraph should be appended below.
 * - When we insert a Node into a void block,
 *
 * To reconcile the behavior:
 *
 * - We should move the inserted block from below to above.
 *
 *
 * ## The Steps
 *
 * - If the target is in a flush node, use the default behavior unless it's
 *   empty in which case add a MOVE afterwards
 * - If the target is in a non-flush node, add a MOVE afterwards
 *
 * The MOVE:
 *
 * - A separate method call
 * - Takes the original insertion point as an argument
 * - Creates the `at` and `to` at the proper nesting level
 *
 * ## Final Thoughts
 *
 * For **inserting a void block**, there are three targets we have to handle
 *
 * - In a flush block with content
 *   - At beginning, we insert above and place cursor at start of flush block
 *   - In middle, we insert in middle and place cursor at start of trailing
 *     flush block
 *   - In end, we insert at end, create a trailing P, and insert cursor in
 *     trailing P
 * - In a flush block with no content
 *   - Insert node which goes after flush block. Delete that first node.
 *     Insert a paragraph node after it and place the cursor there.
 * - In a void block
 *   - Insert new void block which goes after the existing void block.
 *     Insert a paragraph after and place the cursor there.
 * - In a non-flush non-void block
 *   - Insert new void block below non-flush non-void block. Insert a paragraph
 *     and move the cursor there.
 *
 * For **inserting a nested block**:
 *
 * - In a flush block with content
 *   - Insert and place the cursor in the inserted block
 * - In a flush block with no content
 *   - Insert node which goes after flush block and cursor in inserted block
 * - In a void block
 *   - Insert nested block after and cursor in inserted block
 * - In a nested block
 *   - Insert new nested block below existing and cursor in inserted block
 *
 * We do not allow inserting of a flush block. Throw an error if one is passed
 * in.
 */

/**
 * A version of compare that takes out extraneous features like normalizing so
 * that we can see what the Slate does naturally.
 */
function compareWithBasicEditor(
  input: Editor,
  output: Editor,
  run: (editor: Editor) => void
) {
  input.isVoid = isVoidElement
  input.isInline = isInlineElement
  run(input)
  shouldEqual(input, output)
}

/**
 * The purpose of this unit test is to detail how `Transforms.insertNodes`
 * behaves. This is important because we try to improve the behavior in
 * `insertRootBlock`. Because it behaves different depending on its use case,
 * this serves as documentation on its irregular behavior.
 *
 * The main irregular behavior is that inserting into an empty paragraph
 * results in the inserted node to appear below the empty paragraph.
 */

describe("Transforms.insertNode", () => {
  describe("insert in a paragraph", () => {
    it("should insert in an empty Node and leave the empty node at the top", async () => {
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
          <p>
            <text></text>
          </p>
          <hr>
            <text>
              <cursor />
            </text>
          </hr>
        </editor>
      )

      compareWithBasicEditor(input, output, (editor) =>
        Transforms.insertNodes(editor, { type: "hr", children: [{ text: "" }] })
      )
    })

    it("should insert in the middle of a node and split it", async () => {
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
            <text>
              <cursor />
            </text>
          </hr>
          <p>
            <text>def</text>
          </p>
        </editor>
      )

      compareWithBasicEditor(input, output, (editor) =>
        Transforms.insertNodes(editor, { type: "hr", children: [{ text: "" }] })
      )
    })

    it("should insert at beginning of node without splitting", async () => {
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
            <text>
              <cursor />
            </text>
          </hr>
          <p>
            <text>abc</text>
          </p>
        </editor>
      )

      compareWithBasicEditor(input, output, (editor) =>
        Transforms.insertNodes(editor, { type: "hr", children: [{ text: "" }] })
      )
    })

    it("should insert at end of node without splitting", async () => {
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
            <text>abc</text>
          </p>
          <hr>
            <text>
              <cursor />
            </text>
          </hr>
        </editor>
      )

      compareWithBasicEditor(input, output, (editor) =>
        Transforms.insertNodes(editor, { type: "hr", children: [{ text: "" }] })
      )
    })
  })

  describe("insertNode in a container", () => {
    it("should insert in an empty Node and leave the empty node at the top", async () => {
      const input = (
        <editor>
          <blockquote>
            <p>
              <text>
                <cursor />
              </text>
            </p>
          </blockquote>
        </editor>
      )

      const output = (
        <editor>
          <blockquote>
            <p>
              <text></text>
            </p>
            <hr>
              <text>
                <cursor />
              </text>
            </hr>
          </blockquote>
        </editor>
      )

      compareWithBasicEditor(input, output, (editor) =>
        Transforms.insertNodes(editor, { type: "hr", children: [{ text: "" }] })
      )
    })
  })

  describe("insertNode in an Inline", () => {
    it("should insert in the middle of a segment and split it", async () => {
      const input = (
        <editor>
          <p>
            <text>abc</text>
            <link url="">
              <text>
                def
                <cursor />
                ghi
              </text>
            </link>
            <text>jkl</text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text>abc</text>
            <link url="">
              <text>def</text>
            </link>
            <text />
          </p>
          <hr>
            <text>
              <cursor />
            </text>
          </hr>
          <p>
            <text />
            <link url="">
              <text>ghi</text>
            </link>
            <text>jkl</text>
          </p>
        </editor>
      )

      compareWithBasicEditor(input, output, (editor) =>
        Transforms.insertNodes(editor, { type: "hr", children: [{ text: "" }] })
      )
    })
  })

  // describe("inserting nested nodes and cursor positioning", () => {
  //   it("places the cursor..", async () => {
  //     const input = (
  //       <editor>
  //         <p>
  //           <text>
  //             <cursor />
  //           </text>
  //         </p>
  //       </editor>
  //     )

  //     const output = (
  //       <editor>
  //         <p>
  //           <text></text>
  //         </p>
  //         <table columns={[{ align: "left" }]}>
  //           <tr>
  //             <td index={0}>
  //               <text>
  //                 <cursor></cursor>
  //               </text>
  //             </td>
  //           </tr>
  //         </table>
  //       </editor>
  //     )

  //     compareWithBasicEditor(input, output, (editor) =>
  //       Transforms.insertNodes(editor, {
  //         type: "table",
  //         columns: [{ align: "left" }],
  //         children: [
  //           {
  //             type: "tr",
  //             children: [
  //               {
  //                 type: "td",
  //                 index: 0,
  //                 children: [{ text: "" }, { text: "" }],
  //               },
  //             ],
  //           },
  //         ],
  //       })
  //     )
  //   })
  // })

  describe("insert in a void", () => {
    it("when inserting into a void", async () => {
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
            <text />
          </media>
          <hr>
            <text>
              <cursor />
            </text>
          </hr>
        </editor>
      )

      compareWithBasicEditor(input, output, (editor) =>
        Transforms.insertNodes(editor, { type: "hr", children: [{ text: "" }] })
      )
    })
  })

  describe("move a node", () => {
    it("should move a node and the selection with it", async () => {
      const input = (
        <editor>
          <media url="url" alt="alt">
            <text />
          </media>
          <hr>
            <text>
              <cursor />
            </text>
          </hr>
        </editor>
      )

      const output = (
        <editor>
          <hr>
            <text>
              <cursor />
            </text>
          </hr>
          <media url="url" alt="alt">
            <text />
          </media>
        </editor>
      )

      compareWithBasicEditor(input, output, (editor) =>
        Transforms.moveNodes(editor, { at: [1], to: [0] })
      )
    })
  })
})
