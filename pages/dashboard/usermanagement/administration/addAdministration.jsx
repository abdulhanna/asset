import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import { CustomSelect, Text1, TextField } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'
import Button from '@/components/atoms/button'
import ButtonAction from '@/components/molecules/button'
import { DialogPage1 } from '@/components/molecules/dialog'

const AddAdministration = () => {
    const router = useRouter()
  return (
    <>
        <MainLayout>
            <div>
                  <div className='flex justify-between items-center'>
                        <div className='flex gap-4 items-center cursor-pointer' onClick={()=> router.back()}>
                            <LeftArrowIcon/>
                            <Text1 size='2xl'>Add Administrator</Text1>
                        </div>
                        <Button variant='contained'>SAVE</Button>
                  </div>
                  <div className='mt-10 space-y-8 '>
                       
                       <div className='space-y-6'>
                          <Text1>Picture Profile</Text1>
                          <div className='flex items-center gap-8'>
                            <img className='w-[112px] h-[112px]' src='/images/Ellipse 2.png' width={'100'} height={'200'} alt='avtar'/>
                            <div>
                              <ButtonAction label={'Add Photo'} onClick={()=> alert('dd')}/>
                            </div>
                          </div>
                         
                       </div>
                       {/* USER INFORMATION */}
                       <div className='space-y-6'>
                         <Text1>User Information</Text1>
                         <div className='flex gap-11'>
                            <TextField className='w-1/4' label='Username'/>
                            <TextField className='w-1/4' label="User Identification Number"/>
                            <CustomSelect className={'w-1/4'} label={'User Role'}>
                              <option value={''}>Choose</option>
                            </CustomSelect>
                         </div>
                       </div>
                        {/* CONTACT INFORMATION */}
                       <div className='space-y-6'>
                         <Text1>Contact Information</Text1>
                         <div className='flex gap-11'>
                            <TextField className='w-1/4' label='User Email '/>
                            <TextField className='w-1/4' label="Contact No"/>
                            <CustomSelect className={'w-1/4'} label={'Assign Location'}>
                              <option value={''}>Choose</option>
                            </CustomSelect>
                         </div>
                       </div>
                       {/* USER STATUS */}
                        <div>
                            <CustomSelect className={'w-1/4'} label={'User Status'}>
                              <option value={''}>choose staus</option>
                            </CustomSelect>
                        </div>
                  </div>
            </div>
        </MainLayout>
    </>
  )
}

export default AddAdministration
