import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { TextField, CustomSelect } from '@/components/atoms/field'

const Permission = () => {
  const router = useRouter()
  return (
    <>
        <MainLayout>
             <div>
               <div className='flex justify-between items-center'>
                    <div className='flex items-center space-x-2' onClick={()=> router.back()}>
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
                   <TextField className='w-1/4' label='Module Name'/>
                   <CustomSelect className='w-1/4' label="Dashboard Type">
                        <option value={""}>choose city</option>
                        <option value={'root'}>root</option>
                        <option value={'superadmin'}>superAdmin</option>
                      
                   </CustomSelect>
                   </div>
               </div>
               <div>
                   <Text1>Permissions </Text1>
               </div>
             </div>
        </MainLayout>
    </>
  )
}

export default Permission
