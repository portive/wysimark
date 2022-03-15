import React from "react"
import { Form } from "~/lib/form"
import { ModalProvider } from "~/lib/modal"
import { Reset, ResetContainer } from "~/lib/reset"
import { Layout } from "@/components/layout"

export default function DialogDemo() {
  return (
    <Layout>
      <ModalProvider>
        <Reset>
          <MediaDialog />
          <MediaUploadingDialog />
          <LinkDialog />
          <MarkdownDialog />
        </Reset>
      </ModalProvider>
    </Layout>
  )
}

function MediaDialog() {
  return (
    <ResetContainer>
      <div style={{ margin: 48 }}>
        <Form.Dialog style={{ width: 320 }}>
          <Form.Block>
            <Form.Heading>Upload Image</Form.Heading>
            <Form.Close />
          </Form.Block>
          <Form.Block>
            <Form.Label>Select image file to upload</Form.Label>
            <Form.File>
              <i className="fa fa-upload" /> Upload Image
            </Form.File>
            <Form.Hint>Choose a .gif, .jpg or .jpeg file</Form.Hint>
          </Form.Block>
        </Form.Dialog>
      </div>
    </ResetContainer>
  )
}

function MediaUploadingDialog() {
  return (
    <ResetContainer>
      <div style={{ margin: 48 }}>
        <Form.Dialog style={{ width: 320 }}>
          <Form.Block>
            <Form.Heading>Upload Image</Form.Heading>
            <Form.Close />
          </Form.Block>
          <Form.Block>
            <Form.Label>Uploading abcdefg.jpg</Form.Label>
            <Form.Progress progress={0.1} />
          </Form.Block>
          <Form.Block>
            <Form.Label>Uploading trello.jpg</Form.Label>
            <Form.Progress progress={0.75} />
          </Form.Block>
        </Form.Dialog>
      </div>
    </ResetContainer>
  )
}

function LinkDialog() {
  return (
    <ResetContainer>
      <div style={{ margin: 48, width: 320 }}>
        <Form.Dialog>
          <Form.Block>
            <Form.Heading>Insert Link</Form.Heading>
            <Form.Close />
          </Form.Block>
          <Form.Block>
            <Form.Label>Enter URL / Web Address</Form.Label>
            <Form.Input
              value={""}
              onChange={() => {
                /* noop */
              }}
            />
            <Form.Fault>Please enter a valid URL</Form.Fault>
          </Form.Block>
          <Form.Block>
            <Form.Label>Optional Text for Link</Form.Label>
            <Form.Input
              value={""}
              onChange={() => {
                /* noop */
              }}
            />
          </Form.Block>
          <Form.Block className="--right">
            {/* <div style={{ display: "flex" }}>
              <Form.Hint style={{ marginRight: 16 }}>
                If optional text is blank, the URL or currently selected text
                will be used
              </Form.Hint> */}
            <Form.Button>
              <i className="fa fa-link" /> Insert Link
            </Form.Button>
            {/* </div> */}
          </Form.Block>
        </Form.Dialog>
      </div>
    </ResetContainer>
  )
}

function MarkdownDialog() {
  return (
    <ResetContainer>
      <div style={{ margin: 48, width: 480 }}>
        <Form.Dialog>
          <Form.Block>
            <Form.Heading>Import Markdown</Form.Heading>
            <Form.Close />
          </Form.Block>
          <Form.Block>
            <Form.Label>Markdown Code</Form.Label>
            <Form.TextArea
              value={"# Hello World"}
              onChange={() => {
                /* noop */
              }}
              style={{ height: 240 }}
            />
          </Form.Block>
          <Form.Block className="--right">
            <Form.Button>
              <i className="fa fa-file-import" /> Import Markdown
            </Form.Button>
          </Form.Block>
        </Form.Dialog>
      </div>
    </ResetContainer>
  )
}
