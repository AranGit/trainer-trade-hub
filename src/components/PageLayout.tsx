import React from "react"

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    //header
    <main>
      {children}
    </main>
    //footer
  )
}

export default PageLayout
