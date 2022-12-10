import { createContext } from "react"

export const TableContext = createContext<{ isSelected: boolean }>({
  isSelected: false,
})
