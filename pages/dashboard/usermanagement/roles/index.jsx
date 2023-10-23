import React, { useState, useCallback,useEffect } from 'react'
import MainLayout from 'proj-components/MainLayout'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import NodataPage from '@/components/molecules/nodataPage'
import { SampleTableNew } from '@/components/organism/tablecomp'
import userRolesApi from 'helpers/use-api/user-management/roles'
import authApi from 'helpers/use-api/auth'
import Debounce from 'helpers/debounce'

const RolesPerimission = ({user,roles}) => {
  const [roleList,setRoleList] = useState(roles?.roles)
  const [list,setList] = useState(roles)
  const [checkedNewData, setCheckedNewData] = useState([])
  const [allClick, setAllClick] = useState(false)
  const [page,setPage] = useState(roles?.currentPage)
  const [pageSize,setPageSize] = useState(5)
  const [sort,setSort] = useState({"created":-1})
  const header = [
    {
      label:"Role Name",
      name:'roleName',
    },
    {
      label:"Status",
      name:"isDeactivated"
    },
    {
      label: "Created On",
      name:'createdAt'
    },{
      label :"Total Users",
      name:'userCount'
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
      setCheckedNewData(roleList)
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
  
  const callApi = useCallback(async(e)=>{
    console.log('call Api',e.page)
    const res = await memberAccessApi.getAllMember(access_token,e.page,pageSize,JSON.stringify(sort))
    setList(res.data)
    setRoleList(res?.data?.roles)
    setPage(res.data.currentPage)
    console.log(res.data,'res')
  },[])

  const handleSearchChange=Debounce(callApi
    ,2000)

  const handlePage  = async(e)=>{
    //  console.log(e,'ee')
    let value = e
   handleSearchChange({page:value})
    setPage(value)
 }
  console.log(roles,'list')
  return (
    <>
        <MainLayout User={user}>
            <div className='space-y-2'>
               <div className='flex justify-between items-center '>
                <div className=''>
                <Text1 size='2xl'>All Roles</Text1>
                <Text1 className='text-lightGray' size='sm'>We have nothing here yet. Start by adding a Field Group.</Text1>
                </div>
                 <Button href={'/dashboard/usermanagement/roles/add-roles'} variant='contained' >CREATE ROLE</Button>
               </div>
               <div>
                {!roleList.length ? (<NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'}/>):(
                    <>
                    <SampleTableNew
                          response={roleList}
                          headerData={[{name:'check',label:''},...header]} 
                          checkedData={checkedNewData}
                            responseData={(e) => onNewCheck(e)}
                            href={`/dashboard/usermanagement/roles/single?`}
                            clickAll={clickAll}
                            onClick={(e)=> console.log(e,'onclick') }
                            checkAllStatus={allClick} 
                            totalDoc={roles.totalDocuments}
                            currentPage={page}
                            start={roles.startSerialNumber}
                            end={roles.endSerialNumber}
                            pageSize={roles?.totalPages}
                            onPageChange={handlePage}
           
       />
                    </>
                )}
               </div>
            </div> 
        </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
  let access_token =
  "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
  const auth = await authApi.WhoAmI(appCtx)
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  let page = 1
  let pageSize = 10
  let sort = {"createdAt":-1};
  let roles  
  try{
       const {data } = await userRolesApi.getRoles(access_token,page,pageSize,JSON.stringify(sort)) 
        roles = data
      //  console.log(data,'data')s
      // console.log(access_token)
  }catch(err){
    console.log(err,'err')
  }
  return {
    props:{
       user:auth,
       access_token ,
       roles : roles || []
    }
  }

}


export default RolesPerimission 