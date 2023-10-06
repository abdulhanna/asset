import React, { useState } from "react";
import Sidebar, {
  SidebarItem,
  SidebarList,
  SidebarSubItem,
  SidebarSubList,
} from "../../../components/organism/sidebar";
import { useRouter } from "next/router";
import InventoryFillIcon, {
  Logout,
  CompanyProfile,
  Setting,
  Document,
  Legal,
  CloseIcon,
} from "../../../components/atoms/icons";
import {
  FillOverview,
  FillUserManagment,
  FillOrganization,
  FillFieldMangment,
  SampleIcon,
  QrIcon,
  Overview,
  Location,
  AssetMangment,
  AssetGroup,
  Departments,
  UserManagment,
  Reports,
  RootMangment,
  FieldMangment,
  Organizations,
  AccountManagement,
  AssetMangementFill,
  AccountManagementFill,
  FillLocations,
  FillDepartment,
} from "../../../components/atoms/icons";
import Image from "next/image";
import authApi from "helpers/use-api/auth";
import DialogPage1 from "@/components/molecules/dialog";
import { RightArrow } from "../../../components/atoms/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmLogout = ({ open, close }) => {
  const router = useRouter();
  const notify = (msg) => toast.success(msg);

  const confirmLogout = async () => {
    try {
      const res = await authApi.doLogout();
      notify("Logged out successfully");
      setTimeout(() => {
        if (res.status == 200) {
          router.push("/auth/login");
        }
      }, 1000);
    } catch (err) {
      console.log(err, "err");
    }
  };

  return (
    <>
      <DialogPage1 open={open} close={close} width="w-auto">
        <div className="w-auto text-center content-start  pb-3 pr-8">
          <div className="flex justify-center">
            <Logout height={"48"} width={"100"} />
          </div>
          <p className="text-2xl p-2 text-primary">Are you Leaving ?</p>
          <p className="text-slate-500">
            Are you sure you want to logout ? All your unsaved data will be
            lost.
          </p>
        </div>

        <div className="flex justify-around">
          <button onClick={confirmLogout}>Yes, Logout</button>
          <button>NO</button>
        </div>
      </DialogPage1>
      <ToastContainer />
    </>
  );
};

const SidebarComp = ({ user }) => {
  const [isOpen, setOpen] = useState(true);
  const [textHigh, setTextHigh] = useState(false);
  const toggleMenu = () => setOpen(!isOpen);

  const router = useRouter();

  const defultColor = "#A3A3A3";
  const whiteColor = "#FFFFFF";
  const currentPath = router.pathname;

  const logout = async (e) => {
    setTextHigh(true);
  };

  //  let user  = 'super_admin'
  const superAdmin = [
    {
      label: "Overview",
      url: "/dashboard/overview",
      icon: <Overview />,
      fillIcon: <FillOverview />,
    },
    {
      label: "locations",
      url: "/dashboard/locations",
      icon: <Location />,
      fillIcon: <FillLocations />,
    },
    {
      label: "Asset Management",
      url: "/dashboard/asset-management",
      submenu: [
        { label: "All Assets", url: "/dashboard/asset-management/allAsset" },
        {
          label: "Asset From Managment",
          url: "/dashboard/asset-management/assetform",
        },
      ],
      icon: <AssetMangment />,
      fillIcon: <AssetMangementFill />,
    },
    {
      label: "Asset Groups",
      url: "/dashboard/user-management",
      icon: <AssetGroup />,
      fillIcon: <InventoryFillIcon />,
    },
    {
      label: "Department",
      url: "/dashboard/department",
      icon: <Departments />,
      fillIcon: <FillDepartment />,
    },
    {
      label: "Reports",
      url: "/dashboard/user-management",
      icon: <Reports />,
      fillIcon: <InventoryFillIcon />,
    },
    {
      label: "User Management",
      url: "/dashboard/usermanagement",
      submenu: [
        { label: "Member & Access", url: "/dashboard/usermanagement/allUser" },
        {
          label: "Administration",
          url: "/dashboard/usermanagement/administration",
        },
        {
          label: "Roles & Permissions",
          url: "/dashboard/usermanagement/roles",
        },
      ],
      icon: <RootMangment />,
      fillIcon: <FillUserManagment />,
    },
  ];

  const menuRoot = [
    {
      label: "Overview",
      url: "/dashboard/overview",
      icon: <Overview />,
      fillIcon: <FillOverview />,
    },
    {
      label: "Organizations",
      url: "/dashboard/root/organisation",
      icon: <Organizations />,
      fillIcon: <FillOrganization />,
    },
    {
      label: "Field Managment",
      url: "/dashboard/root/field-management",
      icon: <FieldMangment />,
      fillIcon: <FillFieldMangment />,
    },
    {
      label: "User Management",
      url: "/dashboard/usermanagement",
      submenu: [
        { label: "Member & Access", url: "/dashboard/usermanagement/allUser" },
        {
          label: "Roles & Permissions",
          url: "/dashboard/usermanagement/roles",
        },
        {
          label: "Manage Permissions",
          url: "/dashboard/usermanagement/manage",
        },
      ],
      icon: <RootMangment />,
      iconlast: <RightArrow />,
      fillIcon: <FillUserManagment />,
    },
    {
      label: "Account Management",
      url: "/dashboard/root/account",
      // submenu:[
      //   {label:"Generate",url:"/dashboard/qr-code"},
      // ],
      icon: <AccountManagement />,
      fillIcon: <AccountManagementFill />,
    },
  ];

  const menuAdmin = [
    {
      label: "Overview",
      url: "/dashboard/overview/new",
      icon: <Organizations />,
      fillIcon: <InventoryFillIcon />,
    },
    {
      label: "Sample Management",
      url: "/dashboard/sample",
      submenu: [
        { label: "Samples", url: "/dashboard/sample/viewSample" },
        { label: "Schedules", url: "/dashboard/sample/viewScheduler" },
        { label: "Dispose", url: "/dashboard/sample/viewDispose" },
        { label: "Generate QR Code", url: "/dashboard/qr-code" },
      ],
      icon: <SampleIcon />,
      // fillIcon: <SampleFillIcon />,
    },
    // {
    //   label: 'Schedules',
    //   url: '/dashboard/sample/viewScheduler',
    // },
    {
      label: "Analysis",
      url: "/dashboard/analysis",
      icon: <Organizations />,
      fillIcon: <InventoryFillIcon />,
    },
    {
      label: "Sources",
      url: "/dashboard/plant",
      icon: <Organizations />,
      fillIcon: <InventoryFillIcon />,
    },
    {
      label: "Reports",
      url: "/dashboard/reports/test",
      icon: <Organizations />,
      fillIcon: <InventoryFillIcon />,
    },
    {
      label: "Inventory Management",
      url: "/dashboard/inventory",
      submenu: [
        { label: "Item Master", url: "/dashboard/inventory/item-master" },
        { label: "Inventory", url: "/dashboard/inventory/inventory-manage" },
        { label: "Demand", url: "/dashboard/inventory/item-demand" },
        {
          label: "Item Procurement",
          url: "/dashboard/inventory/item-procurement",
        },
      ],
      // icon: <InventoryIcon />,
      // fillIcon: <InventoryFillIcon />,
    },
    {
      label: "Instrument Calibration",
      url: "/dashboard/instruments",
      submenu: [
        {
          label: "Instrument Master",
          url: "/dashboard/instruments/instrument-master",
        },
        // { label: 'Calibration', url: '/dashboard/instruments/calibration' },
        // {
        //   label: 'Calibration Status',
        //   url: '/dashboard/instruments/calibration-status',
        // },
      ],
      icon: <Organizations />,
      fillIcon: <InventoryFillIcon />,
    },
    {
      label: "User Management",
      url: "/dashboard/user-management",
      icon: <Organizations />,
      fillIcon: <InventoryFillIcon />,
    },
    // {
    //   label: 'QR Code',
    //   url: '/dashboard/qr-code',
    // },
  ];

  const menuItem =
    user === "root"
      ? menuRoot
      : user === "superadmin"
      ? superAdmin
      : // : user === 'sub_admin'
        menuAdmin;

  const handleChange = (e) => {
    !isOpen ? setOpen(true) : setOpen(false);
  };

  return (
    <Sidebar>
      <SidebarList>
        <div className="flex flex-col bg-[#F7F7F7] p-4 px-4">
          {menuItem.map((item, index) => {
            const Icon = item.icon;
            const FillIcon = item.fillIcon;
            const lastIcon = item?.iconlast;
            return item.submenu ? (
              <SidebarSubList
                label={item.label}
                href={item.url}
                open={currentPath.startsWith(item.url)}
                icon={Icon}
                fillIcon={FillIcon}
                lastIcon={lastIcon}
                key={index}
              >
                {item.submenu &&
                  Array.isArray(item.submenu) &&
                  item.submenu.map((subItem, index) => (
                    <SidebarSubItem
                      key={index}
                      href={subItem.url}
                      label={subItem.label}
                      active={currentPath.startsWith(subItem.url)}
                      isLastSubItem={index === item.submenu.length - 1} // Set isLastSubItem to true for the last sub-item
                    />
                  ))}
              </SidebarSubList>
            ) : (
              <SidebarItem
                label={item.label}
                href={item.url}
                active={currentPath.startsWith(item.url)}
                icon={Icon}
                fillIcon={FillIcon}
                key={index}
              />
            );
          })}

          {/* <SidebarSubList */}
          {/*  label="Inventory" */}
          {/*  icon={ */}
          {/*    <InventoryIcon */}
          {/*      className="w-24 h-24" */}
          {/*      color={ */}
          {/*        currentPath.startsWith('/inventory') */}
          {/*          ? whiteColor */}
          {/*          : defultColor */}
          {/*      } */}
          {/*    /> */}
          {/*  } */}
          {/*  open={currentPath.startsWith('/inventory')} */}
          {/*  href="/inventory" */}
          {/* > */}
          {/*  <SidebarSubItem */}
          {/*    label="Available" */}
          {/*    href="/inventory/available" */}
          {/*    active={currentPath.startsWith('/inventory/available')} */}
          {/*  /> */}
          {/*  <SidebarSubItem */}
          {/*    label="Consumed" */}
          {/*    href="/inventory/consumed" */}
          {/*    active={currentPath.startsWith('/inventory/consumed')} */}
          {/*  /> */}
          {/*  <SidebarSubItem */}
          {/*    label="Expired/Spoiled" */}
          {/*    href="/inventory/expired" */}
          {/*    active={currentPath.startsWith('/inventory/expired')} */}
          {/*  /> */}
          {/* </SidebarSubList> */}
        </div>

        <div className="flex-1" />
        <div className="bg-gray-300 h-px" />

        {isOpen ? (
          <div
            onClick={handleChange}
            className="py-6 transition-opacity duration-700 ease-in-out  p-4 px-2"
          >
            <div className="flex flex-row cursor-pointer items-center  p-3 rounded-lg gap-4">
              <Image
                src="/images/user.png"
                alt="user"
                width={40}
                height={40}
                className="peer cursor-pointer rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <p className="text-sm">{user}</p>
                <p className="text-xs text-gray-400">{"userDesignation"}</p>
              </div>
              <div className="py-2 px-2">
                <RightArrow />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              className="w-[300px]  grid grid-cols-1  divide-slate-200 border shadow-md bg-white absolute bottom-0 ml-2 mb-2 p-4 h-max cursor-pointer transition-opacity duration-700 ease-in-out"
              onClick={handleChange}
            >
              <div className="py-6 ">
                <div className="flex flex-row bg-white p-2 rounded-lg gap-4">
                  <Image
                    src="/images/user.png"
                    alt="user"
                    width={40}
                    height={40}
                    className="peer cursor-pointer rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm">{user}</p>
                    <p className="text-xs text-gray-400">{"userDesignation"}</p>
                  </div>
                </div>
              </div>
              <div className="py-2 text-slate-500 px-2">
                <div className="flex pt-4">
                  <p className="px-2">
                    <CompanyProfile />
                  </p>
                  <p>Company Profile</p>
                </div>
              </div>
              <div className="py-2 text-slate-500 px-2">
                <div className="flex pt-4">
                  <p className="px-2">
                    <Document />
                  </p>
                  <p>Document</p>
                </div>
              </div>
              <div className="py-2 text-slate-500 px-2">
                <div className="flex pt-4">
                  <p className="px-2">
                    <Setting />
                  </p>
                  <p>Setting</p>
                </div>
              </div>
              <div className="py-2 text-slate-500 px-2">
                <div className="flex pt-4">
                  <p className="px-2">
                    <Legal />
                  </p>
                  <p>Legal</p>
                </div>
              </div>
              <div className="py-2 text-slate-500 px-2">
                <div className="flex pt-4" onClick={logout}>
                  <p className="px-2">
                    <Logout width={"24"} height={"24"} />
                  </p>
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </>
        )}
        <ConfirmLogout open={textHigh} close={() => setTextHigh(false)} />
      </SidebarList>

      <ToastContainer />
    </Sidebar>
  );
};

export default SidebarComp;
