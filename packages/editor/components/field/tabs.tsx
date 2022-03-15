import cx from "classnames"
import React, { useContext } from "react"
import styled from "@emotion/styled"

const TabContext = React.createContext<string | number | undefined>(undefined)

export function Tabs({
  className,
  children,
  active,
}: {
  className?: string
  children: React.ReactNode
  active?: string | number
}) {
  const nextClassName = cx("nav nav-tabs pl-4 pt-2", className)
  return (
    <TabContext.Provider value={active}>
      <ul className={nextClassName}>{children}</ul>
    </TabContext.Provider>
  )
}

const $Tab = styled.li`
  cursor: pointer;
`

const $Pill = styled.span`
  position: relative;
  top: -2px;
  background: #f0f0f0;
  border: 1px solid #e8e8e8;
  font-size: 12px;
  font-weight: 500;
`

export function Tab({
  name,
  label,
  pill,
  onClick,
}: {
  name: string | number
  label: React.ReactNode
  pill?: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}) {
  const currentActive = useContext(TabContext)
  const className = cx("nav-link", {
    active: currentActive && currentActive === name,
  })
  return (
    <$Tab
      className={className}
      style={{ marginBottom: -1 }} // not sure why we need this because it SHOULD be in bootstrap
      onClick={onClick}
    >
      <span>
        {label}
        {pill != null ? (
          <$Pill className="badge badge-pill badge-light ml-2">{pill}</$Pill>
        ) : null}
      </span>
    </$Tab>
  )
}
