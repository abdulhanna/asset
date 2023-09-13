import React from 'react'
import { hostedAuthAxios } from '@/utils/backendAxios'
import { doCheckAuth } from '@/utils/doCheckAuth'

const Dashboard = () => {
  return (
    <div>
       Dashboard 
    </div>
  )
}

export const getServerSideProps = async (appCtx) => {
//   const cookie =
//   'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;
//   // console.log(cookie.split('=')[1],'cookie')
//  let user = await hostedAuthAxios.get('/who-am-i', {
//     headers: {
//         cookie: cookie[1]
//     }

// });
// console.log(user,'user')
    const auth = await doCheckAuth(appCtx)
    console.log(auth,'auth')
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
