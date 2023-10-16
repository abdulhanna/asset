import React, { useEffect, useState } from "react";
import MainLayout from "../../../../proj-components/MainLayout";
import Text, {
  Text1,
  TextField,
  CustomSelect,
} from "../../../../components/atoms/field";
import Button from "../../../../components/atoms/button";
import { useRouter } from "next/router";
import { LeftArrowIcon } from "@/components/atoms/icons";
import { doCheckAuth } from "@/utils/doCheckAuth";
import authApi from "helpers/use-api/auth";
import orgApi from "helpers/use-api/organisations";


const AddOganisation = ({ user, access_token }) => {
  const router = useRouter();

  const [companyprofileData, setCompanyprofileData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    organizationType: "",
    organizationRegistrationNumber: "",
    pan: "",
    gstin: "",
    contactNo: "",
    contactPersonName: "",
    contactPersonEmail: "",
    mainAddress: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
    },
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // Checking if profilerrors have 0 length and isSubmit true then show me an action
  useEffect(() => {
    if (Object.keys(profileErrors).length === 0 && isSubmit) {
      // alert("done done")
    }
  }, [profileErrors]);

  // Handling all data for Company Profile
  const handleChange = (e) => {
    //  e.preventDefault();
    const { name, value } = e.target;
    setCompanyprofileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange1 = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCompanyprofileData((prevData) => ({
      ...prevData,
      mainAddress: {
        ...prevData.mainAddress,
        [name]: value,
      },
    }));
  };

  const validate = () => {
    const error = {};
    if (!companyprofileData.EmailAddress) {
      error.EmailAddress = " Company Email is required !";
    }
    return error;
  };

  // Submitbutton
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProfileErrors(validate(companyprofileData));
    setIsSubmit(true);

    try {
      const res = await orgApi.saveProfile(access_token, companyprofileData);
      console.log(res, "this is a valid company profile");
      if (res.status == 201) {
        router.push("/dashboard/root/organisation");
      }
      setCompanyprofileData({
        email: "",
        password: "",
        confirmPassword: "",
        organizationName: "",
        organizationType: "",
        organizationRegistrationNumber: "",
        pan: "",
        gstin: "",
        contactNo: "",
        contactPersonName: "",
        contactPersonEmail: "",
        mainAddress: {
          address1: "",
          address2: "",
          city: "",
          state: "",
          pinCode: "",
          country: "",
        },
      })

    } catch (err) {
      console.log(err, "error");
    }

    //  router.push("/dashboard/root/organisation");
  };

  return (
    <>
      <MainLayout isScroll={true} User={user}>
        {/* Company Profile---------------------------------------------------------------------------------- */}
        <div>
          <div className="flex justify-between mb-4  w-full h-[50px] items-center  bg-white sticky top-0 z-50 ">
            <div
              className="flex items-center cursor-pointer space-x-2"
              onClick={() => router.back()}
            >
              <LeftArrowIcon />
              <Text1 size="2xl" weight="medium">
                Add Organizations
              </Text1>
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                className="w-[100px] h-[40px]"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </div>

          <form
            action=""
            onSubmit={handleSubmit}
            className="flex justify-between flex-col top-0 px-4 relative mb-4 overflow-y-auto"
          >
            <div>
              <Text size="lg" weight="semibold" classname="mb-3">
                Company Profile
              </Text>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <TextField
                    label="Email ID"
                    bgColor="white"
                    type="text"
                    textSize="lg"
                    name="email"
                    placeHolder="Enter Your Email"
                    onChange={handleChange}
                  />
                  <p className="text-red-500">{profileErrors.EmailAddress}</p>
                </div>

                <TextField
                  label="Password"
                  bgColor="white"
                  type="password"
                  textSize="lg"
                  name="password"
                  value={companyprofileData.password}
                  placeHolder="Enter Your Password"
                  onChange={handleChange}
                />

                <TextField
                  label="Confirm Password"
                  bgColor="white"
                  type="password"
                  textSize="lg"
                  name="confirmPassword"
                  value={companyprofileData.confirmPassword}
                  placeHolder="Enter Your Password"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Profile INformation -------------------------------------------------------------------------------*/}

            <div>
              <Text size="lg" weight="semibold" classname="mb-3 mt-7">
                Profile Information
              </Text>
              <div className="grid grid-cols-4 gap-4">
                <TextField
                  label="Company Name"
                  bgColor="white"
                  type="text"
                  textSize="lg"
                  name="organizationName"
                  value={companyprofileData.companyName}
                  placeHolder="Enter Company Name"
                  onChange={handleChange}
                />

                <CustomSelect
                  label="Industry"
                  onChange={handleChange}
                  name="organizationType"
                  bgColor="white"
                  selectHeight="h-[48px]"
                >
                  <option value="">Industry type</option>
                  <option value="Reaserch and development ">
                    Reaserch And Development
                  </option>
                  <option value="  Technology and Software ">
                    Technology and Software
                  </option>

                  <option value=" Finance and Banking ">
                    Finance and Banking
                  </option>

                  <option value=" Healthcare and Pharmaceuticals ">
                    Healthcare and Pharmaceuticals
                  </option>

                  <option value=" Education ">
                    Education
                  </option>

                  <option value="Retail and E-commerce ">
                    Retail and E-commerce
                  </option>

                  <option value="Manufacturing and Production">
                    Manufacturing and Production
                  </option>

                  <option value=" Real Estate and Construction ">
                    Real Estate and Construction
                  </option>

                  <option value=" Hospitality and Tourism ">
                    Hospitality and Tourism
                  </option>

                  <option value=" Media and Entertainment ">
                    Media and Entertainment
                  </option>

                  <option value="  Government and Public Sector">
                    Government and Public Sector
                  </option>

                  <option value="  Government and Public Sector">
                    Nonprofit and Social Services
                  </option>

                  <option value="   Transportation and Logistics">
                    Transportation and Logistics
                  </option>

                  <option value=" Energy and Utilities">
                    Energy and Utilities
                  </option>

                  <option value="  Telecommunications">
                    Telecommunications
                  </option>

                  <option value="   Agriculture and Farming">
                    Agriculture and Farming
                  </option>
                </CustomSelect>

                <CustomSelect
                  label="Country"
                  onChange={handleChange1}
                  name="country"
                  selectHeight="h-[48px]"
                  bgColor="white"
                >
                  <option value="">Choose Country</option>
                  <option value="delhi ">India</option>
                </CustomSelect>

                <TextField
                  label="Registration Num"
                  bgColor="white"
                  type="text"
                  textSize="lg"
                  placeHolder="Enter Num"
                  name="organizationRegistrationNumber"
                  onChange={handleChange}
                />
                <TextField
                  label="PAN No."
                  bgColor="white"
                  type="text"
                  textSize="lg"
                  placeHolder="Enter Your Pan num"
                  onChange={handleChange}
                  name="pan"
                />

                <TextField
                  label="Contact No."
                  bgColor="white"
                  type="text"
                  textSize="lg"
                  placeHolder="Enter Your contactNo"
                  onChange={handleChange}
                  name="contactNo"
                />

                <TextField
                  label="GSTIN No."
                  bgColor="white"
                  type="text"
                  textSize="lg"
                  onChange={handleChange}
                  name="gstin"
                  placeHolder="Enter Your GSTIN"
                />

                <TextField
                  label="Contact Person Name"
                  bgColor="white"
                  type="text"
                  textSize="lg"
                  name="contactPersonName"
                  placeHolder="Enter Person Name"
                  onChange={handleChange}
                />

                <TextField
                  label="Contact Person Email ID"
                  bgColor="white"
                  type="text"
                  textSize="lg"
                  onChange={handleChange}
                  placeHolder="Enter Person Email ID"
                  name="contactPersonEmail"
                />
              </div>
            </div>

            {/* Company Address */}

            <div>
              <Text size="lg" weight="semibold" classname="mb-3 mt-7">
                Company Address
              </Text>
            </div>

            <div className="grid grid-cols-1 gap-0 mb-2">
              <TextField
                label="Address Line 1"
                bgColor="white"
                type="text"
                textSize="lg"
                name="address1"
                onChange={handleChange1}
                placeHolder="Enter Your Address"
              />
            </div>

            <div className="grid grid-cols-1 gap-0 mb-2">
              <TextField
                label="Address Line 2"
                bgColor="white"
                type="text"
                textSize="lg"
                name="address2"
                placeHolder="Enter Your Address"
                onChange={handleChange1}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-2">
              <TextField
                label="City"
                bgColor="white"
                type="text"
                textSize="lg"
                name="city"
                placeHolder="Enter Your City"
                onChange={handleChange1}
              />

              <TextField
                label="State"
                bgColor="white"
                type="text"
                textSize="lg"
                name="state"
                placeHolder="Enter Your State"
                onChange={handleChange1}
              />

              <TextField
                label="Zip Code"
                bgColor="white"
                type="text"
                textSize="lg"
                name="pinCode"
                placeHolder="Enter Your Zipcode"
                onChange={handleChange1}
              />
            </div>



          </form>
        </div>
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async (appCtx) => {
  let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
  const auth = await authApi.WhoAmI(appCtx);
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: auth,
      access_token,
    },
  };
};

export default AddOganisation;
