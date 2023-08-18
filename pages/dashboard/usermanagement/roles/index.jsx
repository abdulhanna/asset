import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import NodataPage from '@/components/molecules/nodataPage'

const RolesPerimission = () => {
    const [roleList,setRoleList] = useState([])
  return (
    <>
        <MainLayout>
            <div className='space-y-2'>
               <div className='flex justify-between items-center'>
                <Text1 size='2xl'>All Roles</Text1>
                 <Button href={'/dashboard/usermanagement/roles/add-roles'} variant='contained' >CREATE ROLE</Button>
               </div>
               <div>
                {!roleList.length ? (<NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'}/>):(
                    <>
                        <div>table </div>
                    </>
                )}
               </div>
            </div> 
        </MainLayout>
    </>
  )
}

export default RolesPerimission 