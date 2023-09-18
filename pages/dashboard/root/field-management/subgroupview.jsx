import React, {useState} from 'react'
import Text1 from '@/components/atoms/field'
import Button from '../../../../components/atoms/button';
import AddField from 'pages/testComponents/addField';
import { CloseIcon } from '@/components/atoms/icons';
import {DialogPage1} from "@/components/molecules/dialog";
import { useRouter } from 'next/router';



// const AddtextField = ({ open, close }) => {
   
//   return (
//     <>
//       <DialogPage1 open={open} close={close} width="w-[1288px]">
//         <div className="w-full text-right  pb-3 pr-8">
//           <button onClick={close} >
//             <CloseIcon/>
//           </button>
//         </div>
//         <AddField />
//       </DialogPage1>
//     </>
//   );
// };

const Groupview =() => {

  const [textHigh, setTextHigh] = useState(false);

 

  const data = [
    {
      id: 1,
      title: 'Asset Description',
    },{
      id: 2,
      title: 'Asset Acquisition',
    },
    {
      id: 3,
      title: 'UOM',
    },
    {
      id: 4,
      title: 'Asset newsletters',
    }
  ]



  const AddFieldbtn = () => {
      setTextHigh(true)
  }

  const editGroup = () => {
    router.push('/dashboard/root/field-management/editGroup');
  }

  // Manage Group Functions:

  const ManageGroup =(id) => {
      console.log(id,"this is id")
  }


  return (
    <div>
  
    <div className="flex h-screen">
    {/* Left Side */}
    <div className="w-full ">
      {/* Add Field Button */}
      {/* Display Text */}
      {data.map((component) => (
        <div key={component.id} className="flex justify-between pl-2 py-4 mb-2">
           <Text1 size='lg' weight='medium'> 
             {component.title}
           </Text1>
           <div>
           {/* <Button  onClick={() => setTextHigh(true)} className="mb-2 bg-blue-500 hover:bg-blue-600 hover:text-white px-6 py-2 mx-4 rounded transition transform hover:scale-110 ">
              Add Field
           </Button>
          <Button onClick={editGroup} className="mb-2 bg-green-500 hover:border-green-500 hover:bg-green-600 hover:text-white px-6 py-2 rounded transition transform hover:scale-110 ">
            Edit Group
          </Button> */}
             <Button  onClick={ManageGroup} href={`/dashboard/root/field-management/fieldgroupdescription?id=${component?.id}&name=${component?.title}`} className="mb-2 bg-blue-500 hover:bg-blue-600 hover:text-white px-6 py-2 mx-4 rounded transition transform hover:scale-110 ">
              Manage Group
           </Button>
           </div>
        </div>
      ))}
    </div>
    {/* <AddtextField open={textHigh} close={() => setTextHigh(false)} /> */}
     </div>
    </div>
  )
}

export default Groupview