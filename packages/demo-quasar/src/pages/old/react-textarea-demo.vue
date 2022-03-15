<template>
  <q-page class="row items-center justify-evenly">
    <!--
      `react-component` is the dash case version of `ReactComponent` which is
      the component name in `components`.

      We can pass `props` in that are defined on the child component.

      - If we pass them using the name of the prop, it is provided as text.
      - If we pass them using `:someName` then the value will be executed.
    -->
    <react-textarea-component
      ref="textarea"
      initialValue="Value passed in from parent"
    />
    <button @click="clickButton">Get Value Button</button>
  </q-page>
</template>

<script>
import ReactTextareaComponent from 'src/components/react-textarea-component.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { ReactTextareaComponent },
  methods: {
    clickButton() {
      console.log(this.$refs.textarea.getValue());
    },
  },
});
</script>
