import * as s from "superstruct"
import { JsonObjectStruct } from "@thesunny/api2"

/**
 * Upload Props that are shared between `file` and `image`
 */
const SharedUploadProps = s.object({
  appName: s.string(),
  documentId: s.string(),
  context: s.optional(JsonObjectStruct),
  filename: s.string(),
  fileSize: s.number(),
  token: s.optional(s.string()),
})

/**
 * The Upload File Props
 */
const UploadFileProps = s.assign(
  s.object({
    type: s.literal("file"),
  }),
  SharedUploadProps
)

/**
 * The Upload Image Props
 */
const UploadImageProps = s.assign(
  s.object({
    type: s.literal("image"),
    imageWidth: s.number(),
    imageHeight: s.number(),
  }),
  SharedUploadProps
)

/**
 * The Props which combines upload file and image and includes the optional
 * `jwt` token.
 */
export const UploadProps = s.union([UploadFileProps, UploadImageProps])

/**
 * The Props which include the Upload props and the `jwt` token prop which is
 * optional.
 *
 * NOTE:
 *
 * We made sure the type name didn't conflict with `UploadProps` struct because
 * TypeScript seems to get confused in some scenarios and causes errors.
 *
 * Keeping them explicitly separate fixes the errors.
 */
export type UploadPropsType = s.Infer<typeof UploadProps>

/**
 * The `generateUploadResponse` method does not return the `error` state but
 * our actual implementation at the API will return them.
 *
 * That's why we've added the `{ status: "error"; message: string }` type
 * here.
 */
export type UploadResponseType =
  | {
      status: "success"
      data: {
        formFields: Record<string, string>
        apiUrl: string
        fileUrl: string
      }
    }
  | { status: "error"; message: string }
