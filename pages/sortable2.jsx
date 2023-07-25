import React from 'react'
// import Tree from '../components/content/sortable'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/content/sortable'),
  { ssr: false })


const Page = () => {
  return (
    <div>
     <DynamicComponentWithNoSSR/> 
    </div>
  )
}

export default Page
