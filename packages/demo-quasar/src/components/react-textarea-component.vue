<template>
  <!-- 
    JEDI:
    
    This is the target element for React to render into.

    Give the div a `ref` which makes it accessible under `this.$refs` in our
    `defineComponent` object method properties.
  -->
  <div ref="reactContainer">Loading React Component...</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import React from 'react';
import ReactDOM from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';

export default defineComponent({
  /**
   * `ReactComponent` is a friendly name but is not used to determine the name
   * of the tag. That is defined in the parent Component in its `components`
   * property.
   */

  name: 'ReactTextareaComponent',

  /**
   * Specify the props to pass in. They are available in the `setup` method as
   * the first argument or as part of `this.$props`
   */

  props: {
    initialValue: {
      type: String,
      required: true,
    },
  },

  /**
   * The object returned from `setups` is available on `this` and to the parent
   * component through a ref.
   *
   * The methods from the `methods` property are also included.
   *
   * Whatever is returned here is properly TypeScript tyeped.
   */

  setup(props) {
    /**
     * Create the React Element. It is created at initialized in `setup` and
     * then mounted to the DOM in the `mounted` method.
     */
    const reactElement = React.createElement(TextareaAutosize, {
      /**
       * Value passed in from `props` in parent
       */
      value: props.initialValue,
    });
    /**
     * `reactElement` made available on `this`.
     */
    return {
      reactElement,
    };
  },
  mounted() {
    /**
     * Render to the target `reactContainer`
     */
    ReactDOM.render(
      this.reactElement,
      this.$refs.reactContainer as HTMLElement
    );
  },
  methods: {
    getValue() {
      return this.reactElement.props.value;
    },
  },
});
</script>
