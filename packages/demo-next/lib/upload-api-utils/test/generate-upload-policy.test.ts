import { nanoid } from "nanoid"
import { getServerEnv } from "~/lib/get-env"
import { generateUploadPolicy } from "../generate-aws-upload-policy"

const env = getServerEnv({
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
})

describe("generateUploadPolicy", () => {
  it("should generate an upload policy", async () => {
    const key = `test/${nanoid()}`
    const policy = await generateUploadPolicy({
      awsAccessKeyId: env.AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      s3region: env.S3_REGION,
      s3bucket: env.S3_BUCKET,
      expiresInSeconds: 60,
      fileSize: 1,
      key,
    })
    expect(policy).toEqual({
      amazonApiUrl: expect.any(String),
      formFields: expect.objectContaining({
        acl: expect.any(String),
        key: expect.any(String),
        bucket: expect.any(String),
        "X-Amz-Algorithm": expect.any(String),
        "X-Amz-Credential": expect.any(String),
        "X-Amz-Date": expect.any(String),
        Policy: expect.any(String),
        "X-Amz-Signature": expect.any(String),
      }),
    })
  })
})
