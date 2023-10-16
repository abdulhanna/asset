import React, { useState,useEffect } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
// import { Nodata } from '@/components/atoms/icons'
import NodataPage from '@/components/molecules/nodataPage'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'
import { SampleTableNew } from '@/components/organism/tablecomp'

const Page = ({access_token,user}) => {
    const [tableList,setTableList] = useState([])
    const [checkedNewData, setCheckedNewData] = useState([]);
    const [allClick, setAllClick] = useState(false);
    const router = useRouter()
    const Header = [
      {label:"Master Table Id",name:"master_table"},
      {label:"Master Table Name",name:"master_name"},
      {label:"Application to",name:"aplicable"},
      {label:"Created on",name:"createdAt"},
      {label:"Created by",name:"user"},
    ]
    const HeaderBody =[
      {_id:"1234",master_table:"Table 01", master_name:"IT Act",aplicable:"all",createdAt:'1/2/2023',user:'john'},
      {_id:"1236",master_table:"Table 02", master_name:"Company Act",aplicable:"all",createdAt:'1/21/2023',user:'jack'}
    ]
    const handleSubmit = ()=>{


    }
    const clickAll = () => {
      setAllClick(!allClick);
    };
    useEffect(() => {
      if (allClick === true) {
        setCheckedNewData(permissionList);
      } else {
        setCheckedNewData([]);
      }
    }, [allClick]);

    const onNewCheck = (data) => {
      // console.log(data,'data')
      const exist = checkedNewData.find((element) => element._id === data._id);
      console.log(exist, "exit");
      if (exist) {
        setCheckedNewData(
          checkedNewData.filter((single) => single._id !== data._id)
        );
      } else {
        setCheckedNewData([...checkedNewData, data]);
      }
    };
  return (
    <>
        <MainLayout User={user} >
        <div className=''>
         <div className='flex justify-between items-center'>
         <div>
         <Text1 size='2xl'>All Master Tables</Text1>
         <Text1 className='text-lightGray' size='sm'>We have nothing here yet. Start by adding a Field Group.</Text1>
         </div>
         <div className='flex gap-4'>
         <Button variant='contained' onClick={()=>router.push('/dashboard/master-table/table/add-table')}>DESIGN MASTER TABLE</Button>
         <Button>MODIFY MASTER TABLE</Button>
         </div>
         </div>
          {HeaderBody.length === 0 ?   <NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'}/> :<div className=''>
          <SampleTableNew
                  response={HeaderBody}
                  headerData={[{ name: "check", label: "" }, ...Header]}
                  checkedData={checkedNewData}
                  responseData={(e) => onNewCheck(e)}
                  clickAll={clickAll}
                  href={`/dashboard/master-table/table/single?`}
                  onClick={(e) => console.log(e, "onclick")}
                  checkAllStatus={allClick}
                  currentPage={1}
                    pageSize={1}
                    onPageChange={(e)=> console.log(e)}
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
    const auth =await authApi.WhoAmI(appCtx)
    // console.log(auth,'ddd')
    if (!auth) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    } 
  
    let roles 
    try{
    //   const {data} = await userRolesApi.getRoles(access_token)
    //   roles  =  data
    }catch(err){
      console.log(err,'err')
    }
    return {
      props:{
         user:auth,
         access_token,
         roles:roles||[]
      }
    }
  
  }

export default Page
