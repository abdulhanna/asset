import React, {useState} from 'react'
import MainLayout from 'proj-components/MainLayout'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
import { AddIcon, LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'
import { TextField, CustomSelect } from "@/components/atoms/field";


const SingleUser = () => {
  const[showSave, setShowsave] = useState(true)
  const router = useRouter()

  const handleshow = () => {
    console.log("this is test")
    setShowsave(!showSave)
  }

  return (
    <>
      <MainLayout>
      <div>
        <div className='flex flex-col justify-between'>
           <div className='flex justify-between'>
            <div className='flex items-center cursor-pointer' onClick={()=>router.back()}> <LeftArrowIcon/>
           <Text1 size='2xl' >Johdoe</Text1>
           </div>
           <div className='space-x-2'>
           {showSave ?  <Button variant='contained' onClick={handleshow}>EDIT</Button> :  <Button variant='contained' onClick={handleshow}>SAVE</Button>}  
         
             <Button variant='danger'>DEACTIVATE</Button>
           </div>
           </div>

           <div className="flex p-5 py-5 flex-col gap-12">
           <div className="flex flex-col gap-6">
             <Text1 weight="semibold">Profile Picture</Text1>
             <div className="flex items-center gap-8">
               <div className="h-[120px] w-[120px] border rounded-full">
                 pic
               </div>
               <div>
               
               </div>
             </div>
           </div>
           <div className="flex flex-col gap-6">
             <Text1 weight="semibold">User Information</Text1>
             <div className="flex gap-10 ">
               <div className="w-3/12">
                 <TextField label={"Username"} disabled={showSave} placeHolder="Input Text" />
               </div>
               <div className="w-3/12">
                 <TextField
                   label={"User Identification Number"}
                   placeHolder="Input Text"
                   disabled={showSave}
                 />
               </div>
               <div className="w-3/12">
                 <CustomSelect label={"User Roll"} disabled={showSave}>
                   <option value="">Select</option>
                   <option value="admin">Admin</option>
                 </CustomSelect>
               </div>

               <div className="w-3/12 flex">
                 <Button className={"my-auto"}>
                   <div className="flex ">
                     <AddIcon />
                     <span className="ms-3 ">ADD ROLE</span>
                   </div>
                 </Button>
               </div>
             </div>
           </div>
           <div className="flex flex-col  gap-6">
             <Text1 weight="semibold">Contact Information</Text1>
             <div className="flex gap-10 ">
               <div className="w-3/12">
                 <TextField label={"User Email ID"} disabled={showSave} placeHolder="Input Text" />
               </div>
               <div className="w-3/12">
                 <TextField label={"Contact No."} disabled={showSave} placeHolder="Input Text" />
               </div>
             </div>
           </div>
           <div className="flex flex-col gap-6">
             <Text1 weight="semibold">User Status</Text1>
             <div className="flex gap-10 ">
               <div className="w-3/12">
                 <CustomSelect label={"User Role"} disabled={showSave}>
                   <option value="">Select</option>
                   <option value="admin">Admin</option>
                 </CustomSelect>
               </div>
             </div>
           </div>
         </div>
        </div>
       
      </div>
      </MainLayout>
    </>
  )
}

export default SingleUser
