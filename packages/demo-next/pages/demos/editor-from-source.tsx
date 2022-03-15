import { Wysimark, useEditor } from "~/editor"
import { createDemo, getServerSideProps } from "@/components/demo"

export { getServerSideProps }

export default createDemo({ Wysimark, useEditor })
