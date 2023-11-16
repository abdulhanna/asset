import React, { useState,useEffect,useRef,useCallback } from 'react'
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
import Modifytable from 'proj-components/Dashboard/masterTable/modifytable'
import { arrayMove } from 'helpers/formdataConverter'


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


  console.log(tableRow,'row')



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

const RowAdd = ({open,onClose,row,addRow})=>{
  const [dataRow,setDataRow] = useState(row)

  let arr = []
  if(row){
    for (const [key, value] of Object.entries(dataRow)) {
      let a = {}
      if(key !== '_id'){
         a['label']  = key
         a['value'] = value
          console.log(`${key}: ${value}`) 
         arr.push(a)
      }
  }
  }

  const handleChange = useCallback((e)=>{
    setDataRow({...dataRow,[e.target.name]: e.target.value })
   },[dataRow])
  useEffect(()=>{
    //  console.log('arrr',row)
  
  },[])

   console.log(arr,'end',row)
  return (
    <DialogPage width='min-w-[400px]' open={open} close={onClose}>
      <div className='space-y-4 px-8'>
         <div className='text-center'>
         <Text1 size='2xl' color='text-primary'> Add Row</Text1>
         {/* {JSON.stringify(arr)} */}
         </div>
         <div>
                {arr.length > 0 && arr.map((cur,index)=>{
                  return(<div key={index}>
                    <TextField label={cur.label} name={cur.label} value={cur.value} onChange={handleChange}  />
                  </div>)
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

const SubmitTable = ({open,onClose,handleSubmitFile})=>{

  

   return  <DialogPage width='max-w-[540px]' open={open} close={onClose}>
         <div className='space-y-8'>
            <div>
              <Text1 size='xl'>
                Would like to Save the master table as a Draft or Publish directly?
             </Text1>
             <Text1 color='text-lightGray'>
              By saving the master table as a draft, you can continue making changes later.
              Publishing the master table will be irreversible.
             </Text1>
            </div>
            <div className='flex justify-evenly'>
              <Button variant='contained' onClick={()=>{
                onClose();
                handleSubmitFile('unpublished')
              }}>SAVE AS DRAFT</Button>
              <Button variant='green' className={'px-8'} onClick={()=>{
                onClose()
                handleSubmitFile('published')
              }}>PUBLISH</Button>
            </div>
         </div>
   </DialogPage>
  }

const SingleTable = ({access_token,user,table}) => {
  const [isOpen,setIsOpen] = useState(false)
  const [isActive,setIsActive] = useState(false)
  const [masterTable,setMasterTable] = useState(table)
  const [isSubmit,setIsSubmit] = useState(false)
  const [tableHeader,setTableHeader] = useState(table?.masterTableHeader)
  const [selectedId,setSelectedId] = useState()
  const [row,setRow] = useState()
  const [head,setHead] = useState()
    const router  = useRouter()
    const element = useRef(false)
    const {id} = router.query
    const notify = (msg)=> toast.success(msg)
    const Error = (msg)=> toast.error(msg)


    useEffect(()=>{
      let dummy = {}
      if(element.current){
    
          table.masterTableHeader?.map((cur)=>{
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

    

    const updateHandle = (e)=>{
        //  console.log(e)
         const a = [...masterTable.masterTableData]
         a[selectedId] = e
         setMasterTable({...masterTable,masterTableData:a})
         setSelectedId('')
        //  console.log(a,'sele')
         
    }

  const handleSubmit = async()=>{
      setIsSubmit(true)
      // try{
      //   const res = await masterTableApi.modifyTable(access_token,id,{masterTableData:masterTable.masterTableData})
      //   if(res.status == '200'){
      //       notify('table modified')
      //   }
      //   // console.log(res,'res')
      // }catch(err){
      //   console.log(err,'err')
      //   Error(err?.response?.data?.error)
      // }
  }

  const handleSubmitFile = async(e)=>{

    try{
        const res = await masterTableApi.modifyTable(access_token,id,{masterTableData:masterTable.masterTableData,publishStatus:e})
        console.log(res,'res')
        if(res.status == '200'){
                 notify('table modified')
            }
    }catch(err){
      // console.log(err,'err')
      Error(err?.response?.data?.error)
    }
    // alert(e)
  }

  const addRow = (data)=>{
    const a = [...masterTable.masterTableData]
    if(selectedId){
      a.splice(selectedId,0,data)
    }else{
      a.push(data)
    }
    
    setMasterTable({...masterTable,masterTableData:a})
    setSelectedId('')
    // console.log(data,'ddd',a)
  }

  const onDragDrop = (oldIndex,newIndex,data)=>{
    console.log(oldIndex,newIndex,data)
    // console.log(masterTable)
    setMasterTable({...masterTable,masterTableData:arrayMove(data,oldIndex,newIndex)})
  }

  useEffect(()=>{
    console.log(masterTable,'table');
  },[masterTable])

  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    console.log(oldIndex,newIndex)
    setMasterTable((prevMasterTable) => {
    const newMasterTableData = arrayMove(prevMasterTable.masterTableData, oldIndex, newIndex);
    return {
      ...prevMasterTable,
      masterTableData: newMasterTableData,
    };
  });
  
  }, []);
 
  // const onDelete = useCallback((pos)=>{
  //    const data = [...masterTable.masterTableData]
  //    const newData = data.filter((val,index)=> index !== pos)
  //    console.log(data,'data',newData)
  //   //  data.splice(pos,1)
  //   //  console.log(data,'ss',pos)
  //   // console.log(masterTable.masterTableData);
  //   // setMasterTable((prevMasterTable)=>{
  //   //       return {
  //   //         ...prevMasterTable,
  //   //         masterTableData : data  
  //   //       }
  //   // })
  //     //  alert(pos)
  // },[])

  const onDelete = (pos)=>{
    const a = [...masterTable.masterTableData]
    //  console.log(a,pos);
     a.splice(pos,1)
     setMasterTable({...masterTable,masterTableData:a})
     
  }
console.log(head,'head')
  
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
                 {/* <Button   onClick={()=>alert('add new row')}>UPLOAD DOCUMNET</Button> */}
                 <Button   onClick={()=> setIsOpen(true)}>ADD ROW</Button>
                 <Button variant='contained' onClick={handleSubmit}>SAVE</Button>
               </div>
        </div>

        {/* TABLE SECTION */}
        <div>
        <Modifytable
         header={[...tableHeader,{label:'Action',name:'action'}]}
         headerdata={masterTable?.masterTableData?.map((item) => {
              return {
                ...item,
                // href: `id=${item.id}`,
              };
            })}
                onDragDrop={onDragDrop}
                onEdit={(e,id)=>{
                  setRow(e)
                  setSelectedId(id)
                  setIsActive(true)
                }}
                onDelete={onDelete}
                onSortEnd={onSortEnd}
                onRowadd={(e)=> {
                  setSelectedId(e+1)
                  setIsOpen(true)
                }}
         />
        {/* <MasterTableComponent
                   headers={tableHeader}
              responseData={(e,id) => {
                setRow(e)
                 setSelectedId(id)
                // console.log(e,id)
              }}
              body={masterTable?.masterTableData?.map((item) => {
              return {
                ...item,
                // href: `id=${item.id}`,
              };
            })}
            onClick={()=> setIsActive(true)}
           /> */}
         {/* {masterTable?.masterTableData?.length == 0 ? <NodataPage /> : <div>
        
         </div>} */}
        </div>
        <ToastContainer/>
        { isActive && <ModifyComponent open={isActive} onClose={()=> setIsActive(!isActive)} row={row} updateData={updateHandle} header={head}/>}
        {isOpen &&   <RowAdd open={isOpen} onClose={()=> setIsOpen(!isOpen)} row={head} addRow={addRow}/>}
        {isSubmit && <SubmitTable open={isSubmit} onClose={()=> setIsSubmit(!isSubmit)} handleSubmitFile={handleSubmitFile}/>}
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
