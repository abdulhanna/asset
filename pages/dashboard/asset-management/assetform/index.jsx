import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import NodataPage from '@/components/molecules/nodataPage'
import { doCheckAuth } from '@/utils/doCheckAuth'

const AssetForm = ({user}) => {
  return (
    <>
        <MainLayout User={user}>
            <div className="">
                <div className='flex justify-between items-center'>
                    <Text1 size='2xl'>All Asset Form Fields</Text1>
                    <Button variant='contained'>MANAGE ASSET FORM</Button>
                </div>
                <NodataPage text="No data yet"/>
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


export default AssetForm
