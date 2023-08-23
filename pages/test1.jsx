import React, { useEffect, useState } from 'react'
import { Accordin } from '@/components/molecules/accordion'
import { ToggleButton,ToggleOnButton } from '@/components/atoms/icons'
import Text, { TextField } from '@/components/atoms/field'
import { ActionCheckTable } from '@/components/molecules/table'
import { UserTableNew } from 'proj-components/Dashboard/user-management/table'
import { SampleTableNew } from '@/components/organism/tablecomp'
import { AssignedUserTable } from '@/components/organism/tablecomp'
import { TrashOutline } from '@/components/atoms/icons'
import Button from '@/components/atoms/button'
import PermissionToggle from 'proj-components/Dashboard/user-management/permissionItem'

const Test1 = () => {
  const [checkedNewData, setCheckedNewData] = useState([])
  const [allClick, setAllClick] = useState(false)
  const [data1,setData1] = useState()
  const [view,setView] = useState(false)
  const header = [
    {
      label:"Role Name",
      name:'roleName',
    },
    {
      label:"Status",
      name:"status"
    },
    {
      label: "Created On",
      name:'created_on'
    },{
      label :"Permission",
      name:'permission'
    }
    // {
    //   label :"Action",
    //   name:'action'
    // }
  ]
  const headerData = [
    { label: 'User Identification no',name:'uno'},
    {label:'User Name', name:'user'},
    {label:'User Role', name:'role'},
    {label:'Branch', name:'branch'},
    {label:'Email Id', name:'email'},
    {label:'Contact No', name:'contact'},
    {label:'Status',name:'status'}, 
    {label:'created on', name:'created'}
  ]

  const data = [{
    _id:3245,
    roleName: 'Admin',
    status:'Active' ,
    created_on : '1/12/22',
    Permission:[{
      permissionId: 67890,
    }]
    // action0: "on",
    // action1:'off'
  }]
    const [role,setRole] = useState({
        roleName:'',
        Permissions:[
            {
                moduleName:"organisation Mangament",
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
        console.log(role,'d')
    },[role])


    const clickAll = (e)=>{
      setAllClick(!allClick)
    }

    useEffect(()=>{
      if(allClick === true){
        setCheckedNewData(data)
      }else {
        setCheckedNewData([])
      }
     },[allClick])

    const onNewCheck=(data)=>{
      console.log(data,'data')
      const exist = checkedNewData.find(
          (element) => element._id === data._id
      );
      console.log(exist,'exit')
      if (exist) {
        setCheckedNewData(
            checkedNewData.filter((single) => single._id !== data._id)
        );
      } else {
        setCheckedNewData([...checkedNewData, data]);
      }
    }

    useEffect(()=>{
      // console.log(data1,'data1')
    },[data1])

  return (
    <div className='p-8'>
      <p>this is test1</p>
      <Button onClick={()=>{
        const data = [role.Permissions]
        role.Permissions.map((item,id)=>{
     role.Permissions[id] = {...role.Permissions[id],removeAccess:true,read:false,readWrite:false,allAccess:false,delete:false}
        })
       
        setRole({...role,Permissions:role.Permissions})
      }}>Restore default</Button>
       {role.Permissions.map((item,index)=>{
          return (<>
          
            <Accordin label={item.moduleName} data={item} handleClick={handleClick} key={index} id={index}>
              <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-1'>
                   <Text size='lg'>READ</Text>
                   {item.read ? <ToggleOnButton onClick={()=>handleToggle({read:(!item.read),id:index})}/> :<ToggleButton onClick={()=>handleToggle({read:(!item.read),id:index})}/>}
                  </div>
                  <div className='flex items-center gap-1'>
                   <Text size='lg'>READ WRITE</Text>
                   {item.readWrite ? <ToggleOnButton onClick={()=>handleToggle({readWrite:(!item.readWrite),id:index})}/> :<ToggleButton onClick={()=>handleToggle({readWrite:(!item.readWrite),id:index})}/>}
                  </div>
                  <div className='flex items-center gap-1'>
                   <Text size='lg'>DELETE</Text>
                   {item.delete ? <ToggleOnButton onClick={()=>handleToggle({delete:(!item.delete),id:index})}/> :<ToggleButton onClick={()=>handleToggle({delete:(!item.delete),id:index})}/>}
                  </div>
              </div>
            </Accordin>
          </>)
       })}

       <div>
       {/* <UserTableNew
        response={data}
          headerData={[{ name: 'check', label:'' },...header]}
          checkedData={checkedNewData}
          responseData={(e) => onNewCheck(e)}
          //  href={`/dashboard/root/organisation/organizationprofile?`}
           clickAll={clickAll}
           onClick={(e)=> console.log(e,'onclick') }
           checkAllStatus={allClick}
       /> */}
       <SampleTableNew
        response={data}
        headerData={[{name:'check',label:''},...header]} 
        checkedData={checkedNewData}
          responseData={(e) => onNewCheck(e)}
           href={`/dashboard/root/organisation/organizationprofile?`}
           clickAll={clickAll}
           onClick={(e)=> console.log(e,'onclick') }
           checkAllStatus={allClick} 
       />

       <div>
        <AssignedUserTable
        response={data}
          headers={[...header,{name:'action',label:'action'}]}
          responseData={(e)=>setData1(e)}
          onClick={(e)=> console.log(data1,'dd')}
        />
       </div>

       {/* <div className='bg-slate-200 px-3 py-3 max-w-[10%] flex justify-between'>
        <Text> upload</Text>
        {!view ? <ToggleButton/> : <ToggleOnButton/>}   
       </div> */}
       <PermissionToggle label={'download'} status={view} handleClick={(e)=> setView(!view)}/>
       <TextField type='checkbox'/>
       </div>
    </div>
  )
}

export default Test1

