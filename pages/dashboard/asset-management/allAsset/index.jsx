import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
import NodataPage from '@/components/molecules/nodataPage'
import authApi from 'helpers/use-api/auth'
// import { doCheckAuth } from '@/utils/doCheckAuth'

const AllAssets = ({user}) => {
    
  return (
    <>
        <MainLayout User={user}>
            <div className='space-y-2 '>
                <div className='flex justify-between items-center'>
                    <Text1 size='2xl'>All Assets</Text1>
                    <Button variant='contained'>ADD ASSET</Button>
                </div>
                <NodataPage text={'No data yet'}/>
            </div>
        </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
   
  const auth =await authApi.WhoAmI(appCtx)

  
  console.log(auth,'ddd')
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


export default AllAssets
