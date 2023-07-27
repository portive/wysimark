const os = require("os")
const path = require("path")
const pty = require("node-pty")

function untildify(filepath) {
  if (!filepath.startsWith("~/")) return filepath
  const homeDir = os.homedir()
  return path.join(homeDir, filepath.slice(2))
}

/**
 * This code is designed to spawn a new shell process using either PowerShell or
 * bash, depending on the operating system of the host machine.
 *
 * The main benefit is color support, which is not available when using the
 * `child_process` module to spawn a new process.
 *
 * It will stream the output of the child process to the parent process, and
 * will also log the exit code of the child process when it exits.
 *
 * @param {string} command The command to run in the child process.
 * @param {object} options Options to pass to the child process.
 */
function spawn(command, options) {
  const shell = os.platform() === "win32" ? "powershell.exe" : "bash"

  const child = pty.spawn(shell, ["-c", command], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    ...options,
  })

  child.on("data", function (data) {
    process.stdout.write(data)
  })

  child.on("exit", function (exitcode) {
    if (exitcode === 0) return
    console.log(`child process exited with error code ${exitcode}`)
  })

  child.on("error", function (error) {
    console.error(`Error spawning child process: ${error.message}`)
  })
}

// Construct the full path to the directory
const cwd = untildify("~/projects/presets/pnpm-presets")

const args = process.argv.slice(2).join(" ")

const env = { ...process.env }

for (const key in process.env) {
  env[`FIRE_${key}`] = process.env[key]
}

spawn(`pnpm run entry ${args}`, { cwd, env })
