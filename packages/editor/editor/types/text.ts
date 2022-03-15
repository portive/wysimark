/**
 * Custom Text Mark Properties
 */

export type MarkProps = {
  bold?: true
  italic?: true
  ins?: true
  del?: true
  sup?: true
  sub?: true
  code?: true
}

/**
 * All the keys in MarkProps
 */
export const MARK_KEYS: readonly (keyof MarkProps)[] = [
  "bold",
  "italic",
  "ins",
  "del",
  "sup",
  "sub",
  "code",
] as const

/**
 * Custom Text Type
 */

export type CustomText = {
  text: string
} & MarkProps

/**
 * Unstyled text is found only in code blocks at the moment
 */

export type UnstyledText = {
  text: string
}

/**
 * Mark names as a string
 */

export type Mark = keyof MarkProps
