import { createDemo, getServerSideProps } from "@/components/demo"
import { Wysimark, useEditor } from "@wysimark/react"

export { getServerSideProps }

export default createDemo({ Wysimark, useEditor })
