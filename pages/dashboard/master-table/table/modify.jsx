import React, { useState,useEffect,useRef } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import Button from '@/components/atoms/button'
import { Text1, TextField } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'
import { MasterTableComponent } from '@/components/organism/tablecomp'
import DialogPage from '@/components/molecules/dialog'
import NodataPage from '@/components/molecules/nodataPage'
import masterTableApi from 'helpers/use-api/master-table/table'
import { ToastContainer, toast } from "react-toastify";


const ModifyComponent = ({open,onClose,row,updateData})=>{
   const [tableRow,setTableRow] = useState(row)
  //  console.log(tableRow,'table')
  let arr = []
  if(row){
    for (const [key, value] of Object.entries(tableRow)) {
      let a = {}
      if(key !== '_id'){
         a['label']  = key
         a['value'] = value
          // console.log(`${key}: ${value}`) 
         arr.push(a)
      }
  }
  }

   const handleChange = (e)=>{
    setTableRow({...tableRow,[e.target.name]: e.target.value })
   }

   const handleSubmit = ()=>{
       
              updateData(tableRow)
              onClose()
   }



  return (
    <DialogPage width='min-w-[400px]' open={open} close={onClose}>
        <div className='px-8 space-y-4'>
        {/* {JSON.stringify(row)} */}
            <div className='text-center'><Text1 color='text-primary' size='2xl'>Modify</Text1></div>
            <div>
                {arr.map((cur,index)=>{
                  return(<TextField label={cur.label} name={cur.label} value={cur.value} onChange={handleChange}  key={index}/>)
                })}
              {/* <TextField label='Code No' value={tableRow?.code}/>
              <TextField label='Block of Asset (Description)' value={tableRow.description}/>
              <TextField label='Rate(SLM)' value={tableRow?.Rate1}/>
              <TextField label='Rate(WDV)' value={tableRow?.Rate2}/> */}
            </div>
            <div className='text-center'>
            <Button variant='contained' onClick={handleSubmit}> SAVE CHANGES</Button>
            </div>
        </div>
    </DialogPage>
  )
}

const SingleTable = ({access_token,user,table}) => {
  const [isOpen,setIsOpen] = useState(false)
  const [masterTable,setMasterTable] = useState(table)
  const [tableHeader,setTableHeader] = useState([])
  const [selectedId,setSelectedId] = useState()
  const [row,setRow] = useState()
    const router  = useRouter()
    const isMounted = useRef(false);
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
      if (isMounted.current) {
        let arr = []
        for (const [key, value] of Object.entries(table?.masterTableHeader)) {      
        let a ={}
          a['label'] = value
          a['name'] = key
          arr.push(a)
      //   console.log(`${key}: ${value}`);
      setTableHeader([...arr])
      }
      } else {
        isMounted.current = true;
      }
  
     
     
    },[])

    // console.log(table,'row')

    const updateHandle = (e)=>{
        //  console.log(e)
         const a = [...masterTable.masterTableData]
         a[selectedId] = e
         setMasterTable({...masterTable,masterTableData:a})
        //  console.log(a,'sele')
         
    }

  const handleSubmit = async()=>{
      try{
        const res = await masterTableApi.modifyTable(access_token,id,{masterTableData:masterTable.masterTableData})
        if(res.status == '200'){
            notify('table modified')
        }
        // console.log(res,'res')
      }catch(err){
        console.log(err,'err')
        Error(err?.response?.data?.error)
      }
  }

  console.log(masterTable,'table');
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
                 <Button variant='contained' onClick={handleSubmit}>SAVE CHANGES</Button>
                 {/* <Button  variant="contained" onClick={()=>console.log('dd')}>NEXT</Button> */}
               </div>
        </div>

        {/* TABLE SECTION */}
        <div>
         {masterTable?.masterTableData.length === 0 ? <NodataPage/> : <div>
         <MasterTableComponent
                   headers={tableHeader}
              responseData={(e,id) => {
                setRow(e)
                 setSelectedId(id)
                // console.log(e,id)
              }}
              body={masterTable?.masterTableData.map((item) => {
              return {
                ...item,
                // href: `id=${item.id}`,
              };
            })}
            onClick={()=> setIsOpen(true)}
           />
         </div>}
        </div>
        <ToastContainer/>
       { isOpen && <ModifyComponent open={isOpen} onClose={()=> setIsOpen(!isOpen)} row={row} updateData={updateHandle}/>}
     </div>
   </MainLayout>
  )
}

export const getServerSideProps = async (appCtx) => {
    let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
    const auth =await authApi.WhoAmI(appCtx)
    // console.log(auth,'ddd')
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
   
       table = data
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
