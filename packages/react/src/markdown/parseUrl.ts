type ParsedUrl = {
  origin: string
  hostname: string
  pathname: string
  searchParams: URLSearchParams
  hash: string
}

/**
 * NOTE: As per the URL spec:
 *
 * - searchParams part does not include the "?"
 * - hash part includes the "#"
 */
const URL_REGEX = /^(\/[^?#]*)(?:\?([^#]*))?(#.*)?$/

export function parseUrl(url: string): ParsedUrl {
  try {
    const urlData = new URL(url)
    return {
      origin: urlData.origin,
      hostname: urlData.hostname,
      pathname: urlData.pathname,
      searchParams: urlData.searchParams,
      hash: urlData.hash,
    }
  } catch (error) {
    const matchdata = url.match(URL_REGEX)
    if (matchdata === null)
      throw new Error(`Invalid format should not happen: ${url}`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, pathname, searchParams, hash] = [...matchdata]
    return {
      origin: "",
      hostname: "",
      pathname: pathname || "",
      searchParams: new URLSearchParams(searchParams),
      hash: hash || "",
    }
  }
}
