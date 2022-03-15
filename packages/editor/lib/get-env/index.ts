type MapToEnv<T> = {
  [K in keyof T]: string
}

/**
 * WARNING!
 * IMPORTANT!
 *
 * Do not use `process.env[key]` or something DYNAMIC way to get the value.
 *
 * The var must EXPLICITLY spell out `process.env.VAR_NAME`.
 */
export function getServerEnv<T extends { [key: string]: string | undefined }>(
  map: T
): MapToEnv<T> {
  const env = {} as MapToEnv<T>
  for (const key in map) {
    const value = map[key]
    if (typeof value !== "string") {
      throw new Error(
        `The key on passed in object ${key} must be a string but is ${value}`
      )
    }
    env[key] = value.trim()
  }
  return env
}

/**
 * WARNING!
 * IMPORTANT!
 *
 * The values must EXPLICITLY spell out `process.env.VAR_NAME`
 *
 * Do not use `process.env[key]` or something DYNAMIC way to get the value.
 *
 * On the client, we make sure that all vars start with `NEXT_PUBLIC` as well.
 */
export function getClientEnv<T extends { [key: string]: string | undefined }>(
  map: T
): MapToEnv<T> {
  const env = {} as MapToEnv<T>
  for (const key in map) {
    if (!key.startsWith("NEXT_PUBLIC_")) {
      throw new Error(
        `The key ${JSON.stringify(
          key
        )} does not begin with "NEXT_PUBLIC" but should on the client`
      )
    }
    const value = map[key]
    if (typeof value !== "string") {
      throw new Error(
        `The key on passed in object ${key} must be a string but is ${value}`
      )
    }
    env[key] = value.trim()
  }
  return env
}
