import { SVGProps } from "react"

/**
 * A shortcut type to SVGProps<SVGSVGElement> but also more explicit in its
 * intent and allows for changing the props in the future without another
 * refactor.
 */
export type TablerIconProps = SVGProps<SVGSVGElement>

/**
 * Efficient way to create a Tabler Icon.
 *
 * https://tabler-icons.io/
 *
 * - Grab the SVG from the Tabler Icon.
 * - Run it through https://react-svgr.com/playground/?icon=true&typescript=true
 * - Grab everything EXCEPT the first `path` which is unnecessary
 * - Place it as the children of this `<Icon>`
 */
export const TablerIcon = ({
  strokeWidth = 1.5,
  ...props
}: TablerIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    {...props}
  />
)
