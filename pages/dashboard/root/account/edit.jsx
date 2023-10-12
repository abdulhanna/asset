import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import { Accordin ,AccordinRead} from '@/components/molecules/accordion'
import { ToggleButton,ToggleOnButton,LeftArrowIcon,AddIcon } from '@/components/atoms/icons'
import { CustomSelect } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { Text1,TextField } from '@/components/atoms/field'
import authApi from 'helpers/use-api/auth'

const UpdateAccount  = ({user}) => {
    const [isEdit,setIsEdit] = useState(false)
     
    const [state,setState] = useState({
        name: 'admin',
        email:'admin@test.com',
        userId:'12345689',
        contact:983453234324,

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
    <>
        <MainLayout isScroll={true} User={user}>
        <div className='space-y-8'>
               <div className='flex justify-between items-center'>
                    <Text1 size='2xl'>Add Account Manager</Text1>
                   {!isEdit ?  <Button variant='contained' onClick={()=> setIsEdit(true)}>EDIT</Button>:<div className='space-x-4'>
                     <Button variant='contained'>save</Button> 
                     <Button variant='danger'>DEACTIVATE</Button>
                   </div>}

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
                        <TextField className='w-1/4' value={state.name} label='User Name' onChange={(e)=> setState({...state,name:e.target.value})} disabled={!isEdit}/>
                        <TextField className='w-1/4' value={state.userId} label='User Identification Number' onChange={(e)=> setState({...state,userId:e.target.value})} disabled={!isEdit}/>
                      </div>
                  </div>
                  <div className=''> 
                      <Text1>Contact Information</Text1>
                      <div className='flex gap-11'>
                        <TextField className='w-1/4' label='User Email ID' value={state.email} onChange={(e)=> setState({...state,email:e.target.value})} disabled={!isEdit}/>
                        <TextField className='w-1/4' label='Contact Number' value={state.contact} onChange={(e)=> setState({...state,contact:e.target.value})} disabled={!isEdit}/>
                      </div>
                  </div>
                  <div className=''> 
                      <Text1>User Status</Text1>
                      <div className=''>
                        <CustomSelect className={'w-1/4'} label={'User Role'} disabled={!isEdit}>
                          <option value="">-- Select --</option>
                          <option value="active">Active</option>
                        </CustomSelect>
                      </div>
                  </div>
                  <div>
                     <div className='flex justify-between items-center'>
                     <Text1>Role Permission</Text1>
                     <Button onClick={()=> alert('fsddsj')} isDisabled={!isEdit}>RESTORE DEFAULT</Button>
                     </div>
                     {state.Permissions.map((ele,index)=>{
                      return( !isEdit ? <AccordinRead label={ele.moduleName} data={ele} key={index} id={index}></AccordinRead> :<Accordin label={ele.moduleName} handleClick={handleClick} data={ele} key ={index} id={index}>
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
                      </Accordin>)
                     })}
                  </div>

               </div>
           </div>
        </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
   
  const auth =await authApi.WhoAmI(appCtx)
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props:{
       user:auth
    }
  }

}


export default UpdateAccount 
