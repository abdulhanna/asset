import React from 'react'
import MainLayout from '../../../proj-components/MainLayout'
import { Nodata } from '../../../components/atoms/icons'
import {Text1} from "../../../components/atoms/field";
import Button from '../../../components/atoms/button';

import { useRouter } from 'next/router';

const Overview = () => {
  const router = useRouter();
    
  const {id,name} = router.query

  console.log(name, id,"jjname")

  let loginRole = 'root'
  
  const handleAddButtonClick = () => {
    router.push('/dashboard/root/organisation/add'); // This will navigate to the 'add-form' page
  };

  console.log(loginRole, "this is login role")
  

  return (
    <>

    {/* This is Overview of root */}
    {
      loginRole === 'root' && 

      <MainLayout>
       
       {
        id ? <> 
            <div className='flex justify-between mb-4'>
      <Text1 size="2xl" weight="medium">
         {name}
     </Text1>
     <Button onClick={handleAddButtonClick} variant="contained">COMPANY PROFILE</Button>
     </div>
       <div className='border rounded-md flex items-center justify-center h-screen bg-[#F7F7F7] overflow-hidden'>
             <div className='text-center'>
                 <Nodata className={'flex justify-center'}/>
                 <div className='mt-3'>
                   <span className='text-gray-600'> This is the Statistics Page for this Dashboard.</span> 
                   ID:{id}
                   {/* <span className='text-blue-600 underline underline-offset-4'>Know how?</span> */}
                 </div>
             </div>
       </div>

        </> :<>
        {/* <div className='flex justify-between mb-4'>
      <Text1 size="2xl" weight="medium">
         All ORGANIZATION
     </Text1>
     <Button onClick={handleAddButtonClick} variant="contained">ADD ORGANIZATION</Button>
     </div> */}
       <div className='border rounded-md flex items-center justify-center h-screen bg-[#F7F7F7] overflow-hidden'>
             <div className='text-center'>
                 <Nodata className={'flex justify-center'}/>
                 <div className='mt-3'>
                   <span className='text-gray-600'> This is the Statistics Page for this Dashboard.</span> 
                    
                   {/* <span className='text-blue-600 underline underline-offset-4'>Know how?</span> */}
                 </div>
             </div>
       </div>

         </>
       }
     

      </MainLayout>
    }

  
    {
      loginRole === 'admin' && 

      <MainLayout user="super_admin">
      <div className='flex justify-between mb-4'>
          This is Admin Overview
       </div>
      </MainLayout>
    }

    
    </>
  )
}

export default Overview
