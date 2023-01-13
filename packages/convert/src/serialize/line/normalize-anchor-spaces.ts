import * as Slate from "slate"
import { AnchorElement } from "wysimark/src/anchor-plugin"

import { Segment, Text } from "../../types"

function isText(segment: Segment | undefined): segment is Text {
  return Slate.Text.isText(segment)
}

function isAnchor(segment: Segment): segment is AnchorElement {
  return Slate.Element.isElement(segment)
}

/**
 * Move spaces just inside an anchor to just outside the anchor.
 */
export function normalizeAnchorSpaces(texts: Segment[]) {
  const nextTexts: Segment[] = [{ text: "" }]
  for (let i = 0; i < texts.length + 1; i++) {
    const aNode = nextTexts[nextTexts.length - 1]
    const bNode = texts[i]

    /**
     * This is the last item sitting on nextTexts and we will be merging the
     * result of merging texts to replace this text.
     */
    const aText = isText(aNode) ? aNode : { text: "" }
    const bText = isText(bNode) ? bNode : { text: "" }

    const reslicedTexts = resliceSpacesInAdjacentTexts(aText, bText)
    nextTexts.splice(-1, 1, ...reslicedTexts)

    if (isAnchor(bNode)) {
      /**
       * If the bNode is an anchor, we didn't process is and provided a blank
       * Text earlier. Here we add it directly and then we also add another
       * blank Text on the end so that when the next call to normalizeLineSpaces
       * happens, it sees the blank text to start from.
       */
      const anchorElement: AnchorElement = {
        ...bNode,
        children: normalizeLineSpaces(bNode.children as Segment[]),
      }
      nextTexts.push(anchorElement, { text: "" })
    }
  }
  return nextTexts.filter(
    (text) => Slate.Element.isElement(text) || text.text.length > 0
  )
}
