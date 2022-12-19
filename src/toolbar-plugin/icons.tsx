import { SVGProps } from "react"

/**
 * Efficient way to create a Tabler Icon.
 *
 * https://tabler-icons.io/
 *
 * - Grab the SVG from the Tabler Icon.
 * - Run it through https://react-svgr.com/playground/?icon=true&typescript=true
 * - Grab everything EXCEPT the first `path` which is unnecessary
 * - Place it as the children of this `<Icon>`
 */
const Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    // strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    {...props}
  />
)

export const H = () => (
  <Icon>
    <path d="M7 12h10M7 5v14M17 5v14M15 19h4M15 5h4M5 19h4M5 5h4" />
  </Icon>
)

export const More = () => (
  <Icon width="0.5em" viewBox="0 0 12 24">
    <path d="m2 12 4 4 4-4" opacity={0.375} />
  </Icon>
)

export const LinkPlus = () => (
  <Icon width="0.5em" viewBox="6 0 12 24">
    <path d="M9 12h6M12 9v6" />
  </Icon>
)

export const H1 = () => (
  <Icon>
    <path d="M19 18v-8l-2 2M4 6v12M12 6v12M11 18h2M3 18h2M4 12h8M3 6h2M11 6h2" />
  </Icon>
)

export const H2 = () => (
  <Icon>
    <path d="M17 12a2 2 0 1 1 4 0c0 .591-.417 1.318-.816 1.858L17 18.001h4M4 6v12M12 6v12M11 18h2M3 18h2M4 12h8M3 6h2M11 6h2" />
  </Icon>
)

export const H3 = () => (
  <Icon>
    <path d="M19 14a2 2 0 1 0-2-2M17 16a2 2 0 1 0 2-2M4 6v12M12 6v12M11 18h2M3 18h2M4 12h8M3 6h2M11 6h2" />
  </Icon>
)

export const H4 = () => (
  <Icon>
    <path d="M20 18v-8l-4 6h5M4 6v12M12 6v12M11 18h2M3 18h2M4 12h8M3 6h2M11 6h2" />
  </Icon>
)

export const H5 = () => (
  <Icon>
    <path d="M17 18h2a2 2 0 1 0 0-4h-2v-4h4M4 6v12M12 6v12M11 18h2M3 18h2M4 12h8M3 6h2M11 6h2" />
  </Icon>
)

export const H6 = () => (
  <Icon>
    <path d="M19 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    <path d="M21 12a2 2 0 1 0-4 0v4M4 6v12M12 6v12M11 18h2M3 18h2M4 12h8M3 6h2M11 6h2" />
  </Icon>
)

export const Paragraph = () => (
  <Icon>
    <path d="M7 20V4h5.5a4 4 0 0 1 0 9H7" />
  </Icon>
)

export const Bold = () => (
  <Icon>
    {/* <path d="M0 0h24v24H0z" stroke="none" /> */}
    <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM13 12h1a3.5 3.5 0 0 1 0 7H7v-7" />
  </Icon>
)

export const Italic = () => (
  <Icon>
    <path d="M11 5h6M7 19h6M14 5l-4 14" />
  </Icon>
)

export const Style = () => (
  <Icon>
    <path d="M4 20h3M14 20h7M6.9 15h6.9M10.2 6.3 16 20M5 20l6-16h2l7 16" />
  </Icon>
)

export const Link = () => (
  <Icon>
    <path d="M10 14a3.5 3.5 0 0 0 5 0l4-4a3.5 3.5 0 0 0-5-5l-.5.5" />
    <path d="M14 10a3.5 3.5 0 0 0-5 0l-4 4a3.5 3.5 0 0 0 5 5l.5-.5" />
  </Icon>
)

/**
 * Block Quote
 */

export const Blockquote = () => (
  <Icon>
    <path d="M6 15h15M21 19H6M15 11h6M21 7h-6M9 9h1a1 1 0 1 1-1 1V7.5a2 2 0 0 1 2-2M3 9h1a1 1 0 1 1-1 1V7.5a2 2 0 0 1 2-2" />
  </Icon>
)

export const Quote = () => (
  <Icon>
    <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5M19 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5" />
  </Icon>
)

export const QuoteOff = () => (
  <Icon>
    <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1m4 4v3c0 2.667-1.333 4.333-4 5M19 11h-4m-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 .66-.082 1.26-.245 1.798m-1.653 2.29c-.571.4-1.272.704-2.102.912M3 3l18 18" />
  </Icon>
)

/**
 * List
 */

export const BulletList = () => (
  <Icon>
    <path d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01" />
  </Icon>
)

/**
 * Table
 */

export const Table = () => (
  <Icon>
    <rect x={4} y={4} width={16} height={16} rx={2} />
    <path d="M4 10h16M10 4v16" />
  </Icon>
)

/**
 * Code
 */

export const Code = () => (
  <Icon>
    <path d="m7 8-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
  </Icon>
)

/**
 * Media and Files
 */

export const Image = () => (
  <Icon>
    <path d="M15 8h.01" />
    <rect x={4} y={4} width={16} height={16} rx={3} />
    <path d="m4 15 4-4a3 5 0 0 1 3 0l5 5" />
    <path d="m14 14 1-1a3 5 0 0 1 3 0l2 2" />
  </Icon>
)

export const Attachment = () => (
  <Icon>
    <path d="m15 7-6.5 6.5a1.5 1.5 0 0 0 3 3L18 10a3 3 0 0 0-6-6l-6.5 6.5a4.5 4.5 0 0 0 9 9L21 13" />
  </Icon>
)

/**
 * Text Styles
 */

export const Plus = () => (
  <Icon>
    <path d="M12 5v14M5 12h14" />
  </Icon>
)
export const Superscript = () => (
  <Icon>
    <path d="m5 7 8 10m-8 0 8-10M21 11h-4l3.5-4A1.73 1.73 0 0 0 17 5" />
  </Icon>
)

export const Subscript = () => (
  <Icon>
    <path d="m5 7 8 10m-8 0 8-10M21 20h-4l3.5-4a1.73 1.73 0 0 0-3.5-2" />
  </Icon>
)

export const Strikethrough = () => (
  <Icon>
    <path d="M5 12h14M16 6.5A4 2 0 0 0 12 5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1-4-1.5" />
  </Icon>
)

export const RemoveStyles = () => (
  <Icon>
    <path d="m14 6 7 7-2 2M10 10l-4.172 4.172a2.828 2.828 0 1 0 4 4L14 14" />
    <path d="m16 12 4.414-4.414a2 2 0 0 0 0-2.829l-1.171-1.171a2 2 0 0 0-2.829 0L12 8M4 20l1.768-1.768M3 3l18 18" />
  </Icon>
)

export const ListCheck = () => (
  <Icon>
    <path d="M3.5 5.5 5 7l2.5-2.5M3.5 11.5 5 13l2.5-2.5M3.5 17.5 5 19l2.5-2.5M11 6h9M11 12h9M11 18h9" />
  </Icon>
)

export const ListNumbers = () => (
  <Icon>
    <path d="M11 6h9M11 12h9M12 18h8M4 16a2 2 0 1 1 4 0c0 .591-.5 1-1 1.5L4 20h4M6 10V4L4 6" />
  </Icon>
)
