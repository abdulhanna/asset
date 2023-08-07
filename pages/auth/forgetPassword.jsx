import React from "react";
import { useState, useEffect } from "react";
import { Text1, TextField } from "../../components/atoms/field";
import Button from "../../components/atoms/button";
import { ForgetPasswordIcon } from "../../components/atoms/icons";
import { Headerouter } from "../../proj-components/Layout/sub-components/header";

function forgetPassword(props) {
  const [mailAddress, setMailAddress] = useState({ EmailAddress: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
      alert("email send");
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
    return error;
  };

  return (
    <>
      <div className="h-screen">
        <div className="h-[5%]">
          <Headerouter />
        </div>

        <div className="w-full h-[95%]  lg:flex">
          <div className=" w-full flex flex-col lg:flex-row">
            <div className="px-[108px] py-40 2xl:pt-56 bg-[#F1F5FD] flex flex-col gap-[95px] 2xl:gap-[120px]">
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

                <Button type="submit" variant="contained">
                  CONFIRM
                </Button>
                <p className="text-[#3B5FDA] mx-auto mt-5 text-sm">
                  <a href="">Wrong Email?</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default forgetPassword;
