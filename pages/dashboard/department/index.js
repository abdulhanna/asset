import React, {useEffect, useState} from 'react'
import MainLayout from 'proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import Button from '@/components/atoms/button'
import DialogPage from '@/components/molecules/dialog'
import { Text1 } from '@/components/atoms/field'
import DepartmentField from 'pages/testComponents/departmentField'
import { useRouter } from 'next/router'
import { SampleTableNew } from '@/components/organism/tablecomp'


const AddDepartment = ({open, close, showData, setShow}) => {
    
  const getData = ({data}) => {
    
    console.log(data,"yes this dta")
  }

  const handleSave = (data) => {
  
     showData(data)
     setShow(true)
     close()
  };
    return (
      <>
        <DialogPage open={open} close={close}>
          <DepartmentField Heading="Add Department" labelName="Group Name" getData={getData} handleSave={handleSave}/>
        </DialogPage>
      </>
    );
}


//  Main Index file
const Index = () =>{
  const[inputDepartment, setInputDepartment] = useState(false)
  const [allClick, setAllClick] = useState(false)
  const [checkedNewData, setCheckedNewData] = useState([])
  const [show, setShow] = useState(false)
  const [data,setData] = useState([])
  const router = useRouter()
  const headerData = [
    { label: 'Department ID',name:'departmentId'},
    {label:'Department Name', name:'departmentName'},
    {label:'Charging Type', name:'chargingType'},
    {label:'Status', name:'Status'},
    {label:'created on', name:'created'},
    {label:"Custom",name:"custom"}
  ]

  const body = [
    {
     _id:"011", departmentId:'34564', departmentName:"DEPT01", chargingType : "Direct",custom:"test", Status :"Active",created:'1/12/22'
    },
    {
      _id:"012",departmentId:'342553', departmentName:"DEPT02",chargingType:'Direct',Status:'Inactive',created:'2/03/23'
    }
  ]

 useEffect(() => {
  setData(body)
 }, [])

  
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

useEffect(()=>{
  
},[checkedNewData])

useEffect(()=>{
  if(allClick === true){
    setCheckedNewData(data)
  }else {
    setCheckedNewData([])
  }
 },[allClick])
  


  const handleDepartment = () => {
    setInputDepartment(true)
    
  }


  const showData = ({data}) => {
    console.log(data, "ths is fieldoverview")
 }

  return (
    <MainLayout>
       <div>
          <div className='flex justify-between my-3'> 
                <Text1 size='2xl'> All Department </Text1>
                <Button onClick={handleDepartment} variant='contained'>ADD DEPARTMENT </Button>
          </div> 

          {
          show ? <NodataPage text={'No Data For Department '}/> : 

          <SampleTableNew
             response={data}
             headerData={[{ name: 'check', label:'' },...headerData]}
             checkedData={checkedNewData}
             responseData={(e) => onNewCheck(e)}
             clickAll={clickAll}
             onClick={(e)=> console.log(e,'onclick') }
             href={`/dashboard/department/singleDepartment?`}
             checkAllStatus={allClick}
             currentPage={1}
             pageSize={10}
             onPageChange={(e)=> console
             .log(e)}
       />
          }

        
      </div>
      <AddDepartment open={inputDepartment} close={() => setInputDepartment(false)} showData={showData} setShow={setShow}/>
    </MainLayout>
  )
}

export default Index