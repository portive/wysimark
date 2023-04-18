# Contributing

Contributing Requirements:

- Yarn 3
- Build only tested in a \*nix environment

## Getting Started

Clone this repo, `cd` into it and `yarn`

```sh
git clone https://github.com/portive/wysimark.git
cd wysimark
yarn
```

In order to test the upload functionality with Portive, you will need to sign up for a free account at https://www.portive.com/ and create a free API key. Select the API key key and generate an Auth Token.

Create the file `.env/local.env` with your auth token as follows:

```dotenv
NEXT_PUBLIC_PORTIVE_AUTH_TOKEN=your-long-auth-token-goes-here
```

You can run the demo from the root of the Wysimark project directory:

```sh
yarn start:local
```

You can edit Wysimark code and the changes will update live in the demo without a build step. Updates will be hot reloaded; however, due to the way that the editor is cached for performance, in some instances you will need to reload the browser.

## Running Unit Tests

Run unit tests once

```sh
# from root
yarn test
```

Run unit tests in watch mode for `packages/convert`. Note that only `packages/convert` is unit tested.

```sh
# cd into `packages/convert` first
yarn test:watch
```
