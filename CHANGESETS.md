# Using Changesets

## Using Changeset

Once you've started using Changesets, you'll gain access to three useful commands:

```sh
# Add a new changeset
changeset

# Create new versions of packages
changeset version

# Publish all changed packages to npm
changeset publish
```

## TODO: Add `publish-packages` script

Add a `publish-packages` script (not `publish` to avoid naming conflict).

Something like:

```json
{
  "scripts": {
    // Include build, lint, test - all the things you need to run
    // before publishing. Note that `build` is part of `lint` so not explicitly
    // specified.
    "publish-packages": "turbo run lint test && changeset version && changeset publish"
  }
}
```

## Linked Packages

`@wysimark/react`, `@wysimark/standalone` and `@wysimark/vue` are linked.

This means that if they receive a new version number, they get the same version number between the packages.

<https://github.com/changesets/changesets/blob/main/docs/linked-packages.md>
