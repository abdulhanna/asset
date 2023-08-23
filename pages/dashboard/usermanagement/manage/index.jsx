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
             <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                    <Text1 size="lg">All Permissions</Text1>

                    <Button href={'/dashboard/usermanagement/manage/permission'} variant='contained'>
                        CREATE PERMISSION
                    </Button>
                </div>
                <div>
                  {data.length === 0 ? <NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'} /> :<div>dsfasdsd</div> }
                </div>
             </div>
        </MainLayout>
    </>
  )
}

export default Manage
