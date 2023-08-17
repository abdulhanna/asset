import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import { InputField, Text1, TextArea, TextField, TextInputArea,Text } from '@/components/atoms/field'
import { LeftArrowIcon, ToggleButton,ToggleOnButton,DropDownIcon } from '@/components/atoms/icons'
import Button from '@/components/atoms/button'

import { useRouter } from 'next/router'

const AddRoles = () => {
  const[state,setState] = useState({
    label:"organization",
    permissions:{
        allAccess:false,
        removeAccess : false,
        edit:false,
        add:false,
        delete:false,
        fileUpload:false
    }
})
const [isActive,setIsActive] = useState(false)
  const [state1,setState1] = useState({
    name: '',
    description:'',
    Permissions:[
      {
        label:'organisation',
        read:false,
        write:false,
      },
      { 
        label:'field',
        read:false,
        write:false
      },
      { 
        label:'user',
        read:false,
        write:false
      },
      { 
        label:'document',
        read:false,
        write:false
      }
    ]
  })
  const router = useRouter()

  function handleDropDown(){
    setIsActive(!isActive)
 }
  return (
  <>
    <MainLayout>
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
                    <TextField className='w-1/4' label='Role Name' onChange={(e)=>console.log(e)}/>
                 </div>
                 <div className='space-y-3'>
                    <Text1>Role Description</Text1>
                    <TextInputArea label='Description' onChange={(e)=>console.log(e)}/>
                 </div>
                 <div>
                     <div className='flex justify-between items-center'>
                        <Text1>Role Permissions</Text1>
                        <Button>RESTORE DEFAULTS</Button>
                     </div>
                     <div className='flex justify-between border rounded-t-md p-4 mt-4'>
                       <Text1>Organisation Management</Text1>
                       <div className="flex justify-between gap-12">
                              <div className="flex gap-6">
                              <Text1>All Access</Text1>
                              <div value="allAccess" onClick={(e)=>{
                                if( state.permissions.allAccess == false){
                                    setState({
                                            permissions:{
                                                removeAccess:false,
                                                allAccess:true,
                                                edit:true,
                                                add:true,
                                                delete:true,
                                                fileUpload:true
                                            }
                                      })
                                    }else{
                                      setState({permissions :{ allAccess:false,
                                        removeAccess : false,
                                        edit:false,
                                        add:false,
                                        delete:false,
                                        fileUpload:false}})
                                      }
                                
                              }} >
                                {state.permissions.allAccess ? <ToggleOnButton /> : <ToggleButton />}</div>
                              </div>
                              <div className="flex gap-6">
                                <Text1>Remove Access</Text1>
                                <div onClick={()=>{
                                      if( state.permissions.removeAccess == false ){
                                  
                                        setState({
                                            permissions:{removeAccess:true,
                                            allAccess:false,
                                            edit:false,
                                            add:false,
                                            delete:false,
                                              fileUpload:false
                                          }
                                      })
                                    }else{
                                      setState({permissions :{ allAccess:true,
                                        removeAccess : false,
                                        edit:true,
                                        add:true,
                                        delete:true,
                                        fileUpload:true}})
                                      }
                                }}>
                                    {state.permissions.removeAccess ? <ToggleOnButton/> : <ToggleButton /> }</div>
                              <div onClick={handleDropDown} className="mt-[5px]"> <DropDownIcon></DropDownIcon></div>
                              </div>
                       </div>
                     </div>
                     {isActive ? 
        <div className="flex border rounded-b-md p-6 gap-12">
            <div className="flex gap-8"><Text1>EDIT</Text1>
            <div onClick={()=>{
                
            if(state.permissions.edit == false ){
                 if(state.permissions.add && state.permissions.delete && state.permissions.fileUpload){
                    setState({
                        permissions:{
                            ...state.permissions,
                            edit:true,
                            allAccess:true,
                            removeAccess:false
                        }
                    })
                 }else{
                setState({
                    permissions:{ 
                        ...state.permissions,
                        edit:true,
                        removeAccess:false
                   }
              })
            }
            }else{
              setState({permissions :{ 
                ...state.permissions,
                edit:false,
                allAccess:false,
                
              }})
              }
            }}>
                {state.permissions.edit ? <ToggleOnButton /> : <ToggleButton />}</div></div>
            <div className="flex gap-8"><Text1>ADD</Text1>  
            <div onClick={()=>{   if(state.permissions.add == false ){
              if(state.permissions.edit && state.permissions.delete && state.permissions.fileUpload){
                setState({
                    permissions:{
                        ...state.permissions,
                        add:true,
                        allAccess:true,
                        removeAccess:false
                    }
                })
              }
              else{
              setState({
                 permissions:{
                    ...state.permissions,
                    add:true,
                    removeAccess:false
                 }
            })
        }
           }else{
            setState({
          permissions:{
                   ...state.permissions,
                    add:false,
                    allAccess:false
                 }
            }
              )
            }}}>
                {state.permissions.add ? <ToggleOnButton /> : <ToggleButton />}</div></div>
            <div className="flex gap-8"><Text1>DELETE</Text1> 
            <div onClick={()=>{   if(state.permissions.delete == false){
              if(state.permissions.add && state.permissions.edit && state.permissions.allAccess){
                setState({
                    permissions:{
                        ...state.permissions,
                        delete:true,
                        allAccess:true,
                        removeAccess:false
                    }
                })
              }
              else{
              setState({
                  permissions:{
                    ...state.permissions,
                    delete:true,
                    removeAccess:false
                 }
            })
        }
           }else{
            setState({permissions :{ 
                ...state.permissions,
                delete:false,
                allAccess:false
            }})
            }}}>
                {state.permissions.delete ? <ToggleOnButton /> : <ToggleButton />}</div></div>
            <div className="flex gap-8"><Text1>FILE UPLOAD</Text1> 
            <div onClick={()=>{if(state.permissions.fileUpload == false ){
              if(state.permissions.add && state.permissions.delete && state.permissions.edit){
                setState({
                    permissions:{
                        ...state.permissions,
                        fileUpload:true,
                        allAccess:true,
                        removeAccess:false
                    }
                })
              } 
              else{
              setState({
                  permissions:{
                    ...state.permissions,
                    fileUpload:true,
                    removeAccess:false
                 }
            })
        }
           }else{
            setState({permissions :{ 
                ...state.permissions,
                fileUpload:false,
                allAccess:false
            }})
             }}}>
                {state.permissions.fileUpload ? <ToggleOnButton /> : <ToggleButton />}</div></div>
        </div> 
       : ""}
                 </div>
            </div>
        </div>
    </MainLayout>
  </>
  )
}

export default AddRoles
