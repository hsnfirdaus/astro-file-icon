# Astro File Icon

[![astro file icon npm version](https://img.shields.io/npm/v/astro-file-icon.svg?style=flat-square&label=npm:astro-file-icon)](https://www.npmjs.com/package/astro-file-icon) [![react file icon npm version](https://img.shields.io/npm/v/react-file-icon.svg?style=flat-square&label=npm:react-file-icon)](https://www.npmjs.com/package/react-file-icon)

Astro component that display icon of file by it's extension. Based on [react-file-icon](https://github.com/corygibbons/react-file-icon).

Take a look at [astro-file-icon.pages.dev](https://astro-file-icon.pages.dev/) to view the default icon styles.

## Installation

```bash
pnpm install astro-file-icon
# Or
yarn add astro-file-icon
# Or
npm install astro-file-icon
```

```js
import { FileIcon } from "astro-file-icon";
```

## Props

| Property          | Type   | Default      | Description                                                                                                                        |
| :---------------- | :----- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `color`           | string | `whitesmoke` | Color of icon background                                                                                                           |
| `extension`       | string | `undefined`  | Text to display in label                                                                                                           |
| `fold`            | bool   | `true`       | Displays the corner fold                                                                                                           |
| `foldColor`       | string | `undefined`  | Color of the corner fold                                                                                                           |
| `glyphColor`      | string | `undefined`  | Color of file type icon                                                                                                            |
| `gradientColor`   | string | `white`      | Color of page gradient                                                                                                             |
| `gradientOpacity` | number | `0.25`       | Opacity of page gradient                                                                                                           |
| `labelColor`      | string | `undefined`  | Color of label                                                                                                                     |
| `labelTextColor`  | string | `white`      | Color of label text                                                                                                                |
| `labelUppercase`  | bool   | `false`      | Displays the label in all caps                                                                                                     |
| `radius`          | number | `4`          | Corner radius of the file icon                                                                                                     |
| `type`            | enum   | `undefined`  | Type of [glyph icon to display](https://github.com/hsnfirdaus/astro-file-icon/blob/main/packages/astro-file-icon/src/icon.type.ts) |

## Default Styles

We also export an object of [default styles](https://github.com/hsnfirdaus/astro-file-icon/blob/main/packages/astro-file-icon/src/defaultStyles.ts) that can be used as a starting point when rendering icons. Object keys map to file extensions.

```js
import { FileIcon, defaultStyles } from "astro-file-icon";

// Render a .docx icon with default styles
<FileIcon extension="docx" {...defaultStyles.docx} />;
```
