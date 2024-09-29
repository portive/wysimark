import { type ClassValue, clsx } from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"

export type ElementProps<N extends React.ElementType | React.FC> =
  React.ComponentPropsWithoutRef<N>

export { clsx, twMerge }
export type { ClassValue }

/**
 * cx with `tailwind-merge` to remove conflicting Tailwind class names.
 *
 * Identicaly to `cn` but with a different name to avoid any auto-import
 * confusion.
 */
export function tx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Takes as it's first argument, a set of `props`. We then merge the
 * rest of the arguments into the `className` of the `props` using
 * `tx` which is a tailwind safe version of `clsx`
 */
export function tprops<T extends { className?: string }>(
  { className, ...props }: T,
  ...classes: Parameters<typeof tx>
): Omit<T, "className"> & { className: string } {
  const nextClassName = tx(...classes, className)
  return { ...props, className: nextClassName }
}

// Allow either an ElementType or a function that takes props and returns JSX
/**
 * REJECTED:
 *
 * - Letting `defaultClases` accept a function. Rejected because we don't know
 *   what `props` it's going to eat at execution time. Because of this, props
 *   will flow through to the underlying element, like the `div` which is
 *   not what we want. It is limited danger though because we can probably
 *   make it so that the props won't conflict with the HTML element without
 *   showing a type error... but still, a little yucky.
 *
 */
// export function telem<T extends HTMLElement>(
//   defaultClasses: string,
//   Component:
//     | keyof JSX.IntrinsicElements
//     | ((props: HTMLAttributes<T>) => ReactNode)
// ) {
//   return function $telem({ className, ...props }: HTMLAttributes<T>) {
//     const mergedProps = {
//       ...tprops(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         props as any, // Spread the rest of the props
//         defaultClasses, // Apply default classes first
//         className // Append className from props last
//       ),
//     }

//     // If Component is a function, call it with the mergedProps, otherwise render the element
//     if (typeof Component === "function") {
//       return Component(mergedProps)
//     }

//     return <Component {...mergedProps} />
//   }
// }

export function telem<K extends keyof JSX.IntrinsicElements>(
  defaultClassNames: string,
  Tag: K,
  fn?: (props: JSX.IntrinsicElements[K]) => JSX.Element
) {
  return function $telem({
    className,
    ...props
  }: JSX.IntrinsicElements[K]): JSX.Element {
    const mergedProps = {
      ...tprops(
        props as JSX.IntrinsicElements[K], // Spread the rest of the props
        defaultClassNames, // Apply default classes first
        className // Append className from props last
      ),
    } as JSX.IntrinsicElements[K]
    if (fn) {
      return fn(mergedProps)
    } else {
      // yucky, but it works
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Component = Tag as React.ElementType
      return <Component {...mergedProps} />
    }
  }
}

// export function tfunc<
//   K extends keyof JSX.IntrinsicElements | React.FC,
//   P extends Record<string, unknown> = {}
// >(
//   defaultClasses: string,
//   fn: (
//     props: K extends keyof JSX.IntrinsicElements
//       ? JSX.IntrinsicElements[K] & P
//       : K extends React.FC
//       ? Parameters<K>[0] & P
//       : never
//   ) => JSX.Element
// ) {
//   return ({
//     className,
//     ...props
//   }: K extends keyof JSX.IntrinsicElements
//     ? JSX.IntrinsicElements[K] & P
//     : K extends React.FC
//     ? Parameters<K>[0] & P
//     : never): JSX.Element => {
//     const mergedProps = {
//       ...tprops(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         props as any, // Spread the rest of the props
//         defaultClasses, // Apply default classes first
//         className // Append className from props last
//       ),
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } as any
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return fn(mergedProps as any)
//   }
// }

/**
 * This is the meat of `twui`. It takes a set of variations and a key to choose
 * which variation to use. The variations are a set of key/value pairs where
 * the key is the name of the variation and the value is the Tailwind classes
 * to use for that variation.
 *
 * The key can be a string or a boolean. If it's a string, it will use the
 * variation with that key. If it's a boolean, it will use the variation with
 * the key of "true" or "false".
 */
export function tvary<T extends Record<string, string | string[]>>(
  variations: T,
  key?: keyof T extends "true" | "false" ? boolean | keyof T : keyof T
) {
  if (typeof key === "string") {
    return clsx(variations[key])
  } else if (key === true) {
    return clsx(variations["true"])
  } else if (key === false) {
    return clsx(variations["false"])
  } else {
    return undefined
  }
}
