import { UploadPropsType, UploadResponseType } from "./types"

import { generateUploadPolicy } from "./generate-aws-upload-policy"
import { getServerEnv } from "~/lib/get-env"
import { nanoid } from "nanoid"

export const env = getServerEnv({
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  CDN_DOMAIN: process.env.CDN_DOMAIN,
})

/**
 * Generates a key using the passed in props
 */
function generateKey(props: UploadPropsType) {
  const fileParts = props.filename.split(".")
  const fileExt = fileParts[fileParts.length - 1]
  if (props.type === "file") {
    return `${props.appName}/f/${props.documentId}/${nanoid()}.${fileExt}`
  } else {
    return `${props.appName}/i/${props.documentId}/${nanoid()}--${
      props.imageWidth
    }x${props.imageHeight}.${fileExt}`
  }
}

/**
 * Takes the `Props` object and generates a proper response which
 * includes the `formFields`, upload `apiUrl` and the final `fileUrl` after
 * the file is uploaded.
 */
export async function generateUploadResponse(
  uploadProps: UploadPropsType
): Promise<UploadResponseType> {
  const key = generateKey(uploadProps)

  const EXPIRES_IN_SECONDS = 60 * 30 // 30 minutes

  const { formFields, amazonApiUrl } = await generateUploadPolicy({
    s3region: env.S3_REGION,
    s3bucket: env.S3_BUCKET,
    awsAccessKeyId: env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    expiresInSeconds: EXPIRES_IN_SECONDS,
    key,
    fileSize: uploadProps.fileSize,
  })
  const url = `https://${env.CDN_DOMAIN}/${key}`

  return {
    status: "success",
    data: { formFields, apiUrl: amazonApiUrl, fileUrl: url },
  }
}
