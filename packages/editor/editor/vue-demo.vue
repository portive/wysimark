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
        @update:model-value="logMarkdown"
      />
    </client-only>
    <button @click="clickButton">Get Markdown Button</button>
  </div>
</template>

<script lang="ts">
/**
 * DO NOT DELETE:
 *
 * The purpose of this page is not to act as an actual demo page to be
 * executed, but as an example of what types we can expect the component to
 * return.
 */
import Wysimark from "./vue-composition-component.vue"
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
      logMarkdown(markdown: string) {
        console.log("logMarkdown", markdown)
      },
      /**
       * This method called when "Get Markdown Button" is clicked
       */
      clickButton() {
        if (wysimark.value == null) return
        /**
         * TODO: Get `value.getMarkdown` to return the proper type.
         *
         * This is not trivial and looks like we may have to do some TypeScript
         * gymnastics to get it to work. Most likely this is because Vue
         * doesn't place on emphasis, and probably doesn't recommend, using
         * the `ref` to execute methods directly from a Vue component.
         */
        const markdown = wysimark.value.getMarkdown()
        console.log(markdown)
      },
    }
  },
})
</script>
