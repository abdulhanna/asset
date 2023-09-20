import React from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import OrganisationList from './organisationlist'
import { doCheckAuth } from '@/utils/doCheckAuth'

const Page = ({user}) => {
  console.log(user,'user')
  return (
   <>
    <MainLayout User={user}>
        <OrganisationList/>
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
