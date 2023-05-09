import { createSink } from "~/src/sink"

import { plugins, PluginTypes } from "./plugins"

const Sink = createSink<PluginTypes>(plugins)

const { withSink, SinkEditable } = Sink
export { SinkEditable, withSink }
