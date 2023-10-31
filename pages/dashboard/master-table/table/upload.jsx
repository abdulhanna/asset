import React,{useEffect, useState} from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { FileUploader } from "react-drag-drop-files";
import { DragDropArrow } from '@/components/atoms/icons'
import masterTableApi from 'helpers/use-api/master-table/table'
import { ToastContainer, toast } from "react-toastify";

const CustomDragDrop = ({fileName})=>{
   
    return  <div className='w-full border border-slate-400 h-48 flex flex-col justify-center items-center'>
    <DragDropArrow/>
      <Text1 className='text-textColor' size='sm'>Drop Your File here , OR  <span className='text-primary'>Browse</span></Text1>
      <Text1 className='text-textColor' size='sm'>Max. file size: 4MB (pdf, doc, docx)</Text1>
      <Text1 className='text-textColor'>{fileName?fileName?.name : "Not upload yet"}</Text1>
</div>
}

const Upload = ({user,fileModel,access_token}) => {
    const [file, setFile] = useState(null);
    const router = useRouter()
    const fileTypes = ["JPG", "PNG", "GIF","xlsx"];
    const notify =(msg)=> toast.success(msg)
    const Error = (msg)=> toast.error(msg)
    const handleSubmit = async()=>{
      const formData= new FormData()
      formData.append('file',file)
      formData.append('tableCodeId',fileModel.tableCodeId)

      try{
         const res = await masterTableApi.uploadFile(access_token,formData)
         console.log(res,'res')
         if(res.status == '200'){
            notify('Excel file uploaded')
         }
         setTimeout(()=>{
            router.push('/dashboard/master-table/table')
         })
        //  console.log(res,'res')
      }catch(err){
        // console.log(err.response.data.error,'err')
        Error(err?.response?.data?.error)
      }
    }
   
    const handleChange = (file) => {
      setFile(file);
    };
    
    const isBrowser = () => typeof window !== 'undefined';
    const handleDownload = async () => {
    try {
      // Trigger the download by opening the API route in a new window or tab
      const downloadUrl = fileModel.SampleFile;
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
   };

    useEffect(()=>{
        console.log(fileModel,'file')
    },[file])
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
                    <Button variant="contained" onClick={handleSubmit}>NEXT</Button>
               </div>

               {/* UPLOAD FILE */}
               <div className='mt-8'>
                <div className='space-y-4'>
                   <Text1 weight='semibold'>Upload File</Text1>
                   <Text1 className='text-textColor'>Upload Document</Text1>
                </div>
                
                <FileUploader  handleChange={handleChange} name="file" types={fileTypes} >
                <CustomDragDrop fileName={file}/>
                </FileUploader>

               </div>
               {/* LINK SECTION */}
               <div>
                 <Text1>OR, Download a sample file,  <span className='text-primary text-lg cursor-pointer' onClick={()=>{
                  // router.replace(fileModel.sampleFile)
                   if (isBrowser()) { //Only add the event listener client-side
        
                     handleDownload()
                    // window.open(fileModel.sampleFile, '_blank');
                    }
                 }}>Sample File.xlsx</span> and re-upload.</Text1>
               </div>
              <ToastContainer/>
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
    const {id} = appCtx.query
    if (!auth) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    } 
  
    let fileModel
    try{
      const {data} = await masterTableApi.getFileModel(access_token,id)
      fileModel  =  data
    }catch(err){
      console.log(err,'err')
    }
    return {
      props:{
         user:auth,
         access_token,
         fileModel:fileModel||[]
      }
    }
  
  }

export default Upload
