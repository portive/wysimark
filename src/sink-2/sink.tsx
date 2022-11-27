type SinkPlugin = any

export const createSink = <T extends SinkPlugin>(plugins: T[]): T[] => {
  return plugins
}
