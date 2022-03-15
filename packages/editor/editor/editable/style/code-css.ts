import { colors } from "~/editor/colors"
import { horizontalScrollbar } from "~/parts/css"
import { css } from "@emotion/core"

export const codeCss = css`
  pre {
    background: #f4f6f8;
    border-radius: ${colors.borderRadius};
    font-family: "menlo", monospace;
    font-size: 0.85em;
    padding: 1em 1.25em;
    white-space: pre;

    ${horizontalScrollbar({
      height: 16,
      thumbColor: "rgba(0,0,0,0.05)",
      borderColor: "#e0e0e0",
      backgroundColor: "rgba(0,0,0,0.02)",
    })}

    @media print {
      color: black;
      background: white;
      border-color: black;
    }
  }
`
