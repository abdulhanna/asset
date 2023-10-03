import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { doCheckAuth } from '@/utils/doCheckAuth'
const Account = ({user}) => {
  const [data,setData] = useState([])
  return (
    <>
      <MainLayout User={user}>
         <div className='space-y-4'>
               <div className='flex justify-between items-center'>
                <Text1 size='2xl'>All Account Manager</Text1>
                 <Button href={'/dashboard/root/account/add'} variant='contained' >ADD ACCOUNT MEMBER</Button>
               </div>
               <div>
                {data.length === 0 ? <NodataPage text={'We have nothing here yet. Start by adding Account Members. Know how?'}/>:
                  <div> 
                   table
                  </div>}
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


export default Account
