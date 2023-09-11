import { useState } from "react";
import { CustomSelect, Text1 } from "../../components/atoms/field";
import Button from "../../components/atoms/button";

const AddField = () => {
  
  const initialValue = {
    fieldName: "",
    fieldType: "",
    fieldLength: "",
    invalidName: "",
    validName: "",
    validName: "",
    DataType:"",
  };
  const [inputData, setInputData] = useState([initialValue]);

  const handleAddField = () => {
    // setInputData([...inputData, initialValue]);
    console.log("test---")
  };

  const handleChange = (e, index) => {
    const data = [...inputData];
    const { name, value } = e.target;
    data[index][name] = value;
  };

  const handleSave = () => {
    setInputData([initialValue]);
    console.log(inputData);
    
  };

  return (
    <div className="h-auto overflow-y-auto px-6  flex flex-col">
      <div className=" flex flex-col items-center pb-[52px]">
        <Text1 size="2xl" className="py-2">Add Field</Text1>
        <Text1>Asset Description</Text1>
      </div>
      {inputData?.map((item, index) => {
        return (
          <>
            <div
              className=" grid grid-cols-2  gap-x-[32px] gap-y-[32px] pb-[20px]"
              key={index}>
              <div className=" flex flex-col gap-1 ">
                <label htmlFor="" className="">
                  Field Name
                </label>
                <input
                  type="text"
                  placeholder="Name Of The Asset"
                  className=" h-[48px] w-full border-2 p-1 rounded"
                  name="fieldName"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className=" justify-center items-center ">
                <CustomSelect
                  onChange={(e) => handleChange(e, index)}
                  label={"Field Type"}
                  selectHeight="h-[48px]"
                  name="fieldType">
                  <option value="">option</option>
                  <option value="Characters">Characters</option>
                </CustomSelect>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="">
                  Field Length
                </label>
                <input
                  type="number"
                  placeholder="number"
                  className="w-full h-[48px] border-2 p-1 rounded"
                  name="fieldLength"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              
              <div className="flex flex-col gap-1">
              <label htmlFor="" className="">
                Data Type
              </label>
              <input
                type="number"
                placeholder="number"
                className="w-full h-[48px] border-2 p-1 rounded"
                name="DataType"
                onChange={(e) => handleChange(e, index)}
              />
            </div>

              <div className="flex flex-col gap-1  ">
                <label htmlFor="" className="">
                  List Option
                </label>
                <input
                  type="text"
                  placeholder="Invalid Asset Name"
                  className="w-full h-[48px] border-2 p-1 rounded"
                  name="invalidName"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="flex flex-col gap-1  ">
                <label htmlFor="" className="">
                  Error Title
                </label>
                <input
                  type="text"
                  placeholder="Please Enter a Valid Asset Name"
                  className="w-full h-[48px] border-2 p-1 rounded"
                  name="validName"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="flex items-center  ">
                <div className="flex items-center h-[48px]">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    className=" h-[48px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                   
                    className="ml-2 text-sm font-body text-gray-900 dark:text-gray-300">
                    Mendatory Field ?
                  </label>
                </div>
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
          Save
        </Button>
      </div>
      
    </div>
  );
};

export default AddField;
