import React, { useCallback, useEffect, useRef, useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import { LeftArrowIcon, MasterTable } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import masterTableApi from 'helpers/use-api/master-table/table'
import { MasterTableComponent } from '@/components/organism/tablecomp'
import DialogPage from '@/components/molecules/dialog'

import { TextField } from '@/components/atoms/field'

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
      <div className='space-y-4'>
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

const AddRow = ({access_token,user,table}) => {
  const [tableHeader,setTableHeader] = useState(table?.masterTableHeader)
  const [row,setRow] = useState()
  const [isOpen,setIsOpen] = useState(false)
  const [data,setData]  = useState([])
  const element = useRef(false)

  useEffect(()=>{
    let dummy = {}
    if(element.current){
  
        table.masterTableHeader.map((cur)=>{
          dummy[cur.name] = ""
          // console.log(cur.name,'cur')
        })
        // console.log(dummy)
        setRow(dummy)
      // console.log(table,'table')
    }

    return ()=>{
      element.current = true
    }
  
  },[])
  // console.log(table,'table')
  
  const addRow = (e)=>{
    setData([...data,e])
    // console.log(e,'dd')
  }
  return (
    <>
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
                    <Button onClick={()=> setIsOpen(true)}>ADD ROW</Button>
                    <Button variant='contained'>SAVE</Button>
                </div>
            </div>
            <div>
              <MasterTableComponent
                 headers={tableHeader}
                 body={data}
              />
            </div>
            {isOpen &&   <RowAdd open={isOpen} onClose={()=> setIsOpen(!isOpen)} row={row} addRow={addRow}/>}
           </div>
        </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
    let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
    let {id} = appCtx.query
    let table 
    let auth
    try{
       auth =await authApi.WhoAmI(appCtx)
      if (!auth) {
        return {
          redirect: {
            destination: '/auth/login',
            permanent: false,
          },
        };
      } 
      // console.log(id,'id')
      const {data} = await masterTableApi.getTable(access_token,id)
      table  =  data
      // console.log(data)
    }catch(err){
      console.log(err,'err')
    }
    return {
      props:{
         user:auth || {},
         access_token,
         table:table || []
      }
    }
  
  }


export default AddRow
