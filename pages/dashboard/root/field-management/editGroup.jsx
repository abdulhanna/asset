import React from "react";
import { useState } from "react";
import TableComp from "@/components/organism/tablecomp";
import { TextField,Text1 } from "@/components/atoms/field";
import { TrashIcon, EditIcon } from "@/components/atoms/icons";
import MainLayout from "proj-components/MainLayout";
import Button from "@/components/atoms/button";
import { useRouter } from 'next/router';


function editGroup(props) {

  const [data1, setData1] = useState("");

const router = useRouter();
  
  const HeaderGoods = [
    { label: "Field Name", name: "name" },
    { label: "Field Type", name: "types" },
    { label: "Field Length", name: "length" },
    { label: "List Option", name: "listOption" },
    { label: "Error Message", name: "error" },
    { label: "Mandatory?", name: "mandatory" },
    { label: "Action", name: "action" },
  ];

  const Headerbody = [
    {
      id: 1,
      name: "NAME OF THE ASSET",
      types: "INPUT FIELD",
      length: "30",
      listOption: "INVALID ASSET NAME",
      error: "Please enter a valid asset name",
      mandatory: "YES",
      action: ``,
    },
  ];

 const handleAddButtonClick = () => {
  router.push('/dashboard/root/field-management')
 }

  return (
    <>
  <MainLayout>
    <div className='flex justify-between mb-4'>
         <Text1 size="2xl" weight="medium">
            Edit Group
         </Text1>
         <Button onClick={handleAddButtonClick} variant="contained"> Save Changes</Button>
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
        onClick={() => setIsOpen(true)}
      />
   </MainLayout>
    </>
  );
}

export default editGroup;