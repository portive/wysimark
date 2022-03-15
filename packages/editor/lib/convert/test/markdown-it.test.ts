import { RootBlockElement } from "~/editor/types"
import { testParse } from "./convert-test-utils"
import { td } from "./util"

describe("markdown-it-demo", () => {
  it("should parse headings", async () => {
    const markdown = `# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
####### Paragraph`
    const blocks: RootBlockElement[] = [
      {
        type: "heading",
        level: 1,
        children: [{ text: "h1 Heading 8-)" }],
      },
      {
        type: "heading",
        level: 2,
        children: [{ text: "h2 Heading" }],
      },
      {
        type: "heading",
        level: 3,
        children: [{ text: "h3 Heading" }],
      },
      {
        type: "heading",
        level: 4,
        children: [{ text: "h4 Heading" }],
      },
      {
        type: "heading",
        level: 5,
        children: [{ text: "h5 Heading" }],
      },
      {
        type: "heading",
        level: 6,
        children: [{ text: "h6 Heading" }],
      },
      {
        type: "p",
        children: [{ text: "####### Paragraph" }],
      },
    ]
    testParse(markdown, blocks)
  })

  it("should parse horizontal rules", async () => {
    const markdown = `## Horizontal Rules

___

---

***`
    const blocks: RootBlockElement[] = [
      {
        type: "heading",
        level: 2,
        children: [{ text: "Horizontal Rules" }],
      },
      { type: "hr", children: [{ text: "" }] },
      { type: "hr", children: [{ text: "" }] },
      { type: "hr", children: [{ text: "" }] },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should not parse typographic replacements", async () => {
    const markdown = `## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'`
    const blocks: RootBlockElement[] = [
      {
        type: "heading",
        level: 2,
        children: [{ text: "Typographic replacements" }],
      },
      {
        type: "p",
        children: [{ text: "Enable typographer option to see result." }],
      },
      {
        type: "p",
        children: [{ text: "(c) (C) (r) (R) (tm) (TM) (p) (P) +-" }],
      },
      {
        type: "p",
        children: [
          {
            text: "test.. test... test..... test?..... test!....",
          },
        ],
      },
      {
        type: "p",
        children: [{ text: "!!!!!! ???? ,,  -- ---" }],
      },
      {
        type: "p",
        children: [
          {
            text: "\"Smartypants, double quotes\" and 'single quotes'",
          },
        ],
      },
    ]
    testParse(markdown, blocks)
  })

  it("should parse emphasis", async () => {
    const markdown = `## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~`
    const blocks: RootBlockElement[] = [
      {
        type: "heading",
        level: 2,
        children: [{ text: "Emphasis" }],
      },
      {
        type: "p",
        children: [{ text: "This is bold text", bold: true }],
      },
      {
        type: "p",
        children: [{ text: "This is bold text", bold: true }],
      },
      {
        type: "p",
        children: [{ text: "This is italic text", italic: true }],
      },
      {
        type: "p",
        children: [{ text: "This is italic text", italic: true }],
      },
      {
        type: "p",
        children: [{ text: "Strikethrough", del: true }],
      },
    ]
    testParse(markdown, blocks)
  })

  it("should handle nested blockquotes", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "heading",
        level: 2,
        children: [
          {
            text: "Blockquotes",
          },
        ],
      },
      {
        type: "blockquote",
        children: [
          {
            type: "p",
            children: [
              {
                text: "Blockquotes can also be nested...",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "p",
                children: [
                  {
                    text: "...by using additional greater-than signs right next to each other...",
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  {
                    type: "p",
                    children: [
                      {
                        text: "...or with spaces between arrows.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    const markdown = `## Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.`
    testParse(markdown, blocks)
  })

  /**
   * TODO:
   * Support numbered lists even though I don't know that they are a good idea
   */
  it("should parse ordered and unordered lists", async () => {
    const markdown = `## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar`
    const blocks: RootBlockElement[] = [
      {
        type: "heading",
        level: 2,
        children: [{ text: "Lists" }],
      },
      {
        type: "p",
        children: [{ text: "Unordered" }],
      },
      {
        type: "unordered-list-item",
        depth: 0,
        children: [
          { text: "Create a list by starting a line with " },
          { text: "+", code: true },
          { text: ", " },
          { text: "-", code: true },
          { text: ", or " },
          { text: "*", code: true },
        ],
      },
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "Sub-lists are made by indenting 2 spaces:" }],
      },
      {
        type: "unordered-list-item",
        depth: 1,
        children: [{ text: "Marker character change forces new list start:" }],
      },
      {
        type: "unordered-list-item",
        depth: 2,
        children: [{ text: "Ac tristique libero volutpat at" }],
      },
      {
        type: "unordered-list-item",
        depth: 2,
        children: [{ text: "Facilisis in pretium nisl aliquet" }],
      },
      {
        type: "unordered-list-item",
        depth: 2,
        children: [{ text: "Nulla volutpat aliquam velit" }],
      },
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "Very easy!" }],
      },
      {
        type: "p",
        children: [{ text: "Ordered" }],
      },
      {
        type: "ordered-list-item",
        depth: 0,
        number: 1,
        children: [{ text: "Lorem ipsum dolor sit amet" }],
      },
      {
        type: "ordered-list-item",
        depth: 0,
        number: 2,
        children: [{ text: "Consectetur adipiscing elit" }],
      },
      {
        type: "ordered-list-item",
        depth: 0,
        number: 3,
        children: [{ text: "Integer molestie lorem at massa" }],
      },
      {
        type: "ordered-list-item",
        depth: 0,
        number: 4,
        children: [{ text: "You can use sequential numbers..." }],
      },
      {
        type: "ordered-list-item",
        depth: 0,
        number: 5,
        children: [
          { text: "...or keep all the numbers as " },
          { text: "1.", code: true },
        ],
      },
      {
        type: "p",
        children: [{ text: "Start numbering with offset:" }],
      },
      {
        type: "ordered-list-item",
        depth: 0,
        number: 1,
        children: [{ text: "foo" }],
      },
      {
        type: "ordered-list-item",
        depth: 0,
        number: 2,
        children: [{ text: "bar" }],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  /**
   * TODO:
   * Keep the table headings separate instead of merging it into the body
   */
  it("should parse tables", async () => {
    const markdown = `## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |`
    const blocks: RootBlockElement[] = [
      {
        type: "heading",
        level: 2,
        children: [{ text: "Tables" }],
      },
      {
        type: "table",
        columns: [{ align: "left" }, { align: "left" }],
        children: [
          {
            type: "tr",
            children: [
              td(0, { text: "Option" }),
              td(1, { text: "Description" }),
              // { type: "td", index: 0, children: [{ text: "Option" }] },
              // { type: "td", index: 1, children: [{ text: "Description" }] },
            ],
          },
          {
            type: "tr",
            children: [
              td(0, { text: "data" }),
              td(1, {
                text: "path to data files to supply the data that will be passed into templates.",
              }),
              // { type: "td", index: 0, children: [{ text: "data" }] },
              // {
              //   type: "td",
              //   index: 1,
              //   children: [
              //     {
              //       text:
              //         "path to data files to supply the data that will be passed into templates.",
              //     },
              //   ],
              // },
            ],
          },
          {
            type: "tr",
            children: [
              td(0, { text: "engine" }),
              td(1, {
                text: "engine to be used for processing templates. Handlebars is the default.",
              }),
              // { type: "td", index: 0, children: [{ text: "engine" }] },
              // {
              //   type: "td",
              //   index: 1,
              //   children: [
              //     {
              //       text:
              //         "engine to be used for processing templates. Handlebars is the default.",
              //     },
              //   ],
              // },
            ],
          },
          {
            type: "tr",
            children: [
              td(0, { text: "ext" }),
              td(1, { text: "extension to be used for dest files." }),
              // { type: "td", index: 0, children: [{ text: "ext" }] },
              // {
              //   type: "td",
              //   index: 1,
              //   children: [{ text: "extension to be used for dest files." }],
              // },
            ],
          },
        ],
      },
      {
        type: "p",
        children: [{ text: "Right aligned columns" }],
      },
      {
        type: "table",
        columns: [{ align: "right" }, { align: "right" }],
        children: [
          {
            type: "tr",
            children: [
              td(0, "Option"),
              td(1, "Description"),
              // { type: "td", index: 0, children: [{ text: "Option" }] },
              // { type: "td", index: 1, children: [{ text: "Description" }] },
            ],
          },
          {
            type: "tr",
            children: [
              td(0, "data"),
              td(
                1,
                "path to data files to supply the data that will be passed into templates."
              ),
              // { type: "td", index: 0, children: [{ text: "data" }] },
              // {
              //   type: "td",
              //   index: 1,
              //   children: [
              //     {
              //       text:
              //         "path to data files to supply the data that will be passed into templates.",
              //     },
              //   ],
              // },
            ],
          },
          {
            type: "tr",
            children: [
              td(0, "engine"),
              td(
                1,
                "engine to be used for processing templates. Handlebars is the default."
              ),
              // { type: "td", index: 0, children: [{ text: "engine" }] },
              // {
              //   type: "td",
              //   index: 1,
              //   children: [
              //     {
              //       text:
              //         "engine to be used for processing templates. Handlebars is the default.",
              //     },
              //   ],
              // },
            ],
          },
          {
            type: "tr",
            children: [
              td(0, "ext"),
              td(1, "extension to be used for dest files."),
              // { type: "td", index: 0, children: [{ text: "ext" }] },
              // {
              //   type: "td",
              //   index: 1,
              //   children: [
              //     {
              //       text: "extension to be used for dest files.",
              //     },
              //   ],
              // },
            ],
          },
        ],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should parse links but not autoconvert them", async () => {
    const markdown = `## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)`
    const blocks: RootBlockElement[] = [
      { type: "heading", level: 2, children: [{ text: "Links" }] },
      {
        type: "p",
        children: [
          {
            type: "link",
            url: "http://dev.nodeca.com",
            children: [{ text: "link text" }],
          },
        ],
      },
      {
        type: "p",
        children: [
          {
            type: "link",
            url: "http://nodeca.github.io/pica/demo/",
            children: [{ text: "link with title" }],
          },
        ],
      },
      {
        type: "p",
        children: [
          {
            text: "Autoconverted link https://github.com/nodeca/pica (enable linkify to see)",
          },
        ],
      },
    ]
    testParse(markdown, blocks)
  })

  /**
   * TODO:
   * Minor issues, but the "\n" in a "p" should be removed.
   */
  it("should parse images", async () => {
    const markdown = `## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"`
    const blocks: RootBlockElement[] = [
      {
        type: "heading",
        level: 2,
        children: [{ text: "Images" }],
      },
      {
        type: "media",
        url: "https://octodex.github.com/images/minion.png",
        alt: "Minion",
        children: [{ text: "" }],
      },
      {
        type: "p",
        children: [{ text: "\n" }],
      },
      {
        type: "media",
        url: "https://octodex.github.com/images/stormtroopocat.jpg",
        alt: "Stormtroopocat",
        children: [{ text: "" }],
      },
      {
        type: "p",
        children: [
          {
            text: "Like links, Images also have a footnote style syntax",
          },
        ],
      },
      {
        type: "media",
        url: "https://octodex.github.com/images/dojocat.jpg",
        alt: "Alt text",
        children: [{ text: "" }],
      },
      {
        type: "p",
        children: [
          {
            text: "With a reference later in the document defining the URL location:",
          },
        ],
      },
    ]
    testParse(markdown, blocks)
  })
})
