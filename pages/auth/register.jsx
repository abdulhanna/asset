import React, { useEffect, useState } from "react";
import { Text1, TextField } from "../../components/atoms/field";
import Button from "../../components/atoms/button";
import { RegisterImg } from "../../components/atoms/icons";
import {Headerouter} from "../../proj-components/Layout/sub-components/header"

// import "../styles/globals.css";

function Register() {
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
    
      <Headerouter/>
      <div className="w-full lg:h-screen flex  ">
        <div className="flex flex-col lg:flex-row  rounded-lg">
          <div className="px-[150px] 2xl:px-[108px] py-[186px] xl:py-[200px]  2xl:py-[210px] bg-[#F1F5FD] flex flex-col   items-center gap-28">
            <p className="w-[331px] xl:w-[409px] 2xl:w-[525px] text-base xl:text-xl font-normal text-center">
              Track and Manage your Assets at the comfort of your screen.
              Anytime! Anywhere!
            </p>

            <RegisterImg
              className={
                "w-[270px] h-[280px] xl:w-[325px] xl:h-[338px] 2xl:w-[375px] 2xl:h-[400] rounded-sm"
              }
            />
          </div>
          <div className="md:px-[100px]  bg-white  flex item-center justify-center py-[60px]">
            <form
              onSubmit={handleSubmit}
              action=""
              className="w-[372px] xl:w-[488px] 2xl:w-[700px] flex flex-col  gap-[52px] ">
              <div className="flex flex-col gap-8">
                <Text1
                  weight="medium"
                  color={"text-[#283995]"}
                  className={`text-[20px] leading-[28px] xl:text-[24px] xl:leading-[32px] 2xl:text-[32px] 2xl:leading-[44px]`}>
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
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
              <Button type="submit" variant="contained">
                Get Started
              </Button>
              <div className=" mx-auto my-[-40px]">
                <a href="#" className="text-blue-600 text-sm font-medium">
                  Already have an Account ? Log in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
