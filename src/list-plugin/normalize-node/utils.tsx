import { Editor, Element, Path, Transforms } from "slate"

export function wrapAndMoveNodes(
  editor: Editor,
  element: Element,
  {
    srcStart,
    srcEnd = srcStart,
    dest,
  }: { srcStart: Path; srcEnd: Path; dest: Path }
) {
  Editor.withoutNormalizing(editor, () => {
    Transforms.wrapNodes(editor, element, {
      at: Editor.range(editor, srcStart, srcEnd),
    })
    Transforms.moveNodes(editor, { at: srcStart, to: dest })
  })
}
