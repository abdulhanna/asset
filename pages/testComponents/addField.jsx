import { useState } from "react";
import { CustomSelect, Text1 } from "../../components/atoms/field";
import Button from "../../components/atoms/button";

import { useRouter } from "next/router";
import field from "helpers/use-api/fieldmanagment";
import { ToastContainer, toast } from 'react-toastify';

const AddField = ({ user, access_token, close, id }) => {


  const initialValue = {
    name: "",
    dataType: "",
    fieldType: "",
    fieldLength: "",
    fieldRelation: "",
    errorMessage: "",
    fieldInfo: "",
    isMandatory: true,

  };

  const [fields, setFields] = useState([initialValue]);
  const notify = (msg) => toast.success(msg)
  const error = (msg) => toast.danger(msg)



  const router = useRouter();



  const handleAddField = () => {

    console.log("test---")
  };

  const handleChange = (e, index) => {
    const data = [...fields];
    const { name, value } = e.target;
    data[index][name] = value;
  };

  const handleSave = async () => {
    setFields([initialValue]);

    let object = {
      fields
    }

    try {
      const res = await field.addField(access_token, id, object)
      if (res.status === 200) {
        notify("Added Successfully")
        close()
        setTimeout(() => {
          router.reload()
        }, 1000)
      }


    } catch (e) {
      console.log("This is an error");
    }

    console.log(object);


  };

  return (
    <div className="h-auto overflow-y-auto px-6  flex flex-col">
      <div className=" flex flex-col items-center pb-[52px]">
        <Text1 size="2xl" className="py-2">Add Field</Text1>
        <Text1>Asset Description</Text1>
      </div>
      {fields?.map((item, index) => {
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
                  name="name"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className=" justify-center items-center ">
                <CustomSelect
                  onChange={(e) => handleChange(e, index)}
                  label={"Data Type"}
                  selectHeight="h-[48px]"
                  name="dataType">
                  <option value="">option</option>
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Characters">List</option>
                  <option value="Date">Date</option>
                </CustomSelect>

              </div>
              <div className=" justify-center items-center ">
                <CustomSelect
                  onChange={(e) => handleChange(e, index)}
                  label={"Field Type"}
                  selectHeight="h-[48px]"
                  name="fieldType">
                  <option value="">option</option>
                  <option value="Input text">Input text</option>
                  <option value="Input number">Input number</option>
                  <option value="Dropdown">Dropdown</option>
                  <option value="Textarea">Textarea</option>

                  Textarea
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

              <div className=" justify-center items-center ">
                <CustomSelect
                  onChange={(e) => handleChange(e, index)}
                  label={"Field Relation"}
                  selectHeight="h-[48px]"
                  name="fieldRelation">
                  <option value="">option</option>
                  <option value="Dependent">Dependent</option>
                  <option value="InDependent">InDependent</option>

                </CustomSelect>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="">
                  Error message
                </label>
                <input
                  type="text"
                  placeholder="Error message"
                  className="w-full h-[48px] border-2 p-1 rounded"
                  name="errorMessage"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="">
                  Field Info
                </label>
                <input
                  type="text"
                  placeholder="Help text"
                  className="w-full h-[48px] border-2 p-1 rounded"
                  name="fieldInfo"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>


              <div className="flex items-center  ">
                <div className="flex items-center h-[48px]">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    name="isMandatory"
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
      <ToastContainer />
    </div>
  );
};


export const EditField = ({ user, access_token, close, id }) => {


  const initialValue = {
    name: "",
    dataType: "",
    fieldType: "",
    fieldLength: "",
    fieldRelation: "",
    errorMessage: "",
    fieldInfo: "",
    isMandatory: true,

  };

  const [fields, setFields] = useState([initialValue]);
  const notify = (msg) => toast.success(msg)
  const error = (msg) => toast.danger(msg)



  const router = useRouter();



  const handleAddField = () => {

    console.log("test---")
  };

  const handleChange = (e, index) => {
    const data = [...fields];
    const { name, value } = e.target;
    data[index][name] = value;
  };

  const handleSave = async () => {
    setFields([initialValue]);

    let object = {
      fields
    }

    try {
      const res = await field.addField(access_token, id, object)
      if (res.status === 200) {
        notify("Added Successfully")
        close()
        setTimeout(() => {
          router.reload()
        }, 1000)
      }


    } catch (e) {
      console.log("This is an error");
    }

    console.log(object);


  };

  return (
    <div className="h-auto overflow-y-auto px-6  flex flex-col">
      <div className=" flex flex-col items-center pb-[52px]">
        <Text1 size="2xl" className="py-2">Add Field</Text1>
        <Text1>Asset Description</Text1>
      </div>
      {fields?.map((item, index) => {
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
                  name="name"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className=" justify-center items-center ">
                <CustomSelect
                  onChange={(e) => handleChange(e, index)}
                  label={"Data Type"}
                  selectHeight="h-[48px]"
                  name="dataType">
                  <option value="">option</option>
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Characters">List</option>
                  <option value="Date">Date</option>
                </CustomSelect>

              </div>
              <div className=" justify-center items-center ">
                <CustomSelect
                  onChange={(e) => handleChange(e, index)}
                  label={"Field Type"}
                  selectHeight="h-[48px]"
                  name="fieldType">
                  <option value="">option</option>
                  <option value="Input text">Input text</option>
                  <option value="Input number">Input number</option>
                  <option value="Dropdown">Dropdown</option>
                  <option value="Textarea">Textarea</option>

                  Textarea
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

              <div className=" justify-center items-center ">
                <CustomSelect
                  onChange={(e) => handleChange(e, index)}
                  label={"Field Relation"}
                  selectHeight="h-[48px]"
                  name="fieldRelation">
                  <option value="">option</option>
                  <option value="Dependent">Dependent</option>
                  <option value="InDependent">InDependent</option>

                </CustomSelect>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="">
                  Error message
                </label>
                <input
                  type="text"
                  placeholder="Error message"
                  className="w-full h-[48px] border-2 p-1 rounded"
                  name="errorMessage"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="">
                  Field Info
                </label>
                <input
                  type="text"
                  placeholder="Help text"
                  className="w-full h-[48px] border-2 p-1 rounded"
                  name="fieldInfo"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>


              <div className="flex items-center  ">
                <div className="flex items-center h-[48px]">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    name="isMandatory"
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
      <ToastContainer />
    </div>
  );
};


export const getServerSideProps = async (appCtx) => {

  let access_token = 'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;

  const auth = await doCheckAuth(appCtx)
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }

  }
  else {
    return {
      props: {
        user: auth,
        access_token,
      },
    }
  }
}

export default AddField;
