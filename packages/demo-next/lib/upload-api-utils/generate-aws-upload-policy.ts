import S3 from "aws-sdk/clients/s3"
import { Credentials } from "aws-sdk/lib/core"

/**
 *
 */
type FormFields = {
  [x: string]: string
  Policy: string
  "X-Amz-Signature": string
}

/**
 * Policy Type
 */
export type Policy = {
  amazonApiUrl: string
  // uploadedFileUrl: string
  formFields: FormFields
}

/**
 * We run this on the server and it returns an object that we call a policy.
 *
 * The policy includes everything we need to pass to the upload Client in order
 * to upload the file to Amazon S3.
 *
 * How and when the policy gets generated is up to you as long as it gets to
 * the browser at some point.
 *
 * There are only two caveats:
 *
 * 1. Make sure you don't actually generate the policy on the browser with the
 *    secret access key in plain site.
 *
 * 2. The policy should be generated at some point not too far away from when
 *    the upload gets started because of the `expiresInSeconds` timeout.
 */
export async function generateUploadPolicy({
  awsAccessKeyId,
  awsSecretAccessKey,
  s3region,
  s3bucket,
  expiresInSeconds,
  fileSize,
  key,
}: // domain,
{
  awsAccessKeyId: string
  awsSecretAccessKey: string
  s3region: string // e.g. `us-west-1`
  s3bucket: string // e.g. `next-api`
  expiresInSeconds: number
  key: string
  fileSize: number
}): Promise<Policy> {
  const credentials = new Credentials({
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  })
  const s3 = new S3({ region: s3region, credentials })
  // <https://stackoverflow.com/questions/44888301/upload-file-to-s3-with-post>
  // <https://medium.com/@ashan.fernando/upload-files-to-aws-s3-using-signed-urls-fa0a0cf489db>
  //
  // TODO:
  // Try to get acceleration endpoint working for 200% faster uploads
  // <https://softwareontheroad.com/aws-s3-secure-direct-upload/>
  const params = {
    Expires: expiresInSeconds,
    Bucket: s3bucket,
    Conditions: [
      ["content-length-range", 0, fileSize],
      ["starts-with", "$Content-Type", "image/"],
    ],
    Fields: {
      acl: "public-read",
      key,
    },
  }

  const { url, fields } = await s3.createPresignedPost(params)

  return { formFields: fields, amazonApiUrl: url }
}
