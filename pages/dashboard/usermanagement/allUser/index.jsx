import React, { useState } from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
const AllUser = () => {
  const [data,setData] = useState([])
  const router = useRouter()

  return (
    <>
        <MainLayout>
         <div>
         <div className='flex justify-between items-center py-4'>
         <Text1 size='2xl'>All Users</Text1>
         <Button variant='contained' onClick={()=>router.push('/dashboard/usermanagement/allUser/add-user')}>ADD USER</Button>
         </div>
          {data.length === 0 &&  <NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'}/>}
         </div>
        </MainLayout>
    </>
  )
}

export default AllUser
