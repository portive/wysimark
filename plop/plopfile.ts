import { NodePlopAPI } from "plop"

export default function (plop: NodePlopAPI) {
  plop.setGenerator("test", {
    description: "test",
    prompts: [
      {
        type: "input",
        name: "packageName",
        message: "Name of package (aka folder under './src')",
      },
    ],
    actions: [],
  })
}
