import React, { useState,useEffect } from 'react'
import { OrganisationTableNew } from './table'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
import { useRouter } from 'next/router'
import { Verified,ResendEmail } from '@/components/atoms/icons'
import { CubeTransparentIcon } from '@heroicons/react/20/solid'

const Organisations = ({organisationList}) => {
    const [organisations,setOrganisations] = useState(organisationList)
    const [checkedNewData, setCheckedNewData] = useState([])
    const [allClick, setAllClick] = useState(false)
    const router = useRouter();
    

    // console.log(organisations[0],'hed')
    
    const HeaderGoods = [
        { label: "Name", name: "name" },
        { label: "Type", name: "types" },
        {label:"Verification", name:"verification"},
        { label: "GST No", name: "gstin" },
        { label: "Id Number", name: "id" },
        
      ];
    const Headerbody = [
        { _id: 1, name: "prince", types: "employe",verification:<Verified/>, batch: "B", id: "234" },
        { _id: 2, name: "siddhu", types: "employe", verification:<Verified/>,batch: "B", id: "231" },
        { _id: 3, name: "john", types: "employe", verification:<ResendEmail/>,batch: "C", id: "3241" },
      ];
    const clickAll = (e)=>{
        setAllClick(!allClick)
      }

    const onNewCheck=(data)=>{
        console.log(data,'data')
        const exist = checkedNewData.find(
            (element) => element._id === data._id
        );
        console.log(exist,'exit')
        if (exist) {
          setCheckedNewData(
              checkedNewData.filter((single) => single._id !== data._id)
          );
        } else {
          setCheckedNewData([...checkedNewData, data]);
        }
      }
    
    
      useEffect(()=>{
        // console.log(checkedNewData,'cehc')
    },[checkedNewData])
    
    useEffect(()=>{
        if(allClick === true){
          setCheckedNewData(organisations)
        }else {
          setCheckedNewData([])
        }
       },[allClick])

  return (
    <div>
       <OrganisationTableNew
          response={organisations.map((cur)=>{
            return {
              ...cur,
              name:cur.organizationName,
              types:cur.organizationType,
              id:cur.organizationRegistrationNumber,
              gstin:cur.gstin
            }
          })}
          headerData={[{ name: 'check', label:'' },...HeaderGoods]}
          checkedData={checkedNewData}
          responseData={(e) => onNewCheck(e)}
          //  href={`/dashboard/root/organisation/organizationprofile?`}
           clickAll={clickAll}
           onClick={(e)=> console.log(e,'onclick') }
           checkAllStatus={allClick}
           currentPage={1}
           pageSize={20}
           onPageChange={(page)=> console.log(page)}
        />
    </div>
  )
}

export default Organisations
