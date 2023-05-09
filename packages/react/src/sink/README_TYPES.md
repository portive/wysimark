# Important Information About Sink Types

- Plugin types are built around `PluginCustomType`
- Plugin definition is `PluginFunction<PluginCustomType>` that is `(editor: ) => PluginObject<PluginCustomType>`

## PluginCustomTypes

Every Sink Plugin defined 4 `PluginCustomTypes` which is the main and most important declaration in a Plugin.

1. `Name`: Which is a string literal that uniquely identifies the type.
2. `Editor`: Which is the version of the `Editor` object that it uses. This always extend `BaseEditor` but can also extend `ReactEditor` and others and also include its own properties needed to make it work.
3. `Element`: Which are the `Element` types used by the plugin.
4. `Text`: Which is the `Text` type used by the plugin.

It might look something like:

```typescript
type AnchorCustomTypes = {
  Name: "Anchor"
  Editor: BaseEditor & ReactEditor & { supportsAnchor: true }
  Element: { type: "anchor"; href: string; children: { text: string }[]] }
  Text: {text: string}
}
```

The rest of the Plugin is derived from `PluginCustomTypes` somehow but because of the way TypeScript works when passing arrays into a function argument, we can't always have `T extends PluginCustomTypes`. So we have a bunch of manipulation functions and other types that we need to extend from.

## PluginFunction

A plugin function, which is the definition of a plugin. This is what is passed into the `createSink` method; however, we choose not to just call it Plugin to avoid ambiguity with other similar values related to the `PluginFunction`.

Namely, the `PluginFunction` when run with an `editor`, it returns an object. This object contains the guts of the plugin that is used while the editor is running. This object it returns is called the `PluginObject`.

## PluginObject

The `PluginObject` contains various properties which includes method that help create the Editor object and also methods used in `<Sink.Editable>`.

For example, for `Editor` it helps:

- define `isVoid`
- define `isInline`

For example, it includes methods that help with:

- `renderElement`
- `renderLeaf`
- `onChange`
- `onKeyDown`
