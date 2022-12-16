import { styled } from "goober"
import { createGlobalStyles } from "goober/global"
import { forwardRef } from "react"
import { Editable } from "slate-react"

const blue = `
--blue-50: rgb(239 246 255);
--blue-100: rgb(219 234 254);
--blue-200: rgb(191 219 254);
--blue-300: rgb(147 197 253);
--blue-400: rgb(96 165 250);
--blue-500: rgb(59 130 246);
--blue-600: rgb(37 99 235);
--blue-700: rgb(29 78 216);
--blue-800: rgb(30 64 175);
--blue-900: rgb(30 58 138);
`

// ignore because right now we're manually swapping them in/out
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const slateShades = `
--shade-50: rgb(248 250 252);
--shade-100: rgb(241 245 249);
--shade-200: rgb(226 232 240);
--shade-300: rgb(203 213 225);
--shade-400: rgb(148 163 184);
--shade-500: rgb(100 116 139);
--shade-600: rgb(71 85 105);
--shade-700: rgb(51 65 85);
--shade-800: rgb(30 41 59);
--shade-900: rgb(15 23 42);
`

// ignore because right now we're manually swapping them in/out
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const grayShades = `
--shade-50: rgb(249 250 251);
--shade-100: rgb(243 244 246);
--shade-200: rgb(229 231 235);
--shade-300: rgb(209 213 219);
--shade-400: rgb(156 163 175);
--shade-500: rgb(107 114 128);
--shade-600: rgb(75 85 99);
--shade-700: rgb(55 65 81);
--shade-800: rgb(31 41 55);
--shade-900: rgb(17 24 39);
`

// ignore because right now we're manually swapping them in/out
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const zincShades = `
--shade-50: rgb(250 250 250);
--shade-100: rgb(244 244 245);
--shade-200: rgb(228 228 231);
--shade-300: rgb(212 212 216);
--shade-400: rgb(161 161 170);
--shade-500: rgb(113 113 122);
--shade-600: rgb(82 82 91);
--shade-700: rgb(63 63 70);
--shade-800: rgb(39 39 42);
--shade-900: rgb(24 24 27);
`

export const GlobalStyles = createGlobalStyles`
  :root {
    /* Tailwind Colors */
    ${blue}
    ${zincShades}
    /* Select Colors */
    --select-color: var(--blue-400);
    --hover-color: var(--blue-200);
    /* Link Colors */
    --link-color: var(--blue-600);
    --link-hover-color: var(--blue-700);
    /* Code Block Colors */
    --code-block-bgcolor: var(--shade-50);
    --code-block-border-color: var(--shade-300);
    --inline-code-bgcolor: var(--shade-100);
    /* Table Colors */
    --table-border-color: var(--shade-300);
    --table-row-border-color: var(--shade-300);
    --table-column-border-color: var(--shade-100);
    --table-head-bgcolor: var(--shade-50);
    --table-menu-bgcolor: var(--shade-100);
    --table-menu-hover-bgcolor: var(--shade-200);
    /* Horizontal Rule Colors */
    --hr-color: var(--shade-300);
  }
`

export const $Editable = styled(Editable, forwardRef)`
  padding: 2em;
  border: 1px solid rgb(203 213 225); /* shade-300 */
  border-radius: 0.5em;
  margin: 4em;
  font: 16px arial;
  max-width: 640px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  color: rgb(39 39 42); /* shade-800 */
`
