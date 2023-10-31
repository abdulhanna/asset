import React, { useEffect, useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'
import { MasterTableComponent } from '@/components/organism/tablecomp'
import masterTableApi from 'helpers/use-api/master-table/table'
import NodataPage from '@/components/molecules/nodataPage'
import { DeleteConfirm } from '@/components/molecules/dialog'
import { ToastContainer, toast } from "react-toastify";

const SingleTable = ({access_token,user,table}) => {
  const [masterTable,setMasterTable] = useState(table)
  const [tableHeader,setTableHeader] = useState(table.masterTableHeader)
  const [isOpen,setIsOpen] = useState(false)
    const router  = useRouter()
    const {id} = router.query
    const notify = (msg)=> toast.success(msg)
    const Error = (msg)=> toast.error(msg)
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

    useEffect(()=>{
    //   let arr = []
    //   for (const [key, value] of Object.entries(table?.masterTableHeader)) {      
    //   let a ={}
    //     a['label'] = value
    //     a['name'] = key
    //     arr.push(a)
    // //   console.log(`${key}: ${value}`);
    // }
    //   setTableHeader([...tableHeader,...arr])
    },[])

    const deactiveHandle = async()=>{
          // alert(id)
      try{
        const res  = await masterTableApi.discardDraft(access_token,id)
        if(res.status == '200'){
          notify('Deactivate Successfully!')
        }
        setTimeout(()=>{
              router.push('/dashboard/master-table/logs')
        },2000)
        console.log(res,'res');
      }catch(err){
        Error(err?.response?.data?.error)
        console.log(err,'error')
      }
    }

    const handlePublishTable = async()=>{

      try{

      }catch(err){
        console.log(err,'err')
      }

    }
  //  console.log(masterTable,'table')
  return (
   <MainLayout User={user}>
     <div>
      {/* HEADER SECTION */}
       <div className="w-full flex justify-between items-center">
            <div>
               <div className="flex items-center cursor-pointer" onClick={()=> router.back()}>
                        <LeftArrowIcon />
                        <Text1 weight='' size="2xl" >
                          Company Act Table
                        </Text1>
                      </div>
                      <Text1 className="pl-4" size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
               </div>
               <div className='flex gap-4'>
                 {masterTable.publishStatus !== "published" && <Button variant='contained' onClick={handlePublishTable}>PUBLISH</Button>}
                 <Button  variant="danger" onClick={()=>setIsOpen(true)}>DISCARD DRAFT</Button>
               </div>
        </div>

        {/* TABLE SECTION */}
        <div>
          {masterTable.masterTableData.length === 0 ? <NodataPage/> : <div>
          <MasterTableComponent
                   headers={tableHeader}
             responseData={(e) => console.log(e, "e")}
            body={masterTable?.masterTableData.map((item) => {
              // console.log(item)
            return {
              ...item,
              // href: `id=${item.id}`,
            };
          })}
           />
          </div>}
        </div>
        <ToastContainer/>
        
        <DeleteConfirm check={isOpen}
         close={()=>setIsOpen(!isOpen)} 
         callDelete={deactiveHandle} 
         heading={'Are you sure want to Discard'}
          para={'Are you sure want to discard the member from list'}/>
     </div>
   </MainLayout>
  )
}

export const getServerSideProps = async (appCtx) => {
    let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
    const auth =await authApi.WhoAmI(appCtx)
    const {id} = appCtx.query
    if (!auth) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    } 
  
    let table 
    try{
      const {data} = await masterTableApi.getTable(access_token,id)
      table  =  data
    }catch(err){
      console.log(err,'err')
    }
    return {
      props:{
         user:auth,
         access_token,
         table:table||[]
      }
    }
  
  }


export default SingleTable
