const ESCAPES = [
  "\\", // escape
  "`", // code
  "*", // bold/italic/hr
  "_", // bold/italic/hr
  "[", // link/list
  "]", // link/list
  "(", // link
  ")", // link
  "#", // headings
  "+", // list
  "-", // hr/list
  ".", // numbered list
  "!", // image
  "|", // table
  "^", // sup
  "~", // sub/strikethrough
  "<", // link/html
  ">", // link/html
  /**
   * Includes all the characters in the list of Backslash escapes in the example
   * for GitHub Flavored Markdown.
   *
   * https://github.github.com/gfm/#backslash-escapes
   */
  "{",
  "}",
  "=",
  ":",
  ";",
  "$",
  "%",
  "&",
  "?",
  '"',
  "'",
  ",",
  "\\",
  "/",
  "@",
]

const ESCAPES_REGEXP = new RegExp(
  `(${ESCAPES.map((symbol) => `\\${symbol}`).join("|")})`,
  "g"
)

/**
 * Escape text that could have an ambiguous meaning in markdown
 */
export function escapeText(s: string) {
  return s.replace(ESCAPES_REGEXP, (s: string) => `\\${s}`)
  // .replace(/\n/g, "<br>")
}
