import { Simplify } from "type-fest"

export type X = "link"

export type NotX = Exclude<unknown, X>

type Y = { name: "hello" } & { [key: string]: number }

type Y2 = Simplify<Y>

type Name = Y["name"]

type Z =
  | { type: "a"; a: "alpha" }
  | { type: "b"; b: "bravo" }
  | { [key: string]: unknown }

type Z2 = Simplify<Z>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const z = {} as Z2

if (z.type === "a") {
  z.a
} else if (z.type === "b") {
  z.b
}
