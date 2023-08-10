import { useState } from "react";
import { CustomSelect } from "../../components/atoms/field";
import Button from "../../components/atoms/button";

const AddField = () => {
  const initialValue = {
    fieldName: "",
    fieldType: "",
    fieldLength: "",
    invalidName: "",
    validName: "",
    validName: "",
  };
  const [inputData, setInputData] = useState([initialValue]);

  const handleAddField = () => {
    setInputData([...inputData, initialValue]);
  };

  const handleChange = (e, index) => {
    const data = [...inputData];
    const { name, value } = e.target;
    data[index][name] = value;
    console.log(data);
  };

  const handleSave = () => {
    setInputData([...inputData, initialValue]);
    console.log(inputData);
  };

  return (
    <div className="h-[704px] overflow-y-auto  flex flex-col">
      <div className=" flex flex-col items-center pb-[52px]">
        <p className="text-base font-body">Add Field</p>
        <p className="text-sm font-normal">Asset Description</p>
      </div>
      {inputData?.map((item, index) => {
        return (
          <>
            <div
              className=" grid grid-cols-3  gap-x-[32px] gap-y-[32px] pb-[70px]"
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
                    className=" h-[48px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-body text-gray-900 dark:text-gray-300">
                    Mendatory Field ?
                  </label>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <div className="flex gap-[50px] justify-center">
        <Button
          onClick={handleAddField}
          size="sm"
          variant="primary"
          className={"font-body"}>
          + ADD ANOTHER FIELD
        </Button>

        <Button
          onClick={handleSave}
          size="sm"
          variant="contained"
          className={"w-[210px]"}>
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default AddField;
