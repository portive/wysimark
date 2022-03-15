const ESCAPES = [
  "\\",
  "`",
  "*",
  "_",
  "{",
  "}",
  "[",
  "]",
  "(",
  ")",
  "#",
  "+",
  "-",
  ".",
  "!",
  "|",
  "^", // sup
  "~", // sub/strikethrough
]

const ESCAPES_REGEXP = new RegExp(
  `(${ESCAPES.map((symbol) => `\\${symbol}`).join("|")})`,
  "g"
)

/**
 * Escape text that could have an ambiguous meaning in markdown
 */
export function escapeText(s: string) {
  return s
    .replace(ESCAPES_REGEXP, (s: string) => `\\${s}`)
    .replace(/\n/g, "<br>")
}
