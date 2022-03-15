interface ErrorWithStackTrace {
  captureStackTrace?(thisArg: any, func: any): void
}

class Fault {
  // Identify a Fault object by this boolean property
  __isFault__ = true

  // The fault's value as an Object
  value: any

  constructor(value: any) {
    const MyError = Error as unknown as ErrorWithStackTrace
    // method not available on some browsers (e.g. iOS)
    if (typeof MyError.captureStackTrace !== "undefined") {
      MyError.captureStackTrace(this, Fault)
    }
    this.value = value
  }

  toJSONValue(): any {
    return this.value
  }

  // Used to display error message to console
  toString(): string {
    return `Fault: ${JSON.stringify(this.value, null, 2)}`
  }

  static isFault(object: any): object is Fault {
    if (typeof object !== "object") return false
    return !!object.__isFault__
  }
}

export { Fault }
