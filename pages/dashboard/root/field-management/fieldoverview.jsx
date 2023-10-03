import React, {useState} from 'react'

import { Nodata } from '../../../../components/atoms/icons'
import {Text1} from "@/components/atoms/field";
import Button from '../../../../components/atoms/button';
import DialogPage, {DialogPage1} from '../../../../components/molecules/dialog';
import AddInputDiv from '../../../testComponents/addInputDiv'
import Groupview from './subgroupview';


// AddInput Pop UP ------------------------------------------------------------------------------------------------
const AddInputField = ({ open, close, showData, setShow }) => {

  const getData = ({data}) => {
    
    console.log(data,"yes this dta")
  }

  const handleSave = (data) => {
  
     showData(data)
     setShow(true)
     close()
  };
    return (
      <>
        <DialogPage open={open} close={close}>
          <AddInputDiv Heading="Add Group" labelName="Group Name" getData={getData} handleSave={handleSave}/>
        </DialogPage>
      </>
    );
  };


// FeildOverview Page-----------------------------------------------------------------------------------------------
const FieldOverview = () => {
    const [inputHigh, setInputHigh] = useState(false);
    const [dataList,setDataList] = useState(["Assest Description","Asset Acquisition","UOM"])
    const [show, setShow] = useState(true)
  

    const handleAddButtonClick = () => {
        setInputHigh(true)
    }

    const showData = ({data}) => {
       console.log(data, "ths is fieldoverview")
    }

    const addfield = () => {
        
    }

    const editGroup = () => {

    }

      return (
        <>
        <div className='flex justify-between mb-4 px-2'>
         <Text1 size="2xl" weight="medium">
            Field Management
         </Text1>
         <Button onClick={handleAddButtonClick} variant="contained"> ADD FIELD GROUP</Button>
        </div>

        {/* {
          show ? <Groupview/> : <div className='border rounded-md flex items-center h-[100vh] justify-center bg-[#F7F7F7] overflow-hidden'>
          <div className='text-center'>
              <Nodata className={'flex justify-center'}/>
              <div className='mt-3'>
                <span className='text-gray-600'> We have nothing here yet. Start by adding a Field Group. Know how?</span> 
                 
                <span className='text-blue-600 underline underline-offset-4'>Know how?</span>
              </div>
          </div>
      </div>
        } */}
    

         <AddInputField open={inputHigh} close={() => setInputHigh(false)} showData={showData} setShow={setShow}/>
      
        </>
      )
}

export default FieldOverview