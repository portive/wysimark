import { useCallback, useEffect } from "react"
import { OnChange, createWysimark } from "~/editor/standalone"
import styled from "@emotion/styled"

export default function Page() {
  /**
   * Callback for when there is a change in the Wysimark component
   */
  const onChange = useCallback<OnChange>((event) => {
    const textarea = document.getElementById(
      "textarea-change"
    ) as HTMLTextAreaElement
    const markdown = event.getMarkdown()
    console.log("onChange", markdown)
    textarea.value = markdown
  }, [])

  /**
   * Callback for when there is a change in the Wysimark component
   */
  const onUpdate = useCallback<OnChange>((event) => {
    const textarea = document.getElementById(
      "textarea-update"
    ) as HTMLTextAreaElement
    const markdown = event.getMarkdown()
    console.log("onUpdate", markdown)
    textarea.value = markdown
  }, [])

  /**
   * Callback for when there is a change in the Wysimark component
   */
  const onBlur = useCallback<OnChange>((event) => {
    const textarea = document.getElementById(
      "textarea-blur"
    ) as HTMLTextAreaElement
    const markdown = event.getMarkdown()
    console.log("onBlur", markdown)
    textarea.value = markdown
  }, [])

  /**
   * This simulates a "not react" implementation.
   *
   * So we let the React code generate an empty `#wysimark` div. Then after
   * the rendering happens (i.e. when function in `useEffect` gets called),
   * we create Wysimark inside the `#wysimark` div.
   */
  useEffect(() => {
    const element = document.getElementById("wysimark")
    if (element === null) {
      throw new Error(`Expected element to be defined`)
    }
    const wysimark = createWysimark(element, {
      initialMarkdown: "Hello world",
      onChange,
      onUpdate,
      onBlur,
    })

    /**
     * Before the React div gets removed, we first want to destroy the
     * Editor instance by calling `wysimark.unmount`.
     */
    return function unmount() {
      wysimark.unmount()
    }
  }, [onChange])

  return (
    <div style={{ width: 640, margin: "1em auto" }}>
      <div id="wysimark" />
      <$Textarea id="textarea-change" />
      <$Textarea id="textarea-update" />
      <$Textarea id="textarea-blur" />
    </div>
  )
}

const $Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 160px;
  margin: 1em 0;
`
