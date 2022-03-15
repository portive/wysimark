<template>
  <q-page class="row items-center justify-evenly">
    <div style="width: 480px">
      <h4>Wysimark Demos</h4>
      <ul>
        <li>
          From <code>src/components</code> directory.
          <ul>
            <li>
              <a href="#/wysimark-local-composition-component-demo"
                >Wysimark Local Composition Component Demo</a
              >: Uses `src/components/wysimark-composition-component` which
              currently uses the <strong>standalone build</strong> and not the
              standalone source. Ideally, we want this to eventually use the
              standalone source but may be impossible to mix the React JSX with
              the Vue JSX.
            </li>
          </ul>
          <ul>
            <li>
              <a href="#/wysimark-local-options-component-demo"
                >Wysimark Local Options Component Demo</a
              >: Uses `src/components/wysimark-options-component` which
              currently uses the <strong>standalone build</strong> and not the
              standalone source. Ideally, we want this to eventually use the
              standalone source but may be impossible to mix the React JSX with
              the Vue JSX.
            </li>
          </ul>
        </li>

        <li>
          <strong>Build</strong> ignores package.json directives
          <ul>
            <li>
              <a href="#/build-composition">Composition</a>
            </li>
            <li>
              <a href="#/build-options">Options</a>
            </li>
          </ul>
        </li>
        <li>
          <strong>Package</strong> uses package.json directives to
          `wysimark-vue-npm`
          <ul>
            <li>
              <a href="#/package">Package Default</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </q-page>
</template>

<style scoped>
code {
  color: #008000;
  background: #f0f0f0;
  padding: 4px 4px;
  border-radius: 4px;
}
</style>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
});
</script>
