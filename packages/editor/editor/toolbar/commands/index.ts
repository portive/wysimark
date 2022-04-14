import { SVGProps } from "react"
import { Editor } from "slate"
import { SUPPORTS_UPLOAD } from "~/editor/config"
import {
  BlockquoteIndentIcon,
  BlockquoteOutdentIcon,
  BoldIcon,
  ChecklistIcon,
  CodeIcon,
  CssIcon,
  EllipsisIcon,
  FileCodeIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  HrIcon,
  HtmlIcon,
  ImageIcon,
  IndentIcon,
  ItalicIcon,
  JsIcon,
  LinkIcon,
  OrderedListIcon,
  OutdentIcon,
  PlainTextIcon,
  PlusIcon,
  QuoteIcon,
  StrikeIcon,
  SubscriptIcon,
  SuperscriptIcon,
  TableIcon,
  UnorderedListIcon,
  XCircleIcon,
} from "~/editor/icons"
import { UseModalReturnType } from "~/lib/modal"
import * as Custom from "../../custom"
import { HeadingElement, isElementByType, isListItemElement } from "../../types"
import { InsertImageDialog } from "../dialog/insert-image-dialog"
import { InsertLinkDialog } from "../dialog/insert-link-dialog"
import { ToolbarMenu } from "../menu"
import { TableMenu } from "../menu/table-menu"
import { ToolbarState } from "../utils/get-toolbar-state"

export type ActionProps = {
  editor: Editor
  modal: UseModalReturnType
  dest: HTMLElement
  toolbarState: ToolbarState
}

type SVGComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element

export type Command = {
  id?: string // optional id to identify certain commands for removal in toolbar
  SvgIcon?: SVGComponent
  iconProps?: SVGProps<SVGSVGElement>
  label: string
  hotkey?: string
  hint?: string
  dropdown?: boolean
  action: (props: ActionProps) => void
  divider?: undefined // so we don't have to do a typeof check
  isActive?: (state: ToolbarState) => boolean
}

export type Divider = { divider: true }

export type Item = Command | Divider

export function isCommand(item: Item): item is Command {
  return item.divider == null
}

export const SIMPLE_COMMANDS: Item[] = [
  {
    SvgIcon: H1Icon,
    label: "Heading 1",
    hotkey: "super+1",
    action({ editor }) {
      Custom.toggleHeading(editor, 1)
    },
    isActive(state) {
      return (
        isElementByType<HeadingElement>(state.block, "heading") &&
        state.block.level === 1
      )
    },
  },
  {
    SvgIcon: H2Icon,
    label: "Heading 2",
    hotkey: "super+2",
    action({ editor }) {
      Custom.toggleHeading(editor, 2)
    },
    isActive(state) {
      return (
        isElementByType<HeadingElement>(state.block, "heading") &&
        state.block.level === 2
      )
    },
  },
  {
    SvgIcon: H3Icon,
    label: "Heading 3",
    hotkey: "super+3",
    action({ editor }) {
      Custom.toggleHeading(editor, 3)
    },
    isActive(state) {
      return (
        isElementByType<HeadingElement>(state.block, "heading") &&
        state.block.level === 3
      )
    },
  },
  // {
  //   faIcon: faParagraph,
  //   label: "Normal",
  //   hotkey: "super+0",
  //   action({ editor }) {
  //     Custom.setParagraph(editor)
  //   },
  //   isActive(state) {
  //     return isElementByType(state.block, "p")
  //   },
  // },
]

const MORE_MARK_COMMANDS: Item[] = [
  {
    SvgIcon: CodeIcon,
    label: "Code",
    hotkey: "super+c",
    action({ editor }) {
      Custom.toggleMark(editor, "code", true)
    },
    isActive(state) {
      return !!state.marks.code
    },
  },
  {
    SvgIcon: SuperscriptIcon,
    label: "Superscript",
    hotkey: "super+p",
    action({ editor }) {
      Custom.toggleMark(editor, "sup", true)
    },
    isActive(state) {
      return !!state.marks.sup
    },
  },
  {
    SvgIcon: SubscriptIcon,
    label: "Subscript",
    hotkey: "super+b",
    action({ editor }) {
      Custom.toggleMark(editor, "sub", true)
    },
    isActive(state) {
      return !!state.marks.sub
    },
  },
  {
    // faIcon: faStrikethrough,
    SvgIcon: StrikeIcon,
    label: "Strikethrough",
    hotkey: "super+x",
    action({ editor }) {
      Custom.toggleMark(editor, "del", true)
    },
    isActive(state) {
      return !!state.marks.del
    },
  },
  {
    SvgIcon: XCircleIcon,
    label: "Remove Formatting",
    // hotkey: "mod+d",
    action({ editor }) {
      Custom.removeAllMarks(editor)
    },
  },
]

export const MARK_COMMANDS: Item[] = [
  {
    SvgIcon: BoldIcon,
    label: "Bold",
    hotkey: "mod+b",
    action({ editor }) {
      Custom.toggleMark(editor, "bold", true)
    },
    isActive(state) {
      return !!state.marks.bold
    },
  },
  {
    SvgIcon: ItalicIcon,
    label: "Italic",
    hotkey: "mod+i",
    action({ editor }) {
      Custom.toggleMark(editor, "italic", true)
    },
    isActive(state) {
      return !!state.marks.italic
    },
  },
  {
    SvgIcon: EllipsisIcon,
    label: "More inline styles",
    dropdown: true,
    action({ editor, modal, dest, toolbarState }) {
      modal.open(ToolbarMenu, {
        items: MORE_MARK_COMMANDS,
        editor,
        dest,
        toolbarState,
      })
    },
  },
]

export const LIST_COMMANDS: Item[] = [
  {
    SvgIcon: UnorderedListIcon,
    label: "Bulleted list",
    hotkey: "super+8",
    action({ editor }) {
      Custom.toggleListItem(editor, "unordered-list-item")
    },
    isActive(state) {
      return isElementByType(state.block, "unordered-list-item")
    },
  },
  {
    SvgIcon: OrderedListIcon,
    label: "Numbered list",
    hotkey: "super+7",
    action({ editor }) {
      Custom.toggleListItem(editor, "ordered-list-item")
    },
    isActive(state) {
      return isElementByType(state.block, "ordered-list-item")
    },
  },
  {
    SvgIcon: ChecklistIcon,
    label: "Task list",
    hotkey: "super+9",
    action({ editor }) {
      Custom.toggleListItem(editor, "task-list-item")
    },
    isActive(state) {
      return isElementByType(state.block, "task-list-item")
    },
  },
  { divider: true },
  {
    SvgIcon: IndentIcon,
    label: "Indent list",
    hotkey: "tab",
    action({ editor }) {
      Custom.tabInList(editor, 1)
    },
  },
  {
    SvgIcon: OutdentIcon,
    label: "Outdent list",
    hotkey: "shift+tab",
    action({ editor }) {
      Custom.tabInList(editor, -1)
    },
  },
]

const CODE_BLOCK_COMMANDS: Item[] = [
  {
    SvgIcon: PlainTextIcon,
    label: "Plain text",
    action({ editor }) {
      Custom.insertCodeBlock(editor, "text")
    },
  },
  {
    SvgIcon: HtmlIcon,
    label: "HTML",
    action({ editor }) {
      Custom.insertCodeBlock(editor, "html")
    },
  },
  {
    SvgIcon: CssIcon,
    label: "CSS",
    action({ editor }) {
      Custom.insertCodeBlock(editor, "css")
    },
  },
  {
    SvgIcon: JsIcon,
    label: "Javascript",
    action({ editor }) {
      Custom.insertCodeBlock(editor, "js")
    },
  },
  {
    SvgIcon: FileCodeIcon,
    label: "Java, C, C++",
    action({ editor }) {
      Custom.insertCodeBlock(editor, "clike")
    },
  },
]

export const PLUS_COMMANDS: Item[] = [
  {
    SvgIcon: PlusIcon,
    label: "Insert special type",
    dropdown: true,
    action({ editor, modal, dest, toolbarState }) {
      modal.open(ToolbarMenu, {
        items: INSERT_COMMANDS,
        editor,
        modal,
        dest,
        toolbarState,
      })
    },
  },
]

export const BLOCKQUOTE_COMMANDS: Item[] = [
  {
    SvgIcon: BlockquoteIndentIcon,
    label: "Add Block Quote to selected blocks",
    action({ editor }) {
      Custom.blockquote(editor)
    },
  },
  {
    SvgIcon: BlockquoteOutdentIcon,
    label: "Remove Block Quote at current selection",
    action({ editor }) {
      Custom.unblockquote(editor)
    },
  },
]

export const INSERT_COMMANDS: Item[] = [
  {
    SvgIcon: LinkIcon,
    label: "Insert link",
    hint: "Hint: Paste URL in editor",
    dropdown: true,
    action({ editor, modal, dest }) {
      modal.open(InsertLinkDialog, { editor, dest })
    },
    isActive(state) {
      return state.inLink
    },
  },
  {
    SvgIcon: HrIcon,
    label: "Insert Horizontal Rule",
    hint: "Hint: type --- then hit enter",
    action({ editor }) {
      Custom.insertHorizontalRule(editor)
    },
  },
  {
    SvgIcon: QuoteIcon,
    label: "Block Quote",
    dropdown: true,
    action({ editor, modal, dest, toolbarState }) {
      modal.open(ToolbarMenu, {
        items: BLOCKQUOTE_COMMANDS,
        editor,
        modal,
        dest,
        toolbarState,
      })
    },
    isActive(state) {
      return state.inBlockQuote
    },
  },
  {
    SvgIcon: UnorderedListIcon,
    label: "Open list and task menu",
    dropdown: true,
    action({ editor, modal, dest, toolbarState }) {
      modal.open(ToolbarMenu, {
        items: LIST_COMMANDS,
        editor,
        modal,
        dest,
        toolbarState,
      })
    },
    isActive(state) {
      return state.block ? isListItemElement(state.block) : false
    },
  },
  {
    SvgIcon: TableIcon,
    label: "Insert and modify table",
    hint: "Insert and remove columns and rows in table",
    dropdown: true,
    action({ editor, modal, dest, toolbarState }) {
      modal.open(TableMenu, { editor, modal, dest, toolbarState })
    },
    isActive(state) {
      return isElementByType(state.block, "td")
    },
  },
  {
    SvgIcon: CodeIcon,
    label: "Insert code block",
    hint: "Hint: click to see shortcuts to insert code block",
    dropdown: true,
    action({ editor, modal, dest, toolbarState }) {
      modal.open(ToolbarMenu, {
        items: CODE_BLOCK_COMMANDS,
        editor,
        modal,
        dest,
        toolbarState,
      })
    },
    isActive(state) {
      return isElementByType(state.block, "code-line")
    },
  },
  {
    id: "insert-file",
    SvgIcon: ImageIcon,
    label: "Insert image or file",
    hint: "Hint: Upload image or file in editor",
    dropdown: true,
    action({ editor, modal, dest }) {
      modal.open(InsertImageDialog, {
        editor,
        dest,
      })
    },
  },
]
