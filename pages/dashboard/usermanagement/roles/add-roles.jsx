import React, { useState,useEffect } from 'react'
import MainLayout from 'proj-components/MainLayout'
import {  Text1, TextField, TextInputArea } from '@/components/atoms/field'
import { LeftArrowIcon, ToggleButton,ToggleOnButton,DropDownIcon } from '@/components/atoms/icons'
import Button from '@/components/atoms/button'
import { Accordin } from '@/components/molecules/accordion'
// import Text from '@/components/atoms/field'

import { useRouter } from 'next/router'

const AddRoles = () => {

  const router = useRouter()
  const [role,setRole] = useState({
    roleName:'',
    desc:'',
    Permissions:[
        {
            moduleName:"Organisation Mangament",
            allAccess:false,
            removeAccess:true,
            read:false,
            readWrite:false,
            delete:false
        },
        {
            moduleName:"fields Mangament",
            allAccess:false,
            removeAccess:false,
            read:false,
            readWrite:false,
            delete:false
        },
        {
          moduleName:"user Mangament",
          allAccess:false,
          removeAccess:false,
          read:false,
          readWrite:false,
          delete:false
      }
     ]
  })

const handleClick = (e)=>{
const data = [...role.Permissions]

let key = Object.keys(e)[0]

if(key === 'removeAccess' && e[key] === true){

  data[e.id] = {...data[e.id],[`${key}`]:e[key],allAccess:false,read:false,readWrite:false,delete:false}

}else if(key === 'allAccess' && e[key]=== true){

   data[e.id] = {...data[e.id],[`${key}`]:e[key],removeAccess:false,read:true,readWrite:true,delete:true}

}else{
   data[e.id] = {...data[e.id],[`${key}`]:e[key],removeAccess:false,read:false,readWrite:false,delete:false}
}

    setRole({
        ...role,Permissions:data
    })
}

const handleToggle = (e)=>{
const data = [...role.Permissions]
const key = Object.keys(e)[0]
data[e.id] = {...data[e.id],[`${key}`]:e[key],removeAccess:false}

  if(data[e.id].read && data[e.id].readWrite && data[e.id].delete){
    // console.log('allacess')
    data[e.id] = {...data[e.id],allAccess:true}
  }else{
    data[e.id] = {...data[e.id],allAccess:false}
  }
  
    setRole({
      ...role,Permissions:data
    })

}

useEffect(()=>{
    // console.log(role,'d')
},[role])


  return (
  <>
    <MainLayout isScroll={true}>
        <div>
            <div className='flex justify-between items-center cursor-pointer'>
                <div className='flex items-center' onClick={()=> router.back()}>
                  <LeftArrowIcon/>
                  <Text1 size='2xl'>Create Roles</Text1>
                </div>
                <Button variant='contained'>SAVE</Button>
            </div>
            <div className='mt-8 space-y-8'>
                 <div className='space-y-3'>
                    <Text1>Role Name</Text1>
                    <TextField className='w-1/4' value={role.roleName} label='Role Name' onChange={(e)=>setRole({...role,roleName:e.target.value})}/>
                 </div>
                 <div className='space-y-3'>
                    <Text1>Role Description</Text1>
                    <TextInputArea value={role.desc} label='Description' onChange={(e)=>setRole({...role,desc:e.target.value})}/>
                 </div>
                 <div>
                     <div className='flex justify-between items-center'>
                        <Text1>Role Permissions</Text1>
                        <Button onClick={()=>{
                            const data = [...role.Permissions]
                            role.Permissions.map((item,id)=>{
                               role.Permissions[id] = {...role.Permissions[id],removeAccess:true,read:false,readWrite:false,allAccess:false,delete:false}
                                 })
                         
                            setRole({...role,Permissions:role.Permissions})
                         } }>RESTORE DEFAULTS</Button>
                     </div>
                     <div>
                      {role.Permissions.map((item,index)=>{
                        return <Accordin label={item.moduleName} handleClick={handleClick} data={item} key={index} id={index}>
                            <div className='flex items-center gap-6'>
                                <div className='flex items-center gap-1'>
                              
                                <Text1 size='lg'>READ</Text1>
                                {item.read ? <ToggleOnButton onClick={()=>handleToggle({read:(!item.read),id:index})}/> :<ToggleButton onClick={()=>handleToggle({read:(!item.read),id:index})}/>}
                                </div>
                                <div className='flex items-center gap-1'>
                                <Text1 size='lg'>READ WRITE</Text1>
                                {item.readWrite ? <ToggleOnButton onClick={()=>handleToggle({readWrite:(!item.readWrite),id:index})}/> :<ToggleButton onClick={()=>handleToggle({readWrite:(!item.readWrite),id:index})}/>}
                                </div>
                                <div className='flex items-center gap-1'>
                                <Text1 size='lg'>DELETE</Text1>
                                {item.delete ? <ToggleOnButton onClick={()=>handleToggle({delete:(!item.delete),id:index})}/> :<ToggleButton onClick={()=>handleToggle({delete:(!item.delete),id:index})}/>}
                                </div>
                             </div>
                          </Accordin>
                      })}
                     </div>
   
                 </div>
            </div>
        </div>
    </MainLayout>
  </>
  )
}

export default AddRoles
