import React from 'react'

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <React.Fragment>
      <div>This is Layout</div>
      {children}
    </React.Fragment>
  )
}

export default Layout
