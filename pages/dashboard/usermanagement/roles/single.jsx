import React,{useEffect, useState} from 'react'
import MainLayout from 'proj-components/MainLayout'
import { Accordin,AccordinRead } from '@/components/molecules/accordion'
import { Text1 } from '@/components/atoms/field'
import { ToggleButton, ToggleOnButton,LeftArrowIcon, ToggleRemoveOnButton } from '@/components/atoms/icons'
import Button from '@/components/atoms/button'
import { TextField,TextInputArea } from '@/components/atoms/field'
import { useRouter } from 'next/router'
import TableComp from '@/components/organism/tablecomp'
import { AssignedUserTable } from '@/components/organism/tablecomp'
import { doCheckAuth } from '@/utils/doCheckAuth'

const Single = ({user}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [data,setData] = useState([])
    const router=useRouter()
    const [role,setRole] = useState({
        roleName:'Jack',
        desc:'jack is workings',
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
      const header = [
        {
          label:'User Name',
          name:'name'
        },
        {
          label:'Role',
          name:'role'
        },{
          label:'User Email',
          name:'email'
        },
        {
          label:"Status",
          name:'status'
        }
      ]

      const headerbody = [
        {
          name:'jack',
          role:'admin',
          email:"jack@test.com",
          status:'Active'
        },{
          name:'john',
          role:'admin',
          email:'john@test.com',
          status:'Active'
        }
      ]

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
          
            if(data){

              console.log(data,'data')
            }
        },[data])
  return (
    <>
        <MainLayout isScroll={true} User={user}>
        <div>
            <div className='flex justify-between items-center cursor-pointer'>
                <div className='flex items-center' onClick={()=> router.back()}>
                  <LeftArrowIcon/>
                  <Text1 size='2xl'> Roles Description</Text1>
                </div>
               <div className='space-x-4'> 
               <Button variant='contained' onClick={()=> setIsEdit(!isEdit)} isDisabled={false}>EDIT</Button>
                <Button variant='danger'>DEACTIVATE</Button>
               </div>
            </div>
            <div className='mt-8 space-y-8'>
                 <div className='space-y-3'>
                    <Text1>Role Name</Text1>
                    <TextField className='w-1/4' value={role.roleName} label='Role Name' onChange={(e)=>setRole({...role,roleName:e.target.value})} disabled={!isEdit}/>
                 </div>
                 <div className='space-y-3'>
                    <Text1>Role Description</Text1>
                    <TextInputArea value={role.desc} label='Description' onChange={(e)=>setRole({...role,desc:e.target.value})} disabled={!isEdit}/>
                 </div>
                 <div>
                     <div className='flex justify-between items-center'>
                        <Text1>Role Permissions</Text1>
                        <Button onClick={()=>{
                            role.Permissions.map((item,id)=>{
                                 role.Permissions[id] = {...role.Permissions[id],removeAccess:true,read:false,readWrite:false,allAccess:false,delete:false}
                             }) 
                             setRole({...role,Permissions:role.Permissions})
                        }} isDisabled={!isEdit}>RESTORE DEFAULTS</Button>
                     </div>
                     <div>
                      {role.Permissions.map((item,index)=>{

                      return ( !isEdit ?<AccordinRead label={item.moduleName} data={item} key={index} id={index}></AccordinRead>: <Accordin label={item.moduleName} handleClick={handleClick} data={item} key={index} id={index}>
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
                          </Accordin>)
                        
                      })}
                     </div>
                    
                 </div>
                 <div>
                    <Text1  size='lg'>Assigned Users</Text1>
                    {!isEdit ?  <TableComp
                      headers={header}
                      body={headerbody}
                    />  :
                     <AssignedUserTable 
                     response={headerbody}
                       headers={[...header,{name:'action',label:'action'}]} 
                       responseData={(e)=>setData([e])}
                       onClick={(e)=> console.log(data,'dd')}
                    />}

                    {/* <AssignedUserTable 
                     response={headerbody}
                       headers={[...header,{name:'action',label:'action'}]} 
                       responseData={(e)=>setData([e])}
                       onClick={(e)=> console.log(data,'dd')}
                    /> */}
                 </div>
            </div>
        </div>
        </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
   
  const auth =await doCheckAuth(appCtx)
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };

  } else {
    return {
      props:{
         user:auth
      }
    }
  }

}


export default Single
