import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import { CustomSelect, Text1, TextField } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'

const LocationDetail = () => {
    const router = useRouter()


  return (
   <>
    <MainLayout isScroll={true}>
        <div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-4 cursor-pointer' onClick={()=> router.back()}>
                    <LeftArrowIcon/>
                    <Text1 size='2xl'>Add Locations</Text1>
                </div>
                <Button className={'tracking-wider'} variant='contained'>Edit</Button>
            </div>
            <div className='mt-10 space-y-6'>
                <div>
                    <Text1>Location Information</Text1>
                    <div className='flex  gap-11'>
                        <TextField className='w-1/4' label='Location Name'/>
                        <TextField className='w-1/4' label='Location Id'/>
                    </div>
                </div>

                <div>
                    <Text1>Assigned Users</Text1>
                    <div className='flex  gap-11'>
                        <TextField className='w-1/4' label='User'/>
                    </div>
                </div>

               {/* Locations Address */}
                <div className=''>
                    <Text1>Location Address</Text1>
                    <div className='space-y-4'>
                        <TextField className='' label='Address Line 1'/>
                        <TextField label='Address Line 2'/>
                        <div className='flex gap-4'>
                            <TextField className='w-1/4' label='City'/>
                            <TextField className='w-1/4' label='State'/>
                            <TextField className='w-1/4' label='Country'/>
                            <TextField className='w-1/4' label='Zip Code'/>
                        </div>
                        <div className='flex gap-4'>
                            <TextField className='w-1/4' label='Email Address'/>
                            <TextField className='w-1/4' label='Contact No'/>
                            <TextField className='w-1/4' label='TAN No'/>
                            {/* <TextField className='w-1/4' label='Zip Code'/> */}
                        </div>
                    </div>
                </div>

                {/* Location Nested */}
                <div>
                     <Text1>Location Nested</Text1>
                     <CustomSelect className={'w-1/4'} label={'Nest Location Under'}>
                       <option value={''}>sfjkbdg</option>
                     </CustomSelect>
                     {/* <TextField label=''/> */}
                </div>
            </div>
        </div>
    </MainLayout>
   </>
  )
}

export default LocationDetail
