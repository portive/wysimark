/**
 * Chat GPT told me to add this file to make TS happy.
 *
 * ```
 * declare module '*.vue' {
 *   import { ComponentOptions } from 'vue';
 *   const component: ComponentOptions;
 *   export default component;
 * }
 * ```
 *
 * Also something similar documented here but slightly different
 * https://www.thisdot.co/blog/your-first-vue-3-app-using-typescript
 *
 * ```
 * declare module '*.vue' {
 *   import { defineComponent } from "vue"
 *   const component: ReturnType<typeof defineComponent>
 *   export default component
 * }
 * ```
 */

declare module "*.vue" {
  import { ComponentOptions } from "vue"
  const component: ComponentOptions
  export default component
}
