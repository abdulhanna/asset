import React, { useEffect, useState } from 'react'
import { PaginationLeft,PaginationRight } from '../atoms/icons'
import { Text1 } from '../atoms/field'



const Paging = ({currentPage,onPageChange,pageSize,totalDoc,end,start}) => {

    const [current,setCurent]  = useState(currentPage)

    useEffect(()=>{
      if(current){
        // console.log(current)
      }
       
    },[current])
  return (
    <div className='flex justify-between items-center text-slate-400'>
    <div className='flex items-center space-x-2'>
    <Text1>Item per page</Text1>

    <input className='w-[30px] border border-slate-500' value={current} onChange={(e)=> {
      setCurent(e.target.value)
      onPageChange((Number(e.target.value)))
    }}/>
    <Text1> {`${start}-${end} of ${totalDoc} items`}</Text1>
    </div>
    <div className='flex items-center gap-2'>
    <PaginationLeft className={'cursor-pointer'} onClick={()=>{
    
        if (current === 1 ) return 
        setCurent(current - 1)
        onPageChange(current - 1)
    }}/>
    <Text1 className='bg-primary text-white py-1 px-2 rounded-sm'>{currentPage}</Text1>
   
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

