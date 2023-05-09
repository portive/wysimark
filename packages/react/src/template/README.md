# Template Plugin Readme

The following template files are designed so that:

- It automatically replaces the `name` of the created plugin in each template.
- It does so in a way that the TypeScript remains valid.

While the template may include any valid HandleBars code, we added another convention that allows us to build a template with proper TypeScript type checking.

Replaces these strings:

- `__VarName__`: Replaced with a PascalCase version of the plugin name
- `__varName__`: Replaced with a camelCase version of the plugin name
- `__var-name__`: Replaced with a dash-case version of the plugin name
