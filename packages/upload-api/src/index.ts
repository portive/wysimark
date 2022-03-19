import JWT from "jsonwebtoken"
import { ServerUploadPayload, ServerUploadProps, UploadFileInfo } from "./types"

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
  const payload: ServerUploadPayload = {
    type: "server",
    file,
    appName,
    path,
    apiKeyId,
    iat: Date.now(),
  }
  const jwt = JWT.sign(payload, apiSecretKey)

  const props: ServerUploadProps = { type: "server", jwt }

  const url = `${origin}/api/v1/upload/server`

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
