import React, { useState } from 'react'
import { RadioButton } from '@/components/atoms/field'
import { Text1 } from '@/components/atoms/field'



// DEpartment Id   ---Automatic Manual 
// Department Name   -Text
// Charging Type   ---Dropdown
// Status          ---Dropdown


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

 return (
    <>
            <div className="w-full flex justify-center py-[22px]">
                 <div className="w-[488px]  h-auto max-h-[550px] flex flex-col p-2 overflow-y-auto">
                 <Text1 size="2xl" weight="medium" className='text-center text-primary py-2 font-medium pb-6'> {Heading}</Text1>
                 <RadioButton 
               label="Department ID will be Generated " 
               options={options} 
               selectedOption={selectedOption} 
               onChange={handleOptionChange} 
              />
                  </div>
            </div>
    </>
 )



}

export default DepartmentField
