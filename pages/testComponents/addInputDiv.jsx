import { useEffect, useState } from "react";

const AddInputDiv = () => {
  const [inputData, setInputData] = useState([
    {
      id: Date.now().toString(),
      inputText: "",
    },
  ]);
  const [data, setData] = useState();

  const handleSubmit = () => {
    setInputData([...inputData, { id: Date.now().toString(), inputText: "" }]);
    console.log(inputData);
  };

  const onChange = (e) => {
    e.preventDefault();
    setData({ ...inputData, [e.target.name]: e.target.value });
    console.log(data);
  };

  return (
    <div className=" flex flex-col justify-center p-[50px]">
      {inputData?.map((item) => {
        return (
          <>
            {/* <p>{item.inputText}</p> */}
            <div className="flex flex-col gap-1 w-[488px] 2xl:w-[700] mx-auto py-3">
              <label htmlFor="" className="">
                Text Input Field {item.id}
              </label>
              <input
                type="text"
                placeholder="input text"
                className="w-full border-2 p-1 rounded"
                name="inputText"
                onChange={(e) => onChange(e)}
              />
            </div>
          </>
        );
      })}
      <div className="flex gap-[50px] justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="text-[16px] font-[500] text-[#3B5FDA] ">
          + Add Another Group
        </button>
      </div>
    </div>
  );
};

export default AddInputDiv;
