import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "README.md",
  "LICENSE",
  "manifest.json",
  "main.js",
  "styles.css",
  "versions.json",
];

for (const file of requiredFiles) {
  await access(new URL("../" + file, import.meta.url));
}

const manifest = JSON.parse(
  await readFile(new URL("../manifest.json", import.meta.url), "utf8"),
);
const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const versions = JSON.parse(
  await readFile(new URL("../versions.json", import.meta.url), "utf8"),
);

const requiredManifestFields = [
  "id",
  "name",
  "version",
  "minAppVersion",
  "description",
  "author",
  "isDesktopOnly",
];
for (const field of requiredManifestFields) {
  if (!(field in manifest)) {
    throw new Error("manifest.json is missing " + field);
  }
}

if (!/^[a-z-]+$/u.test(manifest.id) ||
    manifest.id.includes("obsidian") ||
    manifest.id.endsWith("plugin")) {
  throw new Error("manifest id is not valid for the Obsidian directory");
}
if (/obsidian|plugin/iu.test(manifest.name)) {
  throw new Error("manifest name contains a reserved word");
}
if (!/^[0-9]+\.[0-9]+\.[0-9]+$/u.test(manifest.version)) {
  throw new Error("manifest version must use x.y.z");
}
if (manifest.version !== packageJson.version) {
  throw new Error("package and manifest versions differ");
}
if (versions[manifest.version] !== manifest.minAppVersion) {
  throw new Error("versions.json does not match manifest compatibility");
}
if (typeof manifest.description !== "string" ||
    manifest.description.length > 250 ||
    !manifest.description.endsWith(".")) {
  throw new Error("manifest description must be at most 250 characters and end with a period");
}
if (manifest.isDesktopOnly !== true) {
  throw new Error("Bridge Control must remain desktop-only");
}

console.log("Release metadata validated for Bridge Control " + manifest.version + ".");
