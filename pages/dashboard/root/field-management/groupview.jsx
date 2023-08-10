import React from 'react'
import Text1 from '@/components/atoms/field'
import Button from '../../../../components/atoms/button';
import AddField from 'pages/testComponents/addField';

const groupview =() => {

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
  console.log("check")
  }


  return (
    <div>
  
    <div className="flex h-screen">
    {/* Left Side */}
    <div className="w-full p-4 border-r">
      {/* Add Field Button */}
      {/* Display Text */}
      {data.map((component) => (
        <div key={component.id} className="flex justify-between ju py-4 mb-2">
           <Text1 size='lg' weight='medium'> 
             {component.title}
           </Text1>
           <div>
           <button onClick={AddFieldbtn} className="mb-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 mx-2 rounded">
              Add Field
           </button>
          <button className="mb-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
            Edit Group
          </button>
           </div>
        </div>
      ))}
    </div>
     </div>
    </div>
  )
}

export default groupview