import React, { useEffect, useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import memberAccessApi from 'helpers/use-api/user-management/member'
import { LeftArrowIcon } from '@/components/atoms/icons'
import Button from '@/components/atoms/button'
import { CustomSelect, Text1, TextField } from '@/components/atoms/field'
import { useRouter } from 'next/router'
import masterTableApi from 'helpers/use-api/master-table/table'
import { ToastContainer, toast } from "react-toastify";
import { DeleteIcon } from '@/components/atoms/icons'
const AddTable = ({access_token,user}) => {
  const [fields,setFields] = useState({
    codeGenerationType: "auto",
    tableCodeId:"",
    tableName:"",
    applicableTo:"",
    fields: "",
    fixedFields:   [
      {
        fieldName:"Code No",
        dataType:"alphanumeric",
        type:"text"
      },
      {
        fieldName:"Description",
        dataType:"alphanumeric",
        type:"text"
      },
      {
        fieldName:"Parent Code",
        dataType:"alphanumeric",
        type:'text'
      },
      // {
      //   fieldName:"Rate(%)",
      //   dataType:"number",
      //   depreciationType:'',
      //   options:['WDV','SLM','Usage']
      // }
    ],
    rateFields:[
      {
        fieldName:"Rate(%)",
        dataType:"number",
        depreciationType:'',
        options:['WDV','SLM','Usage']
      }
    ]
  })
  const router  = useRouter()
  const notify = (msg)=> toast.success(msg)
  const Error = (msg) => toast.error(msg)

  const addField = ()=>{
    let field = [...fields.rateFields]
    const a = {fieldName:`Rate${fields.rateFields.length}(%)`,
    dataType:'number',
    depreciationType:'',
    options:['WDV','SLM','Usage']}
    field = [...field,a]
    // console.log(field,'field')
    setFields({...fields,rateFields:field})
  }

  const callApi = async()=>{
    let result
    try{
      const res = await masterTableApi.addTable(access_token,fields)
      notify('Table added')
      result = res
      return  res
     
    }catch(err){
      Error(err?.response?.data?.error)
      console.log(err?.response?.data?.error,'err')
    }
  }
  const handleSubmit = async()=>{
        const result =await callApi()
        if(result !== undefined){
            router.push(`/dashboard/master-table/table/add-row?id=${result.data._id}`)
        }
  }

  const handleSubmit1 =async()=>{
    const result =await callApi()
    if(result !== undefined){
      router.push(`/dashboard/master-table/table/upload?id=${result.data._id}`)
     }
  }

  useEffect(()=>{
      console.log(fields,'eff')
  },[fields])
  return (
       <>
        <MainLayout User={user} isScroll={true}>
            <div className='space-y-4'>
                {/* HEADING  */}
               <div className="w-full flex justify-between items-center">
                    <div>
                      <div className="flex items-center cursor-pointer" onClick={()=> router.back()}>
                        <LeftArrowIcon />
                        <Text1 weight='' size="2xl" >
                          Design Master Table
                        </Text1>
                      </div>
                      <Text1 className="pl-4" size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
                    </div>
                   <div className='flex gap-4'>
                       <Button  variant="contained" onClick={handleSubmit}>DESIGN MANUALLY</Button>
                       <Button variant='contained' onClick={handleSubmit1}>UPLOAD MASTER TABLE</Button>
                   </div>
               </div>
               {/* TABLE Information */}
               <div className=''>
                <Text1 weight='semibold'>Table Information</Text1>
                   <div className='grid grid-cols-4 gap-11'>
                     <TextField  label='Master Table Name' name='tableName' onChange={(e)=> setFields({...fields,[e.target.name]:e.target.value})}/>
                     <div className='flex flex-col py-2 gap-2'>
                       <Text1 size='sm' className='text-textColor'> Department Id will be generated</Text1>
                        <div className='space-x-2' onChange={(e)=>setFields({...fields,[e.target.name]:e.target.value})}>
                            <label htmlFor='manual'>Manual</label>
                            <input type='radio' id='manual' name='codeGenerationType' value={'manual'} />
                            <label htmlFor='automatic'>Automatic</label>
                            <input type='radio' id='automatic' name='codeGenerationType' value={'auto'} />
                        </div>
                     </div>
                     { fields.codeGenerationType === "manual" &&  <TextField label='TableCode' name='tableCodeId' onChange={(e)=> setFields({...fields,[e.target.name]:e.target.value})}/>}
                     <CustomSelect label={'Aplicable to'} name={'applicableTo'} onChange={(e)=> setFields({...fields,[e.target.name]:e.target.value})}>
                      <option value={''}>select</option>
                      <option value={'All'}>All</option>
                      <option value={'country'}>Country</option>
                      <option value={'organization'}>Organization</option>
                     </CustomSelect>
                   </div>
               </div>

               {/* FIXED FIELD */}
                <div>
                  <Text1 weight='semibold'>Fixed Fields</Text1>
                   <div className='hello'>
                   {fields.fixedFields.map((cur,index)=>{
                    {/* console.log(index,'ss') */}
                    return <div className='grid grid-cols-4 gap-4 items-center' key={index}>
                      <TextField label='Filed Name' value={cur.fieldName}/>
                       {cur.dataType === "number" ?<CustomSelect name={`depreciationType`}  label={`Depriciation Method`} onChange={(e)=>{
                        const data = [...fields.fields]
                        data[index].depreciationType=e.target.value;
                        setFields({...fields,fields:data})
                        // console.log(data)
                        }}>
                       <option value={''}>select</option>
                        {cur.options.map((option,id)=>{
                          return <option value={option} key={id}>{option}</option>
                        })}
                       </CustomSelect>:  <TextField label='Data Type' value={cur.dataType}/>}
                       {/* <div className='col-start-4 flex justify-end w-full pt-2'>{fields.fields.length-1 === index && <Button onClick={addField}>ADD RATE FIELD</Button>}</div> */}
                    </div>
                  })}
                   </div>
                </div>
                <div>
                   <div className='flex justify-between items-center'>
                     <Text1 weight='semibold'>Rate Fields</Text1>
                     <Button onClick={addField}>ADD RATE FIELD</Button>
                   </div>
                   {fields.rateFields.map((cur,index)=>{

                    return <div className='grid grid-cols-4 gap-4 items-center' key={index}>
                      <TextField label='Filed Name' value={cur.fieldName}/>
                       {cur.dataType === "number" ? <>
                       <CustomSelect name={`depreciationType`}  label={`Depriciation Method`} onChange={(e)=>{
                        const data = [...fields.rateFields]
                        data[index].depreciationType=e.target.value;
                        setFields({...fields,rateFields:data})
                        // console.log(data)
                        }}>
                       <option value={''}>select</option>
                        {cur.options.map((option,id)=>{
                          return <option value={option} key={id}>{option}</option>
                        })}
                       </CustomSelect>
                       
                       </>
                       :  <TextField label='Data Type' value={cur.dataType}/>}
                       <div className='col-start-4 flex justify-end w-full   pt-2'>{ <DeleteIcon className={' border border-red-400 rounded-md'} onClick={()=>{
                           const rate = [...fields.rateFields]
                                 rate.splice(index,1)
                                 setFields({...fields,rateFields:rate})
                          //  console.log(rate,'reate')
                       } }/>}</div>
                    </div>
                   })}

                </div>
                <ToastContainer/>
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
