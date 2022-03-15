import cx from "classnames"

// type classNameType = string | { [key: string]: string }

function mergeProps(
  {
    className,
    style = {},
    ...props
  }: { className?: string; style?: { [key: string]: any } },
  modClassName: string | { [key: string]: boolean }, // string or object
  modStyle?: { [key: string]: string | number }, // object or undefined
  modProps?: any // object or undefined
) {
  const nextProps = {
    className: cx(modClassName, className),
    style: { ...modStyle, ...style },
    ...modProps,
    ...props,
  }
  return nextProps
}

export { mergeProps }
