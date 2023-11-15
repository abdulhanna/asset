import React from 'react'
import { Text1 } from '../atoms/field'
import { DragDropArrow } from '../atoms/icons'
import { FileUploader } from 'react-drag-drop-files'
const CustomDragDrop = ({fileName})=>{
   
    return  <div className='w-full border border-slate-400 border-dashed h-48 flex flex-col justify-center items-center'>
    <DragDropArrow/>
      <Text1 className='text-textColor' size='sm'>Drop Your File here , OR  <span className='text-primary'>Browse</span></Text1>
      <Text1 className='text-textColor' size='sm'>Max. file size: 4MB (pdf, doc, docx)</Text1>
      <Text1 className='text-textColor'>{fileName?fileName?.name : "Not upload yet"}</Text1>
</div>
}
const UploadFile = ({handleChange,file}) => {
    const fileTypes = ["JPG", "PNG", "GIF","xlsx"];
  return (
    <div className='mt-8'>
    <div className='space-y-4'>
       {/* <Text1 weight='semibold'>Upload File</Text1> */}
       {/* <Text1 className='text-textColor'>Upload Document</Text1> */}
    </div>
    
    <FileUploader  handleChange={handleChange} name="file" types={fileTypes} >
    <CustomDragDrop fileName={file}/>
    </FileUploader>

   </div>
  )
}

export default UploadFile
