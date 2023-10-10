import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import memberAccessApi from 'helpers/use-api/user-management/member'
import { LeftArrowIcon } from '@/components/atoms/icons'
import Button from '@/components/atoms/button'
import { CustomSelect, Text1, TextField } from '@/components/atoms/field'
const AddTable = ({access_token,user}) => {
  const [fields,setFields] = useState([
    {
      fieldName:"Code No",
      type:"Alphanumeric"
    },
    {
      fieldName:"Description",
      type:"Alphanumeric"
    }
  ])
  const handleSubmit = ()=>{

  }
  return (
       <>
        <MainLayout User={user}>
            <div className='space-y-5'>
                {/* HEADING  */}
               <div className="w-full flex justify-between items-center py-4">
                    <div>
                      <div className="flex items-center cursor-pointer" onClick={()=> router.back()}>
                        <LeftArrowIcon />
                        <Text1 weight='' size="2xl" >
                          Design Master Table
                        </Text1>
                      </div>
                      <Text1 className="pl-4" size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
                    </div>
                    <Button variant="contained" onClick={handleSubmit}>NEXT</Button>
               </div>
               {/* TABLE Information */}
               <div className=''>
                <Text1 weight='semibold'>Table Information</Text1>
                   <div className='grid grid-cols-4 gap-11'>
                     <TextField  label='Master Table Name'/>
                     <div className='flex flex-col py-2 gap-2'>
                       <Text1 size='sm' className='text-textColor'> Department Id will be generated</Text1>
                        <div className='space-x-2'>
                            <label htmlFor='manual'>Manual</label>
                            <input type='radio' id='manual' name='location_id' onChange={(e)=> console.log(e)}/>
                            <label htmlFor='automatic'>Automatic</label>
                            <input type='radio' id='automatic' name='location_id' onChange={(e)=>console.log(e)}/>
                        </div>
                     </div>
                     <CustomSelect label={'Aplicable to'}>
                      <option value={''}>select</option>
                      <option value={'all'}>All</option>
                      <option value={'country'}>Country</option>
                      <option value={'organization'}>Organization</option>
                     </CustomSelect>
                   </div>
               </div>

               {/* TABLE FIELD */}
                <div>
                  <Text1 weight='semibold'>Table Fields</Text1>
                  {fields.map((cur,index)=>{
                    return <>
                      <TextField label='Filed Name' value={cur.fieldName}/>
                      <TextField label='Filed Name' value={cur.type}/>
                    </>
                  })}
                </div>
               </div>

            {/* </div> */}
        </MainLayout>
       </>
  )
}

export const getServerSideProps = async (appCtx) => {
    let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
    const auth =await authApi.WhoAmI(appCtx)
    // console.log(auth,'ddd')
    if (!auth) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    } 
  
    let roles 
    try{
    //   const {data} = await userRolesApi.getRoles(access_token)
    //   roles  =  data
    }catch(err){
      console.log(err,'err')
    }
    return {
      props:{
         user:auth,
         access_token,
         roles:roles||[]
      }
    }
  
  }

export default AddTable
