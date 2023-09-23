import React, { useEffect, useRef, useState } from "react";
import {
  Text1,
  TextField,
  InputField,
  CustomSelect,
} from "../../components/atoms/field";
import Button from "../../components/atoms/button";
import { ProfileIcon } from "../../components/atoms/icons";
import { Headerouter } from "../../proj-components/Layout/sub-components/header";
import authApi from "helpers/use-api/auth";
import { useRouter } from "next/router";

function Profile(props) {
  const initialValue = {
    organizationName: "",
    organizationRegistrationNumber: "",
    organizationType: "",
    pan: "",
    gstin: "",
    contactNo: "",
    mainAddress: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
    }
  };
  const [profileData, setProfileData] = useState(initialValue);
  const [profileErrors, setProfileErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("");
  const profileInfoRef = useRef(null);
  const addressRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "profile-information", ref: profileInfoRef },
        { id: "address-contact-details", ref: addressRef },
        // Add other sections here
      ];

      for (const section of sections) {
        const sectionElement = section.ref.current;
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 

  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    console.log(name,value,'checlk')
    setProfileData({ ...profileData, [name]: value });
  };

  const handleChange1 = (e)=>{
    const { name, value } = e.target;
    setProfileData({...profileData,mainAddress:{...profileData.mainAddress,[name]:value}})
  }
  

  useEffect(() => {
    if (Object.keys(profileErrors).length === 0 && isSubmit) {
      profileSubmit()
    }
  }, [profileErrors]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(profileData);
    setProfileErrors(validate(profileData));
    setIsSubmit(true);

  };

  const profileSubmit = async()=>{
 
    try{
      const res = await authApi.CompanyProfile(profileData)
      console.log(res.status,'res')
      if(res.status == 200){
         router.push('/dashboard')
      }
    
      setProfileData({ organizationName: "",  organizationRegistrationNumber: "",  organizationType: "",  pan: "", gstin: "", contactNo: "",  mainAddress: {     address1: "",      address2: "",    city: "",  state: "",  country: "",  pinCode: "" }})
    }catch(err){
      console.log(err,'eerrr')
    }
    
  }

  const profileHandle = () => {
  const scrollPosition = 0;

  window.scrollTo({
    top: scrollPosition,
    behavior: "smooth", 
  });
  } 

 
  const validate = () => {

    const errors = {};
    if (!profileData.organizationRegistrationNumber) {
      errors.organizationRegistrationNumber =
        " Company registration number is required!";
    }
    if (!profileData.organizationName) {
      errors.organizationName = " Company name is required !";
    }
    if (!profileData.organizationType) {
      errors.organizationType = "Industry name is required !";
    }
    if (!profileData.mainAddress.country) {
      errors.country = "country name is required !";
    }
    if (!profileData.pan) {
      errors.pan = "Pan number is required !";
    }
    if (!profileData.gstin) {
      errors.gstin = "GST number is required !";
    }
    if (!profileData.mainAddress.address1) {
      errors.addressLine1 = "address Line 1 is required !";
    }
    // if (!profileData.mainAddress.address2) {
    //   errors.addressLine2 = "address Line 2 is required !";
    // }
    if (!profileData.mainAddress.city) {
      errors.city = "City name is required !";
    }
    if (!profileData.mainAddress.state) {
      errors.state = "State name is required !";
    }
    if (!profileData.mainAddress.pinCode) {
      errors.zipCode = "pin code is required !";
    }
    // if (!profileData.countryCode) {
    //   errors.countryCode = "country code is required !";
    // }
    if (!profileData.contactNo) {
      errors.contactNo = "Contact number is required !";
    }

    return errors;
  };

   useEffect(()=>{
       console.log(profileData,'profile')
   },[profileData])

  return (
    <>
      <Headerouter />

      <div className="flex mx-[180px] gap-[50px] lg:gap-[100px] xl:gap-[150px] 2xl:gap-[371px]">
        <div className="w-[288px] my-[100px]">
        <div className="flexflex-col justify-between w-[288px] h-[888px] fixed">
            <div className=" flex flex-col gap-[52px]">
              <div className=" flex flex-col gap-5">
                <p className="text-2xl font-normal w-[285px]">
                  Let’s set up your account
                </p>
                <p className="text-sm font-normal text-[#000]">
                  Lorem ipsum dolor sit amet consectetur. Senectus enim
                  ultricies tellus mauris sapien dignissim ut tempor urna.
                </p>
              </div>
              <div className="flex flex-col gap-5">
              <p
                  className={`text-base cursor-pointer font-body ${
                    activeSection === "profile-information"
                      ? "text-blue-600 border-l-2 border-blue-600 p-2.5"
                      : "text-[#515151]"
                  }`}
                  onClick={profileHandle}
                >
                  Profile Information
                </p>
                <p
                  className={`text-base cursor-pointer font-body ${
                    activeSection === "address-contact-details"
                      ? "text-blue-600 border-l-2 border-blue-600 p-2.5"
                      : "text-[#515151]"
                  }`}
                  onClick={() => addressRef.current.scrollIntoView()}
                >
                  Address & Contact Details
                </p>
                <p className="text-base font-body text-[#515151]">
                  Billing & Plans
                </p>
            </div>
            <div>
              <ProfileIcon />
            </div>
          </div>
        </div>
        </div>

        <div className="w-full my-[100px]">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[52px] ">
              <div className=" flex flex-col gap-8">
                <Text1 size="xl" weight="medium" color="text-[#3B5FDA]">
                  Company logo
                </Text1>
                <div className="flex justify-between items-center">
                  <div className="border-2 w-[120px] h-[120px] rounded-full"></div>
                  {/* <CompanyLogo /> */}
                  <Button variant="primary">ADD LOGO</Button>
                </div>
              </div>
              <div className="border-b-2 border-dashed"> </div>

{/* Profile INformation Section------------------------------------------------------------------------------------- */}
               <div
                ref={profileInfoRef}
                className={`flex flex-col gap-5 ${
                  activeSection === "profile-information"
                    ? "bg-white text-blue-500 border-l-2 border-blue-600 p-3"
                    : ""
                }`}
              >
                {/* <button className="text-xl text-[#3B5FDA]" id="section1" >
                  Profile Information
                </button> */}
                <Text1 size="xl" weight="medium">Profile Information</Text1>
                <div className=" grid md:grid-cols-2  gap-x-[52px] gap-y-[40px]">
                  <div>
                    <TextField
                      bgColor="white"
                      label="Company Name"
                      name="organizationName"
                      // required={true}
                      placeHolder="input text"
                      onChange={handleChange}
                      roundedText="rounded-[4px]"
                    />
                    <p className="text-red-500">{profileErrors.organizationName}</p>
                  </div>
                  <div>
                    <CustomSelect
                      label={"Industry"}
                      selectHeight="h-[48px]"
                      name="organizationType"
                      onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="Reaserch and development ">
                        Reaserch And Development
                      </option>
                      <option value="Reaserch and development ">IT</option>
                    </CustomSelect>
                    <p className="text-red-500">{profileErrors.organizationType}</p>
                  </div>
                  <div>
                    <CustomSelect
                      label={"Country"}
                      selectHeight="h-[48px] "
                      name="country"
                      onChange={handleChange1}>
                      <option value="">select</option>
                      <option value="india">India</option>
                    </CustomSelect>
                    <p className="text-red-500">{profileErrors.country}</p>
                  </div>
                  <div>
                    <TextField
                      // bgColor="white"
                      label="Company Registration Number"
                      placeHolder="input text"
                      // required={true}
                      onChange={handleChange}
                      name="organizationRegistrationNumber"
                      roundedText="rounded-[4px]"
                    />
                    <p className="text-red-500">
                      {profileErrors.organizationRegistrationNumber}
                    </p>
                  </div>
                  <div>
                    <TextField
                      bgColor="white"
                      label="Pan Number"
                      placeHolder="input text"
                      // required={true}
                      onChange={handleChange}
                      roundedText="rounded-[4px]"
                      name="pan"
                    />
                    <p className="text-red-500">{profileErrors.pan}</p>
                  </div>
                  <div>
                    <TextField
                      bgColor="white"
                      label="GSTIN No."
                      // required={true}
                      onChange={handleChange}
                      name="gstin"
                      placeHolder="input text"
                      roundedText="rounded-[4px]"
                    />
                    <p className="text-red-500">{profileErrors.gstin}</p>
                  </div>
                </div>
              </div>
              <div className="border-b-2 border-dashed"> </div>
            {/* Address Contact Deatails Page------------------------------------------------------------------------------------------------- */}
            <div
                ref={addressRef}
                className={`flex flex-col gap-5 ${
                  activeSection === "address-contact-details"
                    ? "bg-white text-blue-500 border-l-2 border-blue-600 p-3"
                    : ""
                }`}
              >
                <Text1 size="xl" weight="medium" color="text-[#3B5FDA]" id="section2" >
                  Address & Contact Details
                </Text1>

                <div className="flex flex-col gap-[40px]">
                  <div className="flex flex-col gap-[40px]">
                    <div>
                      <TextField
                        bgColor="white"
                        label="Address Line 1"
                        placeHolder="input text"
                        onChange={handleChange1}
                        name="address1"
                        roundedText="rounded-[4px]"
                      />
                      <p className="text-red-500">
                        {profileErrors.addressLine1}
                      </p>
                    </div>
                    <div>
                      <TextField
                        bgColor="white"
                        label="Address Line 2"
                        placeHolder="input text"
                        onChange={handleChange1}
                        name="address2"
                        roundedText="rounded-[4px]"
                      />
                      <p className="text-red-500">
                        {profileErrors.addressLine2}
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2  gap-x-[52px] gap-y-[40px]">
                    <div>
                      <CustomSelect
                        label={"City"}
                        selectHeight="h-[48px] "
                        name="city"
                        onChange={handleChange1}>
                        <option value="">select</option>
                        <option value="mumbai">Mumbai</option>
                        <option value={'delhi'}>Delhi</option>
                        <option value={'lucknow'}>Lucknow</option>
                      </CustomSelect>
                      <p className="text-red-500">{profileErrors.city}</p>
                    </div>
                    <div>
                      <CustomSelect
                        label={"State"}
                        selectHeight="h-[48px] "
                        name="state"
                        onChange={handleChange1}>
                        <option value="">select</option>
                        <option value="maharashtra">Maharashtra</option>
                      </CustomSelect>
                      <p className="text-red-500">{profileErrors.state}</p>
                    </div>
                    <div>
                      <TextField
                        bgColor="white"
                        label="Zip Code"
                        type="number"
                        placeHolder="input text"
                        onChange={handleChange1}
                        name="pinCode"
                        roundedText="rounded-[4px]"
                      />
                      <p className="text-red-500">{profileErrors.zipCode}</p>
                    </div>

                    <div className="flex flex-col justify-center">
                      <div>
                        <label
                          htmlFor=""
                          className="text-[12px] text-textColor">
                          Contact No
                        </label>
                      </div>
                      <div>
                        <div className=" grid grid-cols-6 md:grid-cols-12 gap-[12px]">
                          <div className="col-span-3">
                            <InputField
                              placeHolder="+91"
                              name="countryCode"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-span-9">
                            <InputField
                            type={'number'}
                              placeHolder="00000 00000"
                              onChange={handleChange}
                              name="contactNo"
                            />
                          </div>
                        </div>

                        <p className="text-red-500">
                          {profileErrors.countryCode}
                        </p>

                        <p className="text-red-500">
                          {profileErrors.contactNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b-2 border-dashed"> </div>
              {/* Billings and PLans---------------------------------------------------------------------------------------------------------- */}
              <div>
                <Text1 size="xl" weight="medium" color="text-[#3B5FDA]">
                  Billings and plans
                </Text1>
              </div>
              <div className="flex flex-col">
                <Button variant="contained" type="submit">
                  SAVE & CONTINUE
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
