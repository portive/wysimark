import { CustomText, ParagraphElement, TdElement } from "~/editor/types"

function p(leaf: string | CustomText): [ParagraphElement] {
  if (typeof leaf === "string") {
    return [{ type: "p", children: [{ text: leaf }] }]
  } else {
    return [{ type: "p", children: [leaf] }]
  }
}

export function td(index: number, leaf: string | CustomText = ""): TdElement {
  return { type: "td", index, children: p(leaf) }
}
