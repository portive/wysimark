<template>
  <!-- 
    This is the target element for React to render into.

    Give the div a `ref` which makes it accessible under `this.$refs` in our
    `defineComponent` object method properties.

    We add v-bind="$attrs" to get the leftover props to get added to the
    div. See the comment for `inheritAttrs` for details.
  -->
  <div ref="reactContainer" v-bind="$attrs"></div>
</template>

<script lang="ts">
/**
 * ## Vue 2 vs Vue 3
 *
 * https://learnvue.co/2020/02/building-the-same-component-in-vue2-vs-vue3/
 */
/**
 * COMPOSITION API:
 *
 * This Vue Component is built using the Options API.
 *
 * Vue components can be built using either:
 *
 * - Options API (Vue 2)
 * - Composition API (Vue 3)
 *
 * Vue 3 can use either the Options API or the Composition API.
 * Vue 2 can use the Options API and, with a plugin, can use the Composition API.
 *
 *
 * ## Vue.extend removed
 *
 * https://v3.vuejs.org/guide/migration/global-api.html#vue-extend-removed
 */
import { PropType, defineComponent } from "vue"
import { createWysimark } from "./standalone"
import { EditorEvent, OnChange, UploadOptions } from "./types"
/**
 * IMPORTANT: Do not import `vue`.
 *
 * We do not import `vue` because we want to be able to view this Component in
 * Next.js. As soon as we add `vue` to the mix, the `jsx` breaks in Next.js.
 */

type This = {
  $refs: { reactContainer: HTMLElement }
  $emit: ((type: "update:modelValue", value: string) => void) &
    ((type: "change", value: EditorEvent) => void) &
    ((type: "update", value: EditorEvent) => void) &
    ((type: "blur", value: EditorEvent) => void)
  props: {
    modelValue: string
    minHeight?: number
    maxHeight?: number
    onChange?: OnChange
    onUpdate?: OnChange
    onBlur?: OnChange
    throttle?: number
    upload?: UploadOptions
  }
  wysimark: ReturnType<typeof createWysimark>
  markdown: string
  getMarkdown: () => string
}

/**
 * Vue and TypeScript
 *
 * https://v3.vuejs.org/guide/typescript-support.html#annotating-props
 * https://vuejs.org/guide/typescript/options-api.html#typing-computed-properties
 *
 * Fake This
 *
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#specifying-the-type-of-this-for-functions
 */
const WysimarkOptionsComponent = defineComponent({
  /**
   * This is a friendly name but is not used to determine the name of the tag.
   * That is defined in the parent Component in its `components` property.
   */

  name: "WysimarkOptionsComponent",

  /**
   * Disable attribute inheritance which fixes an issue.
   * * By default, the <template> will inherit the attributes that aren't
   * specified in `props`. This is actually what we want. For some reason on
   * HabitStack, this works but not in production so it may be because
   * something is causing inheritAttrs to be false. We add the attributes
   * back in by using v-bind="$attrs" as specified here:
   *
   * https://v3.vuejs.org/guide/component-attrs.html#attribute-inheritance
   *
   * Still, we want to disable inheritAttrs here in case there is some
   * weird interaction.
   */

  inheritAttrs: false,

  /**
   * Specify the props to pass in. They are available in the `setup` method as
   * the first argument or as part of `this.$props`
   */

  props: {
    modelValue: { type: String, required: true },
    minHeight: { type: Number, required: false },
    maxHeight: { type: Number, required: false },
    onChange: {
      type: Function as PropType<OnChange> | undefined,
      required: false,
    },
    onUpdate: {
      type: Function as PropType<OnChange> | undefined,
      required: false,
    },
    onBlur: {
      type: Function as PropType<OnChange> | undefined,
      required: false,
    },
    throttle: { type: Number, required: false },
    upload: { type: Object, required: false },
  },

  /**
   * Events that a component can emits to its parents.
   *
   * https://v3.vuejs.org/guide/migration/emits-option.html
   */
  emits: ["update:modelValue", "change", "update", "blur"],

  setup(props: Record<string, unknown>) {
    /**
     * HINT:
     *
     * Whatever is returned from the `setup` method becomes part of `this`.
     * For example, `this` can be accessed from the `methods` object defined
     * in the component.
     */
    return {
      props,
    }
  },

  mounted(this: This) {
    const props = this.props

    const wysimark = createWysimark(this.$refs.reactContainer, {
      initialMarkdown: props.modelValue,
      minHeight: props.minHeight,
      maxHeight: props.maxHeight,
      onChange: (event) => {
        if (props.onChange) {
          props.onChange(event)
        }
        this.$emit("change", event)
      },
      onUpdate: (event) => {
        if (props.onUpdate) {
          props.onUpdate(event)
        }
        const markdown = event.getMarkdown()
        this.$emit("update", event)
        this.$emit("update:modelValue", markdown)
      },
      onBlur: (event) => {
        if (props.onBlur) {
          props.onBlur(event)
        }
        this.$emit("blur", event)
      },
      throttle: props.throttle,
      upload: props.upload,
    })
    this.wysimark = wysimark
  },

  beforeUnmount(this: This) {
    /**
     * The Wysimark Controller's unmount method takes care of unmounting for us
     */
    this.wysimark.unmount()
  },

  computed: {
    markdown(this: This): string {
      return this.wysimark.getMarkdown()
    },
  },

  methods: {
    getMarkdown(this: This): string {
      /**
       * The `getMarkdown` method exists on the Wysimark controller which is
       * returned by the `createWysimark` method.
       */
      return this.wysimark.getMarkdown()
    },
  },
})

export default WysimarkOptionsComponent //as MergedWysimarkTypes;
</script>
