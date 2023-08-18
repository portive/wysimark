# jest-config

The package `jest` must be included in the importing workspace because it needs access to the `jest` CLI command.

## ts-jest transforms all of `node_modules`

This is bad for performance because it transforms `node_modules` but it ensures compatibility with all `esm` modules in `node_modules`. The alternative is to  manually figure out which packages to ignore because they are `esm`.

## Error: Jest encountered an unexpected token

If you see this error:

> Jest encountered an unexpected token
>
> Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

T