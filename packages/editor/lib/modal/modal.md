# Modal

## Setup

Wrap theentire app in a `ModalProvider`

```js
import { ModalProvider } from "~/lib/modal"

const App = function () {
  return <ModalProvider>...</ModalProvider>
}
```

## Using Modals

use the `useModal` hook to open and close modal.

The first argument to `modal.open` is the Component to open and the second
arguments is the props. By convention, if the Component is positioned, we
pass in a `dest` argument which is the element to align the modal to; however,
it is not necessary. For example, a full page alert won't require a `dest`
prop.

When calling the `useModal` hook, the first argument is the `ModalType`.
This is necessary because we want to ensure a strict order of which modals go
on top of which other ones.

```js
import { ModalType, useModal } from "~/lib/modal"

function Page() {
  const modal = useModal(ModalType.Dialog)
  const open = useCallback(function open(event) {
    modal.open(MyDialog, { dest: event.currentTarget })
  })
  const close = useCallback(function close() {
    modal.close()
  })
  return (
    <div>
      <button onClick={open}>Open modal</button>
      <button onClick={close}>Close modal</button>
    </div>
  )
}
```

## Inside Modal

Use the `useInModal` hook to grab data about the modal inside of the modal.

Use the `useReposition` helper to automatically reposition the Dialog when
the window size has changed or the user has scrolled.

```js
import { useInModal, useReposition } from "~/lib/modal"

function MyDialog({ dest }: { dest: HTMLElement }) {
  const modal = useInModal()
  const style = useReposition(() => {
    const rect = dest.getBoundingClientRect()
    return { position: "fixed", width: 320, top: rect.bottom, left: rect.left }
  }, [dest])
  const close = useCallback(function close() {
    modal.close()
  })
  return (
    <div style={style}>
      <button onClick={close}>Close Me</button>
    </div>
  )
}
```
