import React, {useState} from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import Overview from '../../overview'
import {Text1} from "../../../../components/atoms/field";
import Button from '../../../../components/atoms/button';

const Profile = () => {
    return(
        <>
            
      {/* <div className='flex justify-between mb-4'>
      <Text1 size="2xl" weight="medium">
         All Organizations
     </Text1>
     <Button onClick={"handleAddButtonClick"} variant="contained">Add Organizations</Button>
     </div> */}
              <Overview loginRole={"root"}/>
              
       
        </>
    )
}

export default Profile