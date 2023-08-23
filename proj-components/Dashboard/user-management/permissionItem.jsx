import React from 'react'
import Text from '@/components/atoms/field'
import { ToggleButton,ToggleOnButton } from '@/components/atoms/icons'

const PermissionToggle = ({label,status,handleClick}) => {
  return (
    <div className='bg-[#F7F7F7] px-3 py-3 max-w-[10%] min-w-[10%] flex justify-between rounded-md'>
    <Text>{label}</Text>
    {!status ? <ToggleButton onClick={()=>handleClick({label:label,status:!status})}/> : <ToggleOnButton onClick={()=> handleClick({label:label,status:!status})}/>}   
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
