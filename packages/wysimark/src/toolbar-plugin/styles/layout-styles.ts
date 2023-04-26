import styled from "@emotion/styled"

import { $Container } from "../../shared-layout"

export const $Editable = styled("div")`
  padding: 2em;
`

export const $OuterContainer = styled($Container)`
  /**
   * We use this to make sure the top of the container is rounded even though
   * the toolbar inside is square. We keep the toolbar square so that as the
   * toolbar hits the top when scrolling, it can become sticky. We can try to
   * round the toolbar, but it causes an issue where the part under the
   * rounded part is still visible (i.e. the edge of the container). We can
   * then try to put an absolutely positioned background on it with an opaque
   * color, but that doesn't work unless we know the color of the background
   * so... ultimately, it's not a good solution.
   *
   * NOTE:
   *
   * Using "overflow: hidden;" will break the "position: sticky;" and it will
   * not work. "overflow: clip;" does work though.
   *
   * https://stackoverflow.com/a/73051006
   */
  overflow-y: clip;
  display: flex;
  flex-direction: column;
`
