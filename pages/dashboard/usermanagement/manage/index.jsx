import React, { useState, useEffect } from 'react'
import MainLayout from 'proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
import { PermissionActionTable } from '@/components/organism/tablecomp'
import { doCheckAuth } from '@/utils/doCheckAuth'


const Manage = ({user}) => {
  const [checkedNewData, setCheckedNewData] = useState([])
  const [allClick, setAllClick] = useState(false)
    const [data,setData] = useState([ {
      _id:'0934',
      modlueName :"admin",
      dashboardType:"root",
      view:false,
      edit:true,
      action:false,
      created:"1/2/23",
      allAccess:true,
      removeAccess:false,
     
   },
   {
    _id:'2345',
    modlueName :"user",
    dashboardType:"root",
    view:false,
    edit:true,
    created:'1/4/23',
    action:false,
    allAccess:false,
    removeAccess:true,
   
 }])


 const headers = [
  {
    label:'Module Name',
    name:'modlueName',
  },
  {
    label:'Dashboard Type',
    name:'dashboardType',
  },
  {
    label:"created on",
    name:"created"
  },
  {
    label:'Action',
    name:"action"
  }

]

const clickAll = ()=>{
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

  return (
    <>
        <MainLayout User={user}>
             <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                    <Text1 size="lg">All Permissions</Text1>

                    <Button href={'/dashboard/usermanagement/manage/permission'} variant='contained'>
                        CREATE PERMISSION
                    </Button>
                </div>
                <div>
                  {data.length === 0 ? <NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'} /> 
                  :<div>
                  <PermissionActionTable
                        response={data}
                        headers={[{name:'check',label:''},...headers]} 
                        checkedData={checkedNewData}
                        responseData={(e) => onNewCheck(e)}
                        clickAll={clickAll}
                        href={`/dashboard/usermanagement/manage/edit?`}
                        onClick={(e)=> console.log(e,'onclick') }
                        checkAllStatus={allClick}
                      />
                  </div> }
                </div>
             </div>
        </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
   
  const auth =await doCheckAuth(appCtx)
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };

  } else {
    return {
      props:{
         user:auth
      }
    }
  }

}


export default Manage
