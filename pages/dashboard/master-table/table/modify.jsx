import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import Button from '@/components/atoms/button'
import { Text1, TextField } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'
import { MasterTableComponent } from '@/components/organism/tablecomp'
import DialogPage from '@/components/molecules/dialog'

const ModifyComponent = ({open,onClose,row})=>{
   const [tableRow,setTableRow] = useState(row)
  //  console.log(tableRow,'table')
  return (
    <DialogPage width='min-w-[400px]' open={open} close={onClose}>
        <div className='px-8 space-y-4'>
            <div className='text-center'><Text1 color='text-primary' size='2xl'>Modify</Text1></div>
            <div>
              <TextField label='Code No' value={tableRow?.code}/>
              <TextField label='Block of Asset (Description)' value={tableRow.description}/>
              <TextField label='Rate(SLM)' value={tableRow?.Rate1}/>
              <TextField label='Rate(WDV)' value={tableRow?.Rate2}/>
            </div>
            <div className='text-center'>
            <Button variant='contained'> SAVE CHANGES</Button>
            </div>
        </div>
    </DialogPage>
  )
}

const SingleTable = ({access_token,user}) => {
  const [isOpen,setIsOpen] = useState(false)
  const [row,setRow] = useState()
    const router  = useRouter()
    const headerMaster = [
        {label:"Code NO" ,name:"code"},
        {label:"BLock Description", name :"description"},
        {label: "Rate(SLM)",name:'Rate1'},
        {label:"Rate(WDB)", name:"Rate2"}
       ] 
    const master = [
      {_id:'12143',code:'01',description:"building",Rate1:'10%',Rate2:'11%'},
      {_id:'12141',code:'01A',description:"building ",Rate1:'4%',Rate2:'3.9%'},
      {_id:'12140',code:'01B',description:"building material",Rate1:'8%',Rate2:'9%'}
    ]

    console.log(row,'row')
  return (
   <MainLayout User={user}>
     <div>
      {/* HEADER SECTION */}
       <div className="w-full flex justify-between items-center">
            <div>
               <div className="flex items-center cursor-pointer" onClick={()=> router.back()}>
                        <LeftArrowIcon />
                        <Text1 weight='' size="2xl" >
                         {`Modify Company's Act Table`}
                        </Text1>
                      </div>
                      <Text1 className="pl-4" size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
               </div>
               <div className='flex gap-4'>
                 <Button variant='contained' onClick={()=> alert('delete table')}>SAVE CHANGES</Button>
                 {/* <Button  variant="contained" onClick={()=>console.log('dd')}>NEXT</Button> */}
               </div>
        </div>

        {/* TABLE SECTION */}
        <div>
           <MasterTableComponent
                   headers={headerMaster}
              responseData={(e) => setRow(e)}
              body={master.map((item) => {
              return {
                ...item,
                // href: `id=${item.id}`,
              };
            })}
            onClick={()=> setIsOpen(true)}
           />
        </div>
       { isOpen && <ModifyComponent open={isOpen} onClose={()=> setIsOpen(!isOpen)} row={row}/>}
     </div>
   </MainLayout>
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


export default SingleTable
