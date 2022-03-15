<template>
  <div>
    <!--
      `wysimark-component` is the dasherized version of `WysimarkComponent`
      which is the component name in `components`.

      We can pass `props` in that are defined on the child component.

      - If we pass them using the name of the prop, it is provided as text.
      - If we pass them using `:someName` then the value will be executed.
    -->
    <div style="margin-bottom: 0.25em">Description</div>
    <wysimark-component
      ref="wysimark"
      style="margin-bottom: 1em; width: 640px"
      model-value="Value passed in from parent page"
      appName="demo-app"
      documentId="vue-demo-document"
      apiUrl="http://localhost:3005/api/v1/upload"
      :minHeight="120"
      :maxHeight="240"
      @update:model-value="logMarkdown"
    />
    <button @click="clickButton">Get Markdown Button</button>
  </div>
</template>

<script lang="ts">
import _WysimarkComponent from "@wysimark/vue"
// import _WysimarkComponent from "../lib/index.esm"
// import _WysimarkComponent from "../lib/index"
import { defineComponent, ref } from "vue"

const WysimarkComponent = defineComponent(_WysimarkComponent)

/**
 * `defineComponent` validates TypeScript.
 * Otherwise, it's just a pass through.
 */

export default defineComponent({
  name: "PageIndex",
  components: { WysimarkComponent },
  setup() {
    const wysimark = ref<typeof WysimarkComponent>()
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
        const markdown = wysimark.value.getMarkdown()
        console.log(markdown)
      },
    }
  },
})
</script>
