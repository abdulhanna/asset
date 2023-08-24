import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import { Text1, CustomSelect, TextField } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import Button from '@/components/atoms/button'
import PermissionToggle,{PermissionToggleRead} from 'proj-components/Dashboard/user-management/permissionItem'
import { useRouter } from 'next/router'

const Edit = () => {
    const [isEdit,setIsEdit] = useState(false)
    const [permission,setPermission] = useState({
        modlueName :'Admin',
        dashboardType:'Root',
        view:false,
        edit:true,
       //  readWrite:true,
        action:false,
        allAccess:false
     })
     const router = useRouter()

  return (
   <>
   <MainLayout>
       <div className='space-y-10'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3 cursor-pointer' onClick={()=> router.back()}>
                    <LeftArrowIcon/>
                    <Text1 size='2xl'>Permission</Text1>
                </div>
                <div className='flex gap-5'>
                    {isEdit ? <Button variant='contained'>SAVE</Button> :<Button variant='contained' onClick={()=>setIsEdit(!isEdit)}>EDIT</Button>}
                    <Button variant='danger'>DEACTIVATE</Button>
                </div>
            </div>
            <div className='flex gap-11'>
                <TextField className='w-1/4' label='Module Name' value={permission.modlueName} onChange={(e)=> setPermission({...permission,modlueName:e.target.value})} disabled={!isEdit}/>
                <CustomSelect className={'w-1/4'} label={'Dashboard Type'} disabled={!isEdit}>
                    <option value={permission.dashboardType}>{permission.dashboardType}</option>
                    <option value={'root'}>Root</option>
                    <option value={'superadmin'}>SuperAdmin</option>
                </CustomSelect>
            </div>
            <div className='space-y-10'>
                <Text1>Permissions</Text1>
                <div className='flex gap-10'>
                    {isEdit ? <PermissionToggle label={'VIEW'} status={permission.view} handleClick={(e)=>setPermission({...permission,view:e.status})}/>:<PermissionToggleRead label={'VIEW'} status={permission.view}/>}
                    {isEdit ? <PermissionToggle label={'EDIT'} status={permission.edit} handleClick={(e)=>setPermission({...permission,edit:e.status})}/>:<PermissionToggleRead label={'EDIT'} status={permission.edit}/>}
                    {isEdit ? <PermissionToggle label={'ACTION'} status={permission.action} handleClick={(e)=>setPermission({...permission,action:e.status})}/>:<PermissionToggleRead label={'ACTION'} status={permission.action}/>}   
                </div>

            </div>
            <div className='my-10 flex space-x-4'>
                <input type='checkbox' checked={permission.allAccess} value={permission.allAccess} onChange={(e)=> setPermission({...permission,allAccess:e.target.checked})} disabled={!isEdit}/>
                <Text1>show All Access/Remove All Access</Text1>
               </div>
       </div>
   </MainLayout>
   </>
  )
}

export default Edit
