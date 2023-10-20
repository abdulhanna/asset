import React, { useEffect, useState } from "react";
import Text, {
  Text1,
  TextField,
  CustomSelect,
} from "../../../components/atoms/field";
import Button from "../../../components/atoms/button";
import { useRouter } from "next/router";
import MainLayout from "../../MainLayout";
import { LeftArrowIcon } from "@/components/atoms/icons";
import orgApi from "helpers/use-api/organisations";
import { ToastContainer, toast } from 'react-toastify';

const EditOrganisation = ({ getOrganizationdetails, access_token }) => {
  const router = useRouter();

  const { id, name } = router.query;
  console.log(id, "this is id");
  console.log(getOrganizationdetails.organization?.contactPersonName, "this")


  // setting all values from props data 

  const organizationValue =
  {
    email: getOrganizationdetails?.organization?.userId?.email,
    password: getOrganizationdetails?.organization?.userId?.password,

    organizationName: getOrganizationdetails?.organization?.organizationName,
    organizationRegistrationNumber: getOrganizationdetails?.organization?.organizationRegistrationNumber,
    organizationType: getOrganizationdetails?.organization?.organizationType,
    pan: getOrganizationdetails?.organization?.pan,
    gstin: getOrganizationdetails?.organization?.gstin,
    contactNo: getOrganizationdetails?.organization?.contactNo,
    contactPersonName: getOrganizationdetails?.organization?.contactPersonName,
    contactPersonEmail: getOrganizationdetails?.organization?.contactPersonEmail,

    mainAddress: {
      address1: getOrganizationdetails?.organization?.mainAddress?.address1,
      address2: getOrganizationdetails?.organization?.mainAddress?.address2,
      city: getOrganizationdetails?.organization?.mainAddress?.city,
      state: getOrganizationdetails?.organization?.mainAddress?.state,
      country: getOrganizationdetails?.organization?.mainAddress?.country,
      pinCode: getOrganizationdetails?.organization?.mainAddress?.pinCode
    }
  }

  const [companyprofileData, setCompanyprofileData] = useState(organizationValue);
  const [profileErrors, setProfileErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [editprofile, setEditprofile] = useState(true)
  const [isHovered, setIshovered] = useState(false)

  const [showSave, setShowsave] = useState(false);

  const notify = (msg) => toast.success(msg)
  const error = (msg) => toast.error(msg)

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



  const editcompanydata = () => {
    setEditprofile(false)

  }


  // Submitbutton
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setProfileErrors(validate(companyprofileData));
    console.log(companyprofileData, "this is")
    // setIsSubmit(true);

    try {
      const res = await orgApi.editOrganization(access_token, id, companyprofileData);
      console.log(res, "this is a valid company profile");
      if (res.status == 200) {
        notify("Successfully updated company profile")
      }

    } catch (err) {
      console.log(err, "error");
      error(err.response.data.error)
    }

    //  router.push("/dashboard/root/organisation");
  };

  return (
    <>
      {/* Company Profile---------------------------------------------------------------------------------- */}
      <div>
        <div className="flex justify-between mb-4  w-full h-[50px] items-center  bg-white sticky top-0 z-50 ">
          <div className="flex justify-between items-center cursor-pointer space-x-2" onClick={() => router.back()}>
            <div className="flex items-center">
              <LeftArrowIcon />
              <Text1 size="2xl" weight="medium">
                {companyprofileData?.organizationName}
              </Text1>
            </div>

            {/* <div>
              {
                companyProfile == false && <Button onClick={showedit} variant="contained">Edit</Button>
              }
            </div> */}

          </div>
          {
            editprofile ? <>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  className="w-[100px] h-[40px]"
                  onClick={editcompanydata}
                >
                  Edit
                </Button>
              </div>

            </> :
              <>
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
              </>
          }
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
                  value={companyprofileData.email}
                  placeHolder="Enter Your Email"
                  onChange={handleChange}
                  disabled={editprofile}

                />
                <p className="text-red-500">{profileErrors.EmailAddress}</p>
                {isHovered && (
                  <div style={{ position: 'absolute', top: '100%', left: 0 }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '4px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)' }}>
                      This field is read-only.
                    </div>
                  </div>
                )}
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
                disabled
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
                value={companyprofileData?.organizationName}
                placeHolder="Enter Company Name"
                onChange={handleChange}
                disabled={editprofile}
              />

              <CustomSelect
                label="Industry"
                onChange={handleChange}
                disabled={editprofile}
                name="organizationType"
                bgColor="white"
                selectHeight="h-[48px]"
                value={companyprofileData?.organizationType}
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
                onChange={handleChange}
                disabled={editprofile}
                name="country"
                selectHeight="h-[48px]"
                value={companyprofileData?.country}
                bgColor="white"
              >
                <option value="">Choose Country</option>
                <option value="delhi ">Delhi</option>
              </CustomSelect>

              <TextField
                label="Registration Num"
                bgColor="white"
                type="text"
                textSize="lg"
                placeHolder="Enter Num"
                name="organizationRegistrationNumber"
                value={companyprofileData.organizationRegistrationNumber}
                onChange={handleChange}
                disabled={editprofile}
              />
              <TextField
                label="Pan No."
                bgColor="white"
                type="text"
                textSize="lg"
                placeHolder="Enter Your Pan num"
                value={companyprofileData.pan}
                onChange={handleChange}
                disabled={editprofile}
                name="pan"
              />

              <TextField
                label="Contact No."
                bgColor="white"
                type="text"
                textSize="lg"
                placeHolder="Enter Your contactNo"
                onChange={handleChange}
                disabled={editprofile}
                value={companyprofileData.contactNo}
                name="contactNo"
              />

              <TextField
                label="GSTIN Num"
                bgColor="white"
                type="text"
                textSize="lg"
                onChange={handleChange}
                disabled={editprofile}
                value={companyprofileData.gstin}
                name="gstin"
                placeHolder="Enter Your GSTIN"
              />

              <TextField
                label="Contact Person Name"
                bgColor="white"
                type="text"
                textSize="lg"
                name="contactPersonName"
                disabled={editprofile}
                value={companyprofileData.contactPersonName}
                placeHolder="Enter Person Name"
                onChange={handleChange}
              />

              <TextField
                label="Contact Person Email ID"
                bgColor="white"
                type="text"
                textSize="lg"
                value={companyprofileData.contactPersonEmail}
                onChange={handleChange}
                disabled={editprofile}
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
              disabled={editprofile}
              value={companyprofileData.mainAddress.address1}
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
              value={companyprofileData.mainAddress.address2}
              placeHolder="Enter Your Address"
              onChange={handleChange1}
              disabled={editprofile}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-2">
            <TextField
              label="City"
              bgColor="white"
              type="text"
              textSize="lg"
              name="city"
              value={companyprofileData.mainAddress.city}
              placeHolder="Enter Your City"
              onChange={handleChange1}
              disabled={editprofile}
            />

            <TextField
              label="State"
              bgColor="white"
              type="text"
              textSize="lg"
              name="state"
              value={companyprofileData.mainAddress.state}
              placeHolder="Enter Your State"
              onChange={handleChange1}
              disabled={editprofile}
            />

            <TextField
              label="Pin Code"
              bgColor="white"
              type="text"
              textSize="lg"
              name="pinCode"
              value={companyprofileData.mainAddress.pinCode}
              placeHolder="Enter Your Zipcode"
              onChange={handleChange1}
              disabled={editprofile}
            />
          </div>



        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditOrganisation;
