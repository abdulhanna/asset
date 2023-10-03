import { Text1 } from '@/components/atoms/field'
import React, { useEffect } from 'react'
import authApi from 'helpers/use-api/auth'
import { useRouter } from 'next/router'



const Verify = () => {

    
    const router = useRouter()
    const {confirmation_token} = router.query
    
    useEffect(()=>{
        if(confirmation_token){
            console.log(confirmation_token,'token')
            verifyToken()
        }else{
          router.push('/auth/login')
        }
    },[confirmation_token, router])

    const verifyToken = async()=>{

        try{
            const res = await authApi.verifyToken(confirmation_token)
            console.log(res)
            if(res.status == 200000000){
                router.push(res?.data?.redirectUrl)
            }
            
        }catch(err){
            console.log(err,'err')
        }

    }
    
  return (
    <div>

       <Text1>Verifying User.....</Text1> 
      
    </div>
  )
}

export default Verify
