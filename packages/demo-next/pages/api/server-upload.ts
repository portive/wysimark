import type { NextApiRequest, NextApiResponse } from "next"
import {
  generateUploadCredentials,
  generateUploadFailure,
} from "~upload-api/src"
import { getStaticEnv } from "@thesunny/get-env"
import { UploadFileInfo } from "@wysimark/resource"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqJson = req.body

  /**
   * Show request json in console so it's easier to see what's happening in the
   * terminal.
   */
  console.log("request json", reqJson)

  /**
   * For this demo integration, we check if the username is `johndoe` and the
   * password is `password`. If not, we return a message to the editor user
   * saying they are not authorized.
   *
   * We use `generateUploadFailure` to create the response but
   */
  if (
    reqJson.data.username !== "johndoe" ||
    reqJson.data.password !== "password"
  ) {
    const failureJson = generateUploadFailure({
      message: `The user ${JSON.stringify(
        reqJson.data.username
      )} is not authorized to upload`,
    })
    res.status(200).json(failureJson)
    return
  }

  if (
    process.env.SERVER_APP_NAME == null ||
    process.env.SERVER_KEY_ID == null ||
    process.env.SERVER_SECRET_KEY
  ) {
    const failureJson = generateUploadFailure({
      message: `To test the custom server upload, please add SERVER_APP_NAME, SERVER_KEY_ID and SERVER_SECRET_KEY to the dotenv file ".env/dev.env"`,
    })
    res.status(200).json(failureJson)
    return
  }

  /**
   * Grab the environment variables at runtime because some users may not
   * have defined them yet in `.env/dev.env`.
   */
  const env = getStaticEnv({
    SERVER_APP_NAME: process.env.SERVER_APP_NAME,
    SERVER_KEY_ID: process.env.SERVER_KEY_ID,
    SERVER_SECRET_KEY: process.env.SERVER_SECRET_KEY,
  })

  /**
   * This method generates a `jwt` token using the `apiSecretKey` which is
   * never transmitted thus keeping it safe.
   */
  const resJson = await generateUploadCredentials({
    origin: "http://localhost:3001",
    file: reqJson.file as UploadFileInfo,
    appName: env.SERVER_APP_NAME,
    path: "a/b/c",
    apiKeyId: env.SERVER_KEY_ID,
    apiSecretKey: env.SERVER_SECRET_KEY,
  })

  /**
   * Show response json in console so it's easier to see what's happening in
   * the terminal.
   */
  console.log("response json", resJson)

  res.status(200).json(resJson)
}
