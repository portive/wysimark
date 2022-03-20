import { Mark, MarkProps } from "~/editor/types"
import {
  diffMarksExceptCode,
  getMarksInOrder,
  tokenizeMarksExceptCode,
} from "../utils/diff-marks"

describe("get marks", () => {
  it("should get marks in order", async () => {
    const marks = getMarksInOrder({
      bold: true,
      italic: true,
      ins: true,
      del: true,
      sup: true,
      sub: true,
    })
    expect(marks).toEqual(["bold", "italic", "ins", "del", "sup", "sub"])
  })

  it("should get marks out of order", async () => {
    const marks = getMarksInOrder({
      sub: true,
      sup: true,
      del: true,
      ins: true,
      italic: true,
      bold: true,
    })
    expect(marks).toEqual(["bold", "italic", "ins", "del", "sup", "sub"])
  })
})

describe("add marks", () => {
  it("should add marks ", async () => {
    const prevMarks: Mark[] = []
    const nextMarkProps: MarkProps = { sub: true, del: true, bold: true }
    const diff = diffMarksExceptCode({ prevMarks, nextMarkProps })
    expect(diff).toMatchObject({
      removeMarks: [],
      innerMarks: [],
      addMarks: ["bold", "del", "sub"],
      nextMarks: ["bold", "del", "sub"],
    })
  })

  it("should add marks on top of other marks", async () => {
    const prevMarks: Mark[] = ["bold", "del", "sub"]
    const nextMarkProps: MarkProps = {
      sub: true,
      del: true,
      bold: true,
      sup: true,
      ins: true,
      italic: true,
    }
    const diff = diffMarksExceptCode({ prevMarks, nextMarkProps })
    expect(diff).toMatchObject({
      removeMarks: [],
      innerMarks: ["bold", "del", "sub"],
      addMarks: ["italic", "ins", "sup"],
      nextMarks: ["bold", "del", "sub", "italic", "ins", "sup"],
    })
  })
})

describe("remove marks", () => {
  it("should remove marks", async () => {
    const prevMarks: Mark[] = getMarksInOrder({
      bold: true,
      del: true,
      sub: true,
    })
    const nextMarkProps: MarkProps = {}
    const diff = diffMarksExceptCode({ prevMarks, nextMarkProps })
    expect(diff).toEqual({
      removeMarks: ["sub", "del", "bold"],
      innerMarks: [],
      addMarks: [],
      nextMarks: [],
    })
  })

  it("should remove some marks in natural order", async () => {
    const prevMarks: Mark[] = getMarksInOrder({
      bold: true,
      del: true,
      sub: true,
    })
    const nextMarkProps: MarkProps = { bold: true }
    const diff = diffMarksExceptCode({ prevMarks, nextMarkProps })
    expect(diff).toEqual({
      removeMarks: ["sub", "del"],
      innerMarks: ["bold"],
      addMarks: [],
      nextMarks: ["bold"],
    })
  })
})

describe("remove and add marks", () => {
  it("should remove some marks in unnatural order and add some back", async () => {
    const prevMarks: Mark[] = getMarksInOrder({
      bold: true,
      del: true,
      sub: true,
    })
    const nextMarkProps: MarkProps = { del: true }
    const diff = diffMarksExceptCode({ prevMarks, nextMarkProps })
    expect(diff).toEqual({
      removeMarks: ["sub", "del", "bold"],
      innerMarks: [],
      addMarks: ["del"],
      nextMarks: ["del"],
    })
  })

  it("should remove from all marks and add some back", async () => {
    const prevMarks: Mark[] = getMarksInOrder({
      bold: true,
      italic: true,
      ins: true,
      del: true,
      sup: true,
      sub: true,
    })
    const nextMarkProps: MarkProps = { bold: true, ins: true, sup: true }
    const diff = diffMarksExceptCode({ prevMarks, nextMarkProps })
    expect(diff).toEqual({
      removeMarks: ["sub", "sup", "del", "ins", "italic"],
      innerMarks: ["bold"],
      addMarks: ["ins", "sup"],
      nextMarks: ["bold", "ins", "sup"],
    })
  })
})

describe("tokenize marks", () => {
  it("should tokenize marks", async () => {
    const marks: Mark[] = ["bold", "italic", "ins", "del", "sup", "sub"]
    const token = tokenizeMarksExceptCode(marks)
    expect(token).toEqual("**_++~~^~")
  })

  it("should tokenize marks backwards", async () => {
    const marks: Mark[] = ["sub", "sup", "del", "ins", "italic", "bold"]
    const token = tokenizeMarksExceptCode(marks)
    expect(token).toEqual("~^~~++_**")
  })
})
