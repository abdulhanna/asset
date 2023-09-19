import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
const AssetMangement = () => {
  return (
   <>
    <MainLayout>
    <div>
       <div className='flex justify-between items-center'>
        <Text1 size='2xl'>All Assets</Text1>
         <Button>ADD ASSET</Button>
       </div>
    </div>
    </MainLayout>
   </>
  )
}

export default AssetMangement
