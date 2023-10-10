import React, { useState,useMemo, useEffect, useCallback } from "react";
import MainLayout from "../../../../proj-components/MainLayout";
import { AddIcon, LeftArrowIcon } from "@/components/atoms/icons";
import { Text1 } from "@/components/atoms/field";
import Button from "@/components/atoms/button";
import { TextField, CustomSelect } from "@/components/atoms/field";
import { DialogPage1 } from "@/components/molecules/dialog";
import { UpArrow } from "@/components/atoms/icons";
import { useRouter } from "next/router";
import { FileUploader } from "react-drag-drop-files";
import ButtonAction from "@/components/molecules/button";
import { doCheckAuth } from "@/utils/doCheckAuth";
import authApi from "helpers/use-api/auth";
import memberAccessApi from "helpers/use-api/user-management/member";
import userRolesApi from "helpers/use-api/user-management/roles";


const AddCompanyLogo = ({ open, close,handleFile,profilePic }) => {

  const fileTypes = ["JPEG", "PNG", "JPG"];
  const [file, setFile] = useState(profilePic);
  const handleChange = useCallback((file) => {
    setFile(file[0]);
    handleFile(file[0])
  },[file]);
  console.log(profilePic,'pic')
  
  return (<>
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
        >
          
        </FileUploader>
          <div className="w-auto">
            <p>{file ? `File name: ${file?.name}` : "No files uploaded yet"}</p>
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
  </>
  );
};

const MemoizedAddCompanyLogo = React.memo(AddCompanyLogo);

const AddUser = ({user,access_token,roles}) => {
  const [logoHigh, setLogoHigh] = useState(false);
  const [roleList,setRoleList] = useState(roles)
  const [member,setMember]  = useState({
    email:"",
    name:"",
    userType:'team',
    userId:"",
    teamRoleId:"",
    phone:"",
    isDeactivated:false,
    image:""

  })
  const [profilePic,setProfilePic] = useState()
  const router = useRouter()

  const handleChange = (e)=>{
    const {name,value} = e.target
    // console.log(name,value)
       setMember({...member,[name]:value})
  }
  useEffect(()=>{
       console.log(member,'member')
  },[member])
  const handleSubmit = async()=>{
    const formData = new FormData();
    formData.append('email',member.email)
    formData.append('userProfile.name',member.name)
    formData.append('userProfile.userIdentificationNo',member.userId)
    formData.append('image', member.image )

    for (const [key, value] of formData) {
      console.log(`${key}: ${value}`)
      // output.textContent += `${key}: ${value}\n`;
    }
      //  try{
      //      const res = await memberAccessApi.add(access_token)
      //  }catch(err){
      //   console.log(err,'err')
      //  }
  }

  // const memoizedAddCompanyLogo = useMemo(
  //   () => <AddCompanyLogo open={logoHigh} close={() => setLogoHigh(false)} />,
  //   [logoHigh]
  // );
  const handleFile = (e)=>{
   const file =  URL.createObjectURL(e)
   setProfilePic(file)
   setMember({...member,image:e})

      console.log(file,'file')
  }
  console.log(roleList,'roles');

  return (
    <>
      <MainLayout isScroll={true} User={user}>
        <div className="flex flex-col gap-10">
          <div className="w-full flex justify-between items-center py-4">
          <div>
            <div className="flex items-center cursor-pointer" onClick={()=> router.back()}>
              <LeftArrowIcon />
              <Text1 size="2xl" >
                Add Member
              </Text1>
            </div>
            <Text1 className="pl-4" size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
           </div>
            <Button variant="contained" onClick={handleSubmit}>SAVE</Button>
          </div>
          <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-6">
              <Text1 weight="normal">Profile Pic</Text1>
              <div className="flex items-center gap-8">
                
                <img className='w-[112px] h-[112px] rounded-full' src={`${profilePic?`${profilePic}`:"/images/Ellipse 2.png"}`} width={'100'} height={'200'} alt='avtar'/>
                <ButtonAction label={'ADD PHOTO'} onClick={()=> setLogoHigh(true)}/>
                  
              </div>
            </div>

            {/* User Information */}
            <div className="flex flex-col gap-6">
              <Text1 >User Information</Text1>
              <div className="flex gap-10 ">
                <div className="w-3/12">
                  <TextField label={"Username"} name="name" placeHolder="Input Text" onChange={handleChange}/>
                </div>
                <div className="w-3/12">
                  <TextField
                    label={"User Identification Number"}
                    placeHolder="Input Text"
                    name="userId"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-3/12" >
                  <CustomSelect label={"User Role"} name={'teamRoleId'} onChange={handleChange}>
                  <option value="">Select</option>
                  {roleList.map((role)=>{
                    return <option value={role._id}>{role.roleName}</option>
                  })}
                    {/* <option value="">Select</option>
                    <option value="admin">Admin</option> */}
                  </CustomSelect>
                </div>
              </div>
            </div>

             {/* contact Information */}
            <div className="flex flex-col gap-6">
              <Text1 weight="">Contact Information</Text1>
              <div className="flex gap-10 ">
                <div className="w-3/12">
                  <TextField label={"User Email ID"} name="email" placeHolder="Input Email Id" onChange={handleChange}/>
                </div>
                <div className="w-3/12">
                  <TextField label={"Contact No."} name="phone" placeHolder="Input contact No" onChange={handleChange}/>
                </div>
              </div>
            </div>

            {/* User Status */}
            <div className="flex flex-col gap-6">
              <Text1 weight="">User Status</Text1>
              <div className="flex gap-10 ">
                <div className="w-3/12">
                  <CustomSelect label={"User Status"} name="isDeactivated" onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="false">Active</option>
                    <option value="true">InActive</option>
                  </CustomSelect>
                </div>
              </div>
            </div>
          </div>
        </div>
        {logoHigh && <AddCompanyLogo open={logoHigh} profilePic={member.image} close={() => setLogoHigh(false)} handleFile={handleFile}></AddCompanyLogo>}
        {/* <MemoizedAddCompanyLogo open={logoHigh} close={() => setLogoHigh(false)} /> */}
        {/* {memoizedAddCompanyLogo} */}
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async (appCtx) => {
  let access_token =
  "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
  const auth =await authApi.WhoAmI(appCtx)
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  } 

  let roles 
  try{
    const {data} = await userRolesApi.getRoles(access_token)
    roles  =  data
  }catch(err){
    console.log(err,'err')
  }
  return {
    props:{
       user:auth,
       access_token,
       roles:roles||[]
    }
  }

}


export default AddUser;
