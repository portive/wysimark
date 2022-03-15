import { UploadOptions } from "~/editor/types"
import { Options } from "./types"

export const UPLOAD_OPTIONS: Options<UploadOptions | undefined> = [
  {
    id: "local-demo",
    caption: ":3001 Demo",
    value: {
      type: "demo",
      url: "http://localhost:3001/api/v1/upload/demo",
    },
  },
  {
    id: "local-demo-fail",
    caption: ":3001 Demo (fail)",
    value: {
      type: "demo",
      url: "http://localhost:3001/api/v1/upload/demo",
      extraneous: "EXTRANEOUS PROPERTY",
    } as any, // We use `any` to allow TypeScript to accept the extraneous property
  },
  // {
  //   id: "local-hosted",
  //   caption: ":3001 Browser Secret",
  //   value: {
  //     type: "secret",
  //     url: "http://localhost:3001/api/v1/upload/secret",
  //     appName: "local",
  //     path: "examples",
  //     apiKeyId: env.NEXT_PUBLIC_LOCAL_API_KEY_ID,
  //     apiSecretKey: env.NEXT_PUBLIC_LOCAL_API_SECRET_KEY,
  //   },
  // },
  // {
  //   id: "local-custom",
  //   caption: "Server Secret",
  //   value: {
  //     type: "custom",
  //     url: "/api/example/example-upload-secret",
  //     data: {
  //       token: "secret",
  //     },
  //   },
  // },
  // {
  //   id: "local-custom-fails",
  //   caption: "Server Secret (fail)",
  //   value: {
  //     type: "custom",
  //     url: "/api/example/example-upload-secret",
  //     data: {
  //       token: "not-the-right-token",
  //     },
  //   },
  // },
  // {
  //   id: "local-custom-jwt",
  //   caption: "Server JWT",
  //   value: {
  //     type: "custom",
  //     url: "/api/example/example-upload-jwt",
  //     data: {
  //       token: "secret",
  //     },
  //   },
  // },
  // {
  //   id: "local-custom-jwt-fails",
  //   caption: "Server JWT (fail)",
  //   value: {
  //     type: "custom",
  //     url: "/api/example/example-upload-jwt",
  //     data: {
  //       token: "not-the-right-token",
  //     },
  //   },
  // },
  {
    id: "hosted-default",
    caption: "Hosted: Browser Default",
    value: undefined,
  },
]
