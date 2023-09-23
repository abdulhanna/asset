import React from "react";
import { useState, useEffect } from "react";
import { Text1,TextField } from "@/components/atoms/field";
import Button from "@/components/atoms/button";
import { ForgetPasswordIcon } from "@/components/atoms/icons";
import { Headerouter } from "../../proj-components/Layout/sub-components/header";
import authApi from "helpers/use-api/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/router";

function ForgetPassword(props) {
  const [mailAddress, setMailAddress] = useState({ EmailAddress: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const router= useRouter()
 const notify =(msg)=> toast.success(msg)
 const Error = (msg)=> toast.error(msg)


  const onChange = (e) => {
    const { name, value } = e.target;
    setMailAddress({ ...mailAddress, [name]: value });

  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmit(true)
    if(mailAddress.EmailAddress){
        //  alert('email not fll')
        try{
          const res = await  authApi.forgotPassword({email:mailAddress.EmailAddress})
          notify(res.data.msg)
          setTimeout(()=>{
            router.push('/auth/login')
          },1500)
          console.log(res.data,'res')
        }catch(err){
          console.log(err,'err')
          Error(err.response.data.error)
        }
    }else{
      Error('please add Email Adderess')
  
    }

    setIsSubmit(false)
  };



  return (
    <>
      <div className="">
        <div className="">
          <Headerouter />
        </div>

        <div className="w-full h-[93%] lg:flex">
          <div className=" w-full flex flex-col lg:flex-row">
            <div className="px-[180px] py-40 2xl:pt-56 bg-[#F1F5FD] flex flex-col gap-[95px] 2xl:gap-[120px]">
              <ForgetPasswordIcon className={"flex justify-center"} />
              <div className=" flex flex-col items-center gap-6">
                <Text1 size="2xl" color="text-primary">
                  Lorem Ipsum
                </Text1>
                <p className="w-[432px]  2xl:w-[525px] text-center text-base font-normal">
                  Lorem ipsum dolor sit amet consectetur. Senectus enim
                  ultricies tellus mauris sapien dignissim ut tempor urna.
                </p>
              </div>
            </div>

            <div className="w-[60%] flex items-center ms-[40px] xl:ms-[140px] 2xl:ms-[220px]">
              <form
                action=""
                onSubmit={handleSubmit}
                className="w-[344px] xl:w-[488px] 2xl:w-[528px] flex flex-col">
                <div className="mb-[100px]">
                  <p className="xl:w-[344px] text-[24px] font-semibold text-[#3B5FDA] mb-[32px] leading-8">
                    Forget Password
                  </p>
                  <p className="text-sm font-normal text-[#121212]">
                    We have sent a Password reset email on your email address{" "}
                    <span>P******@gmail.com</span>. Please reset your password
                    from there.
                  </p>
                </div>

                <div className="mb-[120px]">
                  <TextField
                    label={"Enter Email address"}
                    bgColor="bg-white"
                    type="text"
                    textSize="lg"
                    labelColor="[#121212]"
                    name="EmailAddress"
                    onChange={onChange}
                  />
                  <p className="text-red-500">{formErrors.EmailAddress}</p>
                </div>

                <Button type="submit" variant="contained" isDisabled={isSubmit}>
                  CONFIRM
                </Button>
                <p className="text-[#3B5FDA] mx-auto mt-5 text-sm">
                  <a href="">Wrong Email?</a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default ForgetPassword;
