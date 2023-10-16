import React, { useEffect, Fragment, useRef } from "react";
import { useState } from "react";
import TableComp, { FieldActionTable } from "@/components/organism/tablecomp";
import { CustomSelect, TextField, Text1 } from "@/components/atoms/field";
import { TrashIcon, EditIcon } from "@/components/atoms/icons";
import DialogPage1 from "@/components/molecules/dialog";
import Button from "@/components/atoms/button";
import MainLayout from "proj-components/MainLayout";
import authApi from "../../../../helpers/use-api/auth";
import { LeftArrowIcon, CloseIcon } from "@/components/atoms/icons";
import { useRouter } from "next/router";
import field from "../../../../helpers/use-api/fieldmanagment";
import { ToastContainer, toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import AddField, { EditField } from "pages/testComponents/addField";



// Confirm Delete MOdal
const DeleteConfirm = ({ check, close }) => {
  console.log(check, "Delete Confirm")


  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={check} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete Sub Group
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete Sub Group? All of your defined Field will be permanently
                          removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  // onClick={() => setOpen(false)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={close}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}


// EDitComponent Component
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

// MOdal Add text field
const AddtextField = ({ open, close, id }) => {

  return (
    <>
      <DialogPage1 open={open} close={close} width="w-[1288px]">
        {/* <div className="w-full text-right  pb-3 pr-8">
          <button onClick={close} >
            <CloseIcon />
          </button>
        </div> */}
        <EditField close={close} id={id} />
      </DialogPage1>
    </>
  );
};


// EDitGRoup Main Component
function EditGroup({ user, access_token, groupOverview }) {
  const [data1, setData1] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOPen, setDeleteOpen] = useState(false);
  const [editGroup, setEditgroup] = useState(groupOverview)
  const [checkedNewData, setCheckedNewData] = useState([]);
  const [allClick, setAllClick] = useState(false)
  const [inputHigh, setInputHigh] = useState(false);
  const [textHigh, setTextHigh] = useState(false);
  const [fieldData, setFieldData] = useState('');


  console.log(editGroup, "this is group")
  const router = useRouter();

  const notify = (msg) => toast.success(msg)
  const error = (msg) => toast.danger(msg)

  const { id } = router.query

  const HeaderGoods = [
    { label: "Field Name", name: "name" },
    { label: "Data Type", name: "dataType" },
    { label: "Field Length", name: "fieldLength" },
    // // { label: "List Option", name: "listOptions" },
    // { label: "Error Message", name: "errorMessage" },
    { label: "Field Type?", name: "fieldType" },
    { label: "Field Relation", name: "fieldRelation" },
    // { label: "Dependent Field", name: "dependentFieldId" },
    { label: "IS Mandatory", name: "isMandatory" },
    // { label: "Field Info", name: "fieldInfo" },
    { label: "action", name: "action" }
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



  const handleAddButtonClick = async () => {
    // router.push("/dashboard/root/field-management");
    try {
      const res = await field.updateGroup(access_token, id, editGroup)
      notify("Added Successfully")
      setTimeout(() => {
        router.reload()
      }, 1000)
      console.log(res, "this is res")
    } catch (err) {
      console.log(err, "this is err in updateGroup")
    }

    console.log(editGroup, "this is group")
  };


  const handleFormChangeGroup = (e) => {
    setEditgroup({ ...editGroup, [e.target.name]: e.target.value })

  }

  // const handleFormChangeSubgroup = (index, e) => {
  //   let data = { ...editGroup.subgroups }
  //   const { name, value } = e.target
  //   console.log(name, value, "this is value")
  //   data[index][e.target.name] = [e.target.value]
  //   // setEditgroup({ ...editGroup, subgroupName: data })
  //   console.log(data, "this is data")
  // }

  const handleFormChangeSubgroup = (index, e) => {
    const { name, value } = e.target;
    setEditgroup(prevEditGroup => {
      const updatedSubgroups = [...prevEditGroup.subgroups];
      updatedSubgroups[index][name] = value;
      return { ...prevEditGroup, subgroups: updatedSubgroups };
    });

  };

  const Delete = () => {
    setDeleteOpen(!deleteOPen)
    console.log(deleteOPen, "this is a delete")
  }

  const clickAll = (e) => {

    // setAllClick(!allClick)
  }


  const edit = (e) => {
    setFieldData(e)
    setTextHigh(true)
  }


  console.log(fieldData, "this is a field")



  useEffect(() => {
    if (allClick === true) {
      setCheckedNewData(data)
    } else {
      setCheckedNewData([])
    }
  }, [allClick])


  return (
    <>
      <MainLayout User={user} isScroll={true}>
        <div className="flex justify-between items-center px-2  mb-4 ">
          <div className="flex items-center cursor-pointer space-x-2"
            onClick={() => router.back()}>
            <LeftArrowIcon />
            <Text1 size="2xl" weight="medium" >
              Edit Group
            </Text1>
          </div>
          <div>
            <Button onClick={handleAddButtonClick} variant="contained">
              Save Changes
            </Button>
          </div>
        </div>


        <div className="px-4">
          <div className="w-1/5">

            <TextField label={"Group Name"} onChange={e => handleFormChangeGroup(e)} placeHolder="Asset Description" value={editGroup.groupName} name="groupName" />

          </div>
          <Text1 size="lg" weight="medium" className="my-4">
            Sub Groups
          </Text1>
          {
            editGroup?.subgroups?.map((group, index) => {
              return (
                <>
                  <div key={index}>
                    <div className=" flex justify-between items-center ">
                      <TextField onChange={e => handleFormChangeSubgroup(index, e)} label={"Sub Group Name"} placeHolder="Sub Group Name " name="subgroupName" value={group?.subgroupName} />
                      <Button onClick={Delete} variant='danger' className="mb-2 h-10 mt-3  bg-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white px-3 py-2 rounded transition transform  ">
                        DELETE SUB-GROUP
                      </Button>
                    </div>
                    {group?.fields.length === 0 ? <>
                      <div className="p-3 text-primary">Field not included </div>
                    </> : <>

                      <FieldActionTable
                        headers={[{ name: 'check', label: '' }, ...HeaderGoods]}
                        response={group?.fields?.map((item, index) => {
                          return {
                            ...item,
                            isMandatory: item.isMandatory ? "Yes" : "NO",
                            // href:`/${index}`
                          };
                        })}
                        responseData={(e) => setData1(e)}
                        checkedData={checkedNewData}
                        clickAll={clickAll}
                        onClick={(e) => console.log(e)}
                        checkAllStatus={allClick}
                        onDelete={(e) => console.log(e, "DEleted")}
                        onEdit={edit}
                      />
                      {/* <TableComp
                        headers={HeaderGoods}
                        responseData={(e) => setData1(e)}
                        body={group?.fields?.map((item, index) => {
                          return {
                            ...item,
                            action: "action",
                            isMandatory: true ? "Yes" : "NO",
                            // href:`/${index}`
                          };
                        })}
                        onClick={(e) => console.log(e)}
                        editItem={(e) => setIsOpen(true)}
                      /> */}
                    </>}

                  </div>
                </>
              )
            })
          }


          {/*<TableComp*/}
          {/*    headers={HeaderGoods}*/}
          {/*    responseData={(e) => setData1(e)}*/}
          {/*    body={Headerbody.map((item, index) => {*/}
          {/*      return {*/}
          {/*        ...item,*/}
          {/*        // href:`/${index}`*/}
          {/*      };*/}
          {/*    })}*/}
          {/*    onClick={(e) => console.log(e)}*/}
          {/*    editItem={(e) => setIsOpen(true)}*/}
          {/*/>*/}
        </div>
        <AddtextField open={textHigh} close={() => setTextHigh(false)} id={fieldData} />
        <EditDataComp
          open={isOpen}
          close={() => setIsOpen(!isOpen)}
          data={data1}
        />

        <DeleteConfirm
          check={deleteOPen}
          close={() => setDeleteOpen(!deleteOPen)}
        />

      </MainLayout>

      <ToastContainer />
    </>
  );
}

export const getServerSideProps = async (appCtx) => {
  let access_token = 'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;
  const auth = await authApi.WhoAmI(appCtx)

  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  let groupOverview;
  let id = appCtx.query.id

  try {
    const res = await field.getSubgroupsbyId(access_token, id)
    groupOverview = res?.data
    console.log(res?.data, "this is data")

  } catch (err) {
    console.log(err, "This is error")
  }



  return {
    props: {
      user: auth,
      access_token,
      groupOverview: groupOverview || []
    }
  }
}

export default EditGroup;