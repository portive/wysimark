# Vue 3 with Quasar README

## Overview

Call `start:dev` on `wysimark-editor` and click `Standalone Editor from Source`. `wysimark-vue-3` is built on that as a base.

It allows us to pass all the `props` into a single component.

## TODO

- [ ] In `.eslintrc.js` we disabled a bunch of TypeScript warnings. At some point, we should get this working without having to disable the warnings.

## `wysimark-vue-3` src

The source for `wysimark-vue-3` can be found at `src/components/wysimark-vue-3-component`.

## How It Works

Building `wysimark-vue-3` is started from the root of the monorepo:

```sh
yarn build
```

This will build the Wysimark Editor first and then build the `wysimark-vue-3` NPM component using the pre-built Wysimark Editor Standalone version.

To publish it

```sh
yarn publish:vue3
```

## Getting Started Steps

### Initial setup

- Install Quasar CLI `yarn global add @quasar/cli`
- While Quasar 2 is not yet stable: `quasar create <folder_name> --branch next`
- Modify `.vscode/settings.json` to enable prettifying code `"vetur.format.enable": true`

### Add React integration

- `yarn add react react-dom`
- `yarn add @types/react @types/react-dom`
- Add `compilerOptions.jsx: "react"` to `tsconfig.json`

## Where to start

- Check out `src/components/rich-textarea-component.vue` for a Vue/React Component
