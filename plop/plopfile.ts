import { camelCase, paramCase, pascalCase } from "change-case"
import { NodePlopAPI } from "plop"

import { registerHandleBarHelpers } from "./register-handle-bar-helpers"

function transform(template: string, data: Record<string, string>) {
  let nextTemplate = template
  for (const [key, value] of Object.entries(data)) {
    const mappings = {
      [`__var${pascalCase(key)}__`]: camelCase(value),
      [`__Var${pascalCase(key)}__`]: pascalCase(value),
      [`__var-${paramCase(key)}__`]: paramCase(value),
    }
    for (const [replaceKey, replaceValue] of Object.entries(mappings)) {
      nextTemplate = nextTemplate.replaceAll(replaceKey, replaceValue)
    }
  }
  return nextTemplate
}

export default function (plop: NodePlopAPI) {
  registerHandleBarHelpers(plop)
  plop.setGenerator("plugin", {
    description: "Create new plugin",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Name of package (aka folder under './src')",
      },
    ],
    actions: [
      {
        type: "addMany",
        base: "../src/template/",
        transform,
        // transform: (
        //   template: string,
        //   data: Record<string, string>,
        //   cfg: any
        // ) => {
        //   console.log("transform", template, data, cfg)
        //   return template
        // },
        templateFiles: "../src/template/**/*.(ts|tsx)",
        destination: "../src/{{ dashCase name }}/",
      },
    ],
  })
}
