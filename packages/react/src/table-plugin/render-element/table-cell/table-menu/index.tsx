import { $TableMenu, $TableMenuTile } from "./$table-menu"

export function TableMenu() {
  return (
    <$TableMenu contentEditable={false}>
      <$TableMenuTile className="--table-menu-tile" />
    </$TableMenu>
  )
}
