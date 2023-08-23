import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'

const Manage = () => {
    const [data,setData] = useState([])
  return (
    <>
        <MainLayout>
             <div>
                <div className='flex items-center justify-between'>
                    <Text1 size="lg">All Permissions</Text1>
                    <Button variant='contained'>
                        CREATE PERMISSION
                    </Button>

                </div>
             </div>
        </MainLayout>
    </>
  )
}

export default Manage
