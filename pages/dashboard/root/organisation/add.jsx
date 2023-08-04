import React, { useEffect, useState } from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import Text,{Text1,TextField, CustomSelect} from "../../../../components/atoms/field";
import Button from '../../../../components/atoms/button';
import { useRouter } from 'next/router';


const AddOganisation = () => {

   const router = useRouter();

   const profileValue = {
      EmailAddress:"",
      password:"",
      companyName:"",
      industry:"",
      country:"",
      companyRegistrationNumber:"",
      panNumber:"",
      gstinNumber:"",
      personname:"",
      personEmail:"",
      companyAddress1:"",
      companyAddress2:"",
      city:"",
      State:"",
      zipcode:"",
   }

   const[companyprofileData, setCompanyprofileData] = useState(profileValue)
   const[profileErrors, setProfileErrors] = useState({});
   const[isSubmit, setIsSubmit] = useState(false);


   // Checking if profilerrors have 0 length and isSubmit true then show me an action
   useEffect(() => {
      if(Object.keys(profileErrors).length === 0 && isSubmit){
         // alert("done done")

      }
   }, [profileErrors])
   
   // Handling all data for Company Profile
   const handleChange =(e) => {
       e.preventDefault();
       const {name , value} = e.target;
       setCompanyprofileData({...companyprofileData, [name]:value})
      //  console.log(companyprofileData, "this is handle")
   }

   const validate = () => {
      const error = {}
      if(!companyprofileData.EmailAddress){
         error.EmailAddress = " Company Email is required !";
      }
      return error
   }

   // Submitbutton 
   const handleSubmit = (e) => {
      e.preventDefault();
      setProfileErrors(validate(companyprofileData))
      setIsSubmit(true)
      console.log("hiih", companyprofileData)
      router.push('/dashboard/root/organisation'); 
   }

  return (
    <>
    <MainLayout>
        
{/* Company Profile---------------------------------------------------------------------------------- */}
<form action="" onSubmit={handleSubmit}>
<div className='flex justify-between mb-4'>
           <Text1 size="2xl" weight="medium">
              Add Organizations
          </Text1>
          <Button type="submit" variant="contained">Save</Button>
          </div>
             <div>
          <Text size="lg" weight="semibold" classname='mb-3'>
              Company Profile
          </Text>
              <div class="grid grid-cols-4 gap-4">
                 <div>
                 <TextField label="Email ID"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="EmailAddress" 
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
                         placeHolder="Enter Your Password" 
                         onChange={handleChange}
                         />
             </div>

          </div>

{/* Profile INformation -------------------------------------------------------------------------------*/}

        <div>
          <Text size="lg" weight="semibold" classname='mb-3 mt-7'>
             Profile Information
          </Text>
              <div class="grid grid-cols-4 gap-4">
              <TextField label="Company Name"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="companyName" 
                         placeHolder="Enter Company Name"
                         onChange={handleChange}
                         />


              <CustomSelect label="Industry" 
                            onChange={handleChange}
                            name="industry"
                            bgColor="white"
                            selectHeight="h-[48px]"
                            >
                        <option value="">Industry type</option>
                        <option value="Reaserch and development ">
                            Reaserch And Development
                        </option>
              </CustomSelect>

              <CustomSelect label="Country" 
                            onChange={handleChange}
                            name="country"
                            selectHeight="h-[48px]"
                            bgColor="white"
                            >
                        <option value="">Choose Country</option>
                        <option value="delhi ">
                             Delhi
                        </option>
              </CustomSelect>

               <TextField 
                         label="Registration Num"  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         placeHolder="Enter Num" 
                         name="companyRegistrationNumber"
                         onChange={handleChange}
                         />
               <TextField 
                         label="Pan No."  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         placeHolder="Enter Your Pan num" 
                         onChange={handleChange}
                         name="panNumber"
                         />

                <TextField 
                         label="GSTIN Num"  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         onChange={handleChange}
                         name="gstinNumber"
                         placeHolder="Enter Your GSTIN" 
                         /> 

                <TextField 
                         label="Contact Person Name"  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         name="personname"
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
                         name="personEmail"
                         />

             </div>

          </div>

{/* Company Address */}

       <div> 
         <Text size="lg" weight="semibold" classname='mb-3 mt-7'>
             Company Address
          </Text>
       </div>

           <div class="grid grid-cols-1 gap-0 mb-2">
              <TextField label="Address Line 1"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="companyAddress1" 
                         onChange={handleChange}
                         placeHolder="Enter Your Address"
                         />
             </div>

             <div class="grid grid-cols-1 gap-0 mb-2">
              <TextField label="Address Line 2"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="companyAddress2" 
                         placeHolder="Enter Your Address"
                         onChange={handleChange}
                         />
             </div>

             <div class="grid grid-cols-3 gap-4 mb-2">
                      <TextField label="City"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="city" 
                         placeHolder="Enter Your City"
                         onChange={handleChange}
                         />
                        
                        <TextField label="State"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="State" 
                         placeHolder="Enter Your State"
                         onChange={handleChange}
                         />

                        <TextField label="Zip Code"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="zipcode" 
                         placeHolder="Enter Your Zipcode"
                         onChange={handleChange}
                         />
             </div>
    </form>


    </MainLayout>
    </>
  )
}

export default AddOganisation
   