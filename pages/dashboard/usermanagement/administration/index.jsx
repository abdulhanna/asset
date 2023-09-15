import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'

const Administration = () => {
    const [data,setData] = useState([])

  return (
    <>
        <MainLayout>
            <div>
                <div className='flex justify-between items-end py-4'>
                    <Text1 size='2xl'>All Administrations</Text1>
                    <Button variant='contained' href={'/dashboard/usermanagement/administration/addAdministration'}>ADD ADMINISTRATION</Button>
                </div>
                {data.length === 0 ? <NodataPage text={'No data yet'}/> :<div>

                </div>}
            </div>
        </MainLayout>
    </>
  )
}

export default Administration
