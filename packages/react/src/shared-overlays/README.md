# Shared Overlays

We share some components with multiple plugins to improve code reuse.

- `CloseMask`: This is an invisible layer in the background of overlays that prevent the user with interacting with the rest of the page while an overlay is being displayed. When the user clicks outside of the menu item or the dialog (i.e. on the CloseMask) then the overlay is closed.
- `Menu`: The can be re-used as either the drop-down menu in the toolbar, as a context menu like in table row or column menus or to choose a syntax highlighting language in a code block (NOTE: not yet implemented at time of writing this `README.md`)
- `$Panel`: A generic modal/panel box that can be shared. Has a drop shadow, rounded corners, etc. Use this to create a consistent design.
