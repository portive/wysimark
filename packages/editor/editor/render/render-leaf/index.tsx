import cx from "classnames"
import React from "react"
import { RenderLeafProps } from "slate-react"
import styled from "@emotion/styled"

/**
 * Styled Leaf with Syntax Highlighting classes.
 *
 * Note: We turn a Prism token of `comment` into className `token-comment`
 */

const $Leaf = styled.span`
  &.token-comment {
    color: slategray;
  }
  &.token-operator,
  &.token-url {
    color: #9a6e3a;
  }
  &.token-keyword {
    color: #07a;
  }
  &.token-variable,
  &.token-regex {
    color: #e90;
  }

  &.token-number,
  &.token-boolean,
  &.token-tag,
  &.token-constant,
  &.token-symbol,
  &.token-attr-name,
  &.token-selector {
    color: #905;
  }

  &.token-punctuation {
    color: #999;
  }

  &.token-string,
  &.token-char {
    color: #690;
  }

  &.token-function,
  &.token-class-name {
    color: #dd4a68;
  }
`

/**
 * Temporary type to account for the `token` mark which is used for decorations
 * but is not part of `CustomText`.
 */

type DecorateMarks = { token?: string }

/**
 * `renderLeaf`
 */
export function renderLeaf(props: RenderLeafProps) {
  const { attributes, leaf, children } = props

  /**
   * Same as `leaf` but with the decorate mark types on it so they can be
   * extracted without TypeScript errors.
   *
   * We don't add this to `CustomText` because the types shouldn't be used
   * for manipulation or serialization as they only appear during rendering.
   */
  const decoratedLeaf = leaf as DecorateMarks
  const className = cx(
    {
      bold: leaf.bold,
      del: leaf.del,
      italic: leaf.italic,
      sup: leaf.sup,
      sub: leaf.sub,
      code: leaf.code,
    },
    (decoratedLeaf as DecorateMarks).token ? `token-${decoratedLeaf.token}` : ""
  )
  /**
   * We only want to set the `spellCheck` attribute to `true` if we are in a
   * code segment. Otherwise, we want it `undefined`. This is because in a
   * `codeline` we set the entire element to `spellCheck=false`. If a leaf
   * is set to `spellCheck=true` it will override the `spellCheck` value from
   * the `codeline`
   */
  const spellCheck = leaf.code ? false : undefined
  return (
    <$Leaf {...attributes} className={className} spellCheck={spellCheck}>
      {children}
    </$Leaf>
  )
}
