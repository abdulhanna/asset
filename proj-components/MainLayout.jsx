import React from 'react'
import SidebarComp from './Layout/sub-components/navbar-components'
import Header from './Layout/sub-components/header'

const MainLayout = ({children}) => {
  return (
    <div className="h-screen flex flex-col  overflow-hidden">
    <div className="flex flex-row h-screen">
      <div className="w-auto bg-background">
        <SidebarComp user={'user'} />
      </div>
      <div className="flex flex-col w-full overflow-hidden   bg-background">
        <Header />
        <div className="w-full  h-full  overflow-y-auto pb-20">
          <div className="container px-8 mx-auto flex-1">{children}</div>
        </div>
      </div>
    </div>
    {/* <ToastContainer /> */}
  </div>
  )
}

export default MainLayout
