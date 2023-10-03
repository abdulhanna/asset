import React, {useEffect} from 'react'
import {useRouter} from 'next-router'
import authApi from 'helpers/use-api/auth';




const ResetVerify = () =>{
    const router = useRouter();
    const {resetToken} = router.query();

    useEffect(() => {

        resetToken ?  resetverify() : router.replace('/auth/login') 

    }, [resetToken])

    const resetverify = async() => {
    try{
        
           const res = await authApi.verifyPassword(resetToken)
           
          if(res.status == 200){
            router.push('/auth/login')
            }

        }catch(err){
            console.log(err, "PLease check this error")
        }
    }
    
  return (
    <div>ResetVerify</div>
  )
}

export default ResetVerify