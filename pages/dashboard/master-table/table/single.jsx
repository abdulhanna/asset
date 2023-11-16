import React, { useEffect, useState,useRef, useCallback } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import Button from '@/components/atoms/button'
import { Text1,TextField } from '@/components/atoms/field'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'
import { MasterTableComponent } from '@/components/organism/tablecomp'
import masterTableApi from 'helpers/use-api/master-table/table'
import DialogPage,{ DeleteConfirm } from '@/components/molecules/dialog'
import { ToastContainer, toast } from "react-toastify";
import { Nodata } from '@/components/atoms/icons'
import UploadFile from '@/components/organism/uploadFile'


// const ModifyComponent = ({open,onClose,row,updateData,header})=>{
//   const [tableRow,setTableRow] = useState(row)
//   // console.log(row,'table',header,)
//  let arr = []

//  useEffect(()=>{
//      let obj = {}
//   for(const [key,value] of Object.entries(header)){
//           obj[key] = tableRow[key] ? tableRow[key] : ""
      
//   }

//   setTableRow(obj)
//       // console.log(header,'heade',tableRow)
//  },[])
//  if(row){
//   for (const [key, value] of Object.entries(tableRow)) {
//     let a = {}
//     if(key !== '_id'){
//        a['label']  = key
//        a['value'] = value
//         console.log(`${key}: ${value}`) 
//        arr.push(a)
//     }
// }
// }

//   const handleChange = (e)=>{
//    setTableRow({...tableRow,[e.target.name]: e.target.value })
//   }

//   const handleSubmit = ()=>{
      
//              updateData(tableRow)
//              onClose()
//   }


//   // console.log(tableRow,'row')



//  return (
//    <DialogPage width='min-w-[400px]' open={open} close={onClose}>
//        <div className='p-10 space-y-4'>
//        {/* {JSON.stringify(row)} */}
//            <div className='text-center'><Text1 color='text-primary' size='2xl'>Modify</Text1></div>
//            <div>
//                {arr.map((cur,index)=>{
//                  return(<TextField label={cur.label} name={cur.label} value={cur.value} onChange={handleChange}  key={index}/>)
//                })}
//              {/* <TextField label='Code No' value={tableRow?.code}/>
//              <TextField label='Block of Asset (Description)' value={tableRow.description}/>
//              <TextField label='Rate(SLM)' value={tableRow?.Rate1}/>
//              <TextField label='Rate(WDV)' value={tableRow?.Rate2}/> */}
//            </div>
//            <div className='text-center'>
//            <Button variant='contained' onClick={handleSubmit}> SAVE CHANGES</Button>
//            </div>
//        </div>
//    </DialogPage>
//  )
// }


// const RowAdd = ({open,onClose,row,addRow})=>{
//   const [dataRow,setDataRow] = useState(row)
//   const [name, setName] = useState('')



//   let arr = []
//   if(row){
//     for (const [key, value] of Object.entries(dataRow)) {
//       let a = {}
//       if(key !== '_id'){
//          a['label']  = key
//          a['value'] = value
//           // console.log(`${key}: ${value}`) 
//          arr.push(a)
//       }
//   }
//   }

//   const handleChange = useCallback((e)=>{
//     setDataRow({...dataRow,[e.target.name]: e.target.value })
//    },[dataRow])
//   useEffect(()=>{
   
//     // console.log(dataRow,'arrr')
//   },[dataRow])


//   return (
//     <DialogPage width='min-w-[400px]' open={open} close={onClose}>
//       <div className=''>
//          <div className='text-center'>
//          <Text1 size='2xl' color='text-primary'> Add Row</Text1>
//          {/* {JSON.stringify(arr)} */}
//          </div>
//          <div>
//                 {arr?.map((cur,index)=>{
//                   return(<TextField label={cur.label} name={cur.label} value={cur.value} onChange={handleChange}  key={index}/>)
//                 })}
        
//          </div>
//         <div className='text-center'> <Button variant='contained' onClick={()=>{
//           addRow(dataRow)
//           onClose()
//         }}>SAVE ROW</Button></div>
//       </div>
//     </DialogPage>
//   )
// }


const UploadDocs  = ({open,onClose,handleSubmit,donwloadLink})=>{
  const [file,setFile] = useState(null)


  const handleChange = (file)=>{
      setFile(file)
  }

  // const handleSubmitFile = ()=>{
    
  // }


  const isBrowser = () => typeof window !== 'undefined';

  const handleDownload = async () => {
    try {
      // Trigger the download by opening the API route in a new window or tab
      const downloadUrl = donwloadLink;
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
   };

   console.log(donwloadLink,'link')
   
    return <DialogPage width={'w-[500px]'} open={open} close={onClose}>
          <div className='space-y-8'>
            {/* <h3>Upload Documents</h3> */}
            <div className='text-center mt-2'>
              <Text1 size='xl'>Upload Master Table</Text1>
            </div>
          
            
            <div>
                <UploadFile file={file} handleChange={handleChange}/>
                 <Text1>Download a sample file,  <span className='text-primary text-lg cursor-pointer' onClick={()=>{
                  // router.replace(fileModel.sampleFile)
                   if (isBrowser()) { //Only add the event listener client-side
        
                     handleDownload()
                    // window.open(fileModel.sampleFile, '_blank');
                    }
                 }}>Sample File.xlsx</span> and re-upload.</Text1>
            </div>
            <div className='flex justify-around'>
             
               <Button>Cancel</Button>
               <Button className={'px-8'} variant='contained' onClick={()=> {
                onClose();
                handleSubmit(file)
               }}>Save</Button>
            </div>
            
          </div>
    </DialogPage>
}

const SingleTable = ({access_token,user,table}) => {
    const router  = useRouter()
    const [isOpen,setIsOpen] = useState(false)
    const [isActive,setIsActive] = useState(false)
    const [isEdit,setIsEdit] = useState(false)
    const [isUpload,setIsUpload] = useState(false)
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

  
    const callDiscardDraft = async()=>{
  

      try{
         const res = await masterTableApi.discardDraft(access_token,id)
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


    const handleSubmit = async(file)=>{
      const formData= new FormData()
      // console.log(file,'file');
      formData.append('file',file)
      formData.append('tableCodeId',table.tableCodeId)
      formData.append('publishStatus','unpublished')

      try{
         const res = await masterTableApi.uploadTableStructure(access_token,formData)
         console.log(res,'res')
         if(res.status == '200'){
            notify('Excel file uploaded as Draft')
         }
         setTimeout(()=>{
            router.push('/dashboard/master-table/table')
         },2000)
        //  console.log(res,'res')
      }catch(err){
        // console.log(err.response.data.error,'err')
        Error(err?.response?.data?.error)
      }
    }

     const publishTable = useCallback(async()=>{
        
      try{
        const res =   await masterTableApi.publishDraftTable(access_token,table._id)

        //  notify(res.data.msg)
        if(res.status == 200){
          notify('Table is Published')
           setTimeout(()=>{
               router.push('/dashboard/master-table/table')
           },2000)
        }
         console.log(res,'res')
     }catch(err){
       console.log(err,'err');
       Error(err?.response?.data?.error)
     }

     },[])


    // console.log(table.sampleFile,'table')
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
               {masteTable.length == 0 &&  <div className='flex gap-4'>
               {/* <Button>DOWNLOAD CSV STRUCTURE</Button> */}
                 <Button onClick={()=>setIsUpload(true)}>UPLOAD DOCUMNET</Button>
                 <Button href={`/dashboard/master-table/table/modify?id=${id}`}>ENTER RATES</Button>
                 {/* <Button href={`/dashboard/master-table/table/modify?id=${id}`} variant='contained'>MODIFY MASTER TABLE</Button> */}
               </div>}
               {masteTable.length !== 0 &&  <div className='flex gap-4'>
               <Button variant='danger' onClick={()=>setIsOpen(true)}>DISCARD DRAFT</Button>
               <Button href={`/dashboard/master-table/table/draft?id=${id}`}>EDIT MASTER TABLE</Button>
               <Button variant='contained' onClick={publishTable}>PUBLISH</Button>

               </div>}
               
        </div>

        {/* TABLE SECTION */}
        <div>
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
           />
         {masteTable?.length === 0 && <div className='h-screen flex flex-col justify-center items-center space-y-4'>
           <div className='flex justify-center overflow-hidden'> 
           <Nodata className={"flex justify-center items-center"}/>
           </div>
           <Text1 size='lg' weight='medium' color='text-primary'>No Data Yet</Text1>
         </div> 
       
           }
        </div>
        <DeleteConfirm 
        check={isOpen}
         close={()=> setIsOpen(!isOpen)}
          callDelete={callDiscardDraft}
            heading= {'Are sure want to discard Table'}
            para ={'By discarding this master table it will be permanently removed from all the organisations as well.'}
          />

{/* { isActive && <ModifyComponent open={isActive} onClose={()=> setIsActive(!isActive)} row={row} updateData={updateHandle} header={head}/>} */}
{/* {isOpen &&   <RowAdd open={isOpen} onClose={()=> setIsOpen(!isOpen)} row={row} addRow={addRow}/>} */}
{isUpload &&  <UploadDocs open={isUpload} onClose={()=> setIsUpload(!isUpload)} handleSubmit={handleSubmit} donwloadLink={table.sampleFile}/>}
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
