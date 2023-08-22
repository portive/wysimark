<template>
  <!-- 
    This is the target element for React to render into.

    In `setup` we return `{ container: containerRef }`.

    By setting the `ref` in the tag below to `container`, the `containerRef` 
    returned by `setup` has its value set to the `div` Element below.
  -->
  <div ref="container" v-bind="$attrs"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue"
import { Wysimark, createWysimark } from "@wysimark/standalone"

export default defineComponent({
  /**
   * This is a friendly name but is not used to determine the name of the tag.
   * That is defined in the parent Component in its `components` property.
   */
  name: "Wysimark",

  /**
   * Specify the props that can be passed in to this Vue component.
   *
   * These props are available as the first argument in the `setup` method.
   */

  props: {
    modelValue: { type: String, required: true },
    height: { type: Number, required: false },
    minHeight: { type: Number, required: false },
    maxHeight: { type: Number, required: false },
    onChange: { type: Function, required: false },
    placeholder: { type: String, required: false },
    authToken: { type: String, required: false },
  },

  watch: {
    modelValue(nextValue, prevValue) {
      if (nextValue !== prevValue) {
        this.setMarkdown(nextValue)
      }
    },
  },

  /**
   * Events that a component can emits to its parents.
   *
   * https://v3.vuejs.org/guide/migration/emits-option.html
   */
  emits: ["update:modelValue", "change"],

  /**
   * In the Composition API, almost everything is done in `setup` and behaves
   * somewhat similar to React function components.
   *
   * Inside setup, we can call methods like `onMounted` and `ref` which in
   * React would be hooks like `useEffect` and `useRef`.
   *
   * In Vue, they don't have a `use` naming convention.
   */
  setup(props, { emit }) {
    /**
     * HINT:
     *
     * Whatever is returned from the `setup` method becomes part of `this`.
     * For exmaple, `this` can be accessed from the `methods` object defined
     * in the component.
     */

    const containerRef = ref<null | HTMLDivElement>(null)
    let wysimark: Wysimark

    onMounted(() => {
      if (containerRef.value == null) throw new Error(`containerRef is null`)
      /**
       * For some reason, TypeScript is struggling on getting
       * `containerRef.value`. It slows vscode down, prevent Vite from building
       * the `.d.ts` file and has even cause vscode to crash.
       *
       * Adding a type here fixes the issue.
       */
      const container = containerRef.value as HTMLDivElement
      wysimark = createWysimark(container, {
        initialMarkdown: props.modelValue,
        authToken: props.authToken,
        height: props.height,
        minHeight: props.minHeight,
        maxHeight: props.maxHeight,
        onChange: (markdown: string) => {
          emit("update:modelValue", markdown)
        },
        placeholder: props.placeholder,
      })
    })

    /**
     * Before Vue unmounts the Vue component, we want to make sure to unmount
     * the React component.
     */
    onBeforeUnmount(() => {
      wysimark.unmount()
    })

    return {
      container: containerRef,
      getMarkdown(): string {
        return wysimark.getMarkdown()
      },
      setMarkdown(markdown: string): void {
        wysimark.setMarkdown(markdown)
      },
    }
  },
})
</script>
