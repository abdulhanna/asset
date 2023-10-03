import React from 'react'
import { hostedAuthAxios } from '@/utils/backendAxios'
import { doCheckAuth } from '@/utils/doCheckAuth'
import authApi from 'helpers/use-api/auth'

const Dashboard = () => {
  return (
    <div>
       Dashboard 
    </div>
  )
}

export const getServerSideProps = async (appCtx) => {

    const auth = await authApi.WhoAmI(appCtx)
    // console.log(auth,'auth')
    if(!auth){
      return {
        redirect:{
          destination:'/auth/login',
          permanent:false
        }
      }
    }else{
  
    return {
      redirect:{
        permanent:false,
        destination:`${auth.role === 'root' ?'/dashboard/root/organisation':'/dashboard/locations'}`
      }
  
  
  }
}
}


export default Dashboard
