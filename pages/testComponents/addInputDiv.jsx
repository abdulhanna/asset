import {useState } from "react";
import Button from "../../components/atoms/button";
import {Text1} from "../../components/atoms/field";

const AddInputDiv = ({Heading, labelName, getData, handleSave}) => {
  const [inputData, setInputData] = useState([
    {
      label: ""
    }
  ]);

  const handleSubmit = () => {
    setInputData([...inputData, { label: "" }]);
  
    // console.log(inputData);
  };

 

  const handleChange = (e,index)=>{
    // console.log(e.target.value,index)
    let data = [...inputData]
     data[index]['label'] = e.target.value 
     setInputData(data)
     
  }

  const handlesaveall = () => {
    handleSave(inputData)
  }


  console.log(inputData);
  return (
    <div className="w-full flex justify-center py-[22px]">
      <div className="w-[488px]  h-auto max-h-[550px] flex flex-col items-center overflow-y-auto">
        <Text1 size="2xl" weight="medium"> {Heading}</Text1>
        {inputData?.map((item,index) => {
          console.log(item);
          return (
            <>
              <div className="flex flex-col w-[368px] gap-1  2xl:w-[700] mx-auto py-3" key={index}>
                <label htmlFor="" className="">
                <Text1 size="xs"> {labelName}</Text1>
                </label>
                <input
                  type="text"
                  placeholder="Add Description"
                  className="w-full border-2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  name="inputText"
                  value={item.label}
                  onChange={(e) => handleChange(e,index)}
                />
              </div>
            </>
          );
        })}
         <div className="w-[368px] mx-auto">
          <button
            type="button"
            onClick={handleSubmit}
            className="text-[16px] font-[500] text-[#3B5FDA] ">
            + Add Another Group
          </button>
        </div>
        <div className="mx-auto py-[30px]">
          <Button
            onClick={handlesaveall}
            size="sm"
            variant="contained"
            className={"font-body px-8"}>
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddInputDiv;
