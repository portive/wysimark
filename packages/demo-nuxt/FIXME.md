# Fix Me

## @wysimark/vue problems

### Important!

Nuxt.js caches output in `wysimark-vue/node_modules/.vite` so we need to clear the output of that directory.

- [ ] Consider adding this to `start:vue`

### Overview

If I specify a specific version of `@wysimark/vue` then everything works. This suggests that actual `node_modules` packages are handled correctly but linked modules like from `wysimark-vue-npm` are not.

Some possible solutions are:

- Make Nuxt properly treat linked modules like `node_modules` packages
- Reconfigure the one that the project is structure to fool Nuxt into treating linked modules like `node_modules`

### Errors with CJS

When I use CJS, I get this error:

```
SyntaxError: The requested module '/_nuxt/@fs/Users/sunnyhirai/Projects/wysimark-monorepo/packages/wysimark-vue-npm/.dist/index.js' does not provide an export named 'default'
```

This suggests that something is expecting an `export default` which would not exist in the `cjs` file. In other words

### Errors with ESM

When I use ESM, I get this error:

```
ReferenceError: require is not defined
```

This error is unusual in that the `esm` version should not be using `require`. A quick look at the code shows that there isn't any obvious uses of a top level `require` method although there are objects with the `require` function as a property that is called.

### Why it's failing

This is the line that is causing the problem. It shows up in the console as `index.esm.js`. For some reason, it is adding a `require('vue')`

```js
// prettier-ignore
const { stop, h, effect, reactive } = require('vue');
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  openBlock,
  createBlock,
  Fragment,
  createCommentVNode,
  createVNode,
  mergeProps,
} from "/_nuxt/node_modules/.vite/vue.js?v=001af644"
import __vite__cjsImport1_react from "/_nuxt/node_modules/.vite/react.js?v=001af644"
const React = __vite__cjsImport1_react.__esModule
  ? __vite__cjsImport1_react.default
  : __vite__cjsImport1_react
const createContext = __vite__cjsImport1_react["createContext"]
const useImperativeHandle = __vite__cjsImport1_react["useImperativeHandle"]
const useState = __vite__cjsImport1_react["useState"]
const useCallback = __vite__cjsImport1_react["useCallback"]
const useRef = __vite__cjsImport1_react["useRef"]
const useContext = __vite__cjsImport1_react["useContext"]
const useEffect = __vite__cjsImport1_react["useEffect"]
const createRef = __vite__cjsImport1_react["createRef"]
const useMemo = __vite__cjsImport1_react["useMemo"]
import __vite__cjsImport2_reactDom from "/_nuxt/node_modules/.vite/react-dom.js?v=001af644"
const ReactDOM = __vite__cjsImport2_reactDom.__esModule
  ? __vite__cjsImport2_reactDom.default
  : __vite__cjsImport2_reactDom
```

## Things to try

- [x] Copy into `wysimark-vue/node_modules/@wysimark/vue` from `wysimark-vue-npm` - THIS WORKS
- [x] Link the above - DOES NOT WORK
- [ ] Vite config in nuxt.config.ts
  - [x] resole.dedupe `vue` - DOES NOT WORK
  - [x] `preserveSymlinks` - WORKS!!!
