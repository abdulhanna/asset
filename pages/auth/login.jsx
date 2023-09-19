import React, { useEffect, useState } from "react";
import Link from "next/link";
// import img1 from "../../public/images/auth/login.svg";
import Text, { Text1, TextField } from "../../components/atoms/field";
import Button from "../../components/atoms/button";
import { LoginImg } from "../../components/atoms/icons";
import { Headerouter } from "../../proj-components/Layout/sub-components/header";
import { hostedAuthAxios } from "@/utils/backendAxios";
import { useRouter } from "next/router";


function Login() {
  const [register, setRegister] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter()
  const onChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    // console.log(register, "fdfff");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  const res =  await  hostedAuthAxios.post('/login',register)
          console.log(res)
        if(res.status =='200'){
          router.push('/dashboard')
        }
        // console.log(res.status);
    // console.log("submit", register,"reg")
    // setFormErrors(validate(register));
    // setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(register);
      alert("login successfull !");
    }
  }, [formErrors]);

  const validate = (value) => {
    const error = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!value.EmailAddress) {
      error.EmailAddress = "Email address is required !";
    } else if (!regex.test(value.EmailAddress)) {
      error.EmailAddress = "Enter a valid email address ! ";
    }
    if (!value.Password) {
      error.Password = "Password is required !";
    }
    return error;
  };

  return (
    <>
        <div className="">
        <div className="">
          <Headerouter />
        </div>
        <div className="w-full h-[90vh] flex   items-center">
        <div className="flex h-full flex-col md:flex-row  border-1 rounded-lg">
        <div className="grid grid-cols-2 gap-4">

          <div className=" bg-[#F1F5FD] h-full w-full flex flex-col items-center justify-center gap-8">
            <LoginImg />
            <div className="w-72 mx-auto text-center flex flex-col  gap-5">
              <Text1 size="2xl" weight="medium" className="text-[#283995]">
                Lorem Ipsum
              </Text1>
              <Text1>
                Lorem ipsum dolor sit amet consectetur. Senectus enim ultricies
                tellus mauris sapien dignissim ut tempor urna.
              </Text1>
            </div>
          </div>
            
          <div className=" bg-white  md:flex item-center justify-center">
            <form
              onSubmit={handleSubmit}
              action=""
              className="w-[300px] sm:w-[400px] lg:w-3/5 flex flex-col  md:gap-[52px] justify-center ">
              <div className="flex flex-col gap-8">
                <Text1 size="2xl" weight="semibold" className={"text-primary"}>
                  Login
                </Text1>
                <Text1>
                  Lorem ipsum dolor sit amet consectetur. Senectus enim
                  ultricies tellus mauris sapien sit ut dignissim ut tempor
                  urna.
                </Text1>
              </div>

              <div className="flex flex-col md:gap-8 ">
                <div>
                  <TextField
                    label={"Email Address"}
                    bgColor="white"
                    type="text"
                    textSize="lg"
                    name="email"
                    onChange={onChange}
                  />
                  <p className="text-red-500">{formErrors.EmailAddress}</p>
                </div>
                <div>
                  <TextField
                    label={"Password"}
                    bgColor="white"
                    type="password"
                    name="password"
                    textSize="lg"
                    onChange={onChange}
                  />
                  <p className="text-red-500">{formErrors.Password}</p>
                </div>
              </div>

              <Button type="submit" variant="contained">
                Login
              </Button>
              <p className="text-[#3B5FDA] mx-auto mt-[-20px]  text-sm">
                <Link href="/auth/forgetPassword">Forgot Password ?</Link>
              </p>
            </form>
          </div>
        </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Login;
