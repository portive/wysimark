import { createEditor } from "./test-utils"
import { withActiveImage } from "./with-active-image"

describe("Resizer", () => {
  /**
   * Just a default run where we have a fallback to `type` is `static` active
   * images when there isn't a match.
   */

  describe("No activeImage", () => {
    it("should execute without withWysimarkResizer", async () => {
      const editor = createEditor()
      const activeImage = editor.createActiveImage(
        "https://files.wysimark.com/mezine/i/a/b/c/d.png"
      )
      expect(activeImage).toEqual({
        type: "static",
        url: "https://files.wysimark.com/mezine/i/a/b/c/d.png",
      })
    })
  })

  const editor = withActiveImage(createEditor(), [
    "https://files.wysimark.com/f/",
  ])

  describe("No match", () => {
    /**
     * Make sure that if the domain doesn't match, we get a static image
     */

    it("should return a static active image when there is no domain match", async () => {
      const url =
        "https://not-a-match.wysimark.com/mezine/i/a/b/c/ruewiou82434--640x480.png"
      const activeImage = editor.createActiveImage(url)
      expect(activeImage).toMatchObject({ type: "static", url })
    })

    /**
     * Make sure that if the path doesn't match the format (like if the width
     * and height section are missing), we get a static image
     */

    it("should return a static active image when there is no path format match", async () => {
      const url = "https://files.wysimark.com/mezine/i/a/b/c/ruewiou82434.png"
      const activeImage = editor.createActiveImage(url)
      expect(activeImage).toMatchObject({ type: "static", url })
    })
  })

  /**
   * Make sure we can resize original images at the `/i/` path
   */
  describe("Resize original images", () => {
    it("should resize an original image at a subpath", async () => {
      const url =
        "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.png"
      const activeImage = editor.createActiveImage(url)
      expect(activeImage).toMatchObject({
        type: "dynamic",
        url,
        originalWidth: 640,
        originalHeight: 480,
        width: 640,
        height: 480,
      })
      if (activeImage.type !== "dynamic") return
      const resizedUrl = activeImage.resize(320, 240)
      expect(resizedUrl).toEqual(
        "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.png?size=320x240"
      )
    })
  })

  /**
   * Make sure we can resize already resized images at the `/r/` path
   */
  describe("Resize resized images", () => {
    it("should resize a resized image at subpath", async () => {
      const url =
        "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.png?size=100x75"
      const activeImage = editor.createActiveImage(url)
      expect(activeImage).toMatchObject({
        type: "dynamic",
        url,
        originalWidth: 640,
        originalHeight: 480,
        width: 100,
        height: 75,
      })
      if (activeImage.type !== "dynamic") return
      const resizedUrl = activeImage.resize(320, 240)
      expect(resizedUrl).toEqual(
        "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.png?size=320x240"
      )
    })
  })

  describe("Check extensions", () => {
    it("should create dynamic original activeImages for all gif, png, jpg and jpeg", async () => {
      expect(
        editor.createActiveImage(
          "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.tiff"
        ).type
      ).toEqual("static")
      expect(
        editor.createActiveImage(
          "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.gif"
        ).type
      ).toEqual("dynamic")
      expect(
        editor.createActiveImage(
          "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.png"
        ).type
      ).toEqual("dynamic")
      expect(
        editor.createActiveImage(
          "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.jpg"
        ).type
      ).toEqual("dynamic")
      expect(
        editor.createActiveImage(
          "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.jpeg"
        ).type
      ).toEqual("dynamic")
    })

    it("should create dynamic resized activeImages for all gif, png, jpg and jpeg", async () => {
      expect(
        editor.createActiveImage(
          "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.tiff?size=320x240"
        ).type
      ).toEqual("static")
      expect(
        editor.createActiveImage(
          "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.gif?size=320x240"
        ).type
      ).toEqual("dynamic")
      expect(
        editor.createActiveImage(
          "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.png?size=320x240"
        ).type
      ).toEqual("dynamic")
      expect(
        editor.createActiveImage(
          "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.jpg?size=320x240"
        ).type
      ).toEqual("dynamic")
      expect(
        editor.createActiveImage(
          "https://files.wysimark.com/f/mezine/a/b/c/ruewiou82434--640x480.jpeg?size=320x240"
        ).type
      ).toEqual("dynamic")
    })
  })
})
