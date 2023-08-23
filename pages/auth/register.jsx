import React, { useEffect, useState } from "react";
import { Text1, TextField } from "../../components/atoms/field";
import Button from "../../components/atoms/button";
import { RegisterImg } from "../../components/atoms/icons";
import { Headerouter } from "../../proj-components/Layout/sub-components/header";

import { useRouter } from 'next/router';

// import "../styles/globals.css";

function Register() {

  const router = useRouter();

  const [register, setRegister] = useState({
    EmailAddress: "",
    Password: "",
    ConfirmPassword: "",
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
      alert("form submit");
    }
  }, [formErrors]);


  const handleLoginButtonClick = () => {
    router.push('/auth/login')
  }

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
    if (!value.ConfirmPassword) {
      error.ConfirmPassword = "Confirm Password is required !";
    } else if (value.ConfirmPassword !== value.Password) {
      error.ConfirmPassword =
        "Confirm Password should be match with password !";
    }
    return error;
  };

  return (
    <>
      <div className="h-screen">
        <div className="h-[7%]">
          <Headerouter />
        </div>
        <div className="w-full h-[93%] flex item-center ">
          <div className="flex flex-col lg:flex-row  rounded-lg w-full">
            <div className="w-full  py-44 xl:py-52  2xl:py-48 bg-[#F1F5FD] flex flex-col justify-center items-center gap-28">
              <p className="w-[331px] xl:w-[409px] text-base xl:text-xl font-light text-center">
                Track and Manage your Assets at the comfort of your screen.
                Anytime! Anywhere!
              </p>
              <RegisterImg
                className={
                  "w-[270px] h-[280px] xl:w-[325px] xl:h-[338px] 2xl:w-96 rounded-sm"
                }
              />
            </div>
            <div className="w-full  bg-white  flex items-center justify-center ">
              <form
                onSubmit={handleSubmit}
                action=""
                className=" flex flex-col  gap-[52px] w-[60%]">
                <div className="flex flex-col gap-8">
                  <Text1
                    weight="semibold"
                    size="3xl"
                    className={"text-primary"}>
                    Register company
                  </Text1>
                  <Text1 className="xl:text-xs 2xl:text-base font-normal">
                    Lorem ipsum dolor sit amet consectetur. Senectus enim
                    ultricies tellus mauris sapien sit ut dignissim ut tempor
                    urna.
                  </Text1>
                </div>

                <div className="flex flex-col gap-8 ">
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
                      type="text"
                      name="Password"
                      textSize="lg"
                      onChange={onChange}
                    />
                    <p className="text-red-500">{formErrors.Password}</p>
                  </div>
                  <div>
                    <TextField
                      label={"Confirm Password"}
                      bgColor="white"
                      type="text"
                      name="ConfirmPassword"
                      textSize="lg"
                      onChange={onChange}
                    />
                    <p className="text-red-500">{formErrors.ConfirmPassword}</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="link-checkbox"
                      className="ml-2 text-sm font-body text-gray-900 dark:text-gray-300">
                      Accept{" "}
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-500 hover:underline">
                        Terms of Services
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-500 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
                <Button type="submit" variant="contained" >
                  Get Started
                </Button>
                <div className=" mx-auto my-[-40px]">
                  <a href="/auth/login" className="text-blue-600 text-sm font-body">
                    Already have an Account ? Log in
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
