import { Descendant } from "slate"

export const initialValueList: Descendant[] = [
  {
    type: "unordered-list-item",
    depth: 0,
    children: [{ text: "Milk is good for you" }],
  },
  {
    type: "unordered-list-item",
    depth: 0,
    children: [{ text: "Fruits" }],
  },
  {
    type: "ordered-list-item",
    depth: 1,
    children: [{ text: "Apples" }],
  },
  {
    type: "ordered-list-item",
    depth: 1,
    children: [{ text: "Oranges" }],
  },
  {
    type: "ordered-list-item",
    depth: 2,
    children: [{ text: "Mandarin Oranges" }],
  },
  {
    type: "ordered-list-item",
    depth: 2,
    children: [{ text: "Sunkist Oranges" }],
  },
  {
    type: "ordered-list-item",
    depth: 1,
    children: [{ text: "Bananas" }],
  },
  {
    type: "ordered-list-item",
    depth: 2,
    children: [{ text: "Cavendish Bananas" }],
  },
  {
    type: "ordered-list-item",
    depth: 2,
    children: [{ text: "Plantains" }],
  },
  {
    type: "unordered-list-item",
    depth: 0,
    children: [{ text: "Exercise is good for you" }],
  },
  {
    type: "task-list-item",
    depth: 1,
    checked: false,
    children: [{ text: "Exercise in the morning" }],
  },
  {
    type: "task-list-item",
    depth: 1,
    checked: true,
    children: [{ text: "Biking" }],
  },
  {
    type: "task-list-item",
    depth: 1,
    checked: true,
    children: [{ text: "Hit the Gym" }],
  },
  {
    type: "unordered-list-item",
    depth: 1,
    children: [{ text: "Just a bullet" }],
  },
]
