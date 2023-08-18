import { useState } from "react"

import { Editable, useEditor } from "~/src/entry"

import content from "../../content/basic.md"

/**
 * Sample to replicate issue:
 *
 * https://github.com/portive/wysimark/issues/36
 */

export default function Page() {
  const [markdown, setMarkdown] = useState(content)

  const editor = useEditor({
    authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
    height: 320,
  })

  return (
    <div style={{ width: 480, margin: "2em auto" }}>
      <main>
        <section>
          <h2>About this Page</h2>
          <p>This is a sample page created for JSX.</p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Sample navigation bar</li>
            <li>Content sections</li>
            <li>Formatted for JSX</li>
          </ul>
        </section>
      </main>
      <article>
        <header>
          <h1>The Evolution of Web Development</h1>
          <p>By Jane Doe | Published on August 17, 2023</p>
        </header>

        <section>
          <h2>Introduction</h2>
          <p>
            The world of web development has evolved at an astonishing pace over
            the last three decades. From simple text-based webpages to dynamic,
            interactive web applications, the transformation has been truly
            revolutionary. This article delves into the journey of web
            development, exploring its roots and highlighting the milestones
            that have made it what it is today.
          </p>
        </section>

        <section>
          <h2>The Early Days: Static Webpages</h2>
          <p>
            The early days of the internet were characterized by static web
            pages. These were basic HTML pages that didn't have any
            interactivity. Websites served as electronic brochures, presenting
            users with fixed information. Any updates or changes to the content
            required manual editing and uploading of the HTML files.
          </p>
        </section>

        <section>
          <h2>The Rise of Dynamic Content</h2>
          <p>
            With advancements in server-side scripting languages like PHP and
            Perl, websites started becoming more dynamic. Developers could now
            fetch data from databases and display them in real-time. This led to
            the creation of content management systems (CMS) that allowed even
            non-developers to update website content without touching the code.
          </p>
        </section>

        <section>
          <h2>Interactive Web Applications</h2>
          <p>
            The introduction of AJAX (Asynchronous JavaScript and XML) in the
            early 2000s was a game-changer. Web pages could now retrieve data
            from the server asynchronously without having to reload the entire
            page. This led to the development of web applications that rivaled
            the performance and interactivity of native desktop applications.
          </p>
        </section>

        <section>
          <h2>Modern Frameworks and Tools</h2>
          <p>
            Today, web development is powered by a plethora of tools,
            frameworks, and libraries. React, Angular, Vue, and many others have
            made the development of complex web applications more
            straightforward and efficient. Moreover, with the rise of Node.js,
            JavaScript has extended its reach from the browser to the server,
            leading to the full-stack development movement.
          </p>
        </section>

        <section>
          <h2>Conclusion</h2>
          <p>
            The journey of web development has been marked by continuous
            innovation and growth. As technology continues to evolve, one can
            only imagine what the future holds for this dynamic field. One thing
            is for sure, the web will continue to play a pivotal role in our
            daily lives, and the tools and technologies that power it will only
            get better.
          </p>
        </section>

        <footer>
          <p>
            Thank you for reading! If you enjoyed this article, don't forget to
            share it with your friends and colleagues.
          </p>
        </footer>
      </article>

      <div>
        <Editable
          editor={editor}
          value={markdown}
          onChange={setMarkdown}
          placeholder="Enter text here..."
        />
      </div>
    </div>
  )
}
