import React from 'react'
import Sidebar, { SidebarItem ,SidebarList,SidebarSubItem,SidebarSubList} from "../../../components/organism/sidebar";
import { useRouter } from 'next/router';
import InventoryFillIcon from '../../../components/atoms/icons';
import { SampleIcon ,QrIcon } from '../../../components/atoms/icons';




const SidebarComp = () => {
    const router = useRouter();

    const defultColor = '#A3A3A3';
const whiteColor = '#FFFFFF';
const currentPath = router.pathname;
 let user  = 'root'
    const menuRoot = [
        {
          label: 'Home',
          url: '/dashboard/root',
          icon: <SampleIcon />,
          fillIcon: <InventoryFillIcon />,
        },
        {
          label: 'User Management',
          url: '/dashboard/user-management',
          icon: <SampleIcon />,
          fillIcon: <InventoryFillIcon />,
        },
        {
          label: 'Field Management',
          url: '/dashboard/fields',
          icon: <SampleIcon />,
          fillIcon: <InventoryFillIcon />,
        },
        {
            label: 'Generate QR Code',
            url: '/dashboard/qr-code' ,
            submenu: [
              { label: 'Samples', url: '/dashboard/sample/viewSample' },
              { label: 'Schedules', url: '/dashboard/sample/viewScheduler' },
              { label: 'Generate QR Code', url: '/dashboard/qr-code' },
            ],
            icon: <QrIcon/>,
            fillIcon: <QrIcon/>,
          }
      ];
     
      const menuItem =
      user === 'root'
        ? menuRoot
        : user === 'super_admin'
        ? menuAdmin
        : user === 'sub_admin'
        ? menuSubAdmin
        : menu;

  return (
    <Sidebar>
        <SidebarList>
        <div className="flex flex-col  p-4 px-4">
          {menuItem.map((item, index) => {
            {/* console.log(item,'ite') */}
            const Icon = item.icon;
            const FillIcon = item.fillIcon;
            return item.submenu ? (
              <SidebarSubList
                label={item.label}
                href={item.url}
                open={currentPath.startsWith(item.url)}
                icon={Icon}
                fillIcon={FillIcon}
              >
                {/* {item.submenu.map((item) => (
                  <SidebarSubItem
                    label={item.label}
                    href={item.url}
                    active={currentPath.startsWith(item.url)}
                  />
                ))} */}
                {/* Checking Item.submenu exist or not handling for length and also checking item.submenu is an array or not*/}
                {item.submenu && Array.isArray(item.submenu) && item.submenu.map((subItem, index) => (
                   <SidebarSubItem
                      key={index}
                      href={subItem.url}
                      label={subItem.label}
                      active={currentPath.startsWith(item.url)}
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
              />
            );
          })}

         
        </div>
        </SidebarList>
    </Sidebar>
  )
}

export default SidebarComp
