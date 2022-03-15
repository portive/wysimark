import { Wysimark, useEditor } from "~/editor"

export default function DemosEvents() {
  const editor = useEditor({
    initialMarkdown: "# Heading",
  })

  return <Wysimark editor={editor} />
}
