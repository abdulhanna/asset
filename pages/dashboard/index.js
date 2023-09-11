import React from 'react'

import { doCheckAuth } from '@/utils/doCheckAuth'

const Dashboard = () => {
  return (
    <div>
       Dashboard 
    </div>
  )
}

export const getServerSideProps = async (appCtx) => {

    const auth = await doCheckAuth(appCtx)
   
    // const { cookie } = appCtx.req.headers
    
   
    // if (auth) {
    //   return {
    //     redirect: {
    //       destination: '/dashboard/home',
    //       permanent: false,
    //     },
    //   };
  
    // } else {
    //   return {
    //     redirect: {
    //       destination: '/auth/login'
    //     }
    //   }
    // }
  
    
    return {
      props: {
        data: [
  
        ],
        // cookie: cookie ? cookie : null
      }
    }
  
  
  }


export default Dashboard
