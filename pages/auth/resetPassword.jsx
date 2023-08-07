import React from "react";
import { useState, useEffect } from "react";
import { TextField } from "../../components/atoms/field";
import Button from "../../components/atoms/button";
import { ResetImg } from "../../components/atoms/icons";
import { Text1 } from "../../components/atoms/field";
import { Headerouter } from "../../proj-components/Layout/sub-components/header";

function ResetPassword(props) {
  const [mailAddress, setMailAddress] = useState({
    password: "",
    confirmPassword: "",
  });
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
      alert("Password Updated !");
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

  return (
    <>
      <Headerouter />
      <div className="w-full h-full  lg:flex">
        <div className="flex flex-col lg:flex-row">
          <div className="px-[108px] py-40 2xl:pt-56 bg-[#F1F5FD] flex flex-col gap-[95px] 2xl:gap-[120px]">
            <ResetImg className={"flex justify-center"} />
            <div className=" flex flex-col items-center gap-6">
              <Text1 size="2xl" color="text-primary">
                Lorem Ipsum
              </Text1>
              <p className="w-[432px]  2xl:w-[525px] text-center text-base font-normal">
                Lorem ipsum dolor sit amet consectetur. Senectus enim ultricies
                tellus mauris sapien dignissim ut tempor urna.
              </p>
            </div>
          </div>

          <div className=" flex items-center ms-[40px] xl:ms-[140px] 2xl:ms-[220px]">
            <form
              action=""
              onSubmit={handleSubmit}
              className="w-[344px] xl:w-[488px] 2xl:w-[528px] flex flex-col">
              <div className="mb-[100px]">
                <p className="xl:w-[344px] text-[24px] font-semibold text-[#3B5FDA] mb-[32px] leading-8">
                  Reset Password
                </p>
                <p className="text-sm font-normal text-[#121212]">
                  Lorem ipsum dolor sit amet consectetur. Senectus enim
                  ultricies tellus mauris sapien sit ut dignissim ut tempor
                  urna.
                </p>
              </div>

              <div className="mb-[52px]">
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
              <div className="mb-[100px]">
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
    </>
  );
}

export default ResetPassword;
