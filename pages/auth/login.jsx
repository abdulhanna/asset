import React, { useEffect, useState } from "react";
import Image from "next/image";
import img1 from "../../public/images/auth/login.svg";
import Text, { Text1, TextField } from "../../components/atoms/field";
import Button from "../../components/atoms/button";

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
      <div className="w-full lg:h-screen bg-[#00000080] flex  justify-center items-center">
        <div className="flex flex-col lg:flex-row border-2 rounded-lg">
          <div className="px-[91px]   pt-[72px] lg:pb-[244px] bg-[#F1F5FD] flex flex-col gap-[124px]">
            <div className="flex justify-center items-center py-[32px]">
              <p className="text-[40px] font-black leading-8 text-[#3B5FDA]">
                <span className="text-[#7CC270]">Fin</span>
                Bit
              </p>
            </div>
            <Image src={img1} className="" />
          </div>
          <div className="md:px-[100px] md:py-[40px]  bg-white  flex item-center justify-center">
            <form
              onSubmit={handleSubmit}
              action=""
              className="md:w-[368px] flex flex-col  gap-[52px] justify-center">
              <Text1
                weight="medium"
                size="xl"
                color={"text-[#283995]"}
                className={"text-center"}>
                Login
              </Text1>

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
                    type="password"
                    name="Password"
                    textSize="lg"
                    onChange={onChange}
                  />
                  <p className="text-red-500">{formErrors.Password}</p>
                </div>
              </div>
              <div className="mx-auto">
                <Button type="submit" variant="contained">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
