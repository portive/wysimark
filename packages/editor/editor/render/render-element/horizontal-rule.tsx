import cx from "classnames"
import React from "react"
import { useFocused, useSelected } from "slate-react"
import { colors } from "~/editor/colors"
import styled from "@emotion/styled"
import { SeamlessContainer } from "./seamless-container"
import { CustomRenderElementProps } from "./utils"

/**
 * Horizontal Rule
 */
export function HorizontalRule({
  attributes,
  children,
  element,
}: CustomRenderElementProps<"hr">) {
  const selected = useSelected()
  const focused = useFocused()
  const highlighted = selected && focused
  const containerClassName = cx({ "--highlighted": highlighted })

  /**
   * TODO: Click on `hr` does not focus and therefore `backspace` or `delete` won't work
   *
   * The current theor is that it's a WebKit related issue. The issues
   * manifests on Chrome and Safari but not on Firefox.
   *
   * Thing that worked, kind of:
   *
   * - Change `hr` to an `img` and it works
   * - It works in Firefox
   * - It doesn't work in Chrome
   *
   * Things that didn't work
   *
   * - Change css `user-select` (it's the same)
   * - Change display to `block` or `inline-block`
   * - Change `hr` to `div`
   * - Change `hr` height to be taller
   * - Looked at all the css differences between `img` and `hr` and added
   *   all the differences to `hr` and it still didn't work. See below.
   *
   * Things that were curious
   *
   * - If I use img with height 1px, it fails
   * - If I have `hr` and `img` together, the `hr` still fails
   *
   * Difference between `img` and `hr`
   *
   * - border-radius: just a style we added
   * - display: `inline` vs `block`
   * - overflow-x and overflow-y: `visislbe` vs `hidden`
   * - unicode-bidi: `normal` vs `isolate`
   */

  return (
    <SeamlessContainer attributes={attributes} element={element}>
      {children}
      <$OuterContainer contentEditable={false} draggable={true}>
        <$HorizontalRuleContainer className={containerClassName}>
          <hr />
        </$HorizontalRuleContainer>
      </$OuterContainer>
    </SeamlessContainer>
  )
}

const $HorizontalRuleContainer = styled.div`
  padding: 1em 0;
  img {
    width: 100%;
    height: 50px;
  }
  hr {
    display: block;
    /* The styles in img that aren't in hr */
    /* unicode-bidi: normal;
    overflow-y: visible;
    overflow-x: visible; */
    border-radius: 1px;
    width: 100%;
    height: 1px; // at 1px does not work
  }
  &.--highlighted hr,
  &.--highlighted img {
    box-shadow: 0 0 0 1px white, 0 0 0 3px ${colors.highlight};
  }
`

const $OuterContainer = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  position: relative;
`
