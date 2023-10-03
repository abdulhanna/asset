import React from "react";
import { useState, useEffect } from "react";
import { TextField } from "../../components/atoms/field";
import Button from "../../components/atoms/button";
import { ResetImg } from "../../components/atoms/icons";
import { Text1 } from "../../components/atoms/field";
import { Headerouter } from "../../proj-components/Layout/sub-components/header";
import authApi from "helpers/use-api/auth";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import Test from "pages/test";

function ResetPassword(props) {


  const [mailAddress, setMailAddress] = useState({
    token:"",
    password: "",
    confirmPassword: "",
  });


  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter()

  const {resetToken} = router.query

  const notify = (msg)=> toast.success(msg)
  const Error = (msg)=> toast.error(msg)

  const onChange = (e) => {
    const { name, value } = e.target;
    setMailAddress({ ...mailAddress, [name]: value });
    console.log(mailAddress);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(mailAddress));
    setIsSubmit(true);
    console.log(formErrors);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
   
      submitReset()
    }
  }, [formErrors]);

  const validate = (value) => {
    const error = {};
    if (!value.password) {
      error.password = "Password is required !";
    }
    if (!value.confirmPassword) {
      error.confirmPassword = "Confirm password is required !";
    } else if (mailAddress.password !== mailAddress.confirmPassword) {
      error.confirmPassword =
        "Confirm password should be match with password ! ";
    }
    return error;
  };

  const submitReset = async()=>{
       
    try{
      const res= await authApi.resetPassword(mailAddress)
      notify(res.data.msg)
      setMailAddress({password:"",confirmPassword:""})

      setTimeout(()=>{
        router.push('/auth/login')
      },1500)
     
    }catch(err){

      Error(err.response.data.error)
     
    }
  
  }

  useEffect(()=>{
    if(resetToken){
      setMailAddress((prevState)=> ({...prevState ,token : resetToken})) 
    }
  
},[resetToken, ])


useEffect(() => {
  // Perform client-side redirection here
   setTimeout(() => {
    if (!resetToken) {
      router.push('/auth/login');
      console.log("yes this exist")
    }
   },3000)
}, [resetToken, router]);


  




   const verifyPassword = async()=>{
      // try{
      //   const res= await authApi.verifyPassword(resetToken)
      //   console.log(res.data.msg)
      //   notify(res.data.msg)
     
      // }catch(err){
      //     Error(err)
      // }
     
   }


 

  // useEffect(()=>{
  //     if(mailAddress){
  //       console.log(mailAddress,'dfgfg')
  //     }
  // },[mailAddress])

  return (
    <>
      
     <div className="">
           <div className="">
           <Headerouter />
           </div>
      <div className="w-full h-[90vh] lg:flex items-center">
        <div className="flex h-full flex-col md:flex-row rounded-lg w-full">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-[#F1F5FD] h-full w-full flex flex-col items-center justify-center">
              <ResetImg className={"flex justify-center"} />
              <div className=" flex flex-col items-center gap-6 mt-8">
                <Text1 size="2xl" color="text-primary">
                  Lorem Ipsum
                </Text1>
                <p className="w-[432px]  2xl:w-[525px] text-center text-base font-normal">
                  Lorem ipsum dolor sit amet consectetur. Senectus enim ultricies
                  tellus mauris sapien dignissim ut tempor urna.
                </p>
              </div>
            </div>
            {/* form */}
            <div className="w-full flex items-center justify-center ">
              <form
                action=""
                onSubmit={handleSubmit}
                className="w-[344px] xl:w-[488px] 2xl:w-[528px] flex flex-col space-y-8">
                <div className="space-y-8">
                 <Text1 size="2xl" weight="semibold"  className="text-[#283995]">Reset Password</Text1>
                 <Text1> Lorem ipsum dolor sit amet consectetur. Senectus enim
                    ultricies tellus mauris sapien sit ut dignissim ut tempor
                    urna.</Text1>
                </div>

                <div className="">
                  <TextField
                    label={"Password"}
                    bgColor="bg-white"
                    type="text"
                    textSize="lg"
                    labelColor="[#121212]"
                    name="password"
                    onChange={onChange}
                  />
                  <p className="text-red-500">{formErrors.password}</p>
                </div>
                <div className="">
                  <TextField
                    label={"Confirm Password"}
                    bgColor="bg-white"
                    type="text"
                    textSize="lg"
                    labelColor="[#121212]"
                    name="confirmPassword"
                    onChange={onChange}
                  />
                  <p className="text-red-500">{formErrors.confirmPassword}</p>
                </div>

                <Button type="submit" variant="contained">
                  CONFIRM
                </Button>
              </form>
            </div>
           </div>
        </div>
      </div>
      <ToastContainer/>
       </div>
      
    </>
  );
}



export default ResetPassword;

























