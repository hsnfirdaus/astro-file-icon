import { readFileSync, readdirSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import * as prettier from "prettier";

const targetPackage = join(
  import.meta.dirname,
  "..",
  "packages",
  "astro-file-icon"
);
const targetPackageSrc = join(targetPackage, "src");
const sourcePackage = join(import.meta.dirname, "react-file-icon");
const sourcePackageSrc = join(sourcePackage, "src");
const sourceGlyphs = join(sourcePackageSrc, "glyphs.js");
const targetGlyphs = join(targetPackageSrc, "glyphs");
for (const file of readdirSync(targetGlyphs)) {
  unlinkSync(join(targetGlyphs, file));
}

const glyphContent = readFileSync(sourceGlyphs, {
  encoding: "utf-8",
});
const regex = /\'?([0-9a-zA-Z]*?)\'?\:\s\(([\s\S]*?)\),/g;
const matches = [...glyphContent.matchAll(regex)];

const icons: string[] = [];

for (const item of matches) {
  const name = item[1];
  const jsx = item[2].replace("fillRule=", "fill-rule=");
  icons.push(name);

  const formattedPath = await prettier.format(jsx, {
    parser: "html",
  });
  const targetSvg = join(targetGlyphs, name + ".svg");
  writeFileSync(targetSvg, formattedPath);
}
const typeValue = `
export type IconType = ${icons.map((icon) => `'${icon}'`).join("|")};
`;
const formattedTypeValue = await prettier.format(typeValue, {
  parser: "typescript",
});
const targetType = join(targetPackageSrc, "icon.type.ts");
writeFileSync(targetType, formattedTypeValue);

const sourceDefaultStylesFile = join(sourcePackageSrc, "defaultStyles.js");

const defaultStylesContent = readFileSync(sourceDefaultStylesFile, {
  encoding: "utf-8",
});
const stylesContent = await import(
  "data:text/javascript," + encodeURIComponent(defaultStylesContent)
);
const styleItems = Object.keys(stylesContent.default);

const defaultStylesValue = `
import type { BaseIconProps } from "./FileIcon.astro";

export type StylesItem = ${styleItems.map((style) => `'${style}'`).join("|")};

${defaultStylesContent.replace("export default {", "const defaultStyles: { [key in StylesItem]: BaseIconProps } = {")}
export default defaultStyles;
`;
const formattedDefaultStylesValue = await prettier.format(defaultStylesValue, {
  parser: "typescript",
});
const targetDefaultStyles = join(targetPackageSrc, "defaultStyles.ts");
writeFileSync(targetDefaultStyles, formattedDefaultStylesValue);

const sourcePackageFile = join(sourcePackage, "package.json");
const { default: pkg } = await import(sourcePackageFile, {
  assert: { type: "json" },
});
const targetPackageFile = join(targetPackage, "package.json");
const targetPackageContent = readFileSync(targetPackageFile, {
  encoding: "utf-8",
});
const replacedVersion = targetPackageContent.replace(
  /"version": "(.*?)",/,
  `"version": "${pkg.version}",`
);
writeFileSync(targetPackageFile, replacedVersion);
