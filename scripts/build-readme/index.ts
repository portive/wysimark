import * as fs from "fs"
import * as path from "path"

const BASE_TEMPLATE_PATH = "./templates/readme/README.md"
const PACKAGES_DIR = "./packages"

function concatenateReadmeForPackage(packageName: string): void {
  const preamblePath = path.join(PACKAGES_DIR, packageName, "README_PREAMBLE.md")
  const outputPath = path.join(PACKAGES_DIR, packageName, "README.md")

  // Ensure preamble file exists
  if (!fs.existsSync(preamblePath)) {
    console.error(`Preamble file not found for package: ${packageName}`)
    return
  }

  // Read contents of the base template and preamble
  const baseContent = fs.readFileSync(BASE_TEMPLATE_PATH, "utf8")
  const preambleContent = fs.readFileSync(preamblePath, "utf8")

  // Concatenate
  const concatenatedContent = `${preambleContent}\n\n${baseContent}`

  // Write to the output README.md
  fs.writeFileSync(outputPath, concatenatedContent, "utf8")

  console.log(`README.md generated for package: ${packageName}`)
}

// Assuming all subdirectories under "packages" need a README generated
const packages = ["react", "standalone", "vue"]

packages.forEach(concatenateReadmeForPackage)
