import React, { useEffect } from "react";
import { useState } from "react";
import TableComp from "@/components/organism/tablecomp";
import { CustomSelect, TextField, Text1 } from "@/components/atoms/field";
import { TrashIcon, EditIcon } from "@/components/atoms/icons";
import DialogPage1 from "@/components/molecules/dialog";
import Button from "@/components/atoms/button";
import MainLayout from "proj-components/MainLayout";

const EditDataComp = ({ open, close, data }) => {
  // const initialValue = {
  //     name: "",
  //     fieldType: "",
  //     fieldLength: "",
  //     invalidName: "",
  //     validName: "",
  //     validName: "",
  //   };

  const [group, setGroup] = useState();

  useEffect(() => {
    if (data) {
      console.log(data, "data");
      setGroup({
        fieldName: data.fieldName,
        fieldLength: data.fieldLength,
        fieldType: data.fieldType,
        listOption: data.listOption,
        error: data.error,
        mandatory: data.mandatory,
      });
    }
  }, [data]);

  //   const [inputData, setInputData] = useState([initialValue]);

  // const handleChange = (e, index) => {
  //   const data = [...inputData];
  //   const { name, value } = e.target;
  //   data[index][name] = value;
  //   console.log(data);
  // };

  const handleChange = (e) => {
    // console.log(e.target.value)
  };
  const handleSave = () => {
    // console.log('data updated');
  };

  return (
    <>
      <DialogPage1 width="w-2/4" open={open} close={close} data={data}>
        <div className=" overflow-y-auto  flex flex-col">
          <div className=" flex flex-col items-center pb-[52px]">
            <p className="text-base font-medium">Add Field</p>
            <p className="text-sm font-normal">Asset Description</p>
          </div>

          <div className=" grid grid-cols-2  gap-x-[32px] gap-y-[32px] pb-[70px]">
            <div className=" flex flex-col gap-1 w-full ">
              <label htmlFor="" className="">
                Edit Field
              </label>
              <input
                type="text"
                placeholder="Name Of The Asset"
                className=" h-[48px] w-full border-2 p-1 rounded"
                value={group?.fieldName}
                name="fieldName"
                onChange={(e) =>
                  setGroup({ ...group, fieldName: e.target.value })
                }
              />
            </div>
            <div className=" justify-center items-center ">
              <CustomSelect
                onChange={(e) => handleChange(e, index)}
                label={"Field Type"}
                selectHeight="h-[48px]"
                defaultValue={group?.fieldType}
                name="fieldType">
                <option value="">option</option>
              </CustomSelect>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="">
                Field Length
              </label>
              <input
                type="number"
                placeholder="number"
                value={group?.fieldLength}
                className="w-full h-[48px] border-2 p-1 rounded"
                name="fieldLength"
                onChange={(e) =>
                  setGroup({ ...group, fieldLength: e.target.value })
                }
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
                name="listOption"
                value={group?.listOption}
                onChange={(e) =>
                  setGroup({ ...group, listOption: e.target.value })
                }
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
                value={group?.error}
                name="error"
                onChange={(e) => setGroup({ ...group, error: e.target.value })}
              />
            </div>
            <div className="flex items-center  ">
              <div className="flex items-center h-[48px]">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className=" h-[48px] text-blue-600 bg-gray-100 border-gray-300 rounded"
                  onChange={(e) =>
                    setGroup({ ...group, mandatory: e.target.value })
                  }
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Mendatory Field ?
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-[50px] justify-center">
            <Button
              onClick={handleSave}
              size="sm"
              variant="contained"
              className={"w-[210px]"}>
              SAVE
            </Button>
          </div>
        </div>
      </DialogPage1>
    </>
  );
};

function EditGroup(props) {
  const [data1, setData1] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const HeaderGoods = [
    { label: "Field Name", name: "fieldName" },
    { label: "Field Type", name: "fieldType" },
    { label: "Field Length", name: "fieldLength" },
    { label: "List Option", name: "listOption" },
    { label: "Error Message", name: "error" },
    { label: "Mandatory?", name: "mandatory" },
    { label: "Action", name: "action" },
  ];

  const Headerbody = [
    {
      id: 3243534671,
      fieldName: "ASSET GROUP 1",
      fieldType: "INPUT FIELD",
      fieldLength: "10",
      listOption: "INVALID ASSET NAME",
      error: "Please enter a valid asset name",
      mandatory: "YES",
      action: "action",
    },
    {
      id: 3243534671,
      fieldName: "ASSET GROUP 2",
      fieldType: "INPUT FIELD",
      fieldLength: "8",
      listOption: "INVALID ASSET NAME",
      error: "Please enter a valid input name",
      mandatory: "YES",
      action: "action",
    },
    {
      id: 3243534671,
      fieldName: "ASSET GROUP 3",
      fieldType: "INPUT FIELD",
      fieldLength: "17",
      listOption: "INVALID ASSET NAME",
      error: "Please enter a valid asset name",
      mandatory: "YES",
      action: "action",
    },
    {
      id: 3243534671,
      fieldName: "ASSET GROUP 4",
      fieldType: "INPUT FIELD",
      fieldLength: "14",
      listOption: "INVALID ASSET NAME",
      error: "Please enter a valid asset name",
      mandatory: "YES",
      action: "action",
    },
    {
      id: 3243534671,
      fieldName: "ASSET GROUP 5",
      fieldType: "INPUT FIELD",
      fieldLength: "13",
      listOption: "INVALID ASSET NAME",
      error: "Please enter a valid asset name",
      mandatory: "YES",
      action: "action",
    },
  ];

  const handleAddButtonClick = () => {
    router.push("/dashboard/root/field-management");
  };

  return (
    <>
      <MainLayout>
        <div className="flex justify-between mb-4">
          <Text1 size="2xl" weight="medium">
            Edit Group
          </Text1>
          <Button onClick={handleAddButtonClick} variant="contained">
         
            Save Changes
          </Button>
        </div>
    
        <div className="w-1/5">
       
          <TextField label={"Group Name"} placeHolder="Asset Description" />
    
        </div>
        <TableComp
          headers={HeaderGoods}
          responseData={(e) => setData1(e)}
          body={Headerbody.map((item, index) => {
            return {
              ...item,
              // href:`/${index}`
            };
          })}
          onClick={(e) => console.log(e)}
          editItem={(e) => setIsOpen(true)}
        />
        <EditDataComp
          open={isOpen}
          close={() => setIsOpen(!isOpen)}
          data={data1}
        />
      </MainLayout>
    </>
  );
}

export default EditGroup;