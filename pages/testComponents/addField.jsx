import { useEffect, useState } from "react";
import { CustomSelect, Text1 } from "../../components/atoms/field";
import Button from "../../components/atoms/button";

import { useRouter } from "next/router";
import field from "helpers/use-api/fieldmanagment";
import { ToastContainer, toast } from 'react-toastify';
import { TagsInput } from "react-tag-input-component";


// ADDING FIELD-------------------
const AddField = ({ user, access_token, close, id }) => {


  const [subgroupField, setSubgroupField] = useState();

  console.log(id, "tis is id subgroup")
  const GroupFieldData = async () => {

    try {
      const res = await field.fieldNamebySubgroupID(access_token, id)
      setSubgroupField(res.data.fields)
      console.log(res.data, "this is a new id data")
    } catch (err) {
      console.log(err, "hhjthis is error");
    }
  }

  useEffect(() => {
    GroupFieldData()
  }, [])

  const [selected, setSelected] = useState([]);

  const initialValue = {
    name: "",
    dataType: "",
    fieldType: "",
    fieldLength: "",
    fieldRelation: "",
    errorMessage: "",
    fieldInfo: "",
    dependentFieldId: [],
    dependentOn: "",
    isMandatory: true,

  };



  console.log(selected, "this is selected");
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

    if (name === 'listOptions') {
      data[index][name] = selected;
    } else {
      data[index][name] = value;
    }
    setFields(data);
  };



  const handleSave = async () => {
    setFields([initialValue]);


    const updatedFields = fields.map((field) => ({
      ...field,
      listOptions: selected,
    }))

    let object = {
      fields: updatedFields
      // Combine all listOptions into a single array
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

    console.log(object, "this is an object");


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
              className=" grid grid-cols-2 items-center  gap-x-[32px] gap-y-[32px] pb-[20px]"
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
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="list">List</option>
                  <option value="date">Date</option>
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
                  <option value="Radio button">Radio</option>
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


              {item.dataType === 'list' ? (

                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="">
                    List Option
                  </label>
                  <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="listOptions"
                    placeHolder="Enter List Option"
                    classNames='h-5'
                  />
                </div>
              ) : null}


              <div className=" justify-center items-center ">
                <CustomSelect
                  onChange={(e) => handleChange(e, index)}
                  label={"Field Relation"}
                  selectHeight="h-[48px]"
                  name="fieldRelation">
                  <option value="">option</option>
                  <option value="Dependent">Dependent</option>
                  <option value="Independent">Independent</option>

                </CustomSelect>
              </div>


              {item.fieldRelation === 'Dependent' ? (
                <>

                  <CustomSelect
                    className=" px-2"
                    onChange={(e) => handleChange(e, index)}
                    label={"Dependent Field"}
                    selectHeight="h-[48px]"
                    name="dependentFieldId">
                    <option value="">Select Dependent Field</option>
                    {subgroupField?.map(group => (
                      <option key={group._id} value={group._id}>{group.name}</option>
                    ))}
                  </CustomSelect>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="">
                      Dependent On
                    </label>
                    <input
                      type="text"
                      placeholder="Dependent ON "
                      className="w-full h-[48px] border-2 p-1 rounded"
                      name="dependentOn"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </>
              ) : null}


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




// EDITING FIELDS------------------
export const EditField = ({ user, access_token, close, fieldSingleData }) => {





  const [selected, setSelected] = useState(fieldSingleData.listOptions);
  const [fieldID, setFieldID] = useState(fieldSingleData._id)


  const [fields, setFields] = useState({
    dataType: fieldSingleData.dataType,
    dependentFieldId: [],
    dependentOn: fieldSingleData.dependentOn,
    errorMessage: fieldSingleData.errorMessage,
    fieldInfo: fieldSingleData.fieldInfo,
    fieldLength: fieldSingleData.fieldLength,
    fieldRelation: fieldSingleData.fieldRelation,
    fieldType: fieldSingleData.fieldType,
    isMandatory: fieldSingleData.isMandatory,

    name: fieldSingleData.name,
    organizationId: fieldSingleData.organizationId
  });

  useEffect(() => {

    setFields({
      ...fields,
      listOptions: [...selected],
      isMandatory: fieldSingleData.isMandatory === "Yes" ? true : false,
    })

  }, [selected])




  const notify = (msg) => toast?.success(msg)
  const error = (msg) => toast?.error(msg)



  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // const data = fields;

    // if (name === 'listOptions') {
    //   data[name] = selected;
    // } else {
    //   data[name] = value;
    // }
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,

    }));
  };

  console.log(selected, "this is selected");

  const handleSave = async () => {

    try {
      const res = await field.editFieldbyFieldID(access_token, fieldID, fields)
      if (res.status === 200) {
        notify("Added Successfully")
        close()
        setTimeout(() => {
          router.reload()
        }, 1000)
      }

    } catch (e) {
      error(e.message)
      console.log("This is an error");
    }

    console.log(fields, "this is a field");


  };

  return (
    <div className="h-auto overflow-y-auto px-6  flex flex-col">
      <div className=" flex flex-col items-center pb-[52px]">
        <Text1 size="2xl" className="py-2">Edit Field</Text1>
        <Text1>Asset Description</Text1>
      </div>
      <>

        <div
          className=" grid grid-cols-2 items-center  gap-x-[32px] gap-y-[32px] pb-[20px]">
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className="">
              Field Name
            </label>
            <input
              type="text"
              placeholder="Name Of The Asset"
              className=" h-[48px] w-full border-2 p-1 rounded"
              name="name"
              value={fields.name}
              onChange={(e) => setFields({ ...fields, name: e.target.value })}
            />
          </div>
          <div className=" justify-center items-center ">
            <CustomSelect
              onChange={(e) => handleChange(e)}
              value={fields.dataType}
              label={"Data Type"}
              selectHeight="h-[48px]"
              name="dataType">
              <option value="">option</option>
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="list">List</option>
              <option value="date">Date</option>
            </CustomSelect>

          </div>
          <div className=" justify-center items-center ">
            <CustomSelect
              onChange={(e) => handleChange(e)}
              label={"Field Type"}
              selectHeight="h-[48px]"
              name="fieldType"
              value={fields.fieldType}
            >
              <option value="">option</option>
              <option value="Input text">Input text</option>
              <option value="Input number">Input number</option>
              <option value="Dropdown">Dropdown</option>
              <option value="Radio button">Radio</option>
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
              value={fields.fieldLength}
              placeholder="number"
              className="w-full h-[48px] border-2 p-1 rounded"
              name="fieldLength"
              onChange={(e) => handleChange(e)}
            />
          </div>


          {fields.dataType === 'list' ? (

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="">
                List Option
              </label>
              <TagsInput
                value={selected}
                onChange={setSelected}
                name="listOptions"
                placeHolder="Enter List Option"
                classNames='h-5'
              />
            </div>
          ) : null}


          <div className=" justify-center items-center ">
            <CustomSelect
              onChange={(e) => handleChange(e)}
              label={"Field Relation"}
              selectHeight="h-[48px]"
              name="fieldRelation"
              value={fields.fieldRelation}
            >
              <option value="">option</option>
              <option value="Dependent">Dependent</option>
              <option value="Independent">Independent</option>

            </CustomSelect>
          </div>


          {fields.fieldRelation === 'Dependent' ? (
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="">
                  Dependent Field
                </label>
                <input
                  type="text"
                  placeholder="Dependent Field 1"
                  className="w-full h-[48px] border-2 p-1 rounded"
                  name="dependentFieldId"
                  onChange={(e) => handleChange(e)}
                  value={fields.dependentFieldId}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="">
                  Dependent On
                </label>
                <input
                  type="text"
                  placeholder="Dependent ON "
                  className="w-full h-[48px] border-2 p-1 rounded"
                  name="dependentOn"
                  value={fields.dependentOn}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </>
          ) : null}


          <div className="flex flex-col gap-1">
            <label htmlFor="" className="">
              Error message
            </label>
            <input
              type="text"
              placeholder="Error message"
              className="w-full h-[48px] border-2 p-1 rounded"
              name="errorMessage"
              value={fields.errorMessage}
              onChange={(e) => handleChange(e)}
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
              value={fields.fieldInfo}
              onChange={(e) => handleChange(e)}
            />
          </div>


          <div className="flex items-center  ">
            <div className="flex items-center h-[48px]">
              <input
                id="link-checkbox"
                type="checkbox"
                name="isMandatory"
                value={fields.isMandatory}
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
