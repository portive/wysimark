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
        v-model="markdown"
        :height="240"
        :auth-token="PORTIVE_AUTH_TOKEN"
        placeholder="Type something..."
      />
      <textarea
        v-model="markdown"
        style="width: 100%; height: 240px; margin-top: 1em"
      ></textarea>
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
    const markdownRef = ref<string>("# Hello World 100")

    /**
     * onClick handler for "Get Markdown" button
     */
    const clickGetMarkdown = () => {
      console.log(markdownRef.value)
    }

    /**
     * onClick handler for "Set Markdown" button
     */
    const clickSetMarkdown = () => {
      markdownRef.value = "blah blah blah"
    }

    const log = (markdown: string) => {
      console.log({ markdown })
    }

    return {
      wysimark: wysimarkRef,
      markdown: markdownRef,
      clickGetMarkdown,
      clickSetMarkdown,
      log,
      PORTIVE_AUTH_TOKEN: process.env.PORTIVE_AUTH_TOKEN,
    }
  },
}
</script>
