import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import NodataPage from '@/components/molecules/nodataPage'
import { SampleTableNew } from '@/components/organism/tablecomp'
import { useEffect } from 'react'

const RolesPerimission = () => {
  const [checkedNewData, setCheckedNewData] = useState([])
  const [allClick, setAllClick] = useState(false)
  const header = [
    {
      label:"Role Name",
      name:'roleName',
    },
    {
      label:"Status",
      name:"status"
    },
    {
      label: "Created On",
      name:'created_on'
    },{
      label :"Permission",
      name:'permission'
    }

  ]

  
  const data = [{
    _id:3245,
    roleName: 'Admin',
    status:'Active' ,
    created_on : '1/12/22',
    Permission:[{
      permissionId: 67890,
    }]

  }]

    const clickAll = (e)=>{
      setAllClick(!allClick)
    }

  useEffect(()=>{
    if(allClick === true){
      setCheckedNewData(data)
    }else {
      setCheckedNewData([])
    }
   },[allClick])

  const onNewCheck=(data)=>{
    console.log(data,'data')
    const exist = checkedNewData.find(
        (element) => element._id === data._id
    );
    console.log(exist,'exit')
    if (exist) {
      setCheckedNewData(
          checkedNewData.filter((single) => single._id !== data._id)
      );
    } else {
      setCheckedNewData([...checkedNewData, data]);
    }
  }
  
  return (
    <>
        <MainLayout>
            <div className='space-y-2'>
               <div className='flex justify-between items-center'>
                <Text1 size='2xl'>All Roles</Text1>
                 <Button href={'/dashboard/usermanagement/roles/add-roles'} variant='contained' >CREATE ROLE</Button>
               </div>
               <div>
                {!data.length ? (<NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'}/>):(
                    <>
                    <SampleTableNew
        response={data}
        headerData={[{name:'check',label:''},...header]} 
        checkedData={checkedNewData}
          responseData={(e) => onNewCheck(e)}
           href={`/dashboard/usermanagement/roles/single?`}
           clickAll={clickAll}
           onClick={(e)=> console.log(e,'onclick') }
           checkAllStatus={allClick} 
           currentPage={'1'}
           pageSize={10}
           onPageChange={(e)=> console.log(e)}
           
       />
                    </>
                )}
               </div>
            </div> 
        </MainLayout>
    </>
  )
}

export default RolesPerimission 