import React from 'react'
import { PaginationLeft,PaginationRight } from '../atoms/icons'
import { Text1 } from '../atoms/field'



const Paging = ({currentPage,onPageChange,pageSize}) => {


  return (
    <div className='flex items-center gap-2'>
    <PaginationLeft className={'cursor-pointer'} onClick={()=>{
        if (currentPage === 1 ) return 
        onPageChange(currentPage - 1)
    }}/>
    <Text1 className='bg-primary text-white py-1 px-2 rounded-sm'>{currentPage}</Text1>
    {/* <Button variant='contained' size='sm'>{currentPage}</Button> */}
    <Text1 size='lg'>  <span className='text-slate-400 mx-2'>of</span>{pageSize}</Text1>
    <PaginationRight className={'cursor-pointer'} onClick={()=> onPageChange(currentPage+1)}/>
 </div>
  )
}

export default Paging

