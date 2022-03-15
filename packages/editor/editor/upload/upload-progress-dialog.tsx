import * as Custom from "../custom"

import {
  DemoAPIUploadProps,
  UploadFileInfo,
  UploadResponse,
} from "@wysimark/resource"
import React, { useCallback, useEffect } from "react"
import axios, { AxiosResponse } from "axios"

import { Dialog } from "~/lib/modals/dialog"
import { Editor } from "slate"
import { Form } from "~/lib/form"
import { Position } from "~/lib/modals/container"
import { UploadState } from "./types"
import { assertUnreachable } from "~/lib/assert-unreachable"
import { getImageSizeFromFile } from "~/lib/get-image-size-from-file"
import omit from "lodash/omit"
import prettyBytes from "pretty-bytes"
import styled from "@emotion/styled"
import { uploadFile } from "~/lib/upload-file-to-s3/client"
import { useInModal } from "~/lib/modal"
import { useStateRef } from "~/lib/use-state-ref"

/**
 * Returns true of there are one or more errors in the upload states
 */
function checkHasUploadErrors(uploads: Map<File, UploadState>) {
  return Array.from(uploads.values()).some((upload) => {
    return upload.status === "error"
  })
}

/**
 * The UploadProgressDialog exists while files are uploaded.
 *
 * The process is a little unituitive. We open the UploadProgressDialog
 * Dialog and then this Dialog itself is responsible for initiating the upload
 * and when done, closing itself and putting the files/images
 */
export function UploadProgressDialog({
  dest,
  editor,
  files,
}: {
  dest: HTMLDivElement
  editor: Editor
  files: FileList
}) {
  const modal = useInModal()

  /**
   * Set the initial UploadState to `waiting`
   */
  const [uploads, setUploads, uploadsRef] = useStateRef<Map<File, UploadState>>(
    () => {
      const map = new Map<File, UploadState>()
      for (const file of files) {
        map.set(file, { status: "waiting" })
      }
      return map
    }
  )

  /**
   * Function to update the UploadState using a more natural syntax
   */
  const setUpload = useCallback(function setUpload(
    file: File,
    state: UploadState
  ) {
    setUploads((prevMap) => {
      const map = new Map(prevMap)
      map.set(file, state)
      return map
    })
  },
  [])

  useEffect(() => {
    ;(async function () {
      /**
       * Upload all the files by first getting a policy from the API endpoint
       * and then sending the files based on the policy we retrieved.
       *
       * During this phase, we are interactively updating the uploadState.
       */
      await Promise.all(
        Array.from(files).map(async (file) => {
          const dimensions = await getImageSizeFromFile(file)

          const uploadFileInfo: UploadFileInfo = dimensions
            ? {
                type: "image",
                filename: file.name,
                bytes: file.size,
                width: dimensions.width,
                height: dimensions.height,
              }
            : {
                type: "generic",
                filename: file.name,
                bytes: file.size,
              }

          const props: DemoAPIUploadProps = {
            file: uploadFileInfo,
            ...omit(editor.uploadOptions, ["url"]),
          }

          let rawResponse: AxiosResponse<UploadResponse>

          try {
            rawResponse = await axios.post<UploadResponse>(
              editor.uploadOptions.url,
              props
            )
          } catch (e) {
            setUpload(file, {
              status: "error",
              message: `Could not access the upload API.
The most likely cause is that the API URL ${JSON.stringify(
                editor.uploadOptions.url
              )} is configured incorrectly.
The error is:
${e}`,
            })
            return
          }

          const response = rawResponse.data

          if (response.status === "error") {
            setUpload(file, { status: "error", message: response.message })
            return
          }

          setUpload(file, {
            status: "sending",
            loaded: 0,
            total: file.size,
          })

          await uploadFile({
            file,
            policy: response.data,
            onProgress: (e) => {
              if (e.loaded !== e.total) {
                setUpload(file, {
                  status: "sending",
                  loaded: e.loaded,
                  total: e.total,
                })
              }
            },
          })

          setUpload(file, {
            status: "success",
            loaded: file.size,
            total: file.size,
            fileUrl: response.data.fileUrl,
            ...dimensions,
          })
        })
      )

      /**
       * When everything is done, we start iterating through the uploads and
       * inserting them into the editor.
       */
      for (const [file, upload] of Array.from(uploadsRef.current.entries())) {
        if (upload.status === "success") {
          Custom.reselect(editor)
          if (upload.width && upload.height) {
            const maxWidth = Custom.getEditorInnerWidth(editor)
            if (upload.width > maxWidth) {
              const width = Math.round(Math.min(maxWidth, upload.width))
              const height = Math.round(width * (upload.height / upload.width))
              const imageUrl = `${upload.fileUrl}?size=${width}x${height}`
              Custom.insertMedia(editor, imageUrl)
            } else {
              Custom.insertMedia(editor, upload.fileUrl)
            }
          } else {
            Custom.insertLinkBlock(
              editor,
              upload.fileUrl,
              `${file.name} (${prettyBytes(file.size)})`
            )
          }
        }
      }
      if (!checkHasUploadErrors(uploadsRef.current)) {
        /**
         * Prevent a React error.
         *
         * The timeout is required because otherwise the modal closes but
         * there may be pending render updates due to changes in the progress
         * bar state. By providing a short wait, we make sure they get a
         * chance to run.
         */
        setTimeout(() => {
          modal.close()
        }, 100)
      }
      return uploads
    })()
  }, [])

  const hasUploadErrors = checkHasUploadErrors(uploads)

  return (
    <Dialog
      title={hasUploadErrors ? "Errors While Uploading" : "Uploading..."}
      dest={dest}
      position={Position.Inside}
      width={320}
    >
      {hasUploadErrors ? (
        <>
          <Form.Block>
            <p style={{ color: "#cc0000", fontWeight: "bold" }}>
              Some files were not uploaded due to these issues.
            </p>
            <Form.Button className="btn btn-primary" onClick={modal.close}>
              Got It!
            </Form.Button>
          </Form.Block>
          <Form.Divider />
        </>
      ) : null}
      {Array.from(uploads.entries()).map(([file, uploadState], index) => {
        if (
          uploadState.status === "waiting" ||
          uploadState.status === "sending" ||
          uploadState.status === "success"
        ) {
          const { loaded, total } =
            uploadState.status === "sending" || uploadState.status === "success"
              ? uploadState
              : { loaded: null, total: null }
          const progress = loaded != null && total != null ? loaded / total : 0
          return (
            <Form.Block key={index}>
              <Form.Label>Uploading {JSON.stringify(file.name)}</Form.Label>
              <Form.Progress progress={progress} />
            </Form.Block>
          )
        } else if (uploadState.status === "error") {
          return (
            <Form.Block key={index}>
              <Form.Label>
                Error uploading {JSON.stringify(file.name)}
              </Form.Label>
              <$Error>{uploadState.message}</$Error>
            </Form.Block>
          )
        } else {
          assertUnreachable(uploadState)
        }
      })}
    </Dialog>
  )
}

const $Error = styled.div`
  color: #cc0000;
  font-weight: bold;
  line-height: 24px;
`
