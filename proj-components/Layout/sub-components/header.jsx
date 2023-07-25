import React from 'react'
import SearchComponent from '../../../components/atoms/searchComponent'
import { Bell } from '../../../components/atoms/icons'

const Header = () => {
    const onClickLogout = ()=>{
        alert("djfa")
    }
  return (
    <div className="flex flex-row  border-b w-full p-6">
    <div className="flex flex-row items-center gap-4 w-full">
      <div className="bg-white rounded-md flex items-center px-2 py-px w-full">
        {/* <SearchIcon /> */}
          <SearchComponent/>
        {/* <Search placeholder="Search..." classname="px-2" /> */}
      </div>
     
      {/* <PrimaryButton classname="px-4">Search</PrimaryButton> */}
    </div>

    <div className="px-40" />

    <div className="flex flex-row items-center gap-6 px-8">
      {/* <NotificationLineIcon classname="cursor-pointer" /> */}
      {/* <span>NotificationLineIcon</span> */}

      {/* <SettingsIcon classname="cursor-pointer" /> */}

      <span
        className="flex flex-row items-center gap-1 cursor-pointer"
        onClick={onClickLogout}
      >
        {/* <LogoutIcon /> */}
        <Bell/>
      
      </span>
    </div>
  </div>
  )
}

export default Header
