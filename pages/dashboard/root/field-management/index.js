import React from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import FieldOverview from './fieldoverview'
import SubGroupview from './subgroupview'
import Fieldgroupdescription from './fieldgroupdescription'
import { doCheckAuth } from '@/utils/doCheckAuth'



const FieldMangment = ({user}) => {
  const handleAddButtonClick = () => {
    console.log("thhh")
  }
  return (
    <>
        <MainLayout User={user}>
                <FieldOverview/>
                <SubGroupview/>
        </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
   
  const auth = await doCheckAuth(appCtx)
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


export default FieldMangment
