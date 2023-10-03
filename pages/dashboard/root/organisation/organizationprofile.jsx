import React, {useState} from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import Overview from '../../overview'
import {Text1} from "../../../../components/atoms/field";
import Button from '../../../../components/atoms/button';
import { doCheckAuth } from '@/utils/doCheckAuth';
const Profile = ({user}) => {
    return(
        <>
           <MainLayout User={user}>
             
           </MainLayout>
      {/* <div className='flex justify-between mb-4'>
      <Text1 size="2xl" weight="medium">
         All Organizations
     </Text1>
     <Button onClick={"handleAddButtonClick"} variant="contained">Add Organizations</Button>
     </div> */}
              {/* <Overview user={"root"}/> */}
              
       
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
  

export default Profile