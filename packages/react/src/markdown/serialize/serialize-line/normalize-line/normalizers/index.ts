import { NormalizeOptions } from "../types"
import { mergeAdjacentSpaces } from "./merge-adjacent-spaces"
import {
  moveSpacesAtEndOfAnchor,
  moveSpacesAtStartOfAnchor,
} from "./move-spaces-out-of-anchors"
import { mustHaveOneTextChild } from "./must-have-one-text-child"
import { sliceSpacesAtNodeBoundaries } from "./slice-spaces-at-node-boundaries"
import { trimSpaceAtEndOfLine } from "./trim-spaces-at-end-of-line"
import { trimSpaceAtStartOfLine } from "./trim-spaces-at-start-of-line"

export const normalizers: Array<(options: NormalizeOptions) => boolean> = [
  sliceSpacesAtNodeBoundaries,
  moveSpacesAtStartOfAnchor,
  moveSpacesAtEndOfAnchor,
  mergeAdjacentSpaces,
  trimSpaceAtStartOfLine,
  trimSpaceAtEndOfLine,
  mustHaveOneTextChild,
]
