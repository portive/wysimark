/**
 * Styles from
 * https://github.com/PrismJS/prism-themes/blob/master/themes/prism-ghcolors.css
 */

import { CSSProperties } from "react"

const commentStyle = { color: "#999988", fontStyle: "italic" }
const dimStyle = { opacity: "0.7" }
const stringStyle = { color: "#e3116c" }
const operatorStyle = { color: "#393a34" }
const valueStyle = { color: "#36acaa" }
const keywordStyle = { color: "#00a4db" }
const functionStyle = { color: "#9a050f" }
const tagStyle = { color: "#00009f" }
const boldStyle = { fontWeight: "bold" }
const italicStyle = { fontStyle: "italic" }

type TokenStyles = Record<string, CSSProperties>

export const tokenStyles: TokenStyles = {
  comment: commentStyle,
  prolog: commentStyle,
  doctype: commentStyle,
  cdata: commentStyle,
  namespace: dimStyle,
  string: stringStyle,
  "attr-value": stringStyle,
  puncutation: operatorStyle,
  operator: operatorStyle,
  entity: valueStyle,
  url: valueStyle,
  symbol: valueStyle,
  number: valueStyle,
  boolean: valueStyle,
  variable: valueStyle,
  constant: valueStyle,
  property: valueStyle,
  regex: valueStyle,
  insert: valueStyle,
  atrule: keywordStyle,
  keyword: keywordStyle,
  "attr-name": keywordStyle,
  function: { ...functionStyle, ...boldStyle },
  delete: functionStyle,
  tag: tagStyle,
  selector: tagStyle,
  important: boldStyle,
  bold: boldStyle,
  italic: italicStyle,
}
