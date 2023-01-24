import { SVGProps } from "react"

import { TablerIcon } from "~/src/sink"

export const ResizeIcon = (props: SVGProps<SVGSVGElement>) => (
  <TablerIcon {...props}>
    <path d="m7 8-4 4 4 4M17 8l4 4-4 4M3 12h18" />
  </TablerIcon>
)

export const BlockIcon = (props: SVGProps<SVGSVGElement>) => (
  <TablerIcon {...props}>
    <rect width={6} height={6} x={4} y={5} rx={1} />
    <path d="M4 15h16M4 19h16" />
  </TablerIcon>
)

export const InlineIcon = (props: SVGProps<SVGSVGElement>) => (
  <TablerIcon {...props}>
    <rect width={6} height={6} x={9} y={5} rx={1} />
    <path d="M4 7h1M4 11h1M19 7h1M19 11h1M4 15h16M4 19h16" />
  </TablerIcon>
)
