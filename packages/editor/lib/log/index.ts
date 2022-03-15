export function log(...args: any[]) {
  // throw new Error('Uncomment to show stack trace of where log was')
  args.forEach((arg) => {
    console.log(JSON.stringify(arg, null, 2))
  })
}

const originalLog = console.log

export function mute() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = function () {}
}

export function unmute() {
  console.log = originalLog
}
