import React, { useEffect, useState } from "react";
import Image from "next/image";
// import img1 from "../../public/images/auth/login.svg";
import Text, { Text1, TextField } from "../../components/atoms/field";
import Button from "../../components/atoms/button";
import { LoginImg } from "../../components/atoms/icons";

// import "../styles/globals.css";

function Login() {
  const [register, setRegister] = useState({
    EmailAddress: "",
    Password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    console.log(register, "fdfff");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(register));
    setIsSubmit(true);
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
      <div className="w-full md:h-screen  flex justify-center  items-center py-4">
        <div className="flex flex-col md:flex-row  border-1 rounded-lg">
          <div className="xl:px-[160px]   lg:py-[200px] lg:pb-[244px] bg-[#F1F5FD] flex flex-col lg:gap-[120px]">
            <LoginImg className={"hidden sm:block"} />
            <div className="w-[300px] sm:w-[432px] mx-auto text-center flex flex-col  gap-6">
              <p className="text-2xl font-medium text-[#283995]">Lorem Ipsum</p>
              <p className=" font-normal text-base">
                Lorem ipsum dolor sit amet consectetur. Senectus enim ultricies
                tellus mauris sapien dignissim ut tempor urna.
              </p>
            </div>
          </div>
          <div className="px-[30px] 2xl:px-[220px] md:py-[40px]  bg-white  md:flex item-center justify-center">
            <form
              onSubmit={handleSubmit}
              action=""
              className="w-[300px] sm:w-[400px] lg:w-[528px] flex flex-col  md:gap-[52px] justify-center ">
              <div className="flex flex-col gap-8">
                <Text1
                  weight="semibold"
                  color={"text-[#3B5FDA]"}
                  className={"text-[32px] leading-[44px] tracking-[1.28px]"}>
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
                    name="EmailAddress"
                    onChange={onChange}
                  />
                  <p className="text-red-500">{formErrors.EmailAddress}</p>
                </div>
                <div>
                  <TextField
                    label={"Password"}
                    bgColor="white"
                    type="password"
                    name="Password"
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
                <a href="">Forgot Password ?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
