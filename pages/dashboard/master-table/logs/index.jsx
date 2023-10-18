import React from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { MasterTableLogs } from '@/components/organism/tablecomp'

const LogTable = ({user}) => {
    // const router= useRouter()
    const header = [
      {label:"Table Id",name:'table_id'},
      {label:'Table Name', name:"table_name"},
      {label:'Updated by', name:"updated"},
      {label:'Update on', name:"createdAt"},
      {label:'Status/Action', name:"action"},
    ]

    const headerBody = [
      {_id:"1234",table_id:'Table01',table_name:'Company Act',updated:"admin", createdAt:'1/2/2023',status:false},
      {_id:"1431",table_id:'Table02',table_name:'IT Act',updated:"Root", createdAt:'1/3/2023',status:true}
    ]

    const handleSubmit = ()=>{

    }
  return (
      <>
        <MainLayout User={user}>
            <div>
                {/* HEADER SECTION */}
                <div className="w-full flex justify-between items-center space-y-2">
                        <div>
                        <div className="flex items-center cursor-pointer" >
                            
                           
                        </div>
                        <Text1 weight='' size="2xl" > Master Table Logs & Draft  </Text1>
                        <Text1  size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
                        </div>
                        {/* <Button href={'/dashboard/master-table/table/upload'} variant="contained" onClick={handleSubmit}>NEXT</Button> */}
                </div>
                <div>
                  <MasterTableLogs 
                  response={headerBody}
                  headerData={header}
                  responseData={(e) => onNewCheck(e)}
                  onClick={(e)=> console.log(e,'onclick') }
              //  onDelete={(e)=> console.log(e,'delete')}
              //  onEdit={(e)=> console.log(e)}
                   />
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
