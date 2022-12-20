import { ConstrainedRenderElementProps } from "~/src/sink"

import { UploadAttachmentElement } from ".."
import { UploadAttachment } from "./upload-attachment"

export function renderElement(
  props: ConstrainedRenderElementProps<UploadAttachmentElement>
) {
  if (props.element.type === "upload-attachment") {
    return <UploadAttachment {...props} />
  }
  return
}
