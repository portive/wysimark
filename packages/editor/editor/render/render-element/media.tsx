import cx from "classnames"
import React, { useEffect, useRef } from "react"
import { useFocused, useSelected } from "slate-react"
import { useInitial } from "~/lib/use-initial"
import styled from "@emotion/styled"
import { MediaElement as IMediaElement } from "../../types"
import { CustomRenderElementProps } from "./utils"

/**
 * Styled Components
 */

const $Container = styled.div`
  padding: 0 0 1em;
  &.--initial {
    opacity: 0;
  }
  opacity: 1;
  transition: opacity 500ms;
  /**
   * NOTE:
   * We are targeted an inner element with a class of .--highlight-target
   * because the actual highlighted element is not the container itself.
   */
  &.--highlighted .--highlight-target {
    box-shadow: rgb(38, 132, 255) 0 0 0 2px !important;
  }
  .--highlight-target {
    transition: box-shadow 150ms linear;
  }
`

const $MediaContainer = styled.div`
  position: relative;
  padding-top: 75%;
  background-color: #f0f1f2;
  max-width: 320px;
`

const $MediaIframe = styled.iframe`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`

const $Unknown = styled.div`
  background: #f0f1f2;
  padding: 1em 1.5em;
  .__title {
  }
  .__link {
    line-height: 1.2em;
    a {
      font-size: 0.9em;
    }
  }
`

/**
 * Reusable Component
 */

function MediaIframe(props: IFrameProps) {
  return <$MediaIframe {...props} frameBorder="0" />
}

/**
 * Typescript
 */

interface IFrameProps {
  src: string
  allow?: string
  allowFullScreen?: boolean
}

declare global {
  interface Window {
    google: { maps: { Map: any } }
  }
}

/**
 * Globals
 */

// const { GOOGLE_MAPS_KEY } = getClientEnv()

const SCRIPT_ID = "google-maps-script"

const YOUTUBE_PATTERN =
  /^(?:https?:\/\/(?:www\.youtube\.com\/watch\?v=|youtu\.be\/))([^?&]+)((?:.*?)(?:[&?]t=(?:([0-9]+)m)?([0-9]+)s)?)$/i
const VIMEO_PATTERN = /^https?:\/\/vimeo\.com\/(?:.*\/)?([0-9]+)$/i
const GOOGLE_MAPS_PLACE_PATTERN =
  /^(https:\/\/www\.google\.[^/]+\/maps\/place\/([^/]+)([/].*)?)/i
const GOOGLE_MAPS_COORD_PATTERN =
  /^(?:https:\/\/www\.google\.[^/]+\/maps\/(?:.*[/])?@([^,]+),([^,]+),([^z]+)z)/i
// Based on <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img> less tif/tiff
const IMAGE_PATTERN =
  /^.*[.](apng|bmp|gif|ico|cur|jpg|jpeg|jfif|pjpeg|pjp|png|svg|webp)$/i
const UNKNOWN_PATTERN = /^(.*)$/

/**
 * Used by `paste/index` to see if pasted text points to a link
 */
export const MEDIA_REGEXPS = [
  YOUTUBE_PATTERN,
  VIMEO_PATTERN,
  GOOGLE_MAPS_PLACE_PATTERN,
  GOOGLE_MAPS_COORD_PATTERN,
  IMAGE_PATTERN,
]

type ConverterFunction = (arg: { matchdata: string[] }) => JSX.Element

const PATTERNS = [
  [YOUTUBE_PATTERN, YouTubeElement],
  [VIMEO_PATTERN, VimeoElement],
  [GOOGLE_MAPS_PLACE_PATTERN, GoogleMapPlace],
  [GOOGLE_MAPS_COORD_PATTERN, GoogleMapCoord],
  [IMAGE_PATTERN, Image],
  [UNKNOWN_PATTERN, Unknown],
] as Array<[RegExp, ConverterFunction]>

/**
 * Dynamic Media Component
 *
 * Renders the correct media type like an `img` or YouTube video depending on
 * the URL.
 */

export function Media({
  attributes,
  children,
  element,
}: CustomRenderElementProps<"media">) {
  const selected = useSelected()
  const focused = useFocused()
  const highlighted = selected && focused
  const initial = useInitial()
  const className = cx({
    "--initial": initial,
    "--highlighted": highlighted,
  })
  return (
    <div {...attributes} className="__media">
      <$Container contentEditable={false} className={className}>
        <MediaElement element={element as IMediaElement} />
      </$Container>
      {/* children required to render the contentEditable cursor */}
      {children}
    </div>
  )
}

/**
 * Dynamic Media Element
 */

function MediaElement({ element }: { element: IMediaElement }) {
  for (const [regexp, MatchedElement] of PATTERNS) {
    const matchdata = element.url.match(regexp)
    if (matchdata == null) continue
    return <MatchedElement matchdata={matchdata} />
  }
  throw new Error(`Should not get to here`)
}

/**
 * Unknown media type
 */

function Unknown({ element }: { element: IMediaElement }) {
  return (
    <$Unknown className="--highlight-target">
      <div className="__title">Unknown Media Type (click to open)</div>
      <div className="__link">
        <a href={element.url} target="_blank" rel="noopener noreferrer">
          {element.url}
        </a>
      </div>
    </$Unknown>
  )
}

/**
 * Image
 */

const $Image = styled.img`
  /* max-width: 360px;
  width: 360px;
  border-radius: 0.5rem; */
`

function Image({ element }: { element: IMediaElement }) {
  return <$Image src={element.url} className="--highlight-target" />
}

/**
 * YouTube Element
 */

function YouTubeElement({ matchdata }: { matchdata: string[] }) {
  const [, videoId, minutes, seconds] = matchdata

  let src = `//www.youtube.com/embed/${videoId}`
  if (seconds) {
    const start = parseInt(seconds) + (minutes ? parseInt(minutes) * 60 : 0)
    src = src + `?start=${start}`
  }
  return (
    <$MediaContainer className="--highlight-target">
      <MediaIframe
        src={src}
        allow="accelerometer; autoplay; encrypted-media;gyroscope; picture-in-picture"
        allowFullScreen
      />
    </$MediaContainer>
  )
}

/**
 * Vimeo Element
 */

function VimeoElement({ matchdata }: { matchdata: string[] }) {
  const [, video_id] = matchdata
  const src = `//player.vimeo.com/video/${video_id}`
  return (
    <$MediaContainer className="--highlight-target">
      <MediaIframe src={src} allowFullScreen />
    </$MediaContainer>
  )
}

/**
 * Google Maps Place
 */

function GoogleMapPlace({ matchdata }: { matchdata: string[] }) {
  const place = matchdata[2]
  const src = `https://www.google.com/maps/embed/v1/place?key=GOOGLE_MAPS_KEY_PLACEHOLDER&q=${place}`
  return (
    <$MediaContainer className="--highlight-target">
      <MediaIframe src={src} />
    </$MediaContainer>
  )
}

/**
 * Google Maps Coordinate
 */

function GoogleMapCoord({ matchdata }: { matchdata: string[] }) {
  // I don't know why this is necessary in this situation but not others.
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35572
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>

  const [_all_, latString, lngString, zoomString] = matchdata

  function onScriptLoad(): void {
    // If the Google API script hasn't been loaded yet, wait and try again
    if (!("google" in window)) {
      setTimeout(onScriptLoad, 100)
      return
    }

    const lat = parseFloat(latString)
    const lng = parseFloat(lngString)
    const zoom = parseFloat(zoomString)

    // https://developers.google.com/maps/documentation/javascript/tutorial
    const mapElement = ref.current
    new window.google.maps.Map(mapElement, {
      center: { lat, lng },
      zoom,
      scrollwheel: false,
    })
  }

  // Load the Google APIs script only after this component is loaded and only
  // if it hasn't already been loaded.
  useEffect(() => {
    const scriptElement = document.getElementById(SCRIPT_ID)
    if (scriptElement) {
      onScriptLoad()
    } else {
      const src = `https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_KEY_PLACEHOLDER`

      // http://stackoverflow.com/questions/6725272/dynamic-cross-browser-script-loading
      const s = document.createElement("script")
      s.id = SCRIPT_ID
      s.type = "text/javascript"
      s.src = src
      s.async = false
      s.onload = onScriptLoad
      document.body.appendChild(s)
    }
  }, [_all_])

  return (
    <$MediaContainer className="--highlight-target">
      <div
        ref={ref}
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          height: "100%",
          background: "#e0e0e0",
        }}
      />
    </$MediaContainer>
  )
}
