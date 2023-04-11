# To Do

## Next

- [ ] When we add `Editor` to `ExtractedPluginSchema` the types fail for some reason. This isn't necessary to have everything work, but it likely falls into an important piece of technical debt. The reason why I think it's important is that there is no clear reason why it should be failing. Understanding this will probably be important for future typing errors.
- [ ] Convert images to Markdown
- [ ] Convert attachments to Markdown

## History

I've just come back from vacation in Korea and trying to rebuild my context.

Basically, what we are trying to do is make this `slate-pluggable` project use the types from the project named `plugin-types`. The goal here is to allow us to get, from the plugins, two things without having to define them separately:

1. The `CustomTypes` for Slate
2. The plugins

You can see an example of this at:
~/projects/demos/plugin-types/src/index.tsx

Below is a list of changes that I need to make which I documented before I left for Korea. The instructions are a little sparse so I will have to rebuild my context as we go.

- **Stage 1**: Switch unoptions plugins to use `TypedPlugin`

  - [x] Added `schema-types`
  - [x] Create a type definition for `TypedPlugin` which is the typed version of `BasePlugin`
  - [x] `createPlugin` should return the type `BasePlugin` and not `BasePluginFn`
  - [x] Modify all plugins that don't have any `Options` to use `TypedPlugin`

- **Stage 2**: Add ability to take `Options` at `createSink`
  - [ ] ACKNOWLEDGE: We aren't going to take options at the `createSink` stage. It adds type complexity that has a low pay off and can introduce subtle bugs. If the developer wants to defaults, they can define a `const defaultOptions` and merge it in.
  - [x] Add the `UploadPlugin` making sure we get proper initialization from the instance
- **Stage 3**: Dependencies `createPlugin(fn, { deps: ... })`
  - [ ] At `createPlugin`, take an option like `createPlugin(fn, { deps: 'upload'})` which means that this plugin has a dependency on the `upload` plugin.
