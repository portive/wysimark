import * as Slate from "slate"
import { AnchorElement } from "wysimark/src/anchor-plugin"

import { Segment, Text } from "../../types"

function isText(segment: Segment | undefined): segment is Text {
  return Slate.Text.isText(segment)
}

function isAnchor(segment: Segment): segment is AnchorElement {
  return Slate.Element.isElement(segment)
}

function resliceSpacesInAdjacentTexts(a: Text, b: Text): Text[] {
  /**
   * Check if a ends in a space or b starts with a space
   */
  const aMatch = a.text.match(/^(.*?)(\s+)$/i)
  const bMatch = b.text.match(/^(\s+)(.*)$/i)
  /**
   * If neither a ends in a space nor b starts with a space, then we don't need
   * to move the boundaries to follow markdowns mark rule.
   */
  if (aMatch === null && bMatch == null) return [a, b]

  return [
    {
      ...a,
      text: aMatch ? aMatch[1] : a.text,
    },
    {
      text: `${aMatch ? aMatch[2] : ""}${bMatch ? bMatch[1] : ""}`,
    },
    { ...b, text: bMatch ? bMatch[2] : b.text },
  ].filter((text) => text.text.length > 0)
}

/**
 * Normalize text by separating out spaces that occur at the edges of
 * each `Text` Node.
 *
 * For example:
 *
 * - " alpha" => " ", "alpha"
 * - "alpha " => "alpha", " "
 * - " alpha " => " ", "alpha", " "
 * - "alpha", " bravo" => "alpha", " ", "bravo"
 * - "alpha ", "bravo" => "alpha", " ", "bravo"
 * - "alpha ", " barvo" => "alpha", "  ", "bravo"
 */
export function normalizeLineSpaces(segments: Segment[]) {
  const nextSegments: Segment[] = [{ text: "" }]
  for (let i = 0; i < segments.length + 1; i++) {
    const aNode = nextSegments[nextSegments.length - 1]
    const bNode = segments[i]

    /**
     * This is the last item sitting on nextTexts and we will be merging the
     * result of merging texts to replace this text.
     */
    const aText = isText(aNode) ? aNode : { text: "" }
    const bText = isText(bNode) ? bNode : { text: "" }

    const reslicedTexts = resliceSpacesInAdjacentTexts(aText, bText)
    nextSegments.splice(-1, 1, ...reslicedTexts)

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
      nextSegments.push(anchorElement, { text: "" })
    }
  }
  return nextSegments.filter((text) => isAnchor(text) || text.text.length > 0)
}
