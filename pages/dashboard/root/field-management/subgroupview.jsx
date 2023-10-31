import React, { useState } from 'react'
import Text1 from '@/components/atoms/field'
import Button from '../../../../components/atoms/button';
import AddField from 'pages/testComponents/addField';
import { CloseIcon } from '@/components/atoms/icons';
import { DialogPage1 } from "@/components/molecules/dialog";
import { useRouter } from 'next/router';
import { AccordionField } from '@/components/molecules/accordion';



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

const Groupview = (allgroups) => {

  const [textHigh, setTextHigh] = useState(false);

  // console.log(allgroups?.allgroups, "this is daaa field managment")

  const data = [
    {
      id: 1,
      title: 'Asset test',
    }, {
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

  const ManageGroup = (id) => {
    console.log(id, "this is id")
  }

  console.log(allgroups, "this is all groups")


  return (
    <div>
      <div className="flex">
        {/* Left Side */}
        <div className="w-full h-[80vh] overflow-auto">
          {/* Add Field Button */}
          {/* Display Text */}
          {allgroups.allgroups?.map((component, index) => (
            <>
              <div key={component._id} className="flex justify-between  py-2 ">
                {/* <div className='flex'>
                  <Text1 size='2xl' >{component.groupName}</Text1>

                  {
                    component?.isMandatory === true && <><div className=' '>
                      <svg className="w-2 h-2 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div></>
                  }
                </div> */}

                <AccordionField label={component.groupName}
                  handleClick={ManageGroup}
                  data={component}
                  key={index}
                  id={component._id}>

                  <div>
                    {
                      component?.subgroups?.map((subGroup, index1) => {
                        return (
                          <>
                            <h1 className='text-gray-500 pb-4'>
                              {subGroup.subgroupName}
                            </h1>
                            <div className="grid grid-cols-4 gap-4 py-1 pb-5">
                              {
                                subGroup?.fields?.map((groupField) => {
                                  return (
                                    <>

                                      <div className="border rounded-md p-3 bg-[#F7F7F7]" >
                                        {groupField?.name}
                                      </div>
                                    </>
                                  )
                                })
                              }
                            </div>

                          </>
                        )
                      })
                    }
                  </div>

                </AccordionField>

              </div>
              <div>

              </div>

            </>



          ))}
        </div>
        {/* <AddtextField open={textHigh} close={() => setTextHigh(false)} /> */}
      </div>
    </div>
  )
}

export default Groupview