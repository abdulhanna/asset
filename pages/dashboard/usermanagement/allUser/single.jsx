import React, {useEffect, useState} from 'react'
import MainLayout from 'proj-components/MainLayout'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { TextField, CustomSelect,Text1  } from "@/components/atoms/field";
import { DialogPage1 } from "@/components/molecules/dialog";
import { UpArrow,AddIcon, LeftArrowIcon } from "@/components/atoms/icons";
import { FileUploader } from "react-drag-drop-files";
import authApi from 'helpers/use-api/auth'
import memberAccessApi from 'helpers/use-api/user-management/member'
import ButtonAction from '@/components/molecules/button'
import { ToastContainer, toast } from "react-toastify";
import { DeleteConfirm } from '@/components/molecules/dialog';

const AddCompanyLogo = ({ open, close,handleFile }) => {
  const fileTypes = ["JPEG", "PNG", "JPG"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    handleFile(file[0])
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
        >
          <div><p>Drag and Drop File here,<br></br> <button className="text-[#3B5FDA] w-auto h-[60px] py-1">Browse File</button></p></div>
        </FileUploader>
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


const SingleUser = ({user,access_token,member,roles}) => {
  const[showSave, setShowsave] = useState(true)
  const [logoHigh, setLogoHigh] = useState(false)
  const [data,setData] = useState(member?.member)
  const [profilePic,setProfilePic] = useState(null)
  const [isOpen,setIsOpen] = useState(false)
  const router = useRouter()
  const {id} = router.query
  const notify = (msg)=> toast.success(msg)
  const handleshow = () => {
    console.log("this is test")
    setShowsave(!showSave)
  }
  const options = [
    { label: "Active", value: false },

    { label: "InActive", value: true }

    // { label: "Meat", value: "meat" }
  ];

  const handleChange = async(e)=>{
          setData({...data,[e.target.name]:e.target.value})
  }
  const handleChange1 = async(e)=>{
      setData({...data,userProfile:{...data.userProfile,[e.target.name]:e.target.value}})
  }
  const handleFile = (e)=>{
    // console.log(e,'profile')
    const file =  URL.createObjectURL(e)
   setProfilePic(file)
    setData({...data,userProfile:{...data.userProfile,profileImg:e}})
  }


  const handleSubmit = async()=>{
    const formData= new FormData()
    formData.append('email',data.email)
    formData.append('userType',data.userType)
    formData.append('teamRoleId',data.teamRoleId._id)
    formData.append('isDeactivated',data.isDeactivated)
    formData.append('userProfile[name]',data.userProfile.name)
    formData.append('userProfile[userCodeId]',data.userProfile.userCodeId)
    formData.append('userProfile[phone]',data.userProfile.phone)
    formData.append('image',data.userProfile.profileImg)

    for (const pair of formData) {
      console.log(pair[0] + ', ' + pair[1]);
    }
   

    try{
       const res = await memberAccessApi.updateMember(access_token,id,formData)
       if(res.status == '201'){
        notify('Updated Successfully!')
        setTimeout(()=>{
          router.push('/dashboard/usermanagement/allUser');
        },2000)
       }
       console.log(res,'res')
    }catch(err){
      console.log(err,'err')
    }
  } 
  useEffect(()=>{
      // console.log(data,'data',id)
  },[data])

  const deactiveHandle = async()=>{
    try{
      const res =await memberAccessApi.deactivate(access_token,id)
      if(res.status == '200'){
        router.push('/dashboard/usermanagement/allUser')
      }
      console.log(res)
    }catch(err){
      console.log(err,'err')
    }
      // alert(id)
  }
  // console.log(data,'mem')
  return (
    <>
      <MainLayout User={user}>
      <div>
        <div className='flex flex-col justify-between'>
           <div className='flex justify-between'>
            <div className='flex items-center cursor-pointer' onClick={()=>router.back()}> <LeftArrowIcon/>
           <Text1 size='2xl' >Johdoe</Text1>
           </div>
           <div className='space-x-2'>
           {showSave ?  <Button variant='contained' onClick={handleshow}>EDIT</Button> : <Button variant='contained' onClick={handleSubmit} >SAVE</Button>}  
                <Button variant='danger' onClick={()=>setIsOpen(true)}>DEACTIVATE</Button>
           </div>
           </div>
           <div className="flex p-5 py-5 flex-col gap-12">
           <div className="flex items-center gap-6">
             <img className='w-[112px] h-[112px] rounded-full border-2' src={`${profilePic? profilePic: data.userProfile.profileImg}  `} width={'100'} height={'200'} alt='avtar'/> 
              <ButtonAction label={"CHANGE PIC"} onClick={()=> setLogoHigh(true)}/>
           </div>
           <div className="flex flex-col gap-6">
             <Text1 weight="semibold">User Information</Text1>
             <div className="flex gap-10 ">
               <div className="w-3/12">
                 <TextField label={"Username"} 
                 name={'name'} 
                 value={data.userProfile.name} 
                 placeHolder="Input Text" 
                 onChange={handleChange1}
                 disabled={showSave} 
                 />
                 
               </div>
               <div className="w-3/12">
                 <TextField
                   label={"User Identification Number"}
                   placeHolder="Input Text"
                   name='userCodeId'
                   value={data.userProfile.userCodeId}
                   onChange={handleChange1}
                   disabled={showSave}
                 />
               </div>
               <div className="w-3/12">
                 <CustomSelect label={"User Role"} disabled={showSave} name={'teamRoleId'}   value={data.teamRoleId?._id} onChange={handleChange}>
                 <option value={''}>select</option>
                 {roles.map((option,index)=>{
                
                  return <option value={option._id} key={index}>{option.roleName}</option>
                 })}
                   
                 </CustomSelect>
               </div>
             </div>
           </div>

           {/* CONTACT INFORMATION */}
           <div className="flex flex-col  gap-6">
             <Text1 weight="semibold">Contact Information</Text1>
             <div className="flex gap-10 ">
               <div className="w-3/12">
                 <TextField label={"User Email ID"} 
                 disabled={showSave} name='email' 
                 value={data.email}
                  placeHolder="Input Text"
                   onChange={handleChange}/>
               </div>
               <div className="w-3/12">
                 <TextField  
                 name='phone'
                 label={"Contact No."} 
                 value={data.userProfile.phone}
                  placeHolder="Input Text"
                  onChange={handleChange1}
                  disabled={showSave} 
                   />
               </div>
             </div>
           </div>


           {/* USER STATUS */}
           <div className="flex flex-col gap-6">
             <Text1 weight="semibold">User Status</Text1>
             <div className="flex gap-10 ">
               <div className="w-3/12">
               <div className=''>
                <Text1 size='sm' className='text-textColor'>{'User Status'}</Text1>
                <select className={`px-1 rounded border-[1px] p-6 py-[12px] active:outline-none w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`} 
                name={"isDeactivated"} value={member.isDeactivated} onChange={handleChange} >
                 {options.map((option,index) => (
                <option value={option.value} key={index}>{option.label}</option>
                ))}
               </select> 
               </div>
                  {/* <CustomSelect label={"User Status"} value={data.isDeactivated ? "InActive":"Active"}   disabled={showSave}>
                   <option value={member.isDeactivated}>{member.isDeactivated? "Active":"InActive"}</option>
                   <option value={!member.isDeactivated}>{member.isDeactivated? "InActive":"Active"}</option>
                 </CustomSelect>  */}
               </div>
             </div>
           </div>
         </div>
        </div>
       
      </div>
      <AddCompanyLogo open={logoHigh} close={() => setLogoHigh(false)} handleFile={handleFile} ></AddCompanyLogo>
      <DeleteConfirm check={isOpen} close={()=>setIsOpen(!isOpen)} callDelete={deactiveHandle} heading={'Are you sure want to Deactivated'} para={'Are you sure want to detaivate the member from list'}/>
      </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
  let access_token =
  "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
  const auth =await authApi.WhoAmI(appCtx)
  const {id} = appCtx.query

  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };

  }
  let member
  let roles
  try{
    const {data}  = await memberAccessApi.getMember(access_token,id)
    const data1 = await memberAccessApi.getRoles(access_token)
    member = data
    roles = data1?.data
  }catch(err){
    console.log(err,'err')
  }
  return {
    props:{
       user:auth,
       access_token,
       member:member || [],
       roles :roles||[]
    }
  }

}


export default SingleUser
