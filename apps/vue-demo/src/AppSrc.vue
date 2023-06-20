<template>
  <div>
    <h1>Wysimark Editor for Vue</h1>
    <p>
      <button
        id="get-markdown"
        @click="clickGetMarkdown"
        style="margin-right: 0.5em"
      >
        Get Markdown
      </button>
      <button id="set-markdown" @click="clickSetMarkdown">Set Markdown</button>
    </p>
    <div>
      <wysimark
        ref="wysimark"
        model-value="# Hello World

Lorem ipsum dolar..."
        :height="240"
        :auth-token="PORTIVE_AUTH_TOKEN"
        @update:model-value="log"
        placeholder="Type something..."
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue"
import Wysimark from "@wysimark/vue/src/index.vue"
export default {
  name: "App",
  components: { Wysimark },
  setup() {
    const wysimarkRef = ref<typeof Wysimark>()

    /**
     * Helper to execute functions with wysimark which it's possible may not exist.
     * If it doesn't exit, we just ignore. This is likel
     */
    const withWysimark = (fn: (wysimark: typeof Wysimark) => void) => {
      const wysimark = wysimarkRef.value
      if (wysimark) {
        fn(wysimark)
      } else {
        console.warn("wysimark is not ready yet")
      }
    }

    /**
     * onClick handler for "Get Markdown" button
     */
    const clickGetMarkdown = () => {
      withWysimark((wysimark) => {
        console.log(wysimark.getMarkdown())
      })
    }

    /**
     * onClick handler for "Set Markdown" button
     */
    const clickSetMarkdown = () => {
      withWysimark((wysimark) => {
        wysimark.setMarkdown("# Hello World")
      })
    }

    const log = (markdown: string) => {
      console.log(markdown)
    }
    console.log(process.env)

    return {
      wysimark: wysimarkRef,
      clickGetMarkdown,
      clickSetMarkdown,
      log,
      PORTIVE_AUTH_TOKEN: process.env.PORTIVE_AUTH_TOKEN,
    }
  },
}
</script>
