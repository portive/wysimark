import { useState } from "react"
import { Fault } from "~/lib/fault"

/**
 * A type of object that can have `string` or `number` as its value
 */

export interface ValuesType {
  [key: string]: any
}

type StringKeyOf<T> = Extract<keyof T, string>

/**
 * Takes a type that extends ValuesType and returns a new type that has the
 * same shape (i.e. keys) but all of its values are `string` and are optional.
 */

export type FaultsType<T extends ValuesType> = {
  [KeyType in keyof T]?: React.ReactNode
}

class Field<T extends ValuesType, K extends StringKeyOf<T>> {
  constructor(public form: Form<T>, public key: K) {}

  get value(): T[K] {
    return this.form.values[this.key]
  }

  setValue = (value: T[K]) => {
    const nextValues = Object.assign({}, this.form.values) as T
    nextValues[this.key] = value
    this.form.setValues(nextValues)
  }

  get fault(): React.ReactNode | undefined {
    return this.form.faults[this.key]
  }

  setFault = (value: React.ReactNode | null | undefined) => {
    if (value == null) {
      delete this.form.faults[this.key]
      return
    } else {
      this.form.setFaults({ ...this.form.faults, [this.key]: value })
    }
  }

  onChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    /**
     * A bit of a kludge because we can assign a `string` which is what
     * `e.currentTarget.value` is to a `number` type which is wrong and bad!
     */
    const value = e.currentTarget.value as any
    this.setValue(value)
  }

  /**
   * Identical to `setValue` but is a more descriptive way of reacting to
   * a change event on certain types of custom components that won't event
   * an `event` object to capture a change.
   */
  onChangeValue = (value: T[K]) => {
    this.setValue(value)
  }
}

export class Form<T extends ValuesType> {
  constructor(
    public values: T,
    public setValues: (values: T) => void,
    public faults: FaultsType<T>,
    public setFaults: (faults: FaultsType<T>) => void
  ) {}

  field<K extends StringKeyOf<T>>(key: K): Field<T, K> {
    return new Field<T, K>(this, key)
  }

  submit = async (fn: (values: T) => Promise<any>) => {
    try {
      await fn(this.values)
    } catch (error) {
      if (Fault.isFault(error)) {
        this.setFaults(error.value)
      } else {
        // TODO:
        // rethrow for now but switch to modal.open(ErrorDialog, ...)
        throw error
      }
    }
  }
}

function useForm<T extends ValuesType>(
  initialValues: T | (() => T),
  initialFaults: FaultsType<T> | (() => FaultsType<T>) = {}
): Form<T> {
  const [values, setValues] = useState(initialValues)
  const [faults, setFaults] = useState(initialFaults)

  return new Form(values, setValues, faults, setFaults)
}

export { useForm, Fault }
