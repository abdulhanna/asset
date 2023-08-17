import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'


const SingleUser = () => {
  const router = useRouter()
  return (
    <>
      <MainLayout>
      <div>
        <div className='flex justify-between'>
           <div className='flex items-center cursor-pointer' onClick={()=>router.back()}> <LeftArrowIcon/>
           <Text1 size='2xl' >Johdoe</Text1>
           </div>
           <div className='space-x-2'>
             <Button variant='contained'>EDIT</Button>
             <Button variant='danger'>DEACTIVATE</Button>
           </div>
        </div>
       
      </div>
      </MainLayout>
    </>
  )
}

export default SingleUser
