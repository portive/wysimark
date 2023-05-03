import { check, serialize } from "../test-utils"

describe("image-inline", () => {
  describe("generic image urls", () => {
    it("should convert a generic image to an ImageInline", async () => {
      check(
        `alpha ![Pretty Flowers](http://localhost/alpha.jpg "title") bravo`,
        [
          {
            type: "paragraph",
            children: [
              { text: "alpha " },
              {
                type: "image-inline",
                url: "http://localhost/alpha.jpg",
                title: "title",
                alt: "Pretty Flowers",
                children: [{ text: "" }],
              },
              { text: " bravo" },
            ],
          },
        ]
      )
    })
  })

  describe("Portive image URLs", () => {
    it("should convert a Portive image to an ImageInline and parse out width/height and srcWidth/srcHeight", async () => {
      check(
        `alpha ![Pretty Flowers](http://files.portive.com:3030/alpha--1024x768.jpg?size=320x240 "title") bravo`,
        [
          {
            type: "paragraph",
            children: [
              { text: "alpha " },
              {
                type: "image-inline",
                url: "http://files.portive.com:3030/alpha--1024x768.jpg",
                title: "title",
                alt: "Pretty Flowers",
                width: 320,
                height: 240,
                srcWidth: 1024,
                srcHeight: 768,
                children: [{ text: "" }],
              },
              { text: " bravo" },
            ],
          },
        ]
      )
    })
  })

  describe("invalid url format for width/height", () => {
    it("should not get image size if missing query", async () => {
      check(
        `alpha ![Pretty Flowers](http://localhost:3030/alpha--1024x768.jpg "title") bravo`,
        [
          {
            type: "paragraph",
            children: [
              { text: "alpha " },
              {
                type: "image-inline",
                url: "http://localhost:3030/alpha--1024x768.jpg",
                title: "title",
                alt: "Pretty Flowers",
                children: [{ text: "" }],
              },
              { text: " bravo" },
            ],
          },
        ]
      )
    })

    it("should not get image size if bad query", async () => {
      check(
        `alpha ![Pretty Flowers](http://localhost:3030/alpha--1024x768.jpg?size=320xtwoforty "title") bravo`,
        [
          {
            type: "paragraph",
            children: [
              { text: "alpha " },
              {
                type: "image-inline",
                url: "http://localhost:3030/alpha--1024x768.jpg?size=320xtwoforty",
                title: "title",
                alt: "Pretty Flowers",
                children: [{ text: "" }],
              },
              { text: " bravo" },
            ],
          },
        ]
      )
    })

    it("should not get image size if bad pathname", async () => {
      check(
        `alpha ![Pretty Flowers](http://localhost:3030/alpha--1024x.jpg?size=320x240 "title") bravo`,
        [
          {
            type: "paragraph",
            children: [
              { text: "alpha " },
              {
                type: "image-inline",
                url: "http://localhost:3030/alpha--1024x.jpg?size=320x240",
                title: "title",
                alt: "Pretty Flowers",
                children: [{ text: "" }],
              },
              { text: " bravo" },
            ],
          },
        ]
      )
    })
  })

  describe("Uncommon mark", () => {
    it("should get image size from uncommonMark hints", async () => {
      check(
        `alpha ![alt](http://localhost:3030/image.jpg#srcSize=1024x768&size=320x240 "title") bravo`,
        [
          {
            type: "paragraph",
            children: [
              { text: "alpha " },
              {
                type: "image-inline",
                url: "http://localhost:3030/image.jpg",
                title: "title",
                alt: "alt",
                width: 320,
                height: 240,
                srcWidth: 1024,
                srcHeight: 768,
                children: [{ text: "" }],
              },
              { text: " bravo" },
            ],
          },
        ]
      )
    })
  })

  describe("Hash ID in URL", () => {
    it("should get image size from uncommonMark hints", async () => {
      const markdown = serialize([
        {
          type: "paragraph",
          children: [
            { text: "alpha " },
            {
              type: "image-inline",
              url: "#abc",
              title: "title",
              alt: "alt",
              width: 320,
              height: 240,
              srcWidth: 1024,
              srcHeight: 768,
              children: [{ text: "" }],
            },
            { text: " bravo" },
          ],
        },
      ])
      expect(markdown).toEqual("alpha  bravo")
    })
  })
})
