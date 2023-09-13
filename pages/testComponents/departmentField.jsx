import React, { useState } from 'react'
import { RadioButton } from '@/components/atoms/field'
import { Text1 } from '@/components/atoms/field'
import { CustomSelect } from '@/components/atoms/field'
import Button from '@/components/atoms/button'


  


const DepartmentField = ({Heading,labelName,getData}) => {

 const [inputData, setInputData] = useState([{
     DepartmentId: "",
     DepartmentName: "",
     ChargingType: "",  
     Status: ""
 }])

 const options = ["Automatic"  , "Manual"]
 const [selectedOption, setSelectedOption] = useState(options[0])


 const handleOptionChange = (options) => {
    setSelectedOption(options)
 }

 const handleSave = (options) => {

 }

 return (
    <>
            <div className="w-full flex justify-center py-[22px]">
                 <div className="w-[488px]  h-auto max-h-[650px] flex flex-col p-6 overflow-y-auto">         

                  {inputData?.map((item, index) => {
           return (
          <>
             <Text1 size="2xl" weight="medium" className='text-center text-primary py-2 font-medium pb-6'> {Heading}</Text1>
               <div className='py-6'>
               <RadioButton 
               label="Department ID will be Generated " 
               options={options} 
               selectedOption={selectedOption} 
               onChange={handleOptionChange} 
               className='py-2'
              />
               </div>
            <div
              className=" gap-x-[32px] gap-y-[32px] pb-[20px]"
              key={index}>
              <div className=" flex flex-col gap-1 py-2">
                <label htmlFor="" className="text-textColor">
                  Department Name
                </label>
                <input
                  type="text"
                  placeholder="Name Of Department"
                  className=" h-[48px] w-full border-2 p-2 rounded"
                  name="fieldName"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className=" justify-center items-center py-2">
                <CustomSelect
                  onChange={(e) => handleChange(e, index)}
                  label={"Charging Type"}
                  selectHeight="h-[48px]"
                  name="Charging Type">
                  <option value="Direct">Direct</option>
                  <option value="InDirect">InDirect</option>
                </CustomSelect>
              </div>

              <div className=" justify-center items-center py-2">
                <CustomSelect
                  onChange={(e) => handleChange(e, index)}
                  label={"Status "}
                  selectHeight="h-[48px]"
                  name="Status">
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </CustomSelect>
              </div>
             
            </div>
          </>
        );
                   })} 

                 <div className="flex gap-[50px] pb-6 justify-center">
                  <Button
                   onClick={handleSave}
                   size="lg"
                   variant="contained"
                   className={"w-[210px] "}>
                     Add Department
                  </Button>
                 </div>
                 </div>
            </div>
    </>
 )



}

export default DepartmentField
