import styled from "@emotion/styled"
import { clsx } from "clsx"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { useUpload } from "../../upload-plugin/store"
import { AnchorElement } from "../index"
import { $Anchor, $Edge } from "../styles"

export function Anchor({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<AnchorElement>) {
  const selected = useSelected()
  const upload = useUpload(element.href)

  return (
    <$Anchor
      className={clsx({ "--selected": selected })}
      href={element.href}
      target={element.target}
      {...attributes}
    >
      {/* Edge allow Chrome to differentiate in/out of the link */}
      <$Edge contentEditable={false} />
      {upload.status === "progress" ? (
        <Progress progress={upload.sentBytes / upload.totalBytes} />
      ) : null}
      <span>{children}</span>
      {/* Edge allow Chrome to differentiate in/out of the link */}
      <$Edge contentEditable={false} />
    </$Anchor>
  )
}

const $ProgressBar = styled("span")`
  position: absolute;
  left: 0;
  bottom: -12px;
  width: 100px;
  background: var(--shade-50);
  height: 8px;
  border-radius: 7px;
  border: 1px solid var(--shade-400);
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`

const $Fill = styled("span")`
  position: absolute;
  left: 0;
  top: 0;
  height: 14px;
  background: var(--blue-400);
  transition: width 100ms linear;
`

function Progress({ progress }: { progress: number }) {
  return (
    <$ProgressBar>
      <$Fill style={{ width: progress * 100 }} />
    </$ProgressBar>
  )
}
