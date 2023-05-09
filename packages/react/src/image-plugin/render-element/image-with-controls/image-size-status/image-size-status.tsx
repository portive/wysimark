import { $ImageSizeStatus } from "../../../styles/image-with-controls-styles/image-size-status-styles"
import { ImageSize } from "../../../types"

export function ImageSizeStatus({ size }: { size: ImageSize }) {
  return (
    <$ImageSizeStatus>
      {size.width} &times; {size.height}
    </$ImageSizeStatus>
  )
}
