import React, { useEffect } from "react";
import { useState } from "react";
import { Text1, TextField, InputField } from "../../components/atoms/field";
import Button from "../../components/atoms/button";

function Profile(props) {
  const initialValue = {
    companyName: "",
    industryType: "",
    companyRegistrationNumber: "",
    country: "",
    panNumber: "",
    gstinNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    countryCode: "",
    contactNumber: "",
  };
  const [profileData, setProfileData] = useState(initialValue);
  const [profileErrors, setProfileErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    console.log(profileData, "dfsg");
  };

  useEffect(() => {
    if (Object.keys(profileErrors).length === 0 && isSubmit) {
      alert("succesfull");
      console.log("profile data submit");
    }
  }, [profileErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("data submit");
    console.log(profileData);
    setProfileErrors(validate(profileData));
    setIsSubmit(true);
    console.log(profileErrors.companyRegistrationNumber);
  };

  const validate = () => {
    const errors = {};
    if (!profileData.companyRegistrationNumber) {
      errors.companyRegistrationNumber =
        " Company registration number is required !";
    }
    return errors;
  };

  return (
    <div className="2xl:px-[456px] 2xl:py-[74px]  px-20">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[52px]">
          <div className="flex justify-center items-center">
            <Text1 size="xl" weight="medium" color="text-[#3B5FDA]">
              Company Profile
            </Text1>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <p>Profile Information</p>
            </div>
            <div className=" grid grid-cols-3 gap-[24px]">
              <TextField
                bgColor="white"
                label="Company name"
                name="companyName"
                placeHolder="input text"
               
                onChange={handleChange}
              />
              <div className="pt-2">
                <label
                  htmlFor="industry"
                  className="block mb-1  text-sm font-medium text-textColor dark:text-white">
                  Industry Type
                </label>
                <select
                  id=""
                  onChange={handleChange}
                  name="industryType"
                  className=" pt-[7.5px] h-[48px] border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">industry type</option>
                  <option value="Reaserch And development">
                    Reaserch And development
                  </option>
                </select>
              </div>
              <div className="pt-2">
                <label
                  htmlFor="country"
                  className="block mb-1  text-sm font-medium text-textColor dark:text-white">
                  Country
                </label>
                <select
                  id=""
                  onChange={handleChange}
                  name="country"
                  className=" pt-[7.5px] h-[48px] border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">select</option>
                  <option value="india">India</option>
                </select>
              </div>
              <TextField
                bgColor="white"
                label="Company Registration Number"
                placeHolder="input text"
                onChange={handleChange}
                name="companyRegistrationNumber"
              />
              <TextField
                bgColor="white"
                label="PAN No."
                placeHolder="input text"
                onChange={handleChange}
                name="panNumber"
              />
              <TextField
                bgColor="white"
                label="GSTIN No."
                onChange={handleChange}
                name="gstinNumber"
                placeHolder="input text"
              />
            </div>

            <div>
              <p>Company Address</p>
            </div>
            <div>
              <div>
                <TextField
                  bgColor="white"
                  label="Address Line 1"
                  placeHolder="input text"
                  onChange={handleChange}
                  name="addressLine1"
                />
                <TextField
                  bgColor="white"
                  label="Address Line 2"
                  placeHolder="input text"
                  onChange={handleChange}
                  name="addressLine2"
                />
              </div>
              <div className="grid grid-cols-3  gap-[24px]">
                <div className="pt-2">
                  <label
                    htmlFor="city"
                    className="block mb-1  text-sm font-medium text-textColor dark:text-white">
                    City
                  </label>
                  <select
                    id=""
                    onChange={handleChange}
                    name="city"
                    className=" pt-[7.5px] h-[48px] border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Select</option>
                    <option value="mumbai">Mumbai</option>
                  </select>
                </div>
                <div className="pt-2">
                  <label
                    htmlFor="state"
                    className="block mb-1  text-sm font-medium text-textColor dark:text-white">
                    State
                  </label>
                  <select
                    id=""
                    onChange={handleChange}
                    name="state"
                    className=" pt-[7.5px] h-[48px] border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">select</option>
                    <option value="maharashtra">Maharashtra</option>
                  </select>
                </div>

                <TextField
                  bgColor="white"
                  label="Zip Code"
                  placeHolder="input text"
                  onChange={handleChange}
                  name="zipCode"
                />
              </div>
              <div>
                <div>
                  <label htmlFor="" className="text-[12px] text-textColor">
                    Contact No
                  </label>
                </div>
                <div className=" grid grid-cols-12 gap-[12px]">
                  <div className="col-span-1">
                    <InputField
                      placeHolder="+00"
                      name="countryCode"
                      handleChange={handleChange}
                    />
                  </div>
                  <div className="col-span-4">
                    <InputField
                      placeHolder="00000 00000"
                      handleChange={handleChange}
                      name="contactNumber"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <Button variant="contained" className={"mx-auto"} type="submit">
              SAVE
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
