import { styled } from "goober"
import { forwardRef } from "react"

import { SinkReset } from "~/src/sink/create-sink/sink-editable"

/**
 * $Panel is a nice box that goes around a Drop Down menu or a Dialog Box.
 *
 * We don't use $Panel directly and instead we extend it.
 *
 * The $Panel itself extends the `SinkReset` and we do this because the
 * Component appears at the root. So any styling, for example like from
 * Bootstrap or Material UI will affect what's in the Panel.
 */
export const $Panel = styled(SinkReset, forwardRef)`
  position: absolute;
  z-index: 1000;
  border: 1px solid var(--table-border-color);
  border-radius: 0.5em;
  overflow: clip;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  background: white;
`
