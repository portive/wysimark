import { clsx } from "clsx"
import { useState } from "react"
import { useSelected } from "slate-react"

import { useUpload } from "~/src/upload-plugin/store"

import { $Image, $ImageContainer } from "../styles/image-styles"
import { ImageInterface } from "../types"
import { ImageResizeControl } from "./image-resize-handle"

export function Image({
  element,
  inline = false,
}: {
  element: ImageInterface
  inline?: boolean
}) {
  const upload = useUpload(element.url)
  const selected = useSelected()

  const [size, setSize] = useState(
    element.srcWidth && element.srcHeight && element.width && element.height
      ? { width: element.width, height: element.height }
      : null
  )

  const srcSize =
    element.srcWidth && element.srcHeight
      ? { width: element.srcWidth, height: element.srcHeight }
      : null

  return (
    <$ImageContainer>
      <$Image
        className={clsx({ "--selected": selected, "--inline": inline })}
        src={upload.url}
        width={size?.width}
        height={size?.height}
      />
      {selected && size && srcSize ? (
        <ImageResizeControl srcSize={srcSize} size={size} setSize={setSize} />
      ) : null}
    </$ImageContainer>
  )
}
