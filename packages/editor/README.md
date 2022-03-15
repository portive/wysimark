# Wysimark README

## Normalization

See `README/NORMALIZATION.md`

## Vue 3 Build

The component for the Vue 3 build exists in `packages/wysimark-vue-3-src`. The reason it is there is because we can test to see if it works in Quasar (A Vue 3 framework that Scott uses).

- Clear `dist/vue3` and `build/vue3` directory
- Copy `../wysimark-vue-3-src/src/components/wysimark-vue-3-component.vue` to `build/vue3/wysimark-vue-3-component.vue`
- Edit the `.vue` file so that it points to the React based CJS file made for distribution that includes React in it.
- Run `config/rollup/vue3/vue3-cjs.config.js`
