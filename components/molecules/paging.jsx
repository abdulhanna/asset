import React, { useEffect, useState } from 'react'
import { PaginationLeft,PaginationRight } from '../atoms/icons'
import { Text1 } from '../atoms/field'
import { CustomSelect } from '../atoms/field'



const Paging = ({currentPage,onPageChange,pageSize,totalDoc,end,start,onPageSize}) => {

    const [current,setCurent]  = useState(currentPage)
   const [size,setSize] = useState(pageSize)
    useEffect(()=>{
      if(current){
        // console.log(current)
      }
       
    },[current])
  return (
    <div className='flex justify-between items-center text-slate-400'>
    <div className='flex items-center space-x-2'>
    <Text1>Item per page</Text1>
   
    <select className='p-2 border-slate-300 border-2 rounded-md' value={size} onChange={(e)=>{
      setSize(e.target.value)
      onPageSize(e)
    }}>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>
    <Text1> {`${start}-${end} of ${totalDoc} items`}</Text1>
    </div>
    <div className='flex items-center gap-2'>
    <PaginationLeft className={'cursor-pointer'} onClick={()=>{
    
        if (current === 1 ) return 
        setCurent(current - 1)
        onPageChange(current - 1)
    }}/>
    <Text1 className='bg-primary text-white py-2 px-3 rounded-md'>{currentPage}</Text1>
   
    <Text1 size='lg'>  <span className='text-slate-400 mx-2'>of</span>{pageSize}</Text1>
    <PaginationRight className={'cursor-pointer'} onClick={()=> {
      if(pageSize === current) return 
      setCurent(current +1)
      onPageChange((Number(current)+1))
    }}/>
 </div>
 </div>
  )
}

export default Paging

