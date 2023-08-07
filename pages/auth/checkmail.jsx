import React, { useState, useEffect } from "react";
import { CheckMail } from "../../components/atoms/icons";
import Button from "../../components/atoms/button";
import { Text1, TextField } from "../../components/atoms/field";
import { Headerouter } from "../../proj-components/Layout/sub-components/header";

function checkmail(props) {
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
        <div className="">
          <Headerouter />
        </div>

        <div className="h w-full lg:flex">
          <div className="flex flex-col lg:flex-row">
            <div className="px-[108px] pt-44 lg:pb-60 2xl:pb-72 bg-[#F1F5FD] flex flex-col gap-[95px]">
              <p className="w-[409px]  2xl:w-[525px] text-[20px] leading-[28px] 2xl:leading-8 font-[700] 2xl:font-light text-center">
                Track and Manage your Assets at the comfort of your screen.
                Anytime! Anywhere!
              </p>
              <CheckMail className={"flex justify-center"} />
            </div>

            <div className="flex items-center ms-[40px] xl:ms-[120px] 2xl:ms-[240px]">
              <form
                action=""
                onSubmit={handleSubmit}
                className="w-[344px] xl:w-[488px] 2xl:w-[75%] flex flex-col">
                <div className="mb-[52px]">
                  <p className="xl:w-[344px] text-[32px] leading-[44px] font-semibold tracking-[1.28px] text-[#3B5FDA] mb-[32px]">
                    Check your Email for a Verification Link
                  </p>

                  <Text1>
                    We have send an email with the verification link on the
                    email address mentioned below. We need you Email for
                    security and to keep technical communication.
                  </Text1>
                </div>

                <div className="mb-[100px]">
                  <TextField
                    label={"Email Address"}
                    bgColor="bg-[#F7F7F7]"
                    type="text"
                    textSize="lg"
                    labelColor="[#121212]"
                    name="EmailAddress"
                    onChange={onChange}
                  />
                  <p className="text-red-500">{formErrors.EmailAddress}</p>
                </div>

                <p className="text-[#666] text-sm font-[400] mb-[20px]">
                  Didn’t receive the email? Please check your spam folder or try
                  to resend the email.
                </p>

                <Button type="submit" variant="contained">
                  RESEND MAIL
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default checkmail;
