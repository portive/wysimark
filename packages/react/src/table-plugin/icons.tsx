import { SVGProps } from "react"

import { TablerIcon } from "../sink"

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5z"
      clipRule="evenodd"
    />
  </svg>
)

export const MinusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5z"
      clipRule="evenodd"
    />
  </svg>
)

export const BarsIcon = () => (
  <TablerIcon>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </TablerIcon>
)

export const AlignLeft = () => (
  <TablerIcon>
    <path d="M4 6h16M4 12h10M4 18h14" />
  </TablerIcon>
)

export const AlignCenter = () => (
  <TablerIcon>
    <path d="M4 6h16M8 12h8M6 18h12" />
  </TablerIcon>
)

export const AlignRight = () => (
  <TablerIcon>
    <path d="M4 6h16M10 12h10M6 18h14" />
  </TablerIcon>
)
