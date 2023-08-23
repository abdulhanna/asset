import React, { useState,useEffect } from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { SampleTableNew } from '@/components/organism/tablecomp'


const AllUser = () => {
  const [data,setData] = useState([])
  const [checkedNewData, setCheckedNewData] = useState([])
  const [allClick, setAllClick] = useState(false)
  const router = useRouter()
  const headerData = [
    { label: 'User Identification no',name:'uno'},
    {label:'User Name', name:'user'},
    {label:'User Role', name:'role'},
    {label:'Branch', name:'branch'},
    {label:'Email Id', name:'email'},
    {label:'Contact No', name:'contact'},
    {label:'Status',name:'status'}, 
    {label:'created on', name:'created'}
  ]

  const body = [
    {
     _id:'34564', uno:"098765432", user : "Rajesh", role :"Admin", branch :"Mumbai",email:'rajesh@test.com',status:'active',contact:'42536748764',created:'1/12/22'
    },
    {
     _id:'342553', uno:"098765098",user:'jack',role:'Admin', branch:'delhi',email:'jack@test.com',status:'active',contact:'9876543210',created:'2/03/23'
    }
  ]

  useEffect(()=>{

    setData(body)
  },[])





  const clickAll = (e)=>{
    setAllClick(!allClick)
  }

  const onNewCheck=(data)=>{
    // console.log(data,'data')
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
//     if(samplePermission.actions === true){
  

//   }
  
useEffect(()=>{
    console.log(checkedNewData,'cehc')
},[checkedNewData])

useEffect(()=>{
    if(allClick === true){
      setCheckedNewData(data)
    }else {
      setCheckedNewData([])
    }
   },[allClick])

  return (
    <>
        <MainLayout>
         <div className=''>
         <div className='flex justify-between items-center py-4'>
         <Text1 size='2xl'>All Member</Text1>
         <Button variant='contained' onClick={()=>router.push('/dashboard/usermanagement/allUser/add-user')}>ADD MEMBER</Button>
         </div>
          {data.length === 0 ?   <NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'}/> :<div className=''>
            <SampleTableNew
               response={data}
                  headerData={[{ name: 'check', label:'' },...headerData]}
                  checkedData={checkedNewData}
                  responseData={(e) => onNewCheck(e)}
                  clickAll={clickAll}
                  onClick={(e)=> console.log(e,'onclick') }
                  href={`/dashboard/usermanagement/allUser/single?`}
                  checkAllStatus={allClick}
            />
          </div>}
         </div>
        </MainLayout>
    </>
  )
}

export default AllUser
