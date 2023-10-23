import React, { useEffect, useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'
import { MasterTableComponent } from '@/components/organism/tablecomp'
import { DeleteConfirm } from '@/components/molecules/dialog'
import masterTableApi from 'helpers/use-api/master-table/table'
import NodataPage from '@/components/molecules/nodataPage'
// import masterTableApi from 'helpers/use-api/master-table/table'
import { ToastContainer, toast } from "react-toastify";


const SingleTable = ({access_token,user,table}) => {
    const router  = useRouter()
    const [isOpen,setIsOpen] = useState(false)
    const[masteTable,setMasterTable] = useState(table.masterTableData)
    const [tableHeader,setTableHeader] = useState([])
    const {id} = router.query
    const notify = (msg)=> toast.success(msg)
    const Error = (msg)=> toast.error(msg)
    const headerMaster = [
        {label:"Code NO" ,name:"Code No"},
        {label:"BLock Description", name :"Description"},
        {label: "Rate(WDV)",name:'Rate(%) (WDV)'},
        {label:"Rate(SLM)", name:"Rate1(%) (SLM)"}
       ] 
    const master = [
      {_id:'12143',code:'01',description:"building",Rate1:'10%',Rate2:'11%'},
      {_id:'12141',code:'01A',description:"building ",Rate1:'4%',Rate2:'3.9%'},
      {_id:'12140',code:'01B',description:"building material",Rate1:'8%',Rate2:'9%'}
    ]

    useEffect(()=>{
        // console.log(table.masterTableHeader,'dd')
        let arr = []
        for (const [key, value] of Object.entries(table?.masterTableHeader)) {      
        let a ={}
          a['label'] = value
          a['name'] = key
          arr.push(a)
      //   console.log(`${key}: ${value}`);
      }

      setTableHeader([...tableHeader,...arr])
      // console.log(arr,'err')
    },[])

    const callDelete = async()=>{
      // alert('delete')

      try{
         const res = await masterTableApi.removeTableById(access_token,id)
         console.log(res,'res')
         if(res.status == '200'){
          notify('table deleted')
         }
         setTimeout(()=>{
                 router.push('/dashboard/master-table/table')  
         },2000)
        
      }catch(err){
        Error(err?.response?.data?.error)
        console.log(err,'err')
      }
    }

    console.log(tableHeader,id,'table')
  return (
   <MainLayout User={user}>
     <div>
      {/* HEADER SECTION */}
       <div className="w-full flex justify-between items-center">
            <div>
               <div className="flex items-center cursor-pointer" onClick={()=> router.back()}>
                        <LeftArrowIcon />
                        <Text1 weight='' size="2xl" >
                          Design Master Table
                        </Text1>
                      </div>
                      <Text1 className="pl-4" size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
               </div>
               <div className='flex gap-4'>
                 <Button onClick={()=> setIsOpen(true)}>DELETE TABLE</Button>
                 {/* <Button  variant="contained" onClick={()=>console.log('dd')}>NEXT</Button> */}
               </div>
        </div>

        {/* TABLE SECTION */}
        <div>
         {masteTable.length === 0 ? <div><NodataPage/></div> :
         <MasterTableComponent
                   headers={tableHeader}
             responseData={(e) => console.log(e, "e")}
            body={masteTable.map((item) => {
            return {
              ...item,
              // href: `id=${item.id}`,
            };
          })}
           />}
        </div>
        <DeleteConfirm 
        check={isOpen}
         close={()=> setIsOpen(!isOpen)}
          callDelete={callDelete}
            heading= {'Are sure want to delete Table'}
            para ={'By deleting this master table it will be permanently removed from all the organisations as well.'}
          />
     </div>
   </MainLayout>
  )
}

export const getServerSideProps = async (appCtx) => {
    let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
    const auth =await authApi.WhoAmI(appCtx)
    // console.log(appCtx.query.id,'ddd')
    let {id} = appCtx.query
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
      // console.log(data,'data')
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
