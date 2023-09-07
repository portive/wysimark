import styled from "@emotion/styled"

const $Nav = styled("nav")``

export default function ExamplesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <$Nav></$Nav>

      {children}
    </section>
  )
}
