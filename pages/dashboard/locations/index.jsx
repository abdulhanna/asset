import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'

const Locations = () => {


  return (<>
    <MainLayout>
     <div>
        <div className='flex justify-between my-3'>
            <Text1 size='2xl'>All Locations</Text1>
            <Button href={'/dashboard/locations/addLocation'} variant='contained'>ADD LOCATION</Button>
        </div>
        <NodataPage text={'No data yet'}/>
     </div>
    </MainLayout>
  </>
  )
}

export default Locations
