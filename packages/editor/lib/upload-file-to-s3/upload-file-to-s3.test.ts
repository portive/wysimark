// import { generatePolicy } from "./server"
// import dotenv from "dotenv"
import mime from "mime-types"
// import { generateUploadFileToS3Response } from "./server"

// load the dotenv development configuration for this test
// dotenv.config({ path: "env/development.env" })

// need to `require` this so that it happens after the dotenv load
// const { generatePolicy } = require("./server")

describe("server response", () => {
  it.skip("should get data from server", async () => {
    // const policy = await generatePolicy({
    //   contentType: "image/jpeg",
    //   fileSize: 1024,
    //   contentTypeExtMap: { "image/jpeg": "jpg" },
    //   maxUploadSize: 10 * 1024 * 1024,
    // })
    // expect(policy).toMatchObject({
    //   formFields: {
    //     acl: "public-read",
    //     key: expect.stringMatching(/[.]jpg$/),
    //     bucket: "next-api",
    //     "X-Amz-Algorithm": expect.any(String),
    //     "X-Amz-Credential": expect.any(String),
    //     "X-Amz-Date": expect.any(String),
    //     Policy: expect.any(String),
    //     "X-Amz-Signature": expect.any(String),
    //   },
    //   amazonApiUrl: "https://s3.us-west-1.amazonaws.com/next-api",
    //   uploadedFileUrl: expect.stringMatching(/[.]jpg$/),
    // })
  })
})

describe("mime types", () => {
  it("should find image mime extensions", () => {
    const jpegExt = mime.extension("image/jpeg")
    expect(jpegExt).toEqual("jpeg")
    // const jpgExt = mime.extension("image/jpg")
    // console.log({ jpgExt })
    // expect(jpgExt).toEqual("jpg")
    const pngExt = mime.extension("image/png")
    expect(pngExt).toEqual("png")
  })
})
