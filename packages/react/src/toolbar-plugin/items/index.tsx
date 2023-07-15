import { MenuItemData } from "~/src/shared-overlays"

import { blockDropdownItem } from "./block-items"
import { compactDialogItems, expandedDialogItems } from "./dialogItems"
import { dropdownItems } from "./dropdownItems"
import { linkItem } from "./linkItem"
import { compactMarkItems, expandedMarkItems } from "./mark-items"

/**
 * A collection of `Item` objects that describe either
 *
 * - A Button in the toolbar
 * - A Menu Item in a drop down of the toolbar
 *
 * An `Item` is described in the same way whether it is a button or a menu
 * item making them interchangeable.
 */

export const largeItems: MenuItemData[] = [
  blockDropdownItem,
  "divider",
  ...expandedMarkItems,
  "divider",
  linkItem,
  ...dropdownItems,
  "divider",
  ...expandedDialogItems,
]

export const mediumItems: MenuItemData[] = [
  blockDropdownItem,
  "divider",
  ...expandedMarkItems,
  "divider",
  linkItem,
  ...dropdownItems,
  "divider",
  ...compactDialogItems,
]

export const smallItems: MenuItemData[] = [
  blockDropdownItem,
  "divider",
  ...compactMarkItems,
  "divider",
  linkItem,
  ...dropdownItems,
  "divider",
  ...compactDialogItems,
]

export const initialItems: MenuItemData[] = [blockDropdownItem, "divider"]

export const items = mediumItems

export const itemSets: MenuItemData[][] = [largeItems, mediumItems, smallItems]
