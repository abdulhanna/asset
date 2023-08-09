import React, {useState} from 'react'

import { Nodata } from '../../../../components/atoms/icons'
import {Text1} from "../../../../components/atoms/field";
import Button from '../../../../components/atoms/button';
import DialogPage, {DialogPage1} from '../../../../components/molecules/dialog';
import AddInputDiv from '../../../testComponents/addInputDiv'

const AddInputField = ({ open, close }) => {
    return (
      <>
        <DialogPage open={open} close={close}>
          <AddInputDiv Heading="Add Group" labelName="Group Name"/>
        </DialogPage>
      </>
    );
  };

const FieldOverview = () => {
    const [inputHigh, setInputHigh] = useState(false);

    const handleAddButtonClick = () => {
        setInputHigh(true)
    }
      return (
        <>
        <div className='flex justify-between mb-4'>
         <Text1 size="2xl" weight="medium">
            Field Management
         </Text1>
         <Button onClick={handleAddButtonClick} variant="contained"> ADD FIELD GROUP</Button>
     </div>
    
          <div className='border rounded-md flex items-center justify-center h-screen bg-[#F7F7F7] overflow-hidden'>
             <div className='text-center'>
                 <Nodata className={'flex justify-center'}/>
                 <div className='mt-3'>
                   <span className='text-gray-600'> We have nothing here yet. Start by adding a Field Group. Know how?</span> 
                    
                   {/* <span className='text-blue-600 underline underline-offset-4'>Know how?</span> */}
                 </div>
             </div>
         </div>

         <AddInputField open={inputHigh} close={() => setInputHigh(false)} />
      
        </>
      )
}

export default FieldOverview