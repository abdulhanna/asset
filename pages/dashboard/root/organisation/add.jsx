import React from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import Text,{Text1,TextField} from "../../../../components/atoms/field";
import Button from '../../../../components/atoms/button';
const AddOganisation = () => {
  return (
    <>
    <MainLayout>
          <div className='flex justify-between mb-4'>
           <Text1 size="2xl" weight="medium">
              Add Organizations
          </Text1>
          <Button onClick={"handleAddButtonClick"} variant="contained">Save</Button>
          </div>
{/* Company Profile---------------------------------------------------------------------------------- */}
          <div>
          <Text size="lg" weight="semibold" classname='mb-3'>
              Company Profile
          </Text>
              <div class="grid grid-cols-4 gap-4">
              <TextField label="Email ID"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="EmailAddress" 
                         placeHolder="Enter Your Email"
                         />

              <TextField 
                         label="Password"  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         placeHolder="Enter Your Password" 
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
                         name="companyname" 
                         placeHolder="Enter Company Name"
                         />

              <TextField 
                         label="Industry Type"  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         placeHolder="Slect Type" 
                         />

               <TextField 
                         label="Country"  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         placeHolder="Slecte TYpe"
                         />
                
               <TextField 
                         label="Registration Num"  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         placeHolder="Enter NUm" 
                         />
               <TextField 
                         label="Pan No."  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         placeHolder="Enter Your Pan num" 
                         />

                <TextField 
                         label="GSTIN Num"  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         placeHolder="Enter Your GSTIN" 
                         /> 

                <TextField 
                         label="Contact Person Name"  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         placeHolder="Enter Person Name" 
                         />
                
                <TextField 
                         label="Contact Person Email ID"  
                         bgColor="white"
                         type="text"
                         textSize="lg" 
                         placeHolder="Enter Person Email ID" 
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
                         name="address1" 
                         placeHolder="Enter Your Address"
                         />
             </div>

             <div class="grid grid-cols-1 gap-0 mb-2">
              <TextField label="Address Line 2"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="address2" 
                         placeHolder="Enter Your Address"
                         />
             </div>

             <div class="grid grid-cols-3 gap-4 mb-2">
                      <TextField label="City"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="city" 
                         placeHolder="Enter Your City"
                         />
                        
                        <TextField label="State"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="State" 
                         placeHolder="Enter Your State"
                         />

                        <TextField label="Zip Code"        
                         bgColor="white"
                         type="text"
                         textSize="lg"
                         name="zipcode" 
                         placeHolder="Enter Your Zipcode"
                         />
             </div>


    </MainLayout>
    </>
  )
}

export default AddOganisation
   