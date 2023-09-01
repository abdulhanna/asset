import React, { useState } from "react";
import MainLayout from "../../../../proj-components/MainLayout";
import { AddIcon, LeftArrowIcon } from "@/components/atoms/icons";
import { Text1 } from "@/components/atoms/field";
import Button from "@/components/atoms/button";
import { TextField, CustomSelect } from "@/components/atoms/field";
import { DialogPage1 } from "@/components/molecules/dialog";
import { UpArrow } from "@/components/atoms/icons";
import { useRouter } from "next/router";
import { FileUploader } from "react-drag-drop-files";



const AddCompanyLogo = ({ open, close }) => {
  const fileTypes = ["JPEG", "PNG", "JPG"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <DialogPage1 open={open} close={close} width="w-[510px]">
      <div className=" text-center flex flex-col gap-6">
        <div className="flex flex-col gap-8 justify-center items-center">
          <div>
            <p className="text-2xl font-body leading-8 text-[#3B5FDA] mb-[14px]">
              Add Profile Picture
            </p>
            <Button variant="transparent">
              <div className="w-[60px] h-[60px] rounded-[50%] bg-[#3B5FDA] flex justify-center items-center">
                <UpArrow />
              </div>
            </Button>
          </div>
          <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          hoverTitle="Drop Here"
          children={<div><p>Drag and Drop File here,<br></br> <button className="text-[#3B5FDA] w-auto h-[60px] py-1">Browse File</button></p></div>}
        />
          <div className="w-auto">
            <p>{file ? `File name: ${file[0].name}` : "No files uploaded yet"}</p>
          </div>
          <div>
            <p className="text-[12px] leading-[14px] font-normal text-[#666]">
              Supported files
            </p>
            <p>
              <label
                htmlFor=""
                className="text-[12px] leading-[14px] font-normal text-[#A4A4A4]  border-r-2 border-slate-400">
                Upto 2MB max
              </label>{" "}
              <label
                htmlFor=""
                className="text-[12px] leading-[14px] font-normal text-[#A4A4A4] ">
                JPG, JPEG, PNG
              </label>
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-center">
          <Button variant="primary" onClick={close}>
            CANCEL
          </Button>
          <Button variant="contained" onClick={close}>FINISH</Button>
        </div>
      </div>
    </DialogPage1>
  );
};


const AddUser = () => {
  const [logoHigh, setLogoHigh] = useState(false);
  const router = useRouter()
  return (
    <>
      <MainLayout isScroll={true}>
        <div className="flex flex-col gap-10">
          <div className="w-full flex justify-between ">
            <div className="flex items-center cursor-pointer" onClick={()=> router.back()}>
              <LeftArrowIcon />
              <Text1 size="2xl" >
                Add Member
              </Text1>
            </div>
            <Button variant="contained">SAVE</Button>
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <Text1 weight="semibold">Profile Pic</Text1>
              <div className="flex items-center gap-8">
                <div className="h-[120px] w-[120px] border rounded-full">
                  pic
                </div>
                <div>
                  <Button onClick={() => setLogoHigh(true)}>
                    <div className="flex =">
                      <AddIcon />
                      <span className="ms-3">ADD PHOTO</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Text1 weight="semibold">User Information</Text1>
              <div className="flex gap-10 ">
                <div className="w-3/12">
                  <TextField label={"Username"} placeHolder="Input Text" />
                </div>
                <div className="w-3/12">
                  <TextField
                    label={"User Identification Number"}
                    placeHolder="Input Text"
                  />
                </div>
                <div className="w-3/12">
                  <CustomSelect label={"User Roll"}>
                    <option value="">Select</option>
                    <option value="admin">Admin</option>
                  </CustomSelect>
                </div>

                <div className="w-3/12 flex">
                  <Button className={"my-auto"}>
                    <div className="flex ">
                      <AddIcon />
                      <span className="ms-3 ">ADD ROLE</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Text1 weight="semibold">Contact Information</Text1>
              <div className="flex gap-10 ">
                <div className="w-3/12">
                  <TextField label={"User Email ID"} placeHolder="Input Text" />
                </div>
                <div className="w-3/12">
                  <TextField label={"Contact No."} placeHolder="Input Text" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Text1 weight="semibold">User Status</Text1>
              <div className="flex gap-10 ">
                <div className="w-3/12">
                  <CustomSelect label={"User Role"}>
                    <option value="">Select</option>
                    <option value="admin">Admin</option>
                  </CustomSelect>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddCompanyLogo open={logoHigh} close={() => setLogoHigh(false)} />
      </MainLayout>
    </>
  );
};

export default AddUser;
