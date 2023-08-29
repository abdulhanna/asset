import React, { useState } from 'react'
import {Text1} from "@/components/atoms/field";
import Button from '../../../../components/atoms/button';
import DialogPage, {DialogPage1} from '../../../../components/molecules/dialog';
import AddInputDiv from '../../../testComponents/addInputDiv'
import MainLayout from 'proj-components/MainLayout';
import AddField from 'pages/testComponents/addField';
import { CloseIcon } from '@/components/atoms/icons';
import { useRouter } from 'next/router';

// Add field Modal
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
          <AddInputDiv Heading="Creat Sub Group" labelName="Sub Group Name" getData={getData} handleSave={handleSave}/>
        </DialogPage>
      </>
    );
};


const AddtextField = ({ open, close }) => {
   
  return (
    <>
      <DialogPage1 open={open} close={close} width="w-[1288px]">
        <div className="w-full text-right  pb-3 pr-8">
          <button onClick={close} >
            <CloseIcon/>
          </button>
        </div>
        <AddField />
      </DialogPage1>
    </>
  );
};



const fieldgroupdescription = () => {
  const [inputHigh, setInputHigh] = useState(false);
  const [show, setShow] = useState(true)
  const [textHigh, setTextHigh] = useState(false);

  const router = useRouter();

  const {id,name} = router.query
  
  const data = [
    {
      id: 1,
      title: 'Asset Description',
    },{
      id: 2,
      title: 'Asset Acquisition',
    },
    {
      id: 3,
      title: 'UOM',
    },
    {
      id: 4,
      title: 'Asset newsletters',
    }
  ]


  const showData = ({data}) => {
    console.log(data, "ths is fieldoverview")
 }

  const handleAddButtonClick = () => {
    setInputHigh(true)
 }
  
  const editgroup = () => {
    console.log("this is edit page")
  }

    return(
      <>
      <MainLayout>
        <div className='flex justify-between mb-4 px-2'>
         <Text1 size="2xl" weight="medium">
         {name}   
         </Text1>
          <div>
          <Button onClick={handleAddButtonClick} variant="contained" className="mr-1.5"> CREACT SUB GROUP</Button>
          <Button  onClick={() => setTextHigh(true)} className="mb-2 bg-blue-500 hover:bg-blue-600 hover:text-white px-6 py-2 mx-4 rounded transition transform hover:scale-110 ">
              ADD FIELD
           </Button>
           <Button onClick={editgroup} className="mb-2 bg-green-500 hover:border-green-500 hover:bg-green-600 hover:text-white px-6 py-2 rounded transition transform hover:scale-110 ">
            EDIT SUB-GROUP
          </Button>
          </div>
        </div>

        {data.map((component) => (
        <div key={component.id} className="flex justify-between py-4 mb-2">
           <Text1 size='lg' weight='medium'> 
             {component.title}
           </Text1>
           <div>
           <Button  onClick={() => setTextHigh(true)} className="mb-2 bg-blue-500 hover:bg-blue-600 hover:text-white px-6 py-2 mx-4 rounded transition transform hover:scale-110 ">
              ADD FIELD
           </Button>
   
        
           </div>
        </div>
      ))}
          

      <AddInputField open={inputHigh} close={() => setInputHigh(false)} showData={showData} setShow={setShow}/>  
      <AddtextField open={textHigh} close={() => setTextHigh(false)} />
      </MainLayout>
      </>
    )
}

export default fieldgroupdescription

