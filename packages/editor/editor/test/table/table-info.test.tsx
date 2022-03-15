/* eslint-disable react/jsx-key */
/** @jsx jsx  */
import { Table } from "~/editor/table"
import { jsx } from "../test-utils"

function td(index: number, text: string) {
  return (
    <td index={index}>
      <p>
        <text>{text}</text>
      </p>
    </td>
  )
}

describe("table-info", () => {
  it("should get basic table info", async () => {
    const editor = (
      <editor>
        <table columns={[{ align: "left" }, { align: "left" }]}>
          <tr>
            {td(0, "a")}
            {td(1, "b")}
            {td(2, "c")}
          </tr>
          <tr>
            {td(0, "d")}
            <td index={1}>
              <p>
                <text>
                  <cursor />e
                </text>
              </p>
            </td>
            {td(2, "f")}
          </tr>
        </table>
      </editor>
    )
    const tableInfo = Table.getTableInfo(editor)
    expect(tableInfo.td).toEqual(
      <td index={1}>
        <p>
          <text>e</text>
        </p>
      </td>
    )
    expect(tableInfo.tdPath).toEqual([0, 1, 1])
    expect(tableInfo.tdIndex).toEqual(1)
    expect(tableInfo.tdCount).toEqual(3)
    expect(tableInfo.tr).toEqual(
      <tr>
        {td(0, "d")}
        {td(1, "e")}
        {td(2, "f")}
      </tr>
    )
    expect(tableInfo.trIndex).toEqual(1)
    expect(tableInfo.trCount).toEqual(2)
    expect(tableInfo.trs).toEqual([
      <tr>
        {td(0, "a")}
        {td(1, "b")}
        {td(2, "c")}
      </tr>,
      <tr>
        {td(0, "d")}
        {td(1, "e")}
        {td(2, "f")}
      </tr>,
    ])
    expect(tableInfo.table).toEqual(
      <table columns={[{ align: "left" }, { align: "left" }]}>
        <tr>
          {td(0, "a")}
          {td(1, "b")}
          {td(2, "c")}
        </tr>
        <tr>
          {td(0, "d")}
          {td(1, "e")}
          {td(2, "f")}
        </tr>
      </table>
    )
    expect(tableInfo.tablePath).toEqual([0])
    expect(tableInfo.tableIndex).toEqual(0)
  })

  it("should get table info using path to td", async () => {
    const editor = (
      <editor>
        <table columns={[{ align: "left" }, { align: "left" }]}>
          <tr>
            {td(0, "a")}
            {td(1, "b")}
            {td(2, "c")}
          </tr>
          <tr>
            {td(0, "d")}
            {td(1, "e")}
            {td(2, "f")}
          </tr>
        </table>
      </editor>
    )
    const tableInfo = Table.getTableInfo(editor, [0, 0, 1])
    expect(tableInfo.td).toEqual(
      <td index={1}>
        <p>
          <text>b</text>
        </p>
      </td>
    )
    expect(tableInfo.tdPath).toEqual([0, 0, 1])
    expect(tableInfo.tdIndex).toEqual(1)
    expect(tableInfo.tdCount).toEqual(3)
    expect(tableInfo.tr).toEqual(
      <tr>
        {td(0, "a")}
        {td(1, "b")}
        {td(2, "c")}
      </tr>
    )
    expect(tableInfo.trIndex).toEqual(0)
    expect(tableInfo.trCount).toEqual(2)
    expect(tableInfo.trs).toEqual([
      <tr>
        {td(0, "a")}
        {td(1, "b")}
        {td(2, "c")}
      </tr>,
      <tr>
        {td(0, "d")}
        {td(1, "e")}
        {td(2, "f")}
      </tr>,
    ])
    expect(tableInfo.table).toEqual(
      <table columns={[{ align: "left" }, { align: "left" }]}>
        <tr>
          {td(0, "a")}
          {td(1, "b")}
          {td(2, "c")}
        </tr>
        <tr>
          {td(0, "d")}
          {td(1, "e")}
          {td(2, "f")}
        </tr>
      </table>
    )
    expect(tableInfo.tablePath).toEqual([0])
    expect(tableInfo.tableIndex).toEqual(0)
  })
})
