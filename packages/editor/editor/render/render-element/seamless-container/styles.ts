import styled from "@emotion/styled"

export const $SeamlessContainer = styled.div`
  position: relative;
`

export const $InsertLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  /**
   * How to make dashes with css linear-gradient
   *
   * https://stackoverflow.com/questions/32500570/gradient-line-with-dashed-pattern
   */
  /* background: linear-gradient(to right, #e0e0e0 67%, transparent 33%); */
  background: linear-gradient(to right, #e0e0e0 67%, transparent 33%);
  background-size: 8px 2px, 100% 2px;
  opacity: 1;
  &.--hover {
    background: linear-gradient(to right, #2880ff 67%, transparent 33%);
    background-size: 8px 2px, 100% 2px;
  }
  &.--previous {
    top: -1px;
  }
  &.--next {
    bottom: 0px;
  }
`

export const $InsertButton = styled.div`
  cursor: pointer;
  position: absolute;
  width: 24px;
  height: 18px;
  line-height: 18px;
  right: 0;
  color: #c0c0c0; // If we can remove the *
  background: white;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-size: 12px;
  border-radius: 5px;
  transition: background-color 0.2s;
  &.--hover {
    color: white;
    background: #2880ff;
    border: white;
  }
  &.--previous {
    top: -9px;
  }
  &.--next {
    bottom: -9px;
  }
`
