import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'

const Account = () => {
  const [data,setData] = useState([])
  return (
    <>
      <MainLayout>
         <div className='space-y-4'>
               <div className='flex justify-between items-center'>
                <Text1 size='2xl'>All Account Manager</Text1>
                 <Button href={'/dashboard/root/account/add'} variant='contained' >ADD ACCOUNT MEMBER</Button>
               </div>
               <div>
                {data.length === 0 ? <NodataPage text={'We have nothing here yet. Start by adding Account Members. Know how?'}/>:
                  <div> 
                   table
                  </div>}
               </div>
         </div>
      </MainLayout>
    </>
  )
}

export default Account
