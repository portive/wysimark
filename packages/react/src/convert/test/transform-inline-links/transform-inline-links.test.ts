import type { Root } from "mdast"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import { unified } from "unified"

import { transformInlineLinks } from "../../parse/transform-inline-links"

const parser = unified().use(remarkParse).use(remarkGfm)

function parse(markdown: string) {
  return parser.parse(markdown) as Root
}

describe("transform-inline-links", () => {
  it("should create an mdast", async () => {
    const ast = parse("Hello World") // as Node<Root>
    expect(ast).toMatchObject({
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "Hello World",
            },
          ],
        },
      ],
    })
  })

  it("should create an mdast", async () => {
    const ast = parse(`image reference:
![alt text][logo]
    
link reference:
[Visit OpenAI!][OpenAI]
    
[logo]: https://openai.com/logo.png "OpenAI Logo"
[OpenAI]: https://openai.com "OpenAI Homepage"`)
    expect(ast).toMatchObject({
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "image reference:\n",
            },
            {
              type: "imageReference",
              alt: "alt text",
              label: "logo",
              identifier: "logo",
              referenceType: "full",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "link reference:\n",
            },
            {
              type: "linkReference",
              children: [
                {
                  type: "text",
                  value: "Visit OpenAI!",
                },
              ],
              label: "OpenAI",
              identifier: "openai",
              referenceType: "full",
            },
          ],
        },
        {
          type: "definition",
          identifier: "logo",
          label: "logo",
          title: "OpenAI Logo",
          url: "https://openai.com/logo.png",
        },
        {
          type: "definition",
          identifier: "openai",
          label: "OpenAI",
          title: "OpenAI Homepage",
          url: "https://openai.com",
        },
      ],
    })
    transformInlineLinks(ast)
    expect(ast).toMatchObject({
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "image reference:\n",
            },
            {
              type: "image",
              url: "https://openai.com/logo.png",
              title: "OpenAI Logo",
              alt: "alt text",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "link reference:\n",
            },
            {
              type: "link",
              url: "https://openai.com",
              title: "OpenAI Homepage",
              children: [
                {
                  type: "text",
                  value: "Visit OpenAI!",
                },
              ],
            },
          ],
        },
      ],
    })
  })
})
