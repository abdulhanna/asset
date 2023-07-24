import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

 const Sidebar = ({ children }) => {
    return (
      <div className="bg-sidebar min-w-[16rem] text-primary-lightest flex flex-col h-screen  overflow-y-auto border-r">
        <div className="flex flex-row p-6  items-center justify-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={56}
            height={56}
            className="rounded-xl object-cover "
          />
  
          <div className="flex flex-col">
            <p className="text-base">Asset</p>
            <p className="text-base">Management</p>
          </div>
        </div>
        {children}
      </div>
    );
}

export const SidebarItem = ({
    href,
    icon,
    accessoryIcon,
    label,
    active,
    classname = '',
    fillIcon,
  }) => {
    return (
      <Link href={href}>
        <a className="flex py-2">
          <div
            className={cn(
              `${classname}`,
              'w-full inline-block p-2 flex flex-row items-center cursor-pointer text-sm rounded',
              {
                'bg-menuBG text-sky-800 font-semibold': active,
              },
              {
                'hover:bg-gray-100 hover:text-gray-400 text-gray-400': !active,
              }
            )}
          >
            <span className="px-2">{active ? fillIcon : icon}</span>
            <span className="px-2 flex-grow text-sm truncate">{label}</span>
            {accessoryIcon}
          </div>
        </a>
      </Link>
    );
  };

export const SidebarList = ({ children }) => {
    return <div className="flex flex-col flex-grow gap-6"> {children}</div>;
  };

  // export const SidebarSubItem = ({ href, label, active,isLastSubItem }) => {
  //   // console.log(label,'la');
  //   return (
  //     <div className="flex flex-row">
  //       <div className="flex px-3">
  //         <span className="bg-menuText w-px" />
  //       </div>
  //       <div className=" flex flex-cols items-center">
  //         {/* {active ? <GreenCircleIcon /> : <GrayCircleIcon />} */}
  //         <Link href={href}>
  //           <a
  //             className={cn(
  //               'inline-block p-2 px-4 flex flex-row items-center cursor-pointer md:text-sm',
  //               {
  //                 'font-semibold text-sky-800': active,
  //                 'text-gray-400': !active,
  //               }
  //             )}
  //           >
  //             {label}
  //           </a>
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // };

  export const SidebarSubItem = ({ href, label, active,isLastSubItem }) => {
    console.log(isLastSubItem,'this is lastiten');
   return (
     <div className="flex flex-row ">
       <div className="flex">
       {isLastSubItem ? (
                <span className="bg-menuText bg-slate-400 h-4 w-px" />
       ) : (
         <span className="bg-menuText h-9 bg-slate-400 w-px" />
       )}

       </div>
       <div className="flex">
         <span className="bg-menuText mt-4 bg-slate-400 h-px w-6" />
       </div>
       <div className=" flex flex-cols items-center">
         {/* {active ? <GreenCircleIcon /> : <GrayCircleIcon />} */}
         <Link href={href}>
           <a
              className={cn(
               'inline-block p-2 px-4 flex flex-row items-center cursor-pointer md:text-sm',
               {
                 'font-semibold text-sky-800': active,
                 'text-gray-400': !active,
                 // Add custom CSS for the last sub-element item
                 'text-gray-400 ': isLastSubItem,
               }
             )}
           >
             {label}
           </a>
         </Link>
       </div>
     </div>
   );
 };


  export const SidebarSubList = ({
    children,
    href,
    open,
    submenu,
    onOpenClick,
    ...props
  }) => {
    const router = useRouter();
    const currentPath = router.pathname;
    // console.log(open,'open');
    return (
      <div>
        <SidebarItem {...props} onClick={onOpenClick} href={href} active={open} />
        <div
          className={cn(
            'overflow-hidden',
            'transition-all',
            { 'max-h-0': !open },
            { 'max-h-96': open }
          )}
        >
          <div className="flex flex-row">
            {/* <div className={cn('border-l-2', 'border-primary', 'my-3')} /> */}
            <div className="px-4 py-4">{children}</div>
          </div>
        </div>
      </div>
    );
  };

export default Sidebar