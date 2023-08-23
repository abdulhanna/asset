import React from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import FieldOverview from './fieldoverview'
import SubGroupview from './subgroupview'
import Fieldgroupdescription from './fieldgroupdescription'




const FieldMangment = () => {
  const handleAddButtonClick = () => {
    console.log("thhh")
  }
  return (
    <>
        <MainLayout>
                <FieldOverview/>
                <SubGroupview/>
        </MainLayout>
    </>
  )
}

export default FieldMangment
