import {useState } from "react";
import Button from "../../components/atoms/button";
import {Text1} from "../../components/atoms/field";
import field from "helpers/use-api/fieldmanagment";
import { ToastContainer, toast } from 'react-toastify';

const AddInputDiv = ({Heading, labelName, getData, handleSave}) => {


  const notify = (msg) => toast.success(msg);
  const errorNotify = (msg) => toast.error(msg)

  const [inputData, setInputData] = useState([
    {
      subgroupName: ""
    }
  ]);

  const [groups, setGroups] = useState({
    subgroups:[]
  })


  const handleSubmit = async(e) => {
    setInputData([...inputData, { subgroupName: "" }]);
    setGroups({
      subgroups:[inputData]
    })
    // console.log(inputData);
    console.log(groups, "this is ggg")
  };

 
  const handleChange = (e,index)=>{
    // console.log(e.target.value,index)
    let data = [...inputData]
     data[index]['subgroupName'] = e.target.value 
     setInputData(data)
     
  }

  const handlesaveall = async(e) => {
    handleSave(inputData)
    console.log(groups, "this is ")
    try{
      const res = await field.addGroup(groups)
      console.log(res,"res data")
      notify('Added Group')
    }
    catch(err){
      console.log(err)
      errorNotify(err)
    }
  }

 
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
                  value={item.subgroupName}
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

    <ToastContainer/>
    </div>
    
  );
};

export default AddInputDiv;
