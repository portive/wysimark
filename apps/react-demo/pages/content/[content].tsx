// import content from "../../content/basic.md"
import fs, { readdirSync } from "fs"
import { GetServerSideProps, NextPage } from "next"
import path, { basename } from "path"
import { ChangeEvent, useCallback, useState } from "react"
import { promisify } from "util"

import { Editable, useEditor } from "../../../../packages/react/src/entry"
import { $Textarea } from "../../components/styles"
const readFile = promisify(fs.readFile)

interface PageProps {
  baseNames: string[]
  initialMarkdown: string
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const filename = (context?.params?.content || "basic") as string
  try {
    const baseNames = (await readdirSync(path.join(process.cwd(), "content")))
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => basename(filename, ".md"))
    const initialMarkdown = await readFile(
      path.join(process.cwd(), "content", `${filename}.md`),
      "utf-8"
    )
    console.log(baseNames)
    return {
      props: {
        baseNames,
        initialMarkdown,
      },
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}

const Page: NextPage<PageProps> = ({ baseNames, initialMarkdown }) => {
  const [markdown, setMarkdown] = useState(initialMarkdown)

  const editor = useEditor({
    authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
    minHeight: 240,
    maxHeight: 720,
  })

  const getMarkdown = useCallback(() => {
    console.log(editor.getMarkdown())
  }, [editor])

  const onChangeTextarea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const markdown = e.target.value
      setMarkdown(markdown)
      editor.setMarkdown(markdown)
    },
    [editor]
  )

  const resetMarkdown = useCallback(() => {
    setMarkdown(`# This is a reset with the reset button
    
And this is a paragraph
fdsfs`)
  }, [editor])

  return (
    <div style={{ margin: "2em" }}>
      <link rel="stylesheet" href="https://unpkg.com/chota@latest" />
      <div className="tabs">
        <a className="active" href="/">
          React Src
        </a>
        <a href="/dist">Dist</a>
        <a href="http://localhost:3733/">Standalone Dist</a>
        <a href="http://localhost:3734/">Vue Src</a>
        <a href="http://localhost:3734/dist">Vue Dist</a>
      </div>
      <h1>Wysimark React Demo</h1>
      <p>
        <button className="button primary" onClick={getMarkdown}>
          Get Markdown
        </button>
        <button className="button" onClick={resetMarkdown}>
          Set Markdown
        </button>
      </p>
      <div className="row" style={{ marginTop: "1em" }}>
        <div className="col-2">
          {baseNames.map((baseName) => (
            <div key={baseName}>
              <a href={`/content/${baseName}`}>{baseName}</a>
            </div>
          ))}
        </div>
        <div className="col-5">
          <Editable
            editor={editor}
            value={markdown}
            onChange={(markdown) => {
              setMarkdown(markdown)
            }}
            placeholder="Enter text here..."
          />
        </div>
        <div className="col-5">
          <$Textarea value={markdown} onChange={onChangeTextarea} />
        </div>
      </div>
    </div>
  )
}

export default Page
