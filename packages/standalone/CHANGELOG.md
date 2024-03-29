# @wysimark/standalone

## 3.0.20

### Patch Changes

- 43b4d35: Preserve consecutive paragraphs in Markdown using nbsp

## 3.0.19

### Patch Changes

- 6d61215: Update README cosmetic update

## 3.0.18

### Patch Changes

- 40f6374: Update README with screenshots for all packages

## 3.0.17

### Patch Changes

- 4cf98fd: Close the edit tooltip before switching to the edit link dialog

## 3.0.16

### Patch Changes

- 4c261a4: Improve anchor dialog layout when there is no box-sizing reset in page

## 3.0.6

### Patch Changes

- df4f56d: bugfix: If you click a checkbox immediately after first render onchange doesn't get called

## 3.0.5

### Patch Changes

- 0d53d35: Deleting in an empty code block deletes code block

## 3.0.4

### Patch Changes

- 2692951: Fix placement of drop down arrow in toolbar

## 3.0.2

### Patch Changes

- 82716be: Fix numbering of ordered list items in separate lists

## 3.0.1

### Patch Changes

- 501042d: Remove unnecessary console.log used for debugging
- 30cf489: When user clicks inside editor but outside content focus the editor

## 3.0.0

### Major Changes

- a02532c: Fix remove styles in menu and hotkey

## 2.8.3

### Patch Changes

- 09c647e: Improve first paragraph spacing and fix firefox requires two clicks to focus
- 2f84090: Enable valid serialization of an empty task list
- 8a4fe70: Allow backspace to turn empty list item to paragraph
- 53c105e: Fix list item icon position
- 279d135: Enable click to toggle task list item

## 2.8.2

### Patch Changes

- a88f3ad: Make toolbar dynamic based on width

## 2.8.1

### Patch Changes

- f57d23a: Add throttleInMs to hook dependencies

## 2.8.0

### Minor Changes

- 4aee21c: Improve way-way binding in Vue and state change rejection

## 2.7.0

### Minor Changes

- aff17cf: Convert Wysimark into a controlled component

## 2.6.7

### Patch Changes

- fa67abd: Improve display of long urls and title of links in anchor dialog

## 2.6.6

### Patch Changes

- 2c5564f: Fix title support for links in markdown conversion

## 2.6.5

### Patch Changes

- f930188: Improve code blocks so syntax language does not horizontally scroll

## 2.6.4

### Patch Changes

- 2774d50: Fix spacing in code block issue

## 2.6.3

### Patch Changes

- 82e5f65: Fix bug that closes anchor dialog when clicked on

## 2.6.2

### Patch Changes

- 9b70ac1: Support properly inline image in link

## 2.6.1

### Patch Changes

- 9543bb4: Fix anchor dialog not opening in certain cases

## 2.6.0

### Minor Changes

- 6fadab0: Add context dialog for anchor links

## 2.5.1

### Patch Changes

- 33bdffe: Enable ability to select language from code block itself

## 2.5.0

### Minor Changes

- ce20a5a: Add table column alignment menu

## 2.4.1

### Patch Changes

- e248671: When pasting text/plain interpret it as Markdown

## 2.3.0

### Minor Changes

- 6366f9d: Add placeholder support to standalone

## 2.2.22

### Patch Changes

- ea3dbc1: mod+a in table cell selects cell not document

## 2.2.21

### Patch Changes

- 468b060: Move table row menu buttons to fit in editor container

## 2.2.20

### Patch Changes

- a832a8b: Fix autocorrect italic

## 2.2.19

### Patch Changes

- 772afe4: Fix issue with Safari breaking on negative look behind by disabling auto markup on single tilde and asterisk temporarily

## 2.2.16

### Patch Changes

- 3a99d8d: Fix bug when inserting a link with an invalid URL

## 2.2.15

### Patch Changes

- ca2a8a0: Fix bug with relative image URLs in convert

## 2.2.13

### Patch Changes

- 07a9ac3: Fix published types in standalone

## 2.2.12

### Patch Changes

- 92aa93d: Use a shared tsup config to build react and standalone

## 2.2.11

### Patch Changes

- 5c1d66b: Updated standalone to use a single tsup config file

## 2.2.10

### Patch Changes

- Add React to standalone dependencies

## 2.2.9

### Patch Changes

- Standalone build with a node and browser version

## 2.2.8

### Patch Changes

- ecd594f: Fix dependencies for all editor packages

## 2.2.7

### Patch Changes

- Fix React dependencies issue for @wysimark/standalone

## 2.2.6

### Patch Changes

- Update dependencies so that it works with commonjs

## 2.2.2

### Patch Changes

- cf44cf6: Change nanoid to a devDependency so that it is included in the react package

## 2.2.1

### Patch Changes

- 3af5167: Add styling directly on headings so it works with resets

## 2.2.0

### Minor Changes

- Add ability to specify a placeholder to Editable

## 2.1.0

### Minor Changes

- bcd2527: Attachments are now treated as normal Markdown links for easier conversion and compatibility

## 2.0.14

### Patch Changes

- 47c5875: Fix toolbar action to set paragraph style

## 2.0.13

### Patch Changes

- 25815ad: Publish 3 packages using changesets for testing purposes

## 2.0.10

### Patch Changes

- Add standalone and vue support
