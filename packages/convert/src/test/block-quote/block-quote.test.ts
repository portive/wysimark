import { check } from "../test-utils"

describe("block quote", () => {
  describe("simple block quote", () => {
    it("should convert a simple block quote", async () => {
      check(`> alpha`, [
        {
          type: "block-quote",
          children: [
            {
              type: "paragraph",
              children: [{ text: "alpha" }],
            },
          ],
        },
      ])
    })

    it("should convert a block quote with two paragraphs", async () => {
      check(`> alpha\n>\n> bravo`, [
        {
          type: "block-quote",
          children: [
            {
              type: "paragraph",
              children: [{ text: "alpha" }],
            },
            {
              type: "paragraph",
              children: [{ text: "bravo" }],
            },
          ],
        },
      ])
    })

    it("should convert two block quotes with one paragraph each", async () => {
      check(`> alpha\n\n> bravo`, [
        {
          type: "block-quote",
          children: [
            {
              type: "paragraph",
              children: [{ text: "alpha" }],
            },
          ],
        },
        {
          type: "block-quote",
          children: [
            {
              type: "paragraph",
              children: [{ text: "bravo" }],
            },
          ],
        },
      ])
    })
  })

  describe("nested block quotes", () => {
    it("should convert nested block quotes", async () => {
      check(
        `> alpha
>
> > bravo
> >
> > charlie
>
> delta

echo`,
        [
          {
            type: "block-quote",
            children: [
              {
                type: "paragraph",
                children: [{ text: "alpha" }],
              },
              {
                type: "block-quote",
                children: [
                  {
                    type: "paragraph",
                    children: [{ text: "bravo" }],
                  },
                  {
                    type: "paragraph",
                    children: [{ text: "charlie" }],
                  },
                ],
              },
              {
                type: "paragraph",
                children: [{ text: "delta" }],
              },
            ],
          },
          {
            type: "paragraph",
            children: [{ text: "echo" }],
          },
        ]
      )
    })
  })
})
