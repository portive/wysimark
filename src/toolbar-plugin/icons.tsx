import { SVGProps } from "react"

const Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-h-1"
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

export const BlockQuote = () => (
  <Icon>
    <path d="M6 15h15M21 19H6M15 11h6M21 7h-6M9 9h1a1 1 0 1 1-1 1V7.5a2 2 0 0 1 2-2M3 9h1a1 1 0 1 1-1 1V7.5a2 2 0 0 1 2-2" />
  </Icon>
)

export const BulletList = () => (
  <Icon>
    <path d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01" />
  </Icon>
)

export const Table = () => (
  <Icon>
    <rect x={4} y={4} width={16} height={16} rx={2} />
    <path d="M4 10h16M10 4v16" />
  </Icon>
)

export const Code = () => (
  <Icon>
    <path d="m7 8-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
  </Icon>
)

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

export const Plus = () => (
  <Icon>
    <path d="M12 5v14M5 12h14" />
  </Icon>
)
