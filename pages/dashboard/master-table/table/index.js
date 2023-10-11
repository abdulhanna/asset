import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
// import { Nodata } from '@/components/atoms/icons'
import NodataPage from '@/components/molecules/nodataPage'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'


const Page = ({access_token,user}) => {
    const [tableList,setTableList] = useState([])
    const router = useRouter()

    const handleSubmit = ()=>{

    }
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
          {tableList.length === 0 ?   <NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'}/> :<div className=''>
            fhldkjfs
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
