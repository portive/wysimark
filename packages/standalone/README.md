# Wysimark - The Rich Editor for Markdown - Standalone for JavaScript/TypeScript

Wysimark supports 100% of the CommonMark and GFM Markdown spec.

It has clean modern design, great usability, and features serverless image and file uploads with image resizing.

This version of Wysimark is a standalone version for JavaScript/TypeScript. There is also a React version and a version for Vue.js

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/editor-preview@2x.jpg" width="545" alt="Preview of Wysimark Editor">

Learn more about the Wysimark Markdown Editor at the [Wysimark Editor Home Page](https://wysimark.com).

Read the [Getting Started Guide and API Reference for the Wysimark Editor for React](https://www.wysimark.com/docs/react).

## 🔍 Design Goals

### Complete Compatibility

- **CommonMark and GFM Markdown Spec**: Ensure smooth and accurate bi-directional conversion between Markdown renderers and text editors. While getting 90% of Markdown right is straightforward, we ensure the last challenging 10% is also nailed down.

### Modern Design

- **Modern UI**: An aesthetic, contemporary interface that seamlessly integrates with today's web applications.

### User-Friendly

- **Intuitive Toolbar**: Dropdown menus that cover 100% of Markdown features, ensuring all functionalities are within your fingertips.
- **Markdown Shortcuts**: Supports familiar Markdown shortcuts for user's familiar with them. e.g., `**` for **bold**, `#` for a heading.
- **Keyboard Shortcuts**: Supports familiar keyboard shortcuts from word processors. e.g., `CTRL+B` (Windows, Nix) or `CMD+B` (Mac) for **bold**, `CTRL+SHIFT+1` (Windows, Nix) or `CMD+OPT+1` (Mac) for a heading.

### Advanced Media Support

- **Image/Attachment Upload**: Effortlessly upload files, powered by Portive's Serverless Web Component backend.
- **Image Resizing/Optimization in the Cloud**: Automacally delivers server resized and optimized files through a high speed CDN in the cloud.

## 100% Markdown Feature Support

- Tables
- Ordered and Ordered Lists
- Task lists
- Images with uploading and resizing
- File Attachments
- Heading and paragraph blocks
- Code blocks with syntax highlighting
- Inline code
- Links
- Text styling: bold, italic, inline code

## Usability

### Button Tooltips with hints and shortcuts

Hovering over the toolbar displays helpful tooltips and keyboard shortcuts. Window, Linux and Mac each get their own OS specific shortcuts following the conventions of each operating system.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/toolbar-button-tooltips@2x.png" width="540">

### Sticky Dropdown Menus with Hints and shortcuts

Menus stay closed until they are clicked open and then they stay open as you hover over other menu buttons. This makes discoverability in menus fast, easy and it works like your operating system. Drop down menus show icons, hints and device operating system dependant shortcuts.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/toolbar-menu@2x.png" width="541">

### Quick Pick Table Builder

Use the flyout to quickly select how many rows and columns in your table.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/toolbar-table-menu@2x.png" width="541">

### Quick Pick Emoji Picker

Integrates the `emoji-mart` Emoji Picker.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/toolbar-emoji-dialog@2x.png" width="559">

## Image and Attachment Uploading

Wysimark supports image and file uploading using Portive, a service created by the creator of Wysimark to an Amazon AWS S3 Bucket. Wysimark supports three intuitive ways to upload images to Wysimark.

### Upload from Toolbar

Click the image or attachment icon in the toolbar then select an image from your computer to upload it.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/image-select-dialog@2x.png" width="577">

### Drag and Drop Images and Files

Drag and drop files from Windows Explorer the Mac Finder or your operating system's equivalent directly into editor to start uploading.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/image-drag-and-drop@2x.png" width="545">

### Paste Images and Files

Copy and paste images from anywhere in your operating system directly into the editor to start uploading.

## Easy Image Resizing

### Drag to Resize

Grab a resize handle on the image and drag to resize.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/image-resize-drag@2x.jpg" width="545">

The current width and height of the image are shown as you drag.

An image, resized and optimized in the cloud, will be delivered to the user based on the final width and height.

### Preset: Resize to Fixed Width

You can provide a set of preset shortcuts to your users with fixed bounds that users can click.

In this example, we provide S, M and L sizes and M is set to have bounds of 320x320. Based on this image, the preset value shows 320x213.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/image-resize-fixed@2x.jpg" width="545">

### Preset: Resize to Fraction

You can also provide a set of preset shortcuts to your users with fractional sizes that users can click. This is useful, for example, if a user takes a screenshot in a high DPI device (e.g. 2x) and the use wants to resize it to exactly half the uploaded size so as to maintain a 1 to 1 size in the editor.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/image-resize-fraction@2x.jpg" width="545">

## Checklists

Supports nested checklists. Supports toggling of checklists by clicking on them.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/checklist-nested@2x.png" width="545">

## Lists: Mix Numbered, Bullet and Checklists

Supports mixing of numbered, bullet and checklists.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/list-mixed@2x.png" width="545">

## Nested Block Quotes

Supports nesting of block quotes through the toolbar menu. Selected block quote indent and outdent content. Fully supports all content type in block quotes like lists, tables and images.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/blockquote-nested@2x.png" width="545">

## Links

### Viewing Link Details

Click a link in the editor to see its details, like the website domain, link path, and tooltip. Want to change or delete the link? Use the icons at the top of the dialog.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/link-view-detail-dialog@2x.png" width="545">

### Editing Link Details

When Viewing Link Details click the "Edit Link" icon to edit the link. You can easily edit the URL and tooltip text for any link.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/link-edit-dialog@2x.png" width="545">

## Responsive Toolbar Layouts

The Wysimark Toolbar dynamically adjusts the layout of its buttons depending on the width of the available space. Works with full screen editing all the way down to narrow devices in portrait mode or thinner web forms.

### Wide Toolbar

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/editor-wide-width@2x.jpg" width="540">

### Medium Toolbar

Insert for table, images attachments and emoji are merged into one button.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/editor-medium-width@2x.jpg" width="559">

### Narrow Toolbar

The **bold** and _italic_ styles are merged into the styles button.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/editor-narrow-width@2x.jpg" width="360">

## Code Blocks with Syntax Highlighting

Built-in support for syntax highlighting in code blocks.

<img src="https://raw.githubusercontent.com/portive/wysimark-assets/main/readme/syntax-highlighting@2x.png" width="544">

## Works in all Modern Browsers

- Google Chrome
- Apple Safari
- Microsoft Edge
- Firefox

## Works in all Popular Devices

- Desktop: Windows, Linux and Mac
- Mobile/Tablet: iOS and Android
