import { colors } from "~/editor/colors"
import { unselectable } from "~/parts/css"
import styled from "@emotion/styled"

export const $OuterContainer = styled.div`
  padding: 1em 0;
  position: relative;
`

export const $TightContainer = styled.div`
  position: relative;
  display: inline-block;
  /**
   * This is required so that we don't get an extra gap at the bottom.
   * When display is 'inline-block' we get some extra space at the bottom
   * for the descenders because the content is expected to co-exist with text.
   *
   * Setting vertical-align to top, bottom or middle fixes this because it is
   * no longer baseline which causes the issue.
   *
   * This is usually an issue with 'img' but also affects this scenario.
   *
   * https://stackoverflow.com/questions/5804256/image-inside-div-has-extra-space-below-the-image
   */
  vertical-align: top;
`

export const $Image = styled.img`
  display: block;
  border-radius: ${colors.borderRadius};
  transition: box-shadow ${colors.editorBorderTransition};
  &.--focused {
    /* box-shadow: 0 0 0 2px ${colors.highlight}; */
    box-shadow: 0 0 0 1px white, 0 0 0 3px ${colors.highlight};
  }
`

export const $Size = styled.div`
  position: absolute;
  bottom: 4px;
  &.--small {
    bottom: -24px;
  }
  transition: bottom 250ms;
  left: 4px;
  min-width: 50px;
  font: 10px/20px arial, sans-serif;
  padding: 0 7px;
  color: white;
  background: #404040;
  /* box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 1); */
  box-shadow: 0px 0px 0 1px rgba(255, 255, 255, 0.5);
  border-radius: 3px;
  ${unselectable}
`

export const $InvisibleHandle = styled.div`
  position: absolute;
  right: -9px;
  top: 0;
  bottom: 0;
  width: 18px;
  background: rgba(127, 127, 127, 0.01);
  /* background: green; */
  cursor: ew-resize;
  ${unselectable}
`

export const $Handle = styled.div`
  position: absolute;
  width: 15px;
  height: 30px;
  /* background-color: #1060d0; */
  background-color: ${colors.highlight};
  border-radius: 3px;
  right: -9px;
  margin-top: -15px;
  top: 50%;
  box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.75);

  .--bar {
    position: absolute;
    top: 7px;
    width: 1px;
    height: 15px;
    background: rgba(255, 255, 255, 0.5);
  }
  .--bar-1 {
    left: 7px;
  }
  .--bar-2 {
    left: 10px;
  }
  .--bar-3 {
    left: 4px;
  }
  ${unselectable}
`
