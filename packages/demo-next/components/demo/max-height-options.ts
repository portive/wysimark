import { Options } from "./types"

export const MAX_HEIGHT_OPTIONS: Options<number | undefined> = [
  {
    id: "set",
    caption: "Limit Height",
    value: 320,
  },
  {
    id: "none",
    caption: "Auto Height",
    value: undefined,
  },
]
