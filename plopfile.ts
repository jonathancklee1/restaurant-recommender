import type { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  plop.setGenerator("component", {
    description: "Create a new React component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.tsx",
        templateFile: "plop-templates/component.hbs",
      },
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.module.css",
        templateFile: "plop-templates/componentCss.hbs",
      },
    ],
  });
}
