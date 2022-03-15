# Wysimark Editor Normalization

## 100% Coverage of Normalization

- Handle

  1. `normalize invalid parent`:

     - Do this normalization first because we may not want to do the normalization on the children if the parent is incorrect. For example, if there is an orphan `td`, we don't want to merge the children. Instead, we want to unwrap the `td` first allowing the children the opportunity to stay unmerged.
     - Only need to handle children with a strict requirement of a parent and make sure that they can exist as a child of the `Editor`.
     - This is a performance optimization in that we never want to loop through all the children of the `Editor` on every normalization. So by checking the children for the correct parent, this slow check won't need to happen.

  1. `normalize empty children` (single `{text: ''}`)
  1. `normalize invalid children`
     - This needs to run second because it's possible that invalid children are removed. And if they are, we end up with empty children.
  1. `normalize props`: Like
     - `td index`
     - `table columns` should ensure row length
     - `UnorderedListItemElement value`

- Block Element
  - Handle empty children nodes which may present as `[{text: ""}]` due to Slate's built in constraint turning empty nodes into these.
    - Delete the parent node or
    - populate the child with the node of the correct type
  - Handle invalid parent
    - Turn the node into a convertible type
    - Remove the node
  - Handle invalid children
    - Convert the children into valid types
    - Remove invalid children
- Inline Element
  - Empty, probably just remove it
  - Children includes an Inline
    - Unwrap it
    - Remove it
    - Or is it okay? Probably not though I would think.

## General Rules

- See `docs.slatejs.org` for default normalizations
- An `Element` Node will never replace a `Leaf` Node so we don't have to protect agains that.
- A `Leaf` Node can replace an `Element` Node and we should protect agains that. For example, say we remove the last `tr` of a `table`. Slate's normalization will add a `Text` node as a child of the `table`.

## Table and Code Element Shared Rules

Both `table` and `code-block` elements are nested elements. It takes more than one element type to comprise a single unit of the parent element. For example, code includes a `code-block` and `code-line` element.

### Handling Invalid Children

We handle invalid children in two ways, by testing for a valid parent and by testing for a valid child.

The rules are:

- If any child element part of a nested element has the incorrect parent, it needs to convert itself into a generic `ParagraphElement` which can easily be converted to different types of elements, like a `code-line`.
- If the parent has an invalid child, it either needs to:
  - Remove it
  - Convert it to a valid type

## Table Element Rules

- `TableElement` parent rules

  - `table` element has the wrong parent (ie not root or `blockquote`), then unwrap it
  - `tr` element has the wrong parent, then unwrap it
  - `td` elemeht has the wrong parent, then unwrap it
  - we should be left with `p` elements now

- `TableElement` children rules
  - [x] `table`
    - [x] no children, remove table
    - [x] element has the wrong children, remove them (should not happen)
  - [x] `tr`
    - [x] no children, remove row
    - [x] element has the wrong children, remove them (should not happen)
  - [ ] `td` element has the wrong children, convert them to `p` if convertible and otherwise remove them. Note that Nested elements will automatically convert to `p` because they will have the wrong parent type.

## Code Block Element Rules

- [ ] `CodeBlock` parent rules

  - [ ] `code-block` has the wrong parent then unwrap it leaving `code-line`
  - [ ] `code-line` has the wrong parent, then convert it to a `p`

- [ ] `CodeBlockElement` children rules
  - [ ] `code-block` has the wrong children, then try to convert them to `code-line` or remove them.
    - [ ] Convert `ConvertibleElement` to `code-line`
    - [ ] Remove `void`
  - [ ] `code-line` should only have exactly one `UnstyledText` element.

## BlockQuote Element Rules

- [ ] `BlockQuote` parent rules

  - [ ] `blockquote` has the wrong parenta then unwrap it

- [ ] `BlockQuote` children rules
  - [ ] `blockquote` can't have the wrong children elements as anything is valid except for nested descendants which will fix themselves.
