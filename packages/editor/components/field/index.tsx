import cx from "classnames"
import isHotkey from "is-hotkey"
import React, { SyntheticEvent } from "react"
import { mergeProps } from "~/lib/merge-props"
import styled from "@emotion/styled"
import { Tab, Tabs } from "./tabs"

const isEnter = isHotkey("enter")
const isModEnter = isHotkey("mod+enter")

interface IField {
  value: number | string
  fault?: React.ReactNode
}

const $InputFile = styled.input`
  font-size: 16px;
`

const $Group = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
  &.--clickable {
    cursor: pointer;
    &:hover {
      background: #f0f0f0;
    }
  }
  &.--unbordered {
    border-bottom: none;
    padding-bottom: 0.5em;
  }
  p {
    line-height: 1.5em;
    margin-bottom: 1em;
  }
`

const $Label = styled.div`
  color: rgba(0, 0, 0, 0.5);
  padding-bottom: 1em;
`

const $Hint = styled.div`
  padding-top: 1em;
  line-height: 1.2;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`

const $RadioItem = styled.div`
  display: flex;
  align-items: flex-start;
`

const RadioItemIcon = styled.i`
  width: 2em;
  text-align: center;
  background: #f0f0f0;
  border-radius: 4px;
  line-height: 1.5em;
  margin-bottom: 2px;
  margin-right: 0.5em;
  flex: 0 0 2em;
`

/**
 * Space buttons apart with last button having no space at the right
 */
const $Buttons = styled($Group)`
  button.btn {
    margin-right: 0.25em;
    &:last-child {
      margin-right: 0;
    }
  }
`

const $Or = styled.div`
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.5em;
  span {
    position: relative;
    top: 0.75em;
    background: white;
    padding: 0 1em;
  }
`

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // onKeyDown: (e: KeyboardEvent) => void
  // onSubmit: (e: KeyboardEvent) => void
  onSubmit?: (event: React.FormEvent<HTMLInputElement>) => void
}

const Field = {
  File(props: { multiple?: boolean }) {
    return <$InputFile type="file" {...props} />
  },
  Group({
    children,
    border = true,
    style,
    onClick,
  }: {
    children?: React.ReactNode
    border?: boolean
    style?: React.CSSProperties
    onClick?: () => void
  } = {}) {
    const className = cx({
      "--clickable": !!onClick,
      "--unbordered": !border,
    })
    return (
      <$Group className={className} style={style} onClick={onClick}>
        {children}
      </$Group>
    )
  },
  Alert({
    children,
    success,
  }: {
    children: React.ReactNode
    success?: boolean
  }) {
    // We use just the `alert` modifiers but not the `alert` style itself.
    // We use the outer formatting from $Group.
    const className = cx({ "alert-success": success })
    return <$Group className={className}>{children}</$Group>
  },
  Label(props: { children: React.ReactNode }) {
    return <$Label {...props} />
  },
  Input({ onKeyDown, onSubmit, ...props }: InputProps) {
    function handleKeyDown(e: KeyboardEvent) {
      if (isEnter(e) || isModEnter(e)) {
        e.preventDefault()
        e.stopPropagation()
        if (onSubmit == null) return
        onSubmit(e as any)
      }
      if (onKeyDown == null) return
      onKeyDown(e as any)
    }
    return (
      <input
        {...mergeProps(props, "form-control", {}, { onKeyDown: handleKeyDown })}
      />
    )
  },
  InputGroup({ onKeyDown, onSubmit, prepend, style, ...props }: any) {
    function handleKeyDown(e: KeyboardEvent) {
      if (isEnter(e)) {
        e.preventDefault()
        e.stopPropagation()
        if (onSubmit == null) return
        onSubmit(e)
      }
      if (onKeyDown == null) return
      onKeyDown(e)
    }
    return (
      <div className="input-group" style={style}>
        {prepend == null ? null : (
          <div className="input-group-prepend">
            <span className="input-group-text">{prepend}</span>
          </div>
        )}
        <input
          {...mergeProps(
            props,
            "form-control",
            {},
            { onKeyDown: handleKeyDown }
          )}
        />
      </div>
    )
  },
  Radio<T>({
    buttons,
    name,
    value,
    onChangeValue,
  }: {
    buttons: { value: T; fa?: string; label: React.ReactNode }[]
    name: string
    value: T
    onChangeValue: (value: T) => void
  }) {
    return (
      <div>
        {buttons.map((button, index) => {
          const id = `${name}.${button.value}`
          const checked = value === button.value
          return (
            <$RadioItem key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={name}
                id={id}
                checked={checked}
                onChange={() => {
                  onChangeValue(button.value)
                }}
              />
              {button.fa ? (
                <RadioItemIcon className={`fa ${button.fa}`} />
              ) : null}
              <label className="form-check-label" htmlFor={id}>
                {button.label}
              </label>
            </$RadioItem>
          )
        })}
      </div>
    )
  },
  Select<T extends string | number>({
    className,
    style,
    options,
    value,
    onChangeValue,
    autoFocus,
    small,
  }: {
    className?: string
    style?: React.CSSProperties
    options: { label: string; value: T }[]
    value: T
    onChangeValue: (value: T) => void
    autoFocus?: boolean
    small?: boolean
  }) {
    const nextClassName = cx(
      {
        "custom-select": !small,
        "custom-select-sm": small,
      },
      className
    )
    function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
      const index = parseInt(e.target.value)
      const option = options[index]
      onChangeValue(option.value)
    }
    return (
      <select
        className={nextClassName}
        style={style}
        onChange={onChange}
        autoFocus={autoFocus}
      >
        {options.map(({ label, value: optionValue }, index) => {
          const selected = value === optionValue
          return (
            <option key={index} value={index} selected={selected}>
              {label}
            </option>
          )
        })}
      </select>
    )
  },
  Tabs,
  Tab,
  Textarea({
    onKeyDown,
    onSubmit,
    ...props
  }: {
    onKeyDown?: (e: KeyboardEvent) => void
    onSubmit?: (e: SyntheticEvent) => void
    [key: string]: any
  } & React.InputHTMLAttributes<HTMLTextAreaElement>) {
    function handleKeyDown(e: any) {
      if (isModEnter(e)) {
        e.preventDefault()
        e.stopPropagation()
        if (onSubmit == null) return
        onSubmit(e)
      }
      if (onKeyDown == null) return
      onKeyDown(e)
    }
    return (
      <textarea
        {...mergeProps(props, "form-control", {}, { onKeyDown: handleKeyDown })}
      />
    )
  },
  Error({ children, ...props }: any) {
    const error = children
    if (error == null) return null
    return (
      <div {...mergeProps(props, "alert alert-danger")}>
        <div>We&apos;re sorry, there was an error...</div>
        <h4>{error.message}</h4>
        <div>
          <small>
            <pre>{error.stack}</pre>
          </small>
        </div>
      </div>
    )
  },
  Fault(props: any) {
    return props.children ? (
      <div {...mergeProps(props, "mt-2 text-danger")} />
    ) : null
  },
  /**
   * Placed within a `Field.Set` or `Field.Group` and can be after other
   * elements.
   *
   * If the `children` doesn't exist, then the `div` which provides spacing
   * is removed as well so it's a good way to display optional info as well
   * as permanent info.
   */
  Info({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return children ? (
      <div {...mergeProps(props, "mt-2")}>{children}</div>
    ) : null
  },
  /**
   * A hint usually displayed under a field
   */
  Hint(props: any) {
    return <$Hint {...props} />
  },

  /**
   * Or
   *
   * Primarily used in `sign in/up with Google` or `sign in with password`
   */
  Or() {
    return (
      <$Or>
        <span>OR</span>
      </$Or>
    )
  },
  /**
   * A helper for a field that displays a `label`, `hint` and a `fault` for
   * a given `field`
   */
  Set({
    label,
    hint,
    field,
    fault,
    children,
    border = true,
    ...props
  }: {
    label?: string
    hint?: React.ReactNode
    field: IField
    fault?: string
    children: React.ReactNode
    border?: boolean
  }) {
    return (
      <Field.Group {...props} border={border}>
        {label ? <Field.Label>{label}</Field.Label> : null}
        {children}
        <Field.Fault className="mt-1">
          {fault}
          {field.fault}
        </Field.Fault>
        {hint ? <Field.Hint className="mt-1">{hint}</Field.Hint> : null}
      </Field.Group>
    )
  },
  /**
   * Display a Bootstrap button with styling shortcuts
   */
  Button({
    className,
    primary,
    secondary,
    cancel,
    warning,
    danger,
    block,
    small,
    ...props
  }: {
    className?: string
    primary?: boolean
    secondary?: boolean
    cancel?: boolean
    warning?: boolean
    danger?: boolean
    block?: boolean
    small?: boolean
    style?: React.CSSProperties
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    children: React.ReactNode
  }) {
    className = cx(className, "btn", {
      "btn-sm": small,
      "btn-primary": primary,
      "btn-outline-secondary": secondary || cancel,
      "btn-warning": warning,
      "btn-danger": danger,
      "btn-block": block,
    })
    return <button className={className} {...props} />
  },
  Buttons: $Buttons,
  UrlCompletion({ prefix, name }: { prefix: string; name: string }) {
    return (
      <div className="mt-2 text-secondary">
        {prefix}
        {name.length === 0 ? (
          <$NameEmpty>...</$NameEmpty>
        ) : (
          <$Name>{name}</$Name>
        )}
      </div>
    )
  },
}

const $NameBase = styled.span`
  border-radius: 4px;
  padding: 0 2px;
  margin-left: 1px;
`

const $Name = styled($NameBase)`
  color: #404040;
  border: 1px solid #c0c0c0;
`

const $NameEmpty = styled($NameBase)`
  color: #c0c0c0;
  border: 1px solid #e0e0e0;
  font-style: italic;
`

export { Field }
