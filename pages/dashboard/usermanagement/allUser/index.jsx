import React, { useState,useEffect } from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { SampleTableNew } from '@/components/organism/tablecomp'
import authApi from 'helpers/use-api/auth'
import memberAccessApi from 'helpers/use-api/user-management/member'
import { DateTime } from 'luxon'


const AllUser = ({user,access_token,memberList}) => {
  const [members,setMembers] = useState(memberList?.roles)
  const [data,setData] = useState([])
  const [checkedNewData, setCheckedNewData] = useState([])
  const [page,setPage] = useState(memberList?.currentPage)
  const [pageSize,setPageSize] = useState(4)
  const [sort,setSort] = useState({"created":1})
  const [allClick, setAllClick] = useState(false)
  const router = useRouter()
  const headerData = [
    { label: 'User Id',name:'userCodeId'},
    {label:'User Name', name:'name'},
    {label:'User Role', name:'roleName'},
    // {label:'Branch', name:'branch'},
    // {label:'Email Id', name:'email'},
    // {label:'Contact No', name:'contact'},
    {label:'Status',name:'isDeactivated'}, 
    {label:'created on', name:'createdAt'}
  ]

 
  const clickAll = (e)=>{
    setAllClick(!allClick)
  }

  const onNewCheck=(data)=>{
    // console.log(data,'data')
    const exist = checkedNewData.find(
        (element) => element._id === data._id
    );
    // console.log(exist,'exit')
    if (exist) {
      setCheckedNewData(
          checkedNewData.filter((single) => single._id !== data._id)
      );
    } else {
      setCheckedNewData([...checkedNewData, data]);
    }
  }

  
useEffect(()=>{
    // console.log(checkedNewData,'cehc')
},[checkedNewData])

useEffect(()=>{
    if(allClick === true){
      setCheckedNewData(members)
    }else {
      setCheckedNewData([])
    }
   },[allClick])
   const handlePage  = async(e)=>{
     
    // memberAccessApi.getAllMember(access_token,page,pageSize,JSON.stringify(sort))

   }
 console.log(memberList,'list',page,pageSize,sort)
  return (
    <>
        <MainLayout User={user}>
         <div className=''>
         <div className='flex justify-between items-center'>
         <div>
         <Text1 size='2xl'>All Member</Text1>
         <Text1 className='text-lightGray' size='sm'>We have nothing here yet. Start by adding a Field Group.</Text1>
         </div>
         <Button variant='contained' onClick={()=>router.push('/dashboard/usermanagement/allUser/add-user')}>ADD MEMBER</Button>
         </div>
          {members.length === 0 ?   <NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'}/> :<div className=''>
            <SampleTableNew
               response={members.map((row)=>{
                return {...row,  userCodeId:row?.userProfile?.userCodeId,
                  name:row.userProfile?.name,
                createdAt: DateTime.fromISO(row.createdAt).toLocaleString(
                // DateTime.DATE_MED
                DateTime.DATETIME_SHORT
              ),
              roleName:row?.teamRoleId?.roleName}
               })}
                  headerData={[{ name: 'check', label:'' },...headerData]}
                  checkedData={checkedNewData}
                  responseData={(e) => onNewCheck(e)}
                  clickAll={clickAll}
                  onClick={(e)=> console.log(e,'onclick') }
                  href={`/dashboard/usermanagement/allUser/single?`}
                  checkAllStatus={allClick}
                  totalDoc={memberList.totalDocuments}
                  currentPage={memberList?.currentPage}
                  start={memberList.startSerialNumber}
                  end={memberList.endSerialNumber}
                  pageSize={memberList?.totalPages}
                  onPageChange={handlePage}
            />
          </div>}
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
  let pageSize = 4
  let sort = {"createdAt":-1};
  let memberList 
  try{
     
    const {data} =await memberAccessApi.getAllMember(access_token,page,pageSize,JSON.stringify(sort))
    memberList = data
  }catch(err){
    console.log(err,'err')
  }

  return {
    props:{
       user:auth,
       access_token,
       memberList : memberList || []
    }
  }

}


export default AllUser
