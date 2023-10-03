import React, { useEffect, useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { CustomSelect, Text1, TextField } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import DialogPage from '@/components/molecules/dialog'
import { useRouter } from 'next/router'
import { doCheckAuth } from '@/utils/doCheckAuth'


const AddUserDialog = ({open,close})=>{

    return (<>
          <DialogPage width='min-w-[60%]' open={open} close={close}>
                <div className='mx-[60px] my-[40px]'>
                <div className=''>
                <div className='flex justify-center'>
                <Text1>Add  User</Text1>
                </div>
                <div className='grid grid-cols-10 gap-8 mt-10'>
                    {/* Picture Profile */}
                    <div className='col-span-2 space-y-4'>
                    <Text1>Profile  Picture</Text1>
                    <img className='w-[112px] h-[112px]' src='/images/Ellipse 2.png' width={'100'} height={'200'} alt='avtar'/>
                    <Button >Add Photo</Button>
                      
                    </div>
                    {/* User Information */}
                    <div className='col-span-8'>
                        <Text1>User Information</Text1>
                        <div className='flex gap-4'>
                            <TextField className='w-full' label='User Name'/>
                            <TextField className='w-full' label='User Identification No'/>
                        </div>
                        <div>
                            <TextField className='w-1/2' label='User Role'/>
                        </div>
                        <div className='mt-8'>
                        <Text1>User Information</Text1>
                        </div>
                        <div className='flex gap-4'>
                            <TextField className='w-full' label='Email Address'/>
                            <TextField className='w-full' label='Contact No'/>
                        </div>
                        <div className='mt-8'>
                        <Text1>User Status</Text1>
                        </div>
                        <div className='flex gap-4'>
                        <CustomSelect className={'w-1/2'} label={'User Status'}>
                            <option value=''>choose one</option>
                            <option value={'active'}>Active</option>
                            <option value={'deactive'}>DeActive</option>

                        </CustomSelect>
                            {/* <TextField className='w-full' label='Email Address'/>/ */}
                            {/* <TextField className='w-full' label='Contact No'/> */}
                        </div>
                    </div>
                
                </div>
                <div className='flex justify-center mt-10'>
                <Button variant='contained'>Add User</Button>
                </div>
            </div>
                </div>
            </DialogPage>
    </>)
}


const AddLocation = ({user}) => {
    const router = useRouter()
    const [isOpen,setIsOpen] = useState(false)
    const [data,setData] = useState({
        name:"",
        codeGenerationType:"",
        address:{
           address1:'',
           city:'',
           state:"",
           country:"",
           pinCode:''
        },
        locationId:'',
        industryType:"",
        address1:"",
        address2:"",
        city:"",
        state:"",
        country:"",
        zip_code:"",
        nested:''
    })

    useEffect(()=>{

      console.log(data,'data')

    },[data])
    const handleChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
       }

    // const arr= [2,34,6,7,34,5]
  return (<>
    <MainLayout isScroll={true} User={user}>
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
                {/* Location Information */}
                <div className='space-y-6'>
                    <Text1>Location Information</Text1>
                    <div className='flex items-center  gap-11'>
                        <TextField className='w-1/4' name='locationName' label='Location Name' onChange={(e)=> setData({...data,[e.target.name]:e.target.value})}/>
                        <div className='space-x-2'>
                            <label htmlFor='manual'>Manual</label>
                            <input type='radio' id='manual' name='location_id' onChange={(e)=> setData({...data,locationType:e.target.id})}/>
                            <label htmlFor='automatic'>Automatic</label>
                            <input type='radio' id='automatic' name='location_id' onChange={(e)=>setData({...data,locationType:e.target.id})}/>
                        </div>
                        {data.locationType ==='manual' && <TextField className='w-1/4' label='Location Id' name={'locationId'} onChange={handleChange}/>}
                    </div>
                </div>
                {/* Assigned Users */}
                <div className='space-y-6'>
                    <Text1>Assigned Uers</Text1>
                    <div className='flex items-center gap-11'>
                    <div className='w-1/4'>
                       <CustomSelect label={"Industry Type"} onChange={(e)=>setData({...data,industryType:e.target.value})}>
                        <option value="">Select</option>
                        <option value="manufacturing">manufaturing</option>
                        <option value="IT">IT</option>
                        <option value="banking">Banking</option>
                       </CustomSelect>
                    </div>
                        <div className='mt-[18px]'>
                        <Button onClick={()=> setIsOpen(true)}>ADD USER</Button>
                        </div>
                    </div>
                    
                </div>
                {/* Location Address */}
                <div className='space-y-8'>
                    <Text1>Location Address</Text1>
                    <TextField name='address1' label='Address Line1' onChange={handleChange}/>
                    <TextField name='address2' label='Address Line2' onChange={handleChange}/>
                    <div className='flex gap-11'>
                        <div className='w-3/12'>
                        <CustomSelect label={'city'} name={'city'} onChange={handleChange}>
                            <option value=''>Country</option> 
                            <option value={'delhi'}>Delhi</option>
                            <option value={'lucknow'}>Lucknow</option>
                        </CustomSelect>
                        </div>
                        <div className='w-3/12'>
                        <CustomSelect label={'State'} name={'state'} onChange={handleChange}>
                            <option value=''>state</option> 
                            <option value='bihar'>Bihar</option> 
                            <option value='up'>Up</option> 
                        </CustomSelect>
                        </div>
                        <div className='w-3/12'>
                        <CustomSelect label={'country'} name={'country'} onChange={handleChange}>
                            <option value=''>country</option> 
                            <option value='india'>india</option> 
                        </CustomSelect>
                        </div>
                        <div className='w-3/12'>
                        <TextField label='Zip code' name='zip_code' onChange={handleChange}/>
                        </div>
 
                    </div>
                    <div className='flex gap-11' >
                        <TextField className='w-1/4' label='Email Address' name='email' onChange={handleChange}/>
                        <TextField className='w-1/4' label='Contact' name='contact' onChange={handleChange}/>
                        <TextField className='w-1/4' label='Tan No' name='tan' onChange={handleChange}/>
                    </div>
                </div>
                {/* Location Nesting */}
                <div className='space-y-6'>
                    <Text1>Location Nesting</Text1>
                    <div className='w-3/12'>
                        <CustomSelect label={'Nesting Location Under'} name={'nested'} onChange={handleChange}>
                        <option value=''>select option</option> 
                        </CustomSelect>
                    </div>
                </div>
             </div>  
             <AddUserDialog open={isOpen} close={()=> setIsOpen(!isOpen)}></AddUserDialog> 
       </div>
    </MainLayout>
  </>
  )
}

export default AddLocation
