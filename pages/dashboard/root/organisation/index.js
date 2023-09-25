import React from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import orgApi from 'helpers/use-api/organisations'
import Organisations from 'proj-components/Dashboard/organisation/organisations'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'

const Page = ({user,organisationList}) => {
  // console.log(user,'user',organisationList)

  return (
   <>
    <MainLayout User={user}>
    <div className='flex justify-between items-center 2xl:my-8 my-0'>
      <Text1 size='2xl'>All Organizations</Text1>
      <Button variant='contained'>ADD  ORGANIZATION</Button>
    </div>
    <Organisations organisationList={organisationList}/>
   
    </MainLayout>
   </>
  )
}

export const getServerSideProps = async (appCtx) => {
  let access_token = 'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;

  const auth =await authApi.WhoAmI(appCtx)
  const res  = await orgApi.getAll(access_token)
  // console.log(res.data,'res')
  
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
         user:auth,
          organisationList:res.data|| []
      }
    }
  }

  // if(!auth){
  //   return
  // }

  // return {
  //   props:{

  //   }
  //   // redirect:{
  //   //   destination:'/dashboard/asset-management/allAsset',
  //   // }
  // }

}

export default Page
