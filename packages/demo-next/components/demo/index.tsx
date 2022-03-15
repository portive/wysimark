import cx from "classnames"
import isMatch from "lodash/isMatch"
import { GetServerSideProps } from "next"
import Link from "next/link"
import React, { useCallback, useContext, useEffect, useState } from "react"
import * as s from "superstruct"
import type {
  Wysimark as __Wysimark__,
  useEditor as __useEditor__,
} from "~/editor"
import { Layout } from "@/components/layout"
import { examples } from "@/examples"
import { EXAMPLE_OPTIONS } from "@/examples"
import styled from "@emotion/styled"
import { OnChange, UploadOptions } from "../../editor/types"
import { MAX_HEIGHT_OPTIONS } from "./max-height-options"
import { Options } from "./types"
import { UPLOAD_OPTIONS } from "./upload-options"

/**
 * Buttons
 */

const $Buttons = styled.div`
  margin: 1em 0;
`

/**
 * Textarea to show plain markdown at bottom of page
 */

const $Textarea = styled.textarea`
  display: block;
  color: #404040;
  width: 90%;
  height: 240px;
`

/**
 * Styled Flex Layout
 */

const $LayoutFlex = styled.div`
  display: flex;
  margin: 0 auto;
`
const $LayoutFlexLeft = styled.div`
  flex: 0 0 40%;
  float: left;
`
const $LayoutFlexRight = styled.div`
  flex: 0 0 60%;
  float: left;
  /**
   * This fakes a CSS selector in a web app that specifically target an
   * element like h1, h2 or h3.
   *
   * We add this here to make sure that Wysimark overrides (resets) these
   * colors with a stronger selector.
   */
  h1,
  h2,
  h3,
  p,
  li {
    color: red;
  }
`

const $QueryLinks = styled.div`
  margin-bottom: 0.5em;
`

const $QueryLink = styled.a`
  cursor: pointer;
  display: inline-block;
  color: rgba(255, 255, 255, 0.75);
  padding: 8px 12px;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  filter: saturate(50%);
  opacity: 0.5;
  &.--active {
    color: white;
    filter: saturate(100%);
    opacity: 1;
  }
  &:hover {
    color: white;
    filter: saturate(75%);
    opacity: 0.75;
  }
  .--example-links & {
    background: orange;
  }
  .--height-links & {
    background: #0066cc;
  }
  .--api-links & {
    background: #800080;
  }
`

/**
 * Define query schema using SuperStruct.
 *
 * We need to validate the data because the browser query is an unreliable
 * source.
 *
 * <https://docs.superstructjs.org/api-reference/types>
 */

const QueryStruct = s.object({
  example: s.defaulted(s.string(), "mixed"),
  height: s.defaulted(s.string(), "none"),
  api: s.defaulted(s.string(), "local-demo"),
})

type Query = s.Infer<typeof QueryStruct>
type ApiEnum = Query["api"]

/**
 * Content Link Styles
 */

const defaultQuery = s.create({}, QueryStruct)
const QueryContext = React.createContext(defaultQuery)

/**
 * Takes the name of an example and returns its markdown
 */

function getInitialMarkdown(name: string): string {
  for (const example of examples) {
    if (example.name === name) return example.markdown
  }
  throw new Error("Example not found")
}

function getUploadOptions(api: ApiEnum): UploadOptions | undefined {
  const option = UPLOAD_OPTIONS.find((option) => option.id === api)
  if (option == null) {
    throw new Error(`Could not find option with id ${api}`)
  }
  return option.value
}

export const getServerSideProps: GetServerSideProps =
  async function getServerSideProps(context) {
    // console.log(context.query)
    const query = s.create(context.query, QueryStruct)
    return { props: { query } }
  }

/**
 * Default Export LocalComponentDemo
 */

/**
 * WORKING ON THIS:
 *
 * Right now, on initial load, no matter what example we are looking at, we
 * see the 'mixed' example. This is because Next.js always starts with an
 * empty query object `{}` on first load as part of its automatic static
 * optimization.
 *
 * https://stackoverflow.com/questions/66909552/userouter-query-object-is-empty
 *
 * https://nextjs.org/docs/advanced-features/automatic-static-optimization
 *
 * Even if this is not the case, we also have to deal with the issue of clicking
 * to another query and updating the markdown.
 *
 * A few possible approaches to this are:
 *
 * 1. Pass a `deps` second argument to `useEditor` like in `useMemo` but we
 *    handle is using `useRef` manually.
 *
 * 2. Use a `key` on Wysimark to force it to re-render based on the example
 *    which we are currently doing; however, make sure it continues to work.
 *
 */

export function createDemo({
  useEditor,
  Wysimark,
}: {
  useEditor: typeof __useEditor__
  Wysimark: typeof __Wysimark__
}) {
  return function Demo({ query }: { query: Query }) {
    // const router = useRouter()
    // const query = s.create(router.query, QueryStruct)
    // console.log(router.query, query)
    const exampleName = query.example

    const uploadOptions = getUploadOptions(query.api)

    const initialMarkdown = getInitialMarkdown(exampleName)

    const editor = useEditor(
      {
        initialMarkdown,
        upload: uploadOptions,
      },
      [exampleName]
    )

    /**
     * Note that this is not related to implementation of Wysimark. This is the
     * state for displaying the markdown in the textarea.
     *
     * We use the `onChange` event to update this. See the `onChange` callback
     * defined below.
     */
    const [changeMarkdown, setChangeMarkdown] = useState(() => {
      return editor.getMarkdown()
    })
    const [updateMarkdown, setUpdateMarkdown] = useState(() => "")
    const [blurMarkdown, setBlurMarkdown] = useState(() => "")

    /**
     * A helpful debugging tool that lets us know when the `editor` object
     * reference has changed. Useful to know if we're accidentally returning
     * new Editor objects too often.
     */
    useEffect(() => {
      // console.log("new editor")
    }, [editor])

    /**
     * Update `exampleName` and `markdown` at same time using state so that
     * Wysimark `key` change and `initialMarkdown` change are synchronized.
     *
     * If we use `query.example` as the `key`, the `key` changes before the
     * `markdown` changes and we get the wrong `markdown`.
     */
    useEffect(() => {
      setChangeMarkdown(editor.getMarkdown())
    }, [editor])

    /**
     * callback for logging markdown
     */
    const onLog = useCallback(() => {
      console.log(editor.getMarkdown())
    }, [editor])

    /**
     * callback for setting changed markdown
     */
    const onChange: OnChange = useCallback(
      (e) => {
        setChangeMarkdown(e.getMarkdown())
      },
      [editor]
    )

    const onUpdate: OnChange = useCallback(
      (e) => {
        setUpdateMarkdown(e.getMarkdown())
      },
      [editor]
    )

    const onBlur: OnChange = useCallback(
      (e) => {
        setBlurMarkdown(e.getMarkdown())
      },
      [editor]
    )

    return (
      <Layout>
        <$LayoutFlex>
          <$LayoutFlexLeft>
            <QueryContext.Provider value={query}>
              <QueryLinks
                options={EXAMPLE_OPTIONS}
                className="--example-links"
                idField="example"
              />
              <QueryLinks
                options={MAX_HEIGHT_OPTIONS}
                className="--height-links"
                idField="height"
              />
              <QueryLinks
                options={UPLOAD_OPTIONS}
                className="--api-links"
                idField="api"
              />
            </QueryContext.Provider>
            <div>onChange</div>
            <$Textarea value={changeMarkdown} readOnly />
            <div>onUpdate</div>
            <$Textarea value={updateMarkdown} readOnly />
            <div>onBlur</div>
            <$Textarea value={blurMarkdown} readOnly />
          </$LayoutFlexLeft>
          <$LayoutFlexRight>
            {/**
             * Set key to `exampleName` so editor reloads and `initialMarkdown`
             * resets document when example changes
             **/}
            <Wysimark
              key={exampleName}
              editor={editor}
              showInitial={false}
              maxHeight={query.height === "set" ? 320 : undefined}
              onChange={onChange}
              onUpdate={onUpdate}
              onBlur={onBlur}
            />
            <$Buttons>
              <button onClick={onLog}>Log Current Markdown</button>
            </$Buttons>
          </$LayoutFlexRight>
        </$LayoutFlex>
      </Layout>
    )
  }

  function QueryLinks<T>({
    className,
    options,
    idField,
  }: {
    className: string
    options: Options<T>
    idField: string
  }) {
    return (
      <$QueryLinks className={className}>
        {options.map(({ id, caption }) => (
          <QueryLink key={id} query={{ [idField]: id }}>
            {caption}
          </QueryLink>
        ))}
      </$QueryLinks>
    )
  }

  function QueryLink({
    query: partialQuery,
    children,
  }: {
    query: Partial<Query>
    children: React.ReactNode
  }) {
    const queryFromContext = useContext(QueryContext)
    const query = { ...queryFromContext, ...partialQuery }
    const className = cx({
      "--active": isMatch(queryFromContext, partialQuery),
    })
    return (
      <Link href={{ query }}>
        <$QueryLink className={className}>{children}</$QueryLink>
      </Link>
    )
  }
}
