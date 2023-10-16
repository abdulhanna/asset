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
import authApi from 'helpers/use-api/auth'
import userRolesApi from 'helpers/use-api/user-management/roles'
import { ToastContainer, toast } from "react-toastify";


const Single = ({user,roleSingle,access_token}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [data,setData] = useState([])
    const router=useRouter()
    const [role,setRole] = useState(roleSingle.role)
    const [assignedUser,setAssignedUser] = useState(roleSingle.assignedUsers)
    const {id} = router.query
    const notify = (msg)=> toast.success(msg)

    // console.log(router.query,'ee')
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
          name:'isDeactivated'
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
        const data = [...role.permissions];
        const d = data[e.id]
       let key = Object.keys(e)[0];
     
     if (key === "removeAccess" && e[key] === true) {
       let obj = {}
           Object.entries(d).map((val,id) => {
         const [key, value] = val;
          
         if ( key === "actions" || key === 'read' || key === "readWrite"|| key === "allAccess" ) {
             console.log(key, value, 'val');
             obj[`${key}`]=false
         }
     });
     console.log(obj,'obj')
       data[e.id] = {
         ...data[e.id],
         [`${key}`]: e[key],
         ...obj
         // allAccess: false,
         // read: false,
         // readWrite: false,
         // delete: false,
         // actions:false
       };
       // console.log(obj,'ss')
     } else if (key === "allAccess" && e[key] === true) {
       let obj = {}
           Object.entries(d).map((val,id) => {
         const [key, value] = val;
         
         if ( key === "actions" || key === 'read' || key === "readWrite" ) {
             console.log(key, value, 'val');
             obj[`${key}`]=true
         }
       });
       data[e.id] = {
         ...data[e.id],
         [`${key}`]: e[key],
         removeAccess: false,
         ...obj
         // read: true,
         // readWrite: true,
         // delete: true,
         // actions:true
       };
     } else {
       let obj = {}
           Object.entries(d).map((val,id) => {
         const [key, value] = val;
         
         if ( key === "actions" || key === 'read' || key === "readWrite"|| key ==='removeAccesss' ) {
             console.log(key, value, 'val');
             obj[`${key}`]=false
         }
       });
       data[e.id] = {
         ...data[e.id],
         [`${key}`]: e[key],
         ...obj
         // removeAccess: false,
         // read: false,
         // readWrite: false,
         // delete: false,
         // actions:false
       };
     }
       setRole({
         ...role,
         permissions: data,
       });
        // const data = [...role.permissions]
        
        // let key = Object.keys(e)[0]
        
        // if(key === 'removeAccess' && e[key] === true){
        
        //   data[e.id] = {...data[e.id],[`${key}`]:e[key],allAccess:false,read:false,readWrite:false,delete:false}
        
        // }else if(key === 'allAccess' && e[key]=== true){
        
        //    data[e.id] = {...data[e.id],[`${key}`]:e[key],removeAccess:false,read:true,readWrite:true,delete:true}
        
        // }else{
        //    data[e.id] = {...data[e.id],[`${key}`]:e[key],removeAccess:false,read:false,readWrite:false,delete:false}
        // }
        
        //     setRole({
        //         ...role,Permissions:data
        //     })
        }
        
        const handleToggle = (e)=>{
          const data = [...role.permissions];
          const key = Object.keys(e)[0];
          data[e.id] = { ...data[e.id], [`${key}`]: e[key], removeAccess: false };
      
          if (data[e.id].read && data[e.id].readWrite && data[e.id].actions) {
            // console.log('allacess')
            data[e.id] = { ...data[e.id], allAccess: true };
          } else {
            data[e.id] = { ...data[e.id], allAccess: false };
          }
      
          setRole({
            ...role,
            permissions: data,
          });
        // const data = [...role.Permissions]
        // const key = Object.keys(e)[0]
        // data[e.id] = {...data[e.id],[`${key}`]:e[key],removeAccess:false}
        
        //   if(data[e.id].read && data[e.id].readWrite && data[e.id].delete){
        //     // console.log('allacess')
        //     data[e.id] = {...data[e.id],allAccess:true}
        //   }else{
        //     data[e.id] = {...data[e.id],allAccess:false}
        //   }
          
        //     setRole({
        //       ...role,Permissions:data
        //     })
        
        }

        useEffect(()=>{
          
            if(data){

              console.log(data,'data')
            }
        },[data])

        // console.log(roleSingle,'role')
        useEffect(()=>{
            // console.log(assignedUser,'role');
        },[role])

        const handleSubmit = async()=>{
              try{
                 const res = await userRolesApi.update(access_token,id,{
                  role:role,
                  assignedUser:assignedUser
                 })

                 if(res.status == "200"){
                  notify('Role updated')
                    setTimeout(()=>{
                         router.push('/dashboard/usermanagement/roles')
                    },2000)
                 }
                 console.log(res,'res')
              } catch(err){
                console.log(err,'err')
              } 
        }


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
               {isEdit ? <Button variant='contained' onClick={handleSubmit}>SAVE</Button> :<Button variant='contained' onClick={()=> setIsEdit(!isEdit)} isDisabled={false}>EDIT</Button>}
                <Button variant='danger'>DEACTIVATE</Button>
               </div>
            </div>
            <div className='mt-8 space-y-8'>
                 <div className='space-y-3'>
                    <Text1>Role Name</Text1>
                    <TextField className='w-1/4' value={role?.roleName} label='Role Name' onChange={(e)=>setRole({...role,roleName:e.target.value})} disabled={!isEdit}/>
                 </div>
                 <div className='space-y-3'>
                    <Text1>Role Description</Text1>
                    <TextInputArea value={role?.description} label='Description' onChange={(e)=>setRole({...role,description:e.target.value})} disabled={!isEdit}/>
                 </div>
                 <div>
                     <div className='flex justify-between items-center'>
                        <Text1>Role Permissions</Text1>
                        <Button onClick={()=>{
                            // role.role?.permissions?.map((item,id)=>{
                            //      role.Permissions[id] = {...role.Permissions[id],removeAccess:true,read:false,readWrite:false,allAccess:false,delete:false}
                            //  }) 
                            //  setRole({...role,Permissions:role.Permissions})
                        }} isDisabled={!isEdit}>RESTORE DEFAULTS</Button>
                     </div>
                     <div>
                      {role.permissions.map((item,index)=>{

                        return <Accordin  label={item.moduleName}
                      handleClick={handleClick}
                      data={item}
                      key={index}
                      id={index}>
                       
                 <div className="flex gap-6 items-center">
                      {Object.entries(item).map((val,id) => {
                        const [key, value] = val;
                          if ( key === "actions" || key === 'read' || key === "readWrite") {
                            return<div className="flex gap-1" key={id}> <Text1 className="capitalize" size="lg">{key}</Text1>
                                      {value  ? <ToggleOnButton onClick={()=> handleToggle({ [`${key}`]:!value,id:index })}/>:<ToggleButton onClick={()=> handleToggle({ [`${key}`]:!value,id:index })}/>}
                                  </div>
                              }
                          })}
                 </div>

                     </Accordin>   
                    })}
                     </div>
                    
                 </div>
                 <div>
                    <Text1  size='lg'>Assigned Users</Text1>
                    {!isEdit ?  <TableComp
                      headers={header}
                      body={assignedUser?.map((user)=>{
                        return {...user,
                        name:user?.userProfile?.name,
                        isDeactivated:user?.isDeactivated ? "InActive":"Active",
                        role:user.teamRoleId.roleName
                        }
                      })}
                    />  :
                     <AssignedUserTable 
                     response={assignedUser?.map((user)=>{
                      return {...user,
                        name:user?.userProfile?.name,
                        isDeactivated:user?.isDeactivated ? "InActive":"Active",
                        role:user.teamRoleId.roleName
                        }
                     })}
                       headers={[...header,{name:'action',label:'action'}]} 
                       responseData={(e)=>setData([e])}
                       onClick={(e)=> console.log(data,'dd')}
                    />}
                 </div>
            </div>
        </div>
        </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
  let access_token =
  "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
  const {id } = appCtx.query
  const auth = await authApi.WhoAmI(appCtx)

  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  } 
  let role
  try{
      const {data} = await userRolesApi.getRole(access_token,id)
      role  = data
      // console.log('role data ',data);
  }catch(err){
    console.log(err,'err')
  }
  return {
    props:{
       user:auth,
       roleSingle:role.role || [],
       access_token
    }
  }

}


export default Single
