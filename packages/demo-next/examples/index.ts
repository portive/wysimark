import { Options } from "@/components/demo/types"
import BLANK from "./blank"
import CODE from "./code"
import HEADINGS from "./headings"
import LINK from "./link"
import LINKS from "./links"
import LIST from "./list"
import MIXED from "./mixed"
import PARAGRAPH from "./paragraph"
import SEAMLESS from "./seamless"
import TABLE from "./table"

export const examples: Array<{
  name: string
  title: string
  markdown: string
}> = [
  { name: "mixed", title: "Mixed", markdown: MIXED },
  { name: "blank", title: "Blank", markdown: BLANK },
  { name: "paragraph", title: "Paragraph", markdown: PARAGRAPH },
  { name: "seamless", title: "Seamless", markdown: SEAMLESS },
  { name: "code", title: "Code", markdown: CODE },
  { name: "list", title: "List", markdown: LIST },
  { name: "links", title: "Links", markdown: LINKS },
  { name: "link", title: "Link", markdown: LINK },
  { name: "table", title: "Table", markdown: TABLE },
  { name: "headings", title: "Headings", markdown: HEADINGS },
]

export type Examples = typeof examples

export const EXAMPLE_OPTIONS: Options<string> = [
  { id: "mixed", caption: "Mixed", value: MIXED },
  { id: "blank", caption: "Blank", value: BLANK },
  { id: "paragraph", caption: "Paragraph", value: PARAGRAPH },
  { id: "seamless", caption: "Seamless", value: SEAMLESS },
  { id: "code", caption: "Code", value: CODE },
  { id: "list", caption: "List", value: LIST },
  { id: "links", caption: "Links", value: LINKS },
  { id: "link", caption: "Link", value: LINK },
  { id: "table", caption: "Table", value: TABLE },
  { id: "headings", caption: "Headings", value: HEADINGS },
]
