import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { CustomSelect, Text1, TextField } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'



const singleDepartment = ()=> {
 const router = useRouter()
 const[showSave, setShowSave] = useState(true)
 const[logoHigh, setLogoHigh] = useState(false)


 const handleshow = () => {
  console.log("this is test")
  setShowSave(!showSave)
 }

  return (
    <div>
      <MainLayout>
      <div className='flex flex-col justify-between'>
           <div className='flex justify-between'>
            <div className='flex items-center cursor-pointer' onClick={()=>router.back()}> <LeftArrowIcon/>
           <Text1 size='2xl' >Johdoe</Text1>
           </div>
           <div className='space-x-2'>
           {showSave ?  <Button variant='contained' onClick={handleshow}>EDIT</Button> : <Button variant='contained' onClick={handleshow}>SAVE</Button>}  
                <Button variant='danger'>DEACTIVATE</Button>
           </div>
           </div>
           <div className="flex p-5 py-5 flex-col gap-12">
    
           <div className="flex flex-col  gap-6">
             <Text1 weight="semibold">Basic Information</Text1>
             <div className="flex gap-10 ">
               <div className="w-3/12">
                 <TextField label={"Department Name"} disabled={showSave} placeHolder="Input Text" />
               </div>
               <div className="w-3/12">
                 <TextField label={"Department ID"} disabled={showSave} placeHolder="Input Text" />
               </div>
             </div>
           </div>
           <div className="flex flex-col gap-6">
             <Text1 weight="semibold">More Information</Text1>
             <div className="flex gap-10 ">
               <div className="w-3/12">
                 <CustomSelect label={"Status"} disabled={showSave}>
                   <option value="">Select</option>
                   <option value="active">Active</option>
                   <option value="Inactive">Inactive</option>
                 </CustomSelect>
               </div>
               <div className="w-3/12">
                 <TextField label={"Charging Type"} disabled={showSave} placeHolder="Input Text" />
               </div>
             </div>
           </div>
         </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default singleDepartment
