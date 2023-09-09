import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { CustomSelect, Text1, TextField } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import DialogPage from '@/components/molecules/dialog'
import { useRouter } from 'next/router'


const AddLocation = () => {
    const router = useRouter()
  return (<>
    <MainLayout isScroll={true}>
       <div> 
            <div className='flex justify-between'>
                <div className='flex items-center gap-2 cursor-pointer' onClick={()=> router.back()}>
                    <LeftArrowIcon/>
                    <Text1 size='2xl'>
                        Add Location
                    </Text1>
                </div>
                <Button variant='contained'>SAVE</Button>
             </div>
             <div className='mt-10 space-y-8'>
                <div className='space-y-6'>
                    <Text1>Location Information</Text1>
                    <div className='flex gap-11'>
                        <TextField className='w-1/4' label='Location Name'/>
                        <TextField className='w-1/4' label='Location Id'/>
                    </div>
                </div>
                <div className='space-y-6'>
                    <Text1>Assigned Uers</Text1>
                    <div className='flex items-center gap-11'>
                    <div className='w-1/4'>
                       <CustomSelect label={"Industry Type"}>
                        <option value="">Select</option>
                        <option value="admin">Admin</option>
                       </CustomSelect>
                    </div>
                        <div className='mt-[18px]'>
                        <Button>ADD USER</Button>
                        </div>
                    </div>
                    
                </div>
                <div className='space-y-8'>
                    <Text1>Location Address</Text1>
                    <TextField label='Address Line1'/>
                    <TextField label='Address Line2'/>
                    <div className='flex gap-11'>
                        <div className='w-3/12'>
                        <CustomSelect label={'city'}>
                            <option value=''>Country</option> 
                        </CustomSelect>
                        </div>
                        <div className='w-3/12'>
                        <CustomSelect label={'State'}>
                            <option value=''>state</option> 
                        </CustomSelect>
                        </div>
                        <div className='w-3/12'>
                        <CustomSelect label={'country'}>
                            <option value=''>country</option> 
                        </CustomSelect>
                        </div>
                        <div className='w-3/12'>
                        <TextField label='Zip code'/>
                        </div>
 
                    </div>
                    <div className='flex gap-11' >
                        <TextField className='w-1/4' label='Email Address'/>
                        <TextField className='w-1/4' label='Contact' />
                        <TextField className='w-1/4' label='Tan No'/>
                    </div>
                </div>
                <div className='space-y-6'>
                    <Text1>Location Nesting</Text1>
                    <div className='w-3/12'>
                        <CustomSelect label={'Nesting Location Under'}>
                        <option value=''>select option</option> 
                        </CustomSelect>
                    </div>
                </div>
             </div>   
       </div>
    </MainLayout>
  </>
  )
}

export default AddLocation
