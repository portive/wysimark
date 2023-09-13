# Contributing

Contributing Requirements:

- PNPM
- Build only tested in a \*nix environment

## README images

Images for README.md files have been relocated to

https://github.com/portive/wysimark-assets

So that they do not bloat this repo. There is a little extra synchronization that needs to go on but I think it is worth it so as to not have to worry about each image we want to add to a README. When the image is removed, it still adds bloat to the repo as well.

## Getting Started

Clone this repo, `cd` into it and `yarn`

```sh
git clone https://github.com/portive/wysimark-monorepo.git
cd wysimark-monorepo
pnpm install
```

In order to test the upload functionality with Portive, you will need to sign up for a free account at https://www.portive.com/ and create a free API key. Select the API key key and generate an Auth Token.

Create the file `.env/local.env` with your auth token as follows:

```dotenv
NEXT_PUBLIC_PORTIVE_AUTH_TOKEN=your-long-auth-token-goes-here
```

You can run the demo from the root of the Wysimark project directory:

```sh
# React
pnpm dev:react

# Standalone
pnpm dev:standalone

# Vue
pnpm dev:vue
```

You can edit Wysimark code and the changes will update live in the demo without a build step. Updates will be hot reloaded; however, due to the way that the editor is cached for performance, in some instances you will need to reload the browser.

## Running Unit Tests

Run unit tests once

```sh
# from root
pnpm test
```

Run unit tests in watch mode for `packages/react`. Note that only `packages/react` is currently unit tested because it contains the conversion algorithms.

```sh
# cd into `packages/react` first
pnpm test:watch
```
