import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import { Text1 } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'
import Button from '@/components/atoms/button'
const AddAdministration = () => {
    const router = useRouter()
  return (
    <>
        <MainLayout>
            <div>
                  <div className='flex justify-between items-center'>
                        <div className='flex gap-4 items-center cursor-pointer' onClick={()=> router.back()}>
                            <LeftArrowIcon/>
                            <Text1 size='2xl'>Add Administrator</Text1>
                        </div>
                        <Button variant='contained'>SAVE</Button>
                  </div>
            </div>
        </MainLayout>
    </>
  )
}

export default AddAdministration
