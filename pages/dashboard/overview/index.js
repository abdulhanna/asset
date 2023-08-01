import React from 'react'
import MainLayout from '../../../proj-components/MainLayout'
import { Nodata } from '../../../components/atoms/icons'
import {Text1} from "../../../components/atoms/field";
import Button from '../../../components/atoms/button';

import { useRouter } from 'next/router';

const Overview = () => {
  const router = useRouter();
  
  const handleAddButtonClick = () => {
    router.push('/dashboard/root/organisation/add'); // This will navigate to the 'add-form' page
  };
  

  return (
    <>
      <MainLayout>
           <div className='flex justify-between mb-4'>
           <Text1 size="lg" weight="medium">
              All Organizations
          </Text1>
          <Button onClick={handleAddButtonClick} variant="contained">Add Organizations</Button>
          </div>
            <div className='border rounded-md flex items-center justify-center h-screen bg-[#F7F7F7] overflow-hidden'>
                  <div className='text-center'>
                      <Nodata className={'flex justify-center'}/>
                      <div className='mt-3'>
                        <span className='text-gray-600'> We have nothing here yet. Start by adding a Location.</span> <span className='text-blue-600 underline underline-offset-4'>Know how?</span>
                      </div>
                  </div>
            </div>
      </MainLayout>
    </>
  )
}

export default Overview
