import JWT from "jsonwebtoken"
import { JWTUploadPayload, JWTUploadProps, UploadFileInfo } from "./types"

export async function generateUploadCredentials({
  file,
  appName,
  path,
  apiKeyId,
  apiSecretKey,
  origin: origin = "https://app.wysimark.com",
}: {
  file: UploadFileInfo
  appName: string
  path: string
  apiKeyId: string
  apiSecretKey: string
  origin?: string
}) {
  const payload: JWTUploadPayload = {
    type: "jwt",
    file,
    appName,
    path,
    apiKeyId,
    iat: Date.now(),
  }
  const jwt = JWT.sign(payload, apiSecretKey)

  const props: JWTUploadProps = { type: "jwt", jwt }

  const url = `${origin}/api/v1/upload/jwt`
  console.log(`fetch: ${JSON.stringify(url)}`)

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props),
  })
  const resJson = await response.json()
  return resJson
}

export function generateUploadFailure({ message }: { message: string }) {
  return { status: "error", message }
}
