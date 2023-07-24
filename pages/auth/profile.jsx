import React from "react";
import { Text1, TextField, InputField } from "../../components/atoms/field";
import Button from "../../components/atoms/button";

function Profile(props) {
  return (
    <div className="xl:px-[456px] xl:py-[74px]">
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
              placeHolder="input text"
            />
            <div className="pt-2">
              <label
                for="industry"
                class="block mb-1  text-sm font-medium text-textColor dark:text-white">
                Industry Type
              </label>
              <select
                id=""
                class=" pt-[7.5px] h-[48px] border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>industry type</option>
                <option value="">Reaserch And development</option>
              </select>
            </div>
            <div className="pt-2">
              <label
                for="industry"
                class="block mb-1  text-sm font-medium text-textColor dark:text-white">
                Country
              </label>
              <select
                id=""
                class=" pt-[7.5px] h-[48px] border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>select</option>
                <option value="">India</option>
              </select>
            </div>
            <TextField
              bgColor="white"
              label="Company Registration Number*"
              placeHolder="input text"
            />
            <TextField
              bgColor="white"
              label="PAN No."
              placeHolder="input text"
            />
            <TextField
              bgColor="white"
              label="GSTIN No."
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
              />
              <TextField
                bgColor="white"
                label="Address Line 2"
                placeHolder="input text"
              />
            </div>
            <div className="grid grid-cols-3  gap-[24px]">
              <div className="pt-2">
                <label
                  for="city"
                  class="block mb-1  text-sm font-medium text-textColor dark:text-white">
                  City
                </label>
                <select
                  id=""
                  class=" pt-[7.5px] h-[48px] border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Select</option>
                  <option value="">Mumbai</option>
                </select>
              </div>
              <div className="pt-2">
                <label
                  for="state"
                  class="block mb-1  text-sm font-medium text-textColor dark:text-white">
                  State
                </label>
                <select
                  id=""
                  class=" pt-[7.5px] h-[48px] border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>select</option>
                  <option value="">Maharashtra</option>
                </select>
              </div>

              <TextField
                bgColor="white"
                label="Zip Code"
                placeHolder="input text"
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
                  <InputField placeHolder="+00" />
                </div>
                <div className="col-span-4">
                  <InputField placeHolder="00000 00000" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <Button variant="contained" className={'mx-auto'}>SAVE</Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
