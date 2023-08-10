import React from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import FieldOverview from './fieldoverview'
import Groupview from './groupview'




const FieldMangment = () => {
  const handleAddButtonClick = () => {
    console.log("thhh")
  }
  return (
    <>
        <MainLayout>
                <FieldOverview/>
                <Groupview/>
        </MainLayout>
    </>
  )
}

export default FieldMangment
