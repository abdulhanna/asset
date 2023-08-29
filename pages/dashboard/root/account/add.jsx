import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import { Text1, TextField } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { AddIcon } from '@/components/atoms/icons'
import { CustomSelect } from '@/components/atoms/field'
import { Accordin } from '@/components/molecules/accordion'
import { ToggleButton, ToggleOnButton } from '@/components/atoms/icons'


const AddAccount = () => {
  const [state,setState] = useState({
    name: '',
    email:'',
    userId:'',
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
    const data = [...state.Permissions]
    
    let key = Object.keys(e)[0]
    
    if(key === 'removeAccess' && e[key] === true){
    
      data[e.id] = {...data[e.id],[`${key}`]:e[key],allAccess:false,read:false,readWrite:false,delete:false}
    
    }else if(key === 'allAccess' && e[key]=== true){
    
       data[e.id] = {...data[e.id],[`${key}`]:e[key],removeAccess:false,read:true,readWrite:true,delete:true}
    
    }else{
       data[e.id] = {...data[e.id],[`${key}`]:e[key],removeAccess:false,read:false,readWrite:false,delete:false}
    }
    
        setState({
            ...state,Permissions:data
        })
    }
    
    const handleToggle = (e)=>{

    const data = [...state.Permissions]
    const key = Object.keys(e)[0]
    data[e.id] = {...data[e.id],[`${key}`]:e[key],removeAccess:false}
    
      if(data[e.id].read && data[e.id].readWrite && data[e.id].delete){
        // console.log('allacess')
        data[e.id] = {...data[e.id],allAccess:true}
      }else{
        data[e.id] = {...data[e.id],allAccess:false}
      }
      
        setState({
          ...state,Permissions:data
        })
    
    }

  return (
    <div>
      <>
        <MainLayout isScroll={true}>
           <div className='space-y-8'>
               <div className='flex justify-between items-center'>
                    <Text1 size='2xl'>Add Account Manager</Text1>
                    <Button variant='contained'>SAVE</Button>
               </div>
               <div className='space-y-12'>
                  <div className='flex items-center gap-8'>
                          <div className='space-y-6'>
                          <Text1>Profile Picture</Text1>
                          <img className='w-[112px] h-[112px]' src='/images/Ellipse 2.png' width={'100'} height={'200'} alt='avtar'/>
                          </div>
                          <div className='pt-4'>
                          <Button>  
                              <div className="flex">
                                <AddIcon />
                                <span className="ms-3">ADD PHOTO</span>
                              </div> 
                          </Button>
                          </div>
                  </div>
                  <div className=''> 
                      <Text1>User Information</Text1>
                      <div className='flex gap-11'>
                        <TextField className='w-1/4' label='User Name'/>
                        <TextField className='w-1/4' label='User Identification Number'/>
                      </div>
                  </div>
                  <div className=''> 
                      <Text1>Contact Information</Text1>
                      <div className='flex gap-11'>
                        <TextField className='w-1/4' label='User Email ID'/>
                        <TextField className='w-1/4' label='User Identification Number'/>
                      </div>
                  </div>
                  <div className=''> 
                      <Text1>User Status</Text1>
                      <div className=''>
                        <CustomSelect className={'w-1/4'} label={'User Role'}>
                          <option value="">-- Select --</option>
                          <option value="active">Active</option>
                        </CustomSelect>
                      </div>
                  </div>
                  <div>
                     <div className='flex justify-between items-center'>
                     <Text1>Role Permission</Text1>
                     <Button>RESTORE DEFAULT</Button>
                     </div>
                     {state.Permissions.map((ele,index)=>{
                      return <Accordin label={ele.moduleName} handleClick={handleClick} data={ele} key ={index} id={index}>
                      <div className='flex items-center gap-6'>
                                <div className='flex items-center gap-1'>
                              
                                <Text1 size='lg'>READ</Text1>
                                {ele.read ? <ToggleOnButton onClick={()=>handleToggle({read:(!ele.read),id:index})}/> :<ToggleButton onClick={()=>handleToggle({read:(!ele.read),id:index})}/>}
                                </div>
                                <div className='flex items-center gap-1'>
                                <Text1 size='lg'>READ WRITE</Text1>
                                {ele.readWrite ? <ToggleOnButton onClick={()=>handleToggle({readWrite:(!ele.readWrite),id:index})}/> :<ToggleButton onClick={()=>handleToggle({readWrite:(!ele.readWrite),id:index})}/>}
                                </div>
                                <div className='flex items-center gap-1'>
                                <Text1 size='lg'>DELETE</Text1>
                                {ele.delete ? <ToggleOnButton onClick={()=>handleToggle({delete:(!ele.delete),id:index})}/> :<ToggleButton onClick={()=>handleToggle({delete:(!ele.delete),id:index})}/>}
                                </div>
                             </div>
                      </Accordin>
                     })}
                  </div>

               </div>
           </div>
        </MainLayout>
      </>
    </div>
  )
}

export default AddAccount
