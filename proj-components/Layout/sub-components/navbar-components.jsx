import React from 'react'
import Sidebar, { SidebarItem ,SidebarList,SidebarSubItem,SidebarSubList} from "../../../components/organism/sidebar";
import { useRouter } from 'next/router';
import InventoryFillIcon from '../../../components/atoms/icons';
import { FillOverview,FillUserManagment,FillOrganization,FillFieldMangment,
   SampleIcon ,QrIcon,Overview, Location,AssetMangment,AssetGroup,Departments,UserManagment,
   Reports,RootMangment,FieldMangment,Organizations ,AccountManagement, AccountManagementFill,FillLocations, FillDepartment} from '../../../components/atoms/icons';
import Image from 'next/image';




const SidebarComp = () => {
    const router = useRouter();

const defultColor = '#A3A3A3';
const whiteColor = '#FFFFFF';
const currentPath = router.pathname;
 let user  = 'super_admin'
    const superAdmin = [
      {
        label: 'Overview',
        url: '/dashboard/overview',
        icon: <Overview />,
        fillIcon:<FillOverview />,
      },
        {
          label: 'locations',
          url: '/dashboard/locations',
          icon: <Location />,
          fillIcon: <FillLocations/>,
        },
        {
          label: 'Asset Management',
          url: '/dashboard/fields',
          submenu: [
            { label: 'All Assets', url: '/dashboard/sample/viewSample' },
            { label: 'Asset From Managment', url: '/dashboard/sample/viewScheduler' },
  
          ],
          icon: <AssetMangment />,
          fillIcon: <InventoryFillIcon />,
        },
        {
          label: 'Asset Groups',
          url: '/dashboard/user-management',
          icon: <AssetGroup />,
          fillIcon: <InventoryFillIcon />,
        },
        {
          label: 'Department',
          url: '/dashboard/department',
          icon: <Departments />,
          fillIcon: <FillDepartment />,
        },
        {
          label: 'Reports',
          url: '/dashboard/user-management',
          icon: <Reports />,
          fillIcon: <InventoryFillIcon />,
        },
        {
          label: 'User Management',
          url: '/dashboard/usermanagement', 
          submenu: [
            { label: 'Member & Access', url: '/dashboard/usermanagement/allUser' },
            { label: 'Roles & Permissions', url: '/dashboard/usermanagement/roles' },
            { label: 'Manage Permissions', url: '/dashboard/usermanagement/manage' },
  
          ],
          icon: <RootMangment />,
          fillIcon: <FillUserManagment/>,
        }
      ];

    const menuRoot = [
      {
        label: 'Overview',
        url: '/dashboard/overview',
        icon: <Overview />,
        fillIcon:<FillOverview />,
      },
      {
        label: 'Organizations',
        url: '/dashboard/root/organisation',
        icon: <Organizations />,
        fillIcon: <FillOrganization />,
      },
      {
        label: 'Field Managment',
        url: '/dashboard/root/field-management',
        icon: <FieldMangment />,
        fillIcon: <FillFieldMangment />,
      },
      {
        label: 'User Management',
        url: '/dashboard/usermanagement', 
        submenu: [
          { label: 'Member & Access', url: '/dashboard/usermanagement/allUser' },
          { label: 'Roles & Permissions', url: '/dashboard/usermanagement/roles' },
          { label: 'Manage Permissions', url: '/dashboard/usermanagement/manage' },

        ],
        icon: <RootMangment />,
        fillIcon: <FillUserManagment/>,
      },{
        label:'Account Management',
        url:'/dashboard/root/account',
        // submenu:[
        //   {label:"Generate",url:"/dashboard/qr-code"},
        // ],
        icon:<AccountManagement/>,
        fillIcon: <AccountManagementFill/>,
      }
    ]
    
    const menuAdmin = [
      {
        label: 'Overview',
        url: '/dashboard/overview/new',
        icon: <Organizations />,
        fillIcon: <InventoryFillIcon />,
      },
      {
        label: 'Sample Management',
        url: '/dashboard/sample',
        submenu: [
          { label: 'Samples', url: '/dashboard/sample/viewSample' },
          { label: 'Schedules', url: '/dashboard/sample/viewScheduler' },
          { label: 'Dispose', url: '/dashboard/sample/viewDispose' },
          { label: 'Generate QR Code', url: '/dashboard/qr-code' },
        ],
        icon: <SampleIcon />,
        // fillIcon: <SampleFillIcon />,
      },
      // {
      //   label: 'Schedules',
      //   url: '/dashboard/sample/viewScheduler',
      // },
      {
        label: 'Analysis',
        url: '/dashboard/analysis',
        icon: <Organizations />,
        fillIcon: <InventoryFillIcon />,
      },
      {
        label: 'Sources',
        url: '/dashboard/plant',
        icon: <Organizations />,
        fillIcon: <InventoryFillIcon />,
      },
      {
        label: 'Reports',
        url: '/dashboard/reports/test',
        icon: <Organizations />,
        fillIcon: <InventoryFillIcon />,
      },
      {
        label: 'Inventory Management',
        url: '/dashboard/inventory',
        submenu: [
          { label: 'Item Master', url: '/dashboard/inventory/item-master' },
          { label: 'Inventory', url: '/dashboard/inventory/inventory-manage' },
          { label: 'Demand', url: '/dashboard/inventory/item-demand' },
          {
            label: 'Item Procurement',
            url: '/dashboard/inventory/item-procurement',
          },
        ],
        // icon: <InventoryIcon />,
        // fillIcon: <InventoryFillIcon />,
      },
      {
        label: 'Instrument Calibration',
        url: '/dashboard/instruments',
        submenu: [
          {
            label: 'Instrument Master',
            url: '/dashboard/instruments/instrument-master',
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
        label: 'User Management',
        url: '/dashboard/user-management',
        icon: <Organizations />,
        fillIcon: <InventoryFillIcon />,
      },
      // {
      //   label: 'QR Code',
      //   url: '/dashboard/qr-code',
      // },
    ];

      const menuItem =
      user === 'root'
        ? menuRoot
        : user === 'super_admin'
        ? superAdmin
        : user === 'sub_admin'
        ? menuAdmin
        : menu;

  return (
    <Sidebar >
    <SidebarList>
      <div className="flex flex-col bg-[#F7F7F7] p-4 px-4">
        {menuItem.map((item, index) => {
          const Icon = item.icon;
          const FillIcon = item.fillIcon;
          return item.submenu ? (
            <SidebarSubList
              label={item.label}
              href={item.url}
              open={currentPath.startsWith(item.url)}
              icon={Icon}
              fillIcon={FillIcon}
              key={index}
            >
             
             {item.submenu && Array.isArray(item.submenu) && item.submenu.map((subItem, index) => (
        
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
      <div className="py-6  p-4 px-4">
        <div className="flex flex-row bg-white p-2 rounded-lg gap-4">
          <Image
            src="/wazirabad/girl.jpg"
            alt="user"
            width={40}
            height={40}
            className="peer cursor-pointer rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <p className="text-sm">{'abdul'}</p>
            <p className="text-xs text-gray-400">{"userDesignation"}</p>
          </div>
        </div>
      </div>
    </SidebarList>
  </Sidebar>
  )
}

export default SidebarComp
