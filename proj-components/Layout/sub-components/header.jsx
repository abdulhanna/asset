import React from 'react'

const Header = () => {
    const onClickLogout = ()=>{
        alert("djfa")
    }
  return (
    <div className="flex flex-row bg-background border-b w-full p-6">
    <div className="flex flex-row items-center gap-4 w-full">
      <div className="bg-white rounded-md flex items-center px-2 py-px w-full">
        {/* <SearchIcon /> */}
        <span>search</span>
        {/* <Search placeholder="Search..." classname="px-2" /> */}
      </div>
      <button>search</button>
      {/* <PrimaryButton classname="px-4">Search</PrimaryButton> */}
    </div>

    <div className="px-40" />

    <div className="flex flex-row items-center gap-6 px-8">
      {/* <NotificationLineIcon classname="cursor-pointer" /> */}
      <span>NotificationLineIcon</span>

      {/* <SettingsIcon classname="cursor-pointer" /> */}

      <span
        className="flex flex-row items-center gap-1 cursor-pointer"
        onClick={onClickLogout}
      >
        {/* <LogoutIcon /> */}
        <span>LogoutIcon</span>
        <p className="text-xs">logout</p>
      </span>
    </div>
  </div>
  )
}

export default Header
