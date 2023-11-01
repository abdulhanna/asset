import React, { useEffect, useState,useRef } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import Button from '@/components/atoms/button'
import { Text1,TextField } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'
import { MasterTableComponent } from '@/components/organism/tablecomp'
import masterTableApi from 'helpers/use-api/master-table/table'
import NodataPage from '@/components/molecules/nodataPage'
import DialogPage,{ DeleteConfirm } from '@/components/molecules/dialog'
import { ToastContainer, toast } from "react-toastify";


const ModifyComponent = ({open,onClose,row,updateData,header})=>{
  const [tableRow,setTableRow] = useState(row)
  // console.log(row,'table',header,)
 let arr = []

 useEffect(()=>{
     let obj = {}
  for(const [key,value] of Object.entries(header)){
          obj[key] = tableRow[key] ? tableRow[key] : ""
      
  }

  setTableRow(obj)
      // console.log(header,'heade',tableRow)
 },[])
 if(row){
  for (const [key, value] of Object.entries(tableRow)) {
    let a = {}
    if(key !== '_id'){
       a['label']  = key
       a['value'] = value
        console.log(`${key}: ${value}`) 
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


  // console.log(tableRow,'row')



 return (
   <DialogPage width='min-w-[400px]' open={open} close={onClose}>
       <div className='p-10 space-y-4'>
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


const RowAdd = ({open,onClose,row,addRow})=>{
  const [dataRow,setDataRow] = useState(row)
  const [name, setName] = useState('')



  let arr = []
  if(row){
    for (const [key, value] of Object.entries(dataRow)) {
      let a = {}
      if(key !== '_id'){
         a['label']  = key
         a['value'] = value
          // console.log(`${key}: ${value}`) 
         arr.push(a)
      }
  }
  }

  const handleChange = useCallback((e)=>{
    setDataRow({...dataRow,[e.target.name]: e.target.value })
   },[dataRow])
  useEffect(()=>{
   
    // console.log(dataRow,'arrr')
  },[dataRow])


  return (
    <DialogPage width='min-w-[400px]' open={open} close={onClose}>
      <div className=''>
         <div className='text-center'>
         <Text1 size='2xl' color='text-primary'> Add Row</Text1>
         {/* {JSON.stringify(arr)} */}
         </div>
         <div>
                {arr?.map((cur,index)=>{
                  return(<TextField label={cur.label} name={cur.label} value={cur.value} onChange={handleChange}  key={index}/>)
                })}
        
         </div>
        <div className='text-center'> <Button variant='contained' onClick={()=>{
          addRow(dataRow)
          onClose()
        }}>SAVE ROW</Button></div>
      </div>
    </DialogPage>
  )
}


const SingleTable = ({access_token,user,table}) => {
    const router  = useRouter()
    const [isOpen,setIsOpen] = useState(false)
    const [isActive,setIsActive] = useState(false)
    const [isEdit,setIsEdit] = useState(false)
    const[masteTable,setMasterTable] = useState(table.masterTableData)
    const [tableHeader,setTableHeader] = useState(table?.masterTableHeader)
    const [selectedId,setSelectedId] = useState()
    const [head,setHead] = useState()
    const [row,setRow] = useState()
    const {id} = router.query
    const notify = (msg)=> toast.success(msg)
    const Error = (msg)=> toast.error(msg)

    const element = useRef(false)

    useEffect(()=>{
      let dummy = {}
      if(element.current){
    
          table.masterTableHeader.map((cur)=>{
            dummy[cur.name] = ""
            // console.log(cur.name,'cur')
          })
          // console.log(dummy)
          setHead(dummy)
        // console.log(table,'table')
      }
  
      return ()=>{
        element.current = true
      }
    
    },[])

    // const headerMaster = [
    //     {label:"Code NO" ,name:"Code No"},
    //     {label:"BLock Description", name :"Description"},
    //     {label: "Rate(WDV)",name:'Rate(%) (WDV)'},
    //     {label:"Rate(SLM)", name:"Rate1(%) (SLM)"}
    //    ] 
    // const master = [
    //   {_id:'12143',code:'01',description:"building",Rate1:'10%',Rate2:'11%'},
    //   {_id:'12141',code:'01A',description:"building ",Rate1:'4%',Rate2:'3.9%'},
    //   {_id:'12140',code:'01B',description:"building material",Rate1:'8%',Rate2:'9%'}
    // ]

  
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

    const updateHandle = async(data)=>{
          const a = [...masteTable]
          a[selectedId]  = data
          setMasterTable(a)
          //  console.log(a[selectedId],'data');
    }


    console.log(table,'table')
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
                 {/* <Button>UPLOAD DOCUMNET</Button>
                 <Button onClick={()=> alert('add row')}>ADD ROW</Button> */}
                 <Button href={`/dashboard/master-table/table/modify?id=${id}`} variant='contained'>MODIFY MASTER TABLE</Button>
               </div>
        </div>

        {/* TABLE SECTION */}
        <div>
         {masteTable?.length === 0 ? <div><NodataPage/></div> :
         <MasterTableComponent
                   headers={tableHeader}
             responseData={(e,id) =>{
              // setRow(e)
              // setSelectedId(id)
             }}
            body={masteTable?.map((item) => {
            return {
              ...item,
              // href: `id=${item.id}`,
            };
          })}
          onClick={(e)=>console.log(e)}
           />}
        </div>
        {/* <DeleteConfirm 
        check={isOpen}
         close={()=> setIsOpen(!isOpen)}
          callDelete={callDelete}
            heading= {'Are sure want to delete Table'}
            para ={'By deleting this master table it will be permanently removed from all the organisations as well.'}
          /> */}

{ isActive && <ModifyComponent open={isActive} onClose={()=> setIsActive(!isActive)} row={row} updateData={updateHandle} header={head}/>}
{isOpen &&   <RowAdd open={isOpen} onClose={()=> setIsOpen(!isOpen)} row={row} addRow={addRow}/>}
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
