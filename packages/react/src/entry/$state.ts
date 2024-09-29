import { proxy } from "valtio"

export const $state = proxy({
  debug: {
    rerender: false,
  },
})
