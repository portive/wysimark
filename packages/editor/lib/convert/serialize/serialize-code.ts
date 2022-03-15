import repeat from "lodash/repeat"
import { CodeBlockElement, CodeLineElement } from "~/editor/types"
import { Part } from "../convert-types"
import { token } from "./serialize-utils"

const BACKTICK_REGEXP = /^([`]{3})/

/**
 * Looks for codeline that starts with a backtick and returns the number of
 * backticks that it returns.
 */
function getBacktickCountFromText(text: string) {
  const matchData = text.match(BACKTICK_REGEXP)
  return matchData == null ? 0 : matchData[1].length
}

/**
 * serialize a codeline into marks and a backtickCount if there
 * are 3 or more consecutive backticks at the beginning of the line.
 */
function serializeCodeLine(codeline: CodeLineElement): {
  parts: Part[]
  backtickCount: number
} {
  const parts = codeline.children.map((codeText): Part => {
    if (codeText.text === "") {
      return { markdown: "", string: "" }
    } else {
      return { markdown: codeText.text, string: codeText.text }
    }
  })
  parts.push(token("\n", "\n"))
  const text = parts.map((part) => part.markdown).join("")
  const backtickCount = getBacktickCountFromText(text)
  return { parts, backtickCount }
}

/**
 * Takes an array of codelines and returns both the parts and the backtickLookup
 * from it.
 */
function serializeCodeLines(codelines: CodeLineElement[]): {
  parts: Part[]
  backtickLookup: Record<string, true>
} {
  const parts: Part[] = []
  const backtickLookup: Record<string, true> = {}
  for (const codeline of codelines) {
    const data = serializeCodeLine(codeline)
    parts.push(...data.parts)
    backtickLookup[data.backtickCount] = true
  }
  return { parts, backtickLookup }
}

/**
 * Finds the number of backticks we need to use by inspecting the backtick
 * lookup
 */
function getBackticksFromLookup(backtickLookup: Record<string, true>): string {
  for (let i = 3; ; i++) {
    if (!backtickLookup[i]) {
      return repeat("`", i)
    }
  }
}

/**
 * When we serialize a code block, it usually starts with 3 backticks but can
 * be any amount of backticks.
 *
 * It's possible that backticks might be part of the actual codelines so we
 * need to augment the number of backticks used to delineate the beginnign of
 * the code block.
 */
export function serializeCode(block: CodeBlockElement): Part[] {
  const { parts, backtickLookup } = serializeCodeLines(block.children)
  const backticks = getBackticksFromLookup(backtickLookup)
  const surroundedParts = [
    token(`${backticks}${block.language}\n`, ""),
    ...parts,
    token(`${backticks}\n\n`, "\n"),
  ]
  return surroundedParts
}
