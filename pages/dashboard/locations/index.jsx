import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { SampleTableNew } from '@/components/organism/tablecomp'

const Locations = () => {
  const [allClick,setAllClick] = useState(false)
  const [checkedNewData,setCheckednewData] = useState([])
  const [locations,setLocations] = useState([
    {
      _id:'23456',
      location_id:'315647534',
      location_name:'Noida',
      location_address:['201, 2nd Floor','Sector - 89'],
      location_admin:'john',
      status:'Active',
      created_at:'21/03/2023'
    },
    {
      _id:'234567',
      location_id:'315641534',
      location_name:'faridabad',
      location_address:['201, 2nd Floor','Sector - 89'],
      location_admin:'jack',
      status:'Active',
      created_at:'21/04/2023'
    },
    {
      _id:"2344567",
      location_id:'215647534',
      location_name:'Gurgaon',
      location_address:['201, 2nd Floor','Sector - 89'],
      location_admin:'jenny',
      status:'Active',
      created_at:'26/03/2023'
    }
  ])

  const header = [
    {label:'Location Id',name:'location_id'},
    {label:'Location Name', name:'location_name'},
    {label:'Nested Location ', name:'location_address'},
    {label:'Location Admin',name:'location_admin'},
    {label:'Status',name:'status'},
    {label:'Created At',name:'created_at'}
  ]

  const clickAll =()=>{

  }
  return (<>
    <MainLayout>
     <div>
        <div className='flex justify-between my-3'>
            <Text1 size='2xl'>All Locations</Text1>
            <Button href={'/dashboard/locations/addLocation'} variant='contained'>ADD LOCATION</Button>
        </div>
        {locations.length === 0 ? <NodataPage text={'No data yet'}/>  : <div>
          <SampleTableNew headerData={[{name:'check',label:''},...header]}
           response={locations}
            checkedData={checkedNewData}
            responseData={(e)=> console.log(e)}
            clickAll={clickAll}
            onClick={(e)=>console.log(e)}
            href={'/dashboard/locations/edit?'}
            checkAllStatus={allClick}
            currentPage={1}
            pageSize={10}
            onPageChange={(e)=>console.log(e)}
           />
        </div>}
     </div>
    </MainLayout>
  </>
  )
}

export default Locations
