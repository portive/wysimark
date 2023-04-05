# To Do

I've just come back from vacation in Korea and trying to rebuild my context.

Basically, what we are trying to do is make this `slate-pluggable` project use the types from the project named `plugin-types`. The goal here is to allow us to get, from the plugins, two things without having to define them separately:

1. The `CustomTypes` for Slate
2. The plugins

You can see an example of this at:
~/projects/demos/plugin-types/src/index.tsx

Below is a list of changes that I need to make which I documented before I left for Korea. The instructions are a little sparse so I will have to rebuild my context as we go.

- **Stage 1**: Switch unoptions plugins to use `TypedPlugin`

  - [x] Added `schema-types`
  - [ ] Create a type definition for `TypedPlugin` which is the typed version of `BasePlugin`
  - [ ] `createPlugin` should return the type `BasePlugin` and not `BasePluginFn`
  - [ ] Modify all plugins that don't have any `Options` to use `TypedPlugin`

- **Stage 2**: Add ability to take `Options` at `createSink`
  - [ ] ACKNOWLEDGE: We aren't going to take options at the `createSink` stage. It adds type complexity that has a low pay off and can introduce subtle bugs. If the developer wants to defaults, they can define a `const defaultOptions` and merge it in.
  - [ ] Accept `options` in `createSink` method with the type of the merged `Options` fro the `TypedPlugin` types
  - [ ] Make sure that the `options` make it into the initialization stage when processing each plugin. We can do this by using a `console.log` for the moment
  - [ ] Add the `UploadPlugin` making sure we get proper initialization from the instance
- **Stage 3**: Dependencies `createPlugin(fn, { deps: ... })`
  - [ ] At `createPlugin`, take an option like `createPlugin(fn, { deps: 'upload'})` which means that this plugin has a dependency on the `upload` plugin.
