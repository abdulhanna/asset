import {useState } from "react";
import Button from "../../components/atoms/button";

const AddInputDiv = () => {
  const [inputData, setInputData] = useState([
    {
      label: ""
    }
  ]);

  const handleSubmit = () => {
    setInputData([...inputData, { label: "" }]);
    // console.log(inputData);
  };

  const handleSave = () => {
    console.log(inputData);
  };

  const handleChange = (e,index)=>{
    // console.log(e.target.value,index)
    let data = [...inputData]
     data[index]['label'] = e.target.value 
     setInputData(data)
  }


  console.log(inputData);
  return (
    <div className="w-full flex justify-center py-[22px]">
      <div className="w-[488px] h-[308px] flex flex-col  overflow-y-auto">
        {inputData?.map((item,index) => {
          console.log(item);
          return (
            <>
              <div className="flex flex-col w-[368px] gap-1  2xl:w-[700] mx-auto py-3" key={index}>
                <label htmlFor="" className="">
                  Text Input Field
                </label>
                <input
                  type="text"
                  placeholder="input text"
                  className="w-full border-2 p-1 rounded"
                  // name="inputText"
                  // value={item.label}
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
            onClick={handleSave}
            size="sm"
            variant="contained"
            className={"font-medium"}>
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddInputDiv;
