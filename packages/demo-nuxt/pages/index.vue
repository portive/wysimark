<template>
  <div>
    <!-- https://stackoverflow.com/questions/46058544/document-is-not-defined-in-nuxt-js -->
    <client-only placeholder="Loading...">
      <Wysimark
        ref="wysimark"
        documentId="any"
        model-value="# Hello World"
        :minHeight="240"
        :maxHeight="480"
        @update:model-value="logUpdateModelValue"
        @change="logChange"
        @update="logUpdate"
        @blur="logBlur"
      />
    </client-only>
    <button @click="clickButton">Get Markdown Button</button>
  </div>
</template>

<script lang="ts">
import Wysimark from "@wysimark/vue"
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "PageIndex",
  components: { Wysimark },
  setup() {
    const wysimark = ref<typeof Wysimark>()
    return {
      wysimark,
      /**
       * Method called with `@update:model-value` prop on `wysimark-component`
       */
      logUpdateModelValue(markdown: string) {
        console.log("logUpdateModelValue", markdown)
      },
      logChange(e) {
        console.log("logChange", e.getMarkdown())
      },
      logUpdate(e) {
        console.log("logUpdate", e.getMarkdown())
      },
      logBlur(e) {
        console.log("logBlur", e.getMarkdown())
      },
      /**
       * This method called when "Get Markdown Button" is clicked
       */
      clickButton() {
        if (wysimark.value == null) return
        const markdown = wysimark.value.getMarkdown()
        console.log(markdown)
      },
    }
  },
})
</script>
