/**
 * Takes a File object (e.g. from an <input type="file">) and returns the
 * width/height of the image if the File is an image. If it's not an image,
 * it returns null.
 *
 * <https://stackoverflow.com/questions/623172/how-to-get-image-size-height-width-using-javascript>
 */
export async function getImageSizeFromFile(
  file: File
): Promise<{ width: number; height: number } | undefined> {
  return new Promise((resolve) => {
    if (isImage(file)) {
      const reader = new FileReader()
      reader.addEventListener("load", function (e) {
        if (e.target == null) {
          throw new Error(`Expected a value for e.target`)
        }
        if (typeof e.target.result !== "string") {
          throw new Error(`Expected e.target.result to be a string`)
        }
        const src = e.target.result
        const image = new Image()
        image.addEventListener("load", function () {
          const dimensions = {
            width: this.naturalWidth,
            height: this.naturalHeight,
          }
          resolve(dimensions)
        })
        image.src = src
      })
      reader.readAsDataURL(file)
    } else {
      resolve(undefined)
    }
  })
}

export function isImage(file: File) {
  const ext = file.name.split(".").pop()
  if (ext == null) return false
  return ["png", "gif", "jpg", "jpeg"].includes(ext)
}
