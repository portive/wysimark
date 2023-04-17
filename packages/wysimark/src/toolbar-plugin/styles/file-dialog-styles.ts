import { styled } from "goober"
import { forwardRef } from "react"

import { $Panel } from "./panel-styles"

export const $FileDialog = styled($Panel, forwardRef)`
  padding: 1em;
  width: 18em;
`
// export const $AnchorDialogInputLine = styled("div", forwardRef)`
//   display: flex;
//   gap: 0.5em;
// `

// export const $AnchorDialogInput = styled("input", forwardRef)`
//   flex: 1 1 auto;
//   padding: 0.5em 0.75em;
//   border-radius: 0.25em;
//   color: var(--shade-700);
//   border: 1px solid var(--shade-300);
//   font-size: 0.9375em;
//   &:focus {
//     outline: 2px solid var(--blue-200);
//   }
// `

// export const $AnchorDialogButton = styled("div", forwardRef)`
//   /* Center vertically and horizontally */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   font-size: 1.25em;
//   padding: 0 0.5em;
//   text-align: center;
//   color: var(--blue-100);
//   background: var(--blue-400);
//   transition: all 100ms;
//   &:hover {
//     color: var(--blue-50);
//     background: var(--blue-500);
//     outline: 2px solid var(--blue-200);
//   }
//   border-radius: 0.25em;
//   svg {
//     stroke-width: 2px;
//   }
// `

// export const $AnchorDialogHint = styled("div", forwardRef)`
//   font-size: 0.875em;
//   margin-top: 0.5em;
//   color: var(--shade-500);
// `
