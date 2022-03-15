import chalk from "chalk"
import prettyBytes from "pretty-bytes"

type Item = {
  id: string
  size: number
  origSize: number
  renderExports: string[]
  removedExports: string[]
  dependents: string[]
  percent: number // out of 100
  reduction: number // out of 100
}

type Group = {
  name: string
  size: number
  percent: number
  count: number
}

/**
 * Extracts a shorter identifiable package name from the `item.id`
 *
 * It does two main things:
 *
 * 1. Reduces any name with node_modules in it to either "package" or
 *    "@org/package"
 * 2. Collapses any subpaths like `lodash/last` to `lodash` for deep imports.
 */
function extractPackageName(id: string) {
  const ORG_PACKAGE_REGEXP = /.*\/node_modules\/([@][^/]+[/][^/]+)/
  const SINGLE_PACKAGE_REGEXP = /.*\/node_modules\/([^/]+)/
  const pkgMatch = id.match(ORG_PACKAGE_REGEXP)
  if (pkgMatch) return pkgMatch[1]
  const singleMatch = id.match(SINGLE_PACKAGE_REGEXP)
  if (singleMatch) return singleMatch[1]
  return id
}

export function extractPackageSummaries(items: Item[]) {
  const groupLookup: Record<string, Group> = {}
  for (const item of items) {
    const packageName = extractPackageName(item.id)
    // if (groupLookup[packageName]) {
    //   console.log(`From ${item.id}, ${packageName} exists!`)
    //   console.log(item.origSize, item.size)
    // }
    const group = (groupLookup[packageName] = groupLookup[packageName] || {
      name: packageName,
      size: 0,
      percent: 0,
      count: 0,
    })
    group.size += item.size
    group.percent += item.percent
    group.count++
  }
  const groups = Object.values(groupLookup).sort((a, b) => b.size - a.size)
  const output = groups
    .map(
      (group) =>
        `${chalk.yellow(group.name)} - ${chalk.whiteBright(
          prettyBytes(group.size)
        )}  ${chalk.green(`(${group.percent.toFixed(2)}%)`)}  ${chalk.magenta(
          `${group.count}`
        )}`
    )
    .join("\n")
  return output
}

type DependencyInMap = {
  name: string
  size: number
  directDependents: Set<string>
  renderExports: Set<string>
}

type Dependency = {
  name: string
  size: number
  directDependents: Array<string>
  renderExports: Array<string>
}

export function isNodeModule(id: string) {
  return !!id.match(/\/node_modules\//)
}

function extractDirectDependentCount(dependents: string[]) {
  let count = 0
  const directDependents: string[] = []
  for (const dependent of dependents) {
    if (!isNodeModule(dependent)) {
      count++
      directDependents.push(dependent)
    }
  }
  return { count, directDependents }
}

export function extractDirectlyImportedPackages(items: Item[]) {
  const dependencyMap: Record<string, DependencyInMap> = {}
  for (const item of items) {
    const packageName = extractPackageName(item.id)
    const info = extractDirectDependentCount(item.dependents)
    if (info.count > 0) {
      const dependency = (dependencyMap[packageName] = dependencyMap[
        packageName
      ] || {
        name: packageName,
        size: 0,
        directDependents: new Set(),
        renderExports: new Set(),
      })
      dependency.size += item.size
      for (const x of info.directDependents) {
        dependency.directDependents.add(x)
      }
    }
  }
  const dependencies: Dependency[] = []
  for (const entry of Object.entries(dependencyMap)) {
    const [, dependency] = entry
    dependencies.push({
      name: dependency.name,
      size: dependency.size,
      directDependents: Array.from(dependency.directDependents),
      renderExports: Array.from(dependency.renderExports),
    })
  }
  // console.log(dependencies)
  const output: string[] = []
  for (const dependency of dependencies) {
    output.push(
      `${chalk.yellow(dependency.name)} - ${chalk.whiteBright(
        `(${dependency.directDependents.length.toString()})`
      )} - ${chalk.green(prettyBytes(dependency.size))} `
    )
  }
  return output.join("\n")
}

export function analyzeRollup(items: Item[]) {
  const summaryOutput = extractPackageSummaries(items)
  const dependenciesOutput = extractDirectlyImportedPackages(items)
  return `Size Summary\n${summaryOutput}\n\nDirect Dependencies\n${dependenciesOutput}`
}
