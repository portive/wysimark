import styled from "@emotion/styled"
import fs from "fs"
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import nodePath from "path"
import { useRef, useState } from "react"

import { Editable, useEditor } from "~/src/entry"

type Props = {
  markdown: string
  baseName: string
  baseNames: string[]
  width: number
  height: number
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { query } = context
  const contentDir = nodePath.join(process.cwd(), "content")
  const baseNames = await fs
    .readdirSync(contentDir)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => nodePath.basename(filename, ".md"))

  const baseName = typeof query.content === "string" ? query.content : "index"
  const width =
    typeof query.width === "string" ? parseInt(query.width) || 540 : 540
  const height = typeof query.height === "string" ? parseInt(query.height) : 500

  let markdown: string

  try {
    markdown = await fs.readFileSync(
      nodePath.join(contentDir, `${baseName}.md`),
      "utf-8"
    )
  } catch (e) {
    return { notFound: true }
  }
  return {
    props: { baseName, baseNames, markdown, width, height },
  }
}

const $Container = styled.div`
  display: flex;
  margin: 2em auto;
  gap: 2em;
  width: 720px;
  font-family: sans-serif;
  line-height: 1.5;
  li {
    list-style-type: none;
  }
  a {
    color: blue;
    text-decoration: none;
  }
`
const $Nav = styled.nav`
  flex: 1 1 auto;
  h3 {
    font: 0.925em sans-serif;
    color: #808080;
  }
  ul {
    /* margin-top: 0; */
    /* margin: 0; */
    padding: 0;
  }
`

const $Main = styled.main`
  width: 540px;
  flex: 0 0 auto;
`

const $Pre = styled.textarea`
  margin-top: 4em;
  border: 1px solid silver;
  padding: 1em;
  width: 100%;
  height: 480px;
  font-family: sans-serif;
  line-height: 1.5;
`

const $Link = styled(Link)`
  &.--active {
    color: orange;
  }
`

/**
 * Sample to replicate issue:
 *
 * https://github.com/portive/wysimark/issues/36
 */

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const prevMarkdownRef = useRef<string>(props.markdown)

  const [markdown, setMarkdown] = useState(props.markdown)

  /**
   * We need to call `setMarkdown` when `props.markdown` changes
   */
  if (prevMarkdownRef.current === null) {
    prevMarkdownRef.current = props.markdown
  } else if (prevMarkdownRef.current !== props.markdown) {
    setMarkdown(props.markdown)
    prevMarkdownRef.current = props.markdown
  }

  const router = useRouter()

  const editor = useEditor({
    authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
    height: props.height > 0 ? props.height : undefined,
  })

  return (
    <$Container>
      <$Nav>
        <h3>Markdown</h3>
        <ul>
          {props.baseNames.map((baseName) => (
            <li key={baseName}>
              <$Link
                href={{
                  pathname: "/samples/readme",
                  query: { ...router.query, content: baseName },
                }}
                className={baseName === props.baseName ? "--active" : undefined}
              >
                {baseName}
              </$Link>
            </li>
          ))}
        </ul>
        <h3>Width</h3>
        <ul>
          {[720, 540, 480, 360].map((width) => (
            <li key={width}>
              <$Link
                href={{
                  pathname: "/samples/readme",
                  query: { ...router.query, width },
                }}
                className={width === props.width ? "--active" : undefined}
              >
                {width}
              </$Link>
            </li>
          ))}
        </ul>
        <h3>Height</h3>
        <ul>
          {[500, 480, 360, 0].map((height) => (
            <li key={height}>
              <$Link
                href={{
                  pathname: "/samples/readme",
                  query: { ...router.query, height },
                }}
                className={height === props.height ? "--active" : undefined}
              >
                {height}
              </$Link>
            </li>
          ))}
        </ul>
      </$Nav>

      <$Main style={{ width: props.width }}>
        <Editable
          editor={editor}
          value={markdown}
          onChange={setMarkdown}
          placeholder="Enter text here..."
        />
        <$Pre
          value={markdown}
          onChange={(e) => {
            setMarkdown(e.currentTarget.value)
          }}
        />
      </$Main>
    </$Container>
  )
}
