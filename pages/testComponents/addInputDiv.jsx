import { useState } from "react";
import Button from "../../components/atoms/button";
import { Text1 } from "../../components/atoms/field";
import Chechkbox from "../../components/atoms/checkBox";

const AddInputDiv = ({ Heading, labelName, getData, handleSave }) => {
  const [inputData, setInputData] = useState({
    groupDetails: [{
      groupName: "",
      isMandatory: false
    }]
  });

  const handleSubmit = () => {
    setInputData({
      ...inputData,
      groupDetails: [...inputData.groupDetails, { groupName: "", isMandatory: false }]
    });
  };

  console.log(inputData, "tis is data")

  const handleChange = (e, index) => {
    let data = [...inputData.groupDetails];
    if (e.target.type === "checkbox") {
      data[index] = {
        ...data[index],
        isMandatory: e.target.checked || false
      };
    } else {
      if (e.target.name === "groupName") {
        data[index] = {
          ...data[index],
          [e.target.name]: e.target.value
        };
      }
      if (e.target.name === "isMandatory") {
        data[index] = {
          ...data[index],
          isMandatory: false
        };
      }
    }
    setInputData({
      ...inputData,
      groupDetails: data,
    });
  }



  const handlesaveall = () => {
    handleSave(inputData)
  }

  console.log(inputData, "this");
  return (
    <div className="w-full flex justify-center py-[22px]">
      <div className="w-[488px]  h-auto max-h-[550px] flex flex-col items-center overflow-y-auto">
        <Text1 size="2xl" weight="medium" className="py-3"> {Heading}</Text1>
        {inputData?.groupDetails?.map((item, index) => {
          return (
            <div className="flex-col w-[450px] gap-2  2xl:w-[700] mx-auto py-1" key={index}>
              <div className="grid grid-cols-2  align-bottom">
                <div className="px-1">
                  <label htmlFor="" className="">
                    <Text1 size="xs"> {labelName}</Text1>
                  </label>
                  <input
                    type="text"
                    placeholder="Add Description"
                    className="w-full border-2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    name="groupName"
                    value={item.groupName}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="my-7 mx-1">
                  <label>
                    <input
                      type="checkbox"
                      checked={item.isMandatory}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <span className="px-1">{"Mark as Mandatory Group?"}</span>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
        <div className="w-[450px] ">
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

export const AddSubGroupInput = ({ Heading, labelName, getData, handleSave }) => {
  const [inputData, setInputData] = useState({
    subgroups: [{
      subgroupName: "",
      isMandatory: false
    }]
  });

  const handleSubmit = () => {
    setInputData({
      ...inputData,
      subgroups: [...inputData.subgroups, { subgroupName: "", isMandatory: false }]
    });
  };

  console.log(inputData, "tis is data")

  const handleChange = (e, index) => {
    let data = [...inputData.subgroups];
    if (e.target.type === "checkbox") {
      data[index] = {
        ...data[index],
        isMandatory: e.target.checked || false
      };
    } else {
      if (e.target.name === "subgroupName") {
        data[index] = {
          ...data[index],
          [e.target.name]: e.target.value
        };
      }
      if (e.target.name === "isMandatory") {
        data[index] = {
          ...data[index],
          isMandatory: false
        };
      }
    }
    setInputData({
      ...inputData,
      subgroups: data,
    });
  }



  const handlesaveall = () => {
    handleSave(inputData)
  }

  console.log(inputData, "this");
  return (
    <div className="w-full flex justify-center py-[22px]">
      <div className="w-[488px]  h-auto max-h-[550px] flex flex-col items-center overflow-y-auto">
        <Text1 size="2xl" weight="medium" className="py-3"> {Heading}</Text1>
        {inputData?.subgroups?.map((item, index) => {
          return (
            <div className="flex-col w-[450px] gap-2  2xl:w-[700] mx-auto py-1" key={index}>
              <div className="grid grid-cols-2  align-bottom">
                <div className="px-1">
                  <label htmlFor="" className="">
                    <Text1 size="xs"> {labelName}</Text1>
                  </label>
                  <input
                    type="text"
                    placeholder="Add Description"
                    className="w-full border-2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    name="subgroupName"
                    value={item.subgroupName}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="my-7 mx-1">
                  <label>
                    <input
                      type="checkbox"
                      checked={item.isMandatory}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <span className="px-1">{"Mark as Mandatory Group?"}</span>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
        <div className="w-[450px] ">
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




export const AddStep = ({ Heading, getData, subheading, handleSave }) => {
  const [inputData, setInputData] = useState({
    stepNo: 2,
    stepName: "Step 2",
    groups: [
      { groupId: '', orderNo: '' }
    ]
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    let groups = [...inputData.groups];
    groups[index] = { ...groups[index], [name]: value };
    setInputData({ ...inputData, groups });
  }

  const handleAddGroup = () => {
    setInputData({
      ...inputData,
      groups: [...inputData.groups, { groupId: '', orderNo: '' }]
    });
  };

  const handlesaveall = () => {
    const formattedData = {
      stepNo: inputData.stepNo,
      stepName: inputData.stepName,
      groups: inputData.groups.filter(group => group.groupId && group.orderNo)
    };
    handleSave(formattedData);
  }

  return (
    <div className="w-full flex justify-center py-[22px]">
      <div className="w-[700px] h-auto max-h-[550px] flex flex-col items-center overflow-y-auto">
        <Text1 size="2xl" weight="medium" className="py-3"> {Heading}</Text1>

        <div className="flex-col w-[680px] gap-2 2xl:w-[700] mx-auto py-1">
          <div className="grid grid-cols-2 align-bottom">
            <div className="px-1">
              <label htmlFor="" className="">
                <Text1 size="xs" className="text-slate-500 font-normal">Step No. </Text1>
              </label>
              <input
                type="number"
                placeholder="Step No."
                className="w-full mt-1 border-2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                name="stepNo"
                value={inputData.stepNo}
                onChange={(e) => setInputData({ ...inputData, stepNo: e.target.value })}
              />
            </div>
            <div className="px-1">
              <label htmlFor="" className="">
                <Text1 size="xs" className="text-slate-500 font-normal"> Step Name </Text1>
              </label>
              <input
                type="text"
                placeholder="Step Name"
                className="w-full mt-1 border-2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                name="stepName"
                value={inputData.stepName}
                onChange={(e) => setInputData({ ...inputData, stepName: e.target.value })}
              />
            </div>
          </div>
        </div>

        <Text1 size="2xl" weight="medium" className="py-3"> {subheading}</Text1>

        {inputData.groups.map((group, index) => (
          <div className="flex-col w-[680px] gap-2 2xl:w-[700] mx-auto py-1" key={index}>
            <div className="grid grid-cols-2 align-bottom">
              <div className="px-1">
                <label htmlFor="" className="">
                  <Text1 size="xs" className="text-slate-500 font-normal">Group ID </Text1>
                </label>
                <input
                  type="text"
                  placeholder="Group ID"
                  className="w-full mt-1 border-2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  name="groupId"
                  value={group.groupId}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="px-1">
                <label htmlFor="" className="">
                  <Text1 size="xs" className="text-slate-500 font-normal"> Order No. </Text1>
                </label>
                <input
                  type="number"
                  placeholder="Order No."
                  className="w-full mt-1 border-2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  name="orderNo"
                  value={group.orderNo}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="w-[680px] ">
          <button
            type="button"
            onClick={handleAddGroup}
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
