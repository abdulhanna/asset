import React, {useState} from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import Overview from '../../overview'
import { EmptyData, Verified } from '../../../../components/atoms/icons'
import TableComp from '../../../../components//organism/tablecomp'
import {Text1} from "../../../../components/atoms/field";
import Button from '../../../../components/atoms/button';

import { useRouter } from 'next/router';

const OrganisationList = () => {

  const router = useRouter();

  const HeaderGoods = [
    { label: "Name", name: "name" },
    { label: "Type", name: "types" },
    {label:"Verification", name:"verification"},
    { label: "Batch", name: "batch" },
    { label: "Id Number", name: "id" },
    
  ];
  // const [Href, setHref] = useState("");

  const Headerbody = [
    { id: 1, name: "prince", types: "employe",verification:<Verified/>, batch: "B", id: "234" },
    { id: 2, name: "siddhu", types: "employe", verification:<Verified/>,batch: "B", id: "231" },
    { id: 3, name: "john", types: "employe", verification:<Verified/>,batch: "C", id: "3241" },
  ];

  const handleAddButtonClick = () => {
    router.push('/dashboard/root/organisation/add'); // This will navigate to the 'add-form' page
  };

  return (
   <>
     {/* <Overview loginRole={root}/> */}
      
     
      <div className='flex justify-between mb-4'>
      <Text1 size="2xl" weight="medium">
         All Organizations
     </Text1>
     <Button onClick={handleAddButtonClick} variant="contained" className="px-6 h-10">Add Organizations</Button>
     </div>

        <TableComp
          headers={HeaderGoods}
          responseData={(e) => console.log(e, "e")}
          body={Headerbody.map((item) => {
            return {
              ...item,
              href: `id=${item.id}&name=${item.name}`,
            };
          })}
          href={`/dashboard/root/organisation/organizationprofile?`}
        />
   
   </>
  )
}

export default OrganisationList
