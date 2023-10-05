import React from "react";
import SidebarComp from "./Layout/sub-components/navbar-components";
import Header from "./Layout/sub-components/header";

const MainLayout = ({ children, isScroll, User }) => {
  // console.log(isScroll,'isscrlll',User.role)

  return (
    <div className="h-screen flex flex-col  overflow-hidden">
      <div className="flex flex-row h-screen">
        <div className="w-auto bg-background">
          <SidebarComp user={User ? User.role : ""} />
        </div>
        <div className="flex flex-col w-full  ">
          <Header />
          <div
            className={`${
              isScroll ? "overflow-y-auto" : "overflow-hidden"
            } w-full  h-full  pb-20`}
          >
            <div
              className={` 3xl:px-12 3xl:py-12 2xl:px-8 2xl:py-12   xl:px-8 xl:py-4 container  flex-1`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default MainLayout;
