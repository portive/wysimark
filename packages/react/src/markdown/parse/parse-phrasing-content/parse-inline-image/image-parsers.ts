import { parseGenericImage } from "./parse-generic-image"
import { parsePortiveImage } from "./parse-portive-image"
import { parseUncommonMarkImage } from "./parse-uncommon-mark-image"

export const imageParsers = [
  parsePortiveImage,
  parseUncommonMarkImage,
  parseGenericImage,
]
