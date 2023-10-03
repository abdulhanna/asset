import React from 'react'
import Text from '@/components/atoms/field'
import { ToggleButton,ToggleOnButton } from '@/components/atoms/icons'

const PermissionToggle = ({label,status,handleClick,value}) => {
  // console.log(value,'value')
  return (
    <div className='bg-[#F7F7F7] px-3 py-3 max-w-[10%] min-w-[10%] flex justify-between rounded-md'>
    <Text>{label}</Text>
    {!status ? <ToggleButton value={value} onClick={()=>handleClick({label:label,status:!status,name:value})}/>
     : <ToggleOnButton value={value} onClick={()=> handleClick({label:label,status:!status,name:value})}/>}   
   </div>
  )
}

export const PermissionToggleRead = ({label,status,handleClick}) => {
    return (
      <div className='bg-[#F7F7F7] px-3 py-3 max-w-[10%] min-w-[10%] flex justify-between rounded-md'>
      <Text>{label}</Text>
      {!status ? <ToggleButton /> : <ToggleOnButton />}   
     </div>
    )
  }

export default PermissionToggle
