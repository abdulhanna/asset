import React, { useEffect, useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { TextField, CustomSelect } from '@/components/atoms/field'
import PermissionToggle from 'proj-components/Dashboard/user-management/permissionItem'
import { doCheckAuth } from '@/utils/doCheckAuth'

const Permission = ({user}) => {
  const router = useRouter()
  const [permission,setPermission] = useState({
     modlueName :"",
     dashboardType:"",
     view:false,
     edit:true,
    //  readWrite:true,
     action:false,
     allAccess:true
  })

  const handleToggle =(e)=>{

     if(e.label === "EDIT"){
      setPermission((prevState)=> ({...prevState ,edit:e.status}))
     }else if(e.label === "VIEW"){
      setPermission((prevState)=> ({...prevState ,view:e.status}))
     }else if(e.label === "ACTION"){
      setPermission((prevState)=> ({...prevState ,action:e.status}))
     }
  
  }

  useEffect(()=>{
      console.log(permission,'per')
  },[permission])

  return (
    <>
        <MainLayout User={user}>
             <div>
               <div className='flex justify-between items-center'>
                    <div className='flex items-center space-x-2 cursor-pointer' onClick={()=> router.back()}>
                            <LeftArrowIcon/>
                            <Text1 size='2xl'>Create Permission</Text1>
                     </div>
                     <div>
                     <Button variant='contained'>SAVE </Button>
                     </div>
               </div>
               <div className='my-10'>
                   <Text1>Module Name</Text1>
                   <div className='flex items-center gap-4 mt-6'>
                   <TextField className='w-1/4' label='Module Name' value={permission.modlueName} onChange={(e)=> setPermission({...permission,modlueName:e.target.value})}/>
                   <CustomSelect className='w-1/4' label="Dashboard Type" onChange={(e)=> setPermission({...permission,dashboardType:e.target.value})}>
                        <option value={""}>Choose one</option>
                        <option value={'root'}>Root</option>
                        <option value={'superadmin'}>SuperAdmin</option>
                      
                   </CustomSelect>
                   </div>
               </div>
               <div className='space-y-6'>
                   <Text1>Permissions </Text1>
                   <div className='flex gap-10'>
                   <PermissionToggle label="VIEW" status={permission.view} handleClick={(e)=> handleToggle(e)}/>
                   <PermissionToggle label="EDIT" status={permission.edit} handleClick={(e)=> handleToggle(e)}/>
                   <PermissionToggle label="ACTION" status={permission.action} handleClick={(e)=> handleToggle(e)}/>
                   </div>
               </div>
               <div className='my-10 flex space-x-4'>
                <input type='checkbox' checked={permission.allAccess} value={permission.allAccess} onChange={(e)=> setPermission({...permission,allAccess:e.target.checked})}/>
                <Text1>show All Access/Remove All Access</Text1>
               </div>
             </div>
        </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
   
  const auth =await doCheckAuth(appCtx)
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };

  } else {
    return {
      props:{
         user:auth
      }
    }
  }

}


export default Permission
