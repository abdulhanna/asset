import React,{useState} from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { FileUploader } from "react-drag-drop-files";
import { DragDropArrow } from '@/components/atoms/icons'


const CustomDragDrop = ({fileName})=>{
   
    return  <div className='w-full border border-slate-400 h-48 flex flex-col justify-center items-center'>
    <DragDropArrow/>
      <Text1 className='text-textColor' size='sm'>Drop Your File here , OR  <span className='text-primary'>Browse</span></Text1>
      <Text1 className='text-textColor' size='sm'>Max. file size: 4MB (pdf, doc, docx)</Text1>
      <Text1 className='text-textColor'>{fileName?fileName?.name : "Not upload yet"}</Text1>
</div>
}

const Upload = ({user}) => {
    const [file, setFile] = useState(null);
    const router = useRouter()

    const fileTypes = ["JPG", "PNG", "GIF"];

    const handleSubmit = ()=>{

    }
   
    const handleChange = (file) => {
      setFile(file);
    };
  

  return (
   <>
    <MainLayout User={user}>
          <div>
             {/* HEADER */}
              <div className="w-full flex justify-between items-center space-y-2">
                    <div>
                      <div className="flex items-center cursor-pointer" onClick={()=> router.back()}>
                        <LeftArrowIcon />
                        <Text1 weight='' size="2xl" >
                          Design Master Table
                        </Text1>
                      </div>
                      <Text1 className="pl-4" size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
                    </div>
                    <Button href={'/dashboard/master-table/table/upload'} variant="contained" onClick={handleSubmit}>NEXT</Button>
               </div>

               {/* UPLOAD FILE */}
               <div className='mt-8'>
                <div className='space-y-4'>
                   <Text1 weight='semibold'>Upload File</Text1>
                   <Text1 className='text-textColor'>Upload Document</Text1>
                </div>
                
                <FileUploader  children={<CustomDragDrop fileName={file}/>} handleChange={handleChange} name="file" types={fileTypes} />

               </div>
               <div>
                 <Text1>OR, Download a sample file,  <span className='text-primary text-lg'>Sample File.csv</span> and re-upload.</Text1>
               </div>
              
          </div>
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

export default Upload
