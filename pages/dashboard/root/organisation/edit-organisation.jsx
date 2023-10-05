import React, { useEffect, useState } from "react";
import Text, {
  Text1,
  TextField,
  CustomSelect,
} from "../../../../components/atoms/field";
import Button from "../../../../components/atoms/button";
import { useRouter } from "next/router";
import MainLayout from "../../../../proj-components/MainLayout";
import { LeftArrowIcon } from "@/components/atoms/icons";

const EditOrganisation = () => {
  const router = useRouter();

  const { id, name } = router.query;
  console.log(id, "this is id");

  const organizationValue = {
    EmailAddress: "test@gmail.com",
    password: "0000",
    companyName: "Test",
    industry: "IT",
    country: "INDIA",
    companyRegistrationNumber: "456577776676",
    panNumber: "9898776678",
    gstinNumber: "98787654567887654",
    personname: "Testuser",
    personEmail: "testuser@gmail.com",
    companyAddress1: "New Delhi, Delhi",
    companyAddress2: "Test",
    city: "test",
    State: "TEST",
    zipcode: "987678",
  };

  const [companyprofileData, setCompanyprofileData] =
    useState(organizationValue);
  const [profileErrors, setProfileErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showSave, setShowsave] = useState(true);

  // Checking if profilerrors have 0 length and isSubmit true then show me an action
  useEffect(() => {
    if (Object.keys(profileErrors).length === 0 && isSubmit) {
      // alert("done done")
    }
  }, [profileErrors]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCompanyprofileData({ ...companyprofileData, [name]: value });
    //  console.log(companyprofileData, "this is handle")
  };

  const validate = () => {
    const error = {};
    if (!companyprofileData.EmailAddress) {
      error.EmailAddress = " Company Email is required !";
    }
    return error;
  };

  // Submitbutton
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileErrors(validate(companyprofileData));
    setIsSubmit(true);
    setShowsave(!showSave);
    console.log("hiih", companyprofileData);
    {
      !showSave ? router.push("/dashboard/root/organisation") : null;
    }
  };

  return (
    <MainLayout isScroll={true}>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.back()}
            >
              <LeftArrowIcon />
              <Text1 size="2xl" weight="medium">
                Organization
              </Text1>
            </div>

            {showSave ? (
              <>
                <Button variant="contained" className="w-[100px] h-[40px]">
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  variant="contained"
                  className="w-[100px] h-[40px]"
                >
                  Save
                </Button>
              </>
            )}
          </div>
          <div>
            <Text size="lg" weight="semibold" classname="mb-3">
              Company Profile
            </Text>
            <div class="grid grid-cols-4 gap-4">
              <div>
                <TextField
                  label="Email ID"
                  bgColor="white"
                  type="text"
                  textSize="lg"
                  name="EmailAddress"
                  placeHolder="Enter Your Email"
                  onChange={handleChange}
                  disabled={showSave}
                  value={organizationValue.EmailAddress}
                />
                <p className="text-red-500">{profileErrors.EmailAddress}</p>
              </div>

              <TextField
                label="Password"
                bgColor="white"
                type="password"
                textSize="lg"
                name="password"
                placeHolder="Enter Your Password"
                onChange={handleChange}
                disabled={showSave}
                value={organizationValue.password}
              />
            </div>
          </div>

          {/* Profile INformation -------------------------------------------------------------------------------*/}

          <div>
            <Text size="lg" weight="semibold" classname="mb-3 mt-7">
              Profile Information
            </Text>
            <div class="grid grid-cols-4 gap-4">
              <TextField
                label="Company Name"
                bgColor="white"
                type="text"
                textSize="lg"
                name="companyName"
                placeHolder="Enter Company Name"
                onChange={handleChange}
                disabled={showSave}
                value={organizationValue.companyName}
              />

              <CustomSelect
                label="Industry"
                onChange={handleChange}
                name="industry"
                bgColor="white"
                selectHeight="h-[48px]"
                disabled={showSave}
                value={organizationValue.industry}
              >
                <option value="Industry type">Industry type</option>
                <option value="Reaserch and development ">
                  Reaserch And Development
                </option>
              </CustomSelect>

              <CustomSelect
                label="Country"
                onChange={handleChange}
                name="country"
                selectHeight="h-[48px]"
                bgColor="white"
                disabled={showSave}
                value={organizationValue.country}
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
                name="companyRegistrationNumber"
                onChange={handleChange}
                disabled={showSave}
                value={organizationValue.companyRegistrationNumber}
              />
              <TextField
                label="Pan No."
                bgColor="white"
                type="text"
                textSize="lg"
                placeHolder="Enter Your Pan num"
                onChange={handleChange}
                disabled={showSave}
                name="panNumber"
                value={organizationValue.panNumber}
              />

              <TextField
                label="GSTIN Num"
                bgColor="white"
                type="text"
                textSize="lg"
                onChange={handleChange}
                disabled={showSave}
                name="gstinNumber"
                placeHolder="Enter Your GSTIN"
                value={organizationValue.gstinNumber}
              />

              <TextField
                label="Contact Person Name"
                bgColor="white"
                type="text"
                textSize="lg"
                name="personname"
                placeHolder="Enter Person Name"
                onChange={handleChange}
                disabled={showSave}
                value={organizationValue.personname}
              />

              <TextField
                label="Contact Person Email ID"
                bgColor="white"
                type="text"
                textSize="lg"
                onChange={handleChange}
                placeHolder="Enter Person Email ID"
                name="personEmail"
                disabled={showSave}
                value={organizationValue.personEmail}
              />
            </div>
          </div>

          {/* Company Address */}

          <div>
            <Text size="lg" weight="semibold" classname="mb-3 mt-7">
              Company Address
            </Text>
          </div>

          <div class="grid grid-cols-1 gap-0 mb-2">
            <TextField
              label="Address Line 1"
              bgColor="white"
              type="text"
              textSize="lg"
              name="companyAddress1"
              onChange={handleChange}
              disabled={showSave}
              placeHolder="Enter Your Address"
              value={organizationValue.EmailAddress}
            />
          </div>

          <div class="grid grid-cols-1 gap-0 mb-2">
            <TextField
              label="Address Line 2"
              bgColor="white"
              type="text"
              textSize="lg"
              name="companyAddress2"
              placeHolder="Enter Your Address"
              onChange={handleChange}
              disabled={showSave}
              value={organizationValue.companyAddress1}
            />
          </div>

          <div class="grid grid-cols-3 gap-4 mb-2">
            <TextField
              label="City"
              bgColor="white"
              type="text"
              textSize="lg"
              name="city"
              placeHolder="Enter Your City"
              onChange={handleChange}
              disabled={showSave}
              value={organizationValue.companyAddress2}
            />

            <TextField
              label="State"
              bgColor="white"
              type="text"
              textSize="lg"
              name="State"
              placeHolder="Enter Your State"
              onChange={handleChange}
              disabled={showSave}
              value={organizationValue.State}
            />

            <TextField
              label="Zip Code"
              bgColor="white"
              type="text"
              textSize="lg"
              name="zipcode"
              placeHolder="Enter Your Zipcode"
              onChange={handleChange}
              disabled={showSave}
              value={organizationValue.zipcode}
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditOrganisation;
