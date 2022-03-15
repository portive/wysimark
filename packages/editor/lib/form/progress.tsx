import React from "react"
import { ElementProps } from "~/lib/ts-utils"
import styled from "@emotion/styled"

const $Progress = styled.div`
  background: #e8e9ea;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(0, 0, 0, 0.02) 100%
  );
  height: 24px;
  border-radius: 4px;
`

const $ProgressBar = styled.div`
  display: inline-block;
  background-color: #1b7eea;
  background-image: linear-gradient(180deg, #068dff 0%, #007bf8 100%);
  height: 24px;
  border-radius: 4px;
  /**
   * Smooth the progress bar moving animation
   */
  transition: width 100ms linear;
`

type ProgressProps = ElementProps<HTMLDivElement> & { progress: number }

/**
 * Show a progress bar.
 *
 * `progress` shall be from 0 to 1.
 */
export function Progress({ progress, ...props }: ProgressProps) {
  const width = Math.round(progress * 100)
  return (
    <$Progress {...props}>
      <$ProgressBar style={{ width: `${width}%` }} />
    </$Progress>
  )
}
