import React from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import FieldOverview from './fieldoverview'




const FieldMangment = () => {
  const handleAddButtonClick = () => {
    console.log("thhh")
  }
  return (
    <>
        <MainLayout>
               <FieldOverview/>
        </MainLayout>
    </>
  )
}

export default FieldMangment
