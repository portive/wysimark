import { check, serialize } from "../test-utils"

describe("image-block", () => {
  describe("generic image urls", () => {
    it("should convert a generic image to an ImageInline", async () => {
      check(`![Pretty Flowers](http://localhost/alpha.jpg "title")`, [
        {
          type: "image-block",
          url: "http://localhost/alpha.jpg",
          title: "title",
          alt: "Pretty Flowers",
          children: [{ text: "" }],
        },
      ])
    })
  })

  describe("Portive image URLs", () => {
    it("should convert a Portive image to an ImageInline and parse out width/height and srcWidth/srcHeight", async () => {
      check(
        `![Pretty Flowers](http://files.portive.com:3030/alpha--1024x768.jpg?size=320x240 "title")`,
        [
          {
            type: "image-block",
            url: "http://files.portive.com:3030/alpha--1024x768.jpg",
            title: "title",
            alt: "Pretty Flowers",
            width: 320,
            height: 240,
            srcWidth: 1024,
            srcHeight: 768,
            children: [{ text: "" }],
          },
        ]
      )
    })
  })

  describe("invalid url format for width/height", () => {
    it("should not get image size if missing query", async () => {
      check(
        `![Pretty Flowers](http://localhost:3030/alpha--1024x768.jpg "title")`,
        [
          {
            type: "image-block",
            url: "http://localhost:3030/alpha--1024x768.jpg",
            title: "title",
            alt: "Pretty Flowers",
            children: [{ text: "" }],
          },
        ]
      )
    })

    it("should not get image size if bad query", async () => {
      check(
        `![Pretty Flowers](http://localhost:3030/alpha--1024x768.jpg?size=320xtwoforty "title")`,
        [
          {
            type: "image-block",
            url: "http://localhost:3030/alpha--1024x768.jpg?size=320xtwoforty",
            title: "title",
            alt: "Pretty Flowers",
            children: [{ text: "" }],
          },
        ]
      )
    })

    it("should not get image size if bad pathname", async () => {
      check(
        `![Pretty Flowers](http://localhost:3030/alpha--1024x.jpg?size=320x240 "title")`,
        [
          {
            type: "image-block",
            url: "http://localhost:3030/alpha--1024x.jpg?size=320x240",
            title: "title",
            alt: "Pretty Flowers",
            children: [{ text: "" }],
          },
        ]
      )
    })
  })

  describe("Uncommon mark", () => {
    it("should get image size from uncommonMark hints", async () => {
      check(
        `![alt](http://localhost:3030/image.jpg#srcSize=1024x768&size=320x240 "title")`,
        [
          {
            type: "image-block",
            url: "http://localhost:3030/image.jpg",
            title: "title",
            alt: "alt",
            width: 320,
            height: 240,
            srcWidth: 1024,
            srcHeight: 768,
            children: [{ text: "" }],
          },
        ]
      )
    })
  })

  describe("Hash ID in URL", () => {
    it("should not serialize image with hash ID in URL", async () => {
      const markdown = serialize([
        {
          type: "image-block",
          url: "$abc",
          title: "title",
          alt: "alt",
          width: 320,
          height: 240,
          srcWidth: 1024,
          srcHeight: 768,
          children: [{ text: "" }],
        },
      ])
      expect(markdown).toEqual("")
    })

    it("should not serialize image with hash ID in URL with surrounding paragraphs", async () => {
      const markdown = serialize([
        { type: "paragraph", children: [{ text: "alpha" }] },
        {
          type: "image-block",
          url: "$abc",
          title: "title",
          alt: "alt",
          width: 320,
          height: 240,
          srcWidth: 1024,
          srcHeight: 768,
          children: [{ text: "" }],
        },
        { type: "paragraph", children: [{ text: "bravo" }] },
      ])
      expect(markdown).toEqual("alpha\n\nbravo")
    })
  })
})
