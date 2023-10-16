import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'

const LogTable = ({user}) => {
    // const router= useRouter()

    const handleSubmit = ()=>{

    }
  return (
      <>
        <MainLayout User={user}>
            <div>
                <div className="w-full flex justify-between items-center space-y-2">
                        <div>
                        <div className="flex items-center cursor-pointer" >
                            {/* <LeftArrowIcon /> */}
                            <Text1 weight='' size="2xl" >
                             Master Table Logs & Draft
                            </Text1>
                        </div>
                        <Text1 className="pl-4" size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
                        </div>
                        {/* <Button href={'/dashboard/master-table/table/upload'} variant="contained" onClick={handleSubmit}>NEXT</Button> */}
                </div>
            </div>
        </MainLayout>
      </>
  )
}

export const getServerSideProps = async (appCtx) => {
    let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
    const auth =await authApi.WhoAmI(appCtx)
    // console.log(auth,'ddd')
    if (!auth) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    } 
  
    let roles 
    try{
    //   const {data} = await userRolesApi.getRoles(access_token)
    //   roles  =  data
    }catch(err){
      console.log(err,'err')
    }
    return {
      props:{
         user:auth,
         access_token,
         roles:roles||[]
      }
    }
  
  }

export default LogTable