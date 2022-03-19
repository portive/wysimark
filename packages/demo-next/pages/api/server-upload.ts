import * as JWT from "jsonwebtoken"
import type { NextApiRequest, NextApiResponse } from "next"
import { getStaticEnv } from "@thesunny/get-env"
import { UploadFileInfo } from "@wysimark/resource"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqJson = req.body

  const env = getStaticEnv({
    SERVER_APP_NAME: process.env.SERVER_APP_NAME,
    SERVER_KEY_ID: process.env.SERVER_KEY_ID,
    SERVER_SECRET_KEY: process.env.SERVER_SECRET_KEY,
  })

  /**
   * This method generates a `jwt` token using the `apiSecretKey` which is
   * never transmitted thus keeping it safe.
   */
  const resJson = await getUploadCredentials({
    file: reqJson.file as UploadFileInfo,
    appName: env.SERVER_APP_NAME,
    path: "a/b/c",
    apiKeyId: env.SERVER_KEY_ID,
    apiSecretKey: env.SERVER_KEY_ID,
  })
  res.status(200).json(resJson)
}

async function getUploadCredentials({
  file,
  appName,
  path,
  apiKeyId,
  apiSecretKey,
}: {
  file: UploadFileInfo
  appName: string
  path: string
  apiKeyId: string
  apiSecretKey: string
}) {
  const payload: ServerUploadPayload = {
    type: "server",
    file,
    appName,
    path,
    apiKeyId,
    iat: Date.now(),
  }
  const jwt = JWT.sign(payload, apiSecretKey)
  const response = await fetch("http://localhost:3001/api/v1/upload/server", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "server",
      jwt,
    }),
  })
  const resJson = await response.json()
  return resJson
}

export type ServerUploadPayload = {
  type: "server"
  file: UploadFileInfo
  appName: string
  path: string
  apiKeyId: string
  limit?: {
    path: string
    bytes: number
  }
  iat: number
}
