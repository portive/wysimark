import { AssertType } from "@thesunny/assert-type"
import { CompactMap, IsEqual, ItemFromArray, Prettify } from "./index"
import { Complete } from "."

function takes<T>(v: T) {
  return v
}

describe("IsEqual", () => {
  it("should return true if IsEqual two types", () => {
    takes<IsEqual<string, string>>(true)
  })
})

// describe("assertType", () => {
//   it("should assertType.equal", () => {
//     assertType.equal<{ a: string }, { a: string }>(true)
//   })

//   it("should assertType.notEqual", () => {
//     assertType.notEqual<{ a: string }, { a: number }>(true)
//     assertType.notEqual<{ a: number }, { a: string }>(true)
//     assertType.notEqual<{ a: string }, { a: string; b: string }>(true)
//     assertType.notEqual<{ a: string; b: string }, { a: string }>(true)
//   })

//   it("should asserType.extends", () => {
//     assertType.extends<"hello", string>(true)
//     assertType.extends<string, string>(true)
//     // eslint-disable-next-line @typescript-eslint/ban-types
//     assertType.extends<{ a: string }, {}>(true)
//   })

//   it("should assertType.notExtends", () => {
//     assertType.notExtends<string, "hello">(true)
//   })

//   it("should assertType.null", () => {
//     assertType.null<null>(true)
//   })
// })

describe("Complete", () => {
  it("should complete a flat object", async () => {
    type t1 = Complete<{
      a1: number
      a2?: number
      a3: number | undefined
      a4?: number | undefined
    }>
    AssertType.Equal<
      t1,
      {
        a1: number
        a2: number | undefined
        a3: number | undefined
        a4: number | undefined
      }
    >(true)
  })

  it("should complete a nested object", async () => {
    type t1 = Complete<{
      a1: number
      a2?: number
      a3: number | undefined
      a4?: number | undefined
      sub0: {
        a1: number
        a2?: number
        a3: number | undefined
        a4?: number | undefined
      }
      sub1?: {
        a1: number
        a2?: number
        a3: number | undefined
        a4?: number | undefined
      }
    }>
    AssertType.Equal<
      t1,
      {
        a1: number
        a2: number | undefined
        a3: number | undefined
        a4: number | undefined
        sub0: {
          a1: number
          a2: number | undefined
          a3: number | undefined
          a4: number | undefined
        }
        sub1:
          | {
              a1: number
              a2: number | undefined
              a3: number | undefined
              a4: number | undefined
            }
          | undefined
      }
    >(true)
  })
})

describe("CompactMap", () => {
  it("should remove all never properties", () => {
    AssertType.Equal<{ a: string }, CompactMap<{ a: string; b: never }>>(true)
  })
})

type ObjectFrom<T> = {
  [K: string]: T
}

// interface Generic {
//   iteratee: any
// }

// interface NumberGeneric extends Generic {
//   iteratee: string
// }

// type MapGeneric<T extends object, G extends Generic> = {
//   [K in keyof T]: G["iteratee"]
// }

type MapPromise<T extends Record<string, unknown>> = {
  [K in keyof T]: Promise<T[K]>
}

type MapOptional<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] | undefined
}

// assertType.equal<
//   { a: Promise<string | undefined> },
//   MapPromise<MapOptional<{ a: string }>>
// >(true)
// assertType.equal<[Promise<string>], MapPromise<[string]>>(true)

// assertType.equal<{ [K: string]: string }, ObjectFrom<string>>(true)

// assertType.equal<{ a: string }, MapIf<{ a: string }, string>>(true)

describe("Prettify", () => {
  it("should prettify", () => {
    // These are the same right now.
    // Write a better test.
    type Ugly = MapPromise<MapOptional<ObjectFrom<string>>>
    type K = Prettify<MapPromise<MapOptional<ObjectFrom<string>>>>
    AssertType.Equal<Ugly, K>(true)
  })
})

describe("ItemFromArray", () => {
  it("should extract string from string[]", () => {
    type T = ItemFromArray<string[]>
    AssertType.Equal<string, T>(true)
  })

  it("should extract string|number from [string,number]", () => {
    type T = ItemFromArray<[string, number]>
    AssertType.Equal<string | number, T>(true)
  })

  it("should return never if array does not extend second argument", () => {
    type T = ItemFromArray<string[], number>
    AssertType.Equal<never, T>(true)
  })

  it("should return the type if array does extend second argument", () => {
    type T = ItemFromArray<string[], string>
    AssertType.Equal<string, T>(true)
  })
})
