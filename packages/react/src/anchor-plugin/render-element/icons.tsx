import { SVGProps } from "react"

import { TablerIcon } from "~/src/sink"

export const ExternalLinkIcon = (props: SVGProps<SVGSVGElement>) => (
  <TablerIcon {...props}>
    <path d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6M11 13l9-9M15 4h5v5" />
  </TablerIcon>
)

export const LinkOffIcon = (props: SVGProps<SVGSVGElement>) => (
  <TablerIcon {...props}>
    <path d="m9 15 3-3m2-2 1-1M11 6l.463-.536a5 5 0 0 1 7.071 7.072L18 13M3 3l18 18M13 18l-.397.534a5.068 5.068 0 0 1-7.127 0 4.972 4.972 0 0 1 0-7.071L6 11" />
  </TablerIcon>
)

export const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <TablerIcon {...props}>
    <path d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4M13.5 6.5l4 4" />
  </TablerIcon>
)
