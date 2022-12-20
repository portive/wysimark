import { ConstrainedRenderElementProps } from "~/src/sink"

import { UploadAttachmentElement } from ".."
import { UploadAttachment } from "./upload-attachment"

export function renderElement(
  props: ConstrainedRenderElementProps<UploadAttachmentElement>
) {
  switch (props.element.type) {
    case "upload-attachment":
      return <UploadAttachment {...props} />
  }
}
