import { Simplify, UnionToIntersection } from "type-fest"

export type A = { allowsBold: true }
export type B = { allowsItalice: true }

type Extract<T> = T extends () => infer R ? R : never

const a = (() => ({})) as () => A
const b = (() => ({})) as () => B

const fn = <T, F extends () => T>(array: F[]) => {
  return { array } as {
    array: F[]
    F: F
  }
}

export const x = fn([a, b])

export type X = typeof x

export type Y = Simplify<UnionToIntersection<Extract<X["F"]>>>
