import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import { Layout } from "@/components/layout"

interface Props {
  filenames: string[]
}

const Index: NextPage<Props> = function Index() {
  return (
    <Layout>
      <div style={{ width: 480, margin: "0 auto" }}>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
            // eslint-disable-next-line no-secrets/no-secrets
            integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
            crossOrigin="anonymous"
          />
          <style>{`
          a {
            color: #0040d0;
            text-decoration: underline;
          }
          a:hover {
            color: #0060ff;
          }
          p {
            color: #808080;
          }
          li {
            color: #404040;
            line-height: 1.4;
            margin-bottom: 0.4em;
          }
        `}</style>
        </Head>
        <h2 className="mt-4">Wysimark Editor Demos</h2>
        <p>Demos of the Wysimark Editor in different configurations</p>
        <h4>React Editor</h4>
        <p>
          The Wysimark editor which is used for React integrations and is also
          the base for which the Standalone version is built.
        </p>
        <ul>
          <li>
            <Link href="/demos/editor-from-source">
              <a>React Editor from source</a>
            </Link>
            : Editor from `~/editor`
          </li>
          <li>
            <Link href="/demos/editor-from-symlinked-package">
              <a>React Editor from symlinked package</a>
            </Link>
            : From the package at &quot;packages/wysimark-react-npm&quot;. It
            has been symlinked through `@wysimark/react` with Lerna
          </li>
        </ul>
        <h4>Standalone Editor</h4>
        <p>
          The Standalone Editor wraps React up inside of it and is used when the
          developer doesn&apos;t use React. The integration involves using
          `React.createElement` and `ReactDom.render`. Used for building the Vue
          version.
        </p>
        <ul>
          <li>
            <Link href="/demos/standalone-from-source">
              <a>Standalone Editor from source</a>
            </Link>
            : Editor from `~/editor/standalone`
          </li>
          <li>
            <Link href="/demos/standalone-from-symlinked-package">
              <a>Standalone Editor from symlinked package</a>
            </Link>
            : From the package at &quot;packages/wysimark-standalone-npm&quot;.
            It has been symlinked through `@wysimark/standalone` with Lerna
          </li>
        </ul>
        <h4 className="mt-4">Proof of Concepts</h4>
        <p>Technical proofs to demonstrate that pieces of the Editor work.</p>
        <ul>
          <li>
            <Link href="/proof-of-concepts/dialog-demo">
              <a>Editor Dialog Box Previews</a>
            </Link>
            : Preview of Editor dialog boxes like upload progress, insert link
            and import markdown
          </li>
          <li>
            <Link href="/proof-of-concepts/modal-demo">
              <a>Modal Open and Close at Location Proof</a>
            </Link>
            : Proof showing a modal opening and closing at a target destination.
          </li>
          <li>
            <Link href="/proof-of-concepts/external-module-poc">
              <a>External Module Proof of Concept</a>
            </Link>
            : Proof of Concept for loading an external module using an IIFE.
          </li>
          <li>
            <Link href="/proof-of-concepts/external-module-crash-poc">
              <a>External Module Crashing Proof of Concept</a>
            </Link>
            : Proof of Concept for an external module crashing and its effects.
          </li>
          <li>
            <Link href="/proof-of-concepts/zurb-foundation-reset-poc">
              <a>Zurb Foundation CSS Reset Proof of Concept</a>
            </Link>
            : Proof of Concept to see if we can successfully reset the zurb
            foundation&apos;s css.
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default Index
