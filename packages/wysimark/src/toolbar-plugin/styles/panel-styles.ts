import styled from "@emotion/styled"

import { SinkReset } from "~/src/sink/editable"

/**
 * $Panel is a nice box that goes around a Drop Down menu or a Dialog Box.
 *
 * We don't use $Panel directly and instead we extend it.
 *
 * The $Panel itself extends the `SinkReset` and we do this because the
 * Component appears at the root. So any styling, for example like from
 * Bootstrap or Material UI will affect what's in the Panel.
 */
export const $Panel = styled(SinkReset)`
  position: absolute;
  z-index: 1000;
  border: 1px solid var(--table-border-color);
  border-radius: 0.5em;
  overflow: clip;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  background: white;
  /**
   * If you are tempted to add the transitions back in, here's why we left
   * them off:
   *
   * - When we initially unhide the panel (by setting a negative 'left' pos)
   *   the panel slides in very quickly. So we'd need to fix this first which
   *   adds complexity.
   *
   * - Even if we fixed it, the browser window updates the scrolls and resizes
   *   in a stepped manner (i.e. like frames in an animation). Keeping the
   *   smooth animations makes the panel step in sync with the page refreshes
   *   and so actually looks better.
   *
   * In other words, there's a technical issue we'd still need to solve but
   * even if we did, it looks better this way.
   */
  /* transition: left 100ms, top 100ms; */
`
