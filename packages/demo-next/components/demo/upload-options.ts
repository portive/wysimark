/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UploadOptions } from "~/editor/types"
import { Options } from "./types"

export const UPLOAD_OPTIONS: Options<UploadOptions | undefined> = [
  {
    id: "local-demo",
    caption: "localhost:3001 Demo",
    value: {
      type: "demo",
      url: "http://localhost:3001/api/v1/upload/demo",
    },
  },
  {
    id: "local-demo-fail",
    caption: "localhost:3001 Demo (fail)",
    value: {
      // @ts-ignore
      type: "demo",
      url: "http://localhost:3001/api/v1/upload/demo",
      extraneous: "EXTRANEOUS PROPERTY",
    },
  },
  {
    id: "local-browser",
    caption: "localhost:3001 Browser",
    value: {
      type: "browser",
      url: process.env.NEXT_PUBLIC_BROWSER_URL as any,
      appName: process.env.NEXT_PUBLIC_BROWSER_APP_NAME as any,
      path: "a/b/c",
      // TODO: Make local browser demo only available if keys have been defined
      apiKeyId: process.env.NEXT_PUBLIC_BROWSER_KEY_ID as any,
      apiPublicKey: process.env.NEXT_PUBLIC_BROWSER_PUBLIC_KEY as any,
    },
  },
  {
    id: "local-server",
    caption: "localhost:3001 Server",
    value: {
      type: "custom",
      url: "/api/custom-upload",
      data: {
        username: "johndoe",
        password: "password",
      },
    },
  },
  {
    id: "local-server-fail",
    caption: "localhost:3001 Server Fail",
    value: {
      type: "custom",
      url: "/api/custom-upload",
      data: {
        username: "haxor",
        secret: "whatsthesecretagain?",
      },
    },
  },
  {
    id: "hosted-default",
    caption: "Hosted: Browser Default",
    value: undefined,
  },
  {
    id: "disabled",
    caption: "Disabled uploads",
    value: {
      type: "disabled",
    },
  },
]
