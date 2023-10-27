import React, { useState, useEffect } from 'react'
import { OrganisationTableNew } from './table'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
import { useRouter } from 'next/router'
import { Verified, ResendEmail } from '@/components/atoms/icons'
import { CubeTransparentIcon } from '@heroicons/react/20/solid'
import { DateTime } from 'luxon'
import Debounce from 'helpers/debounce'
import orgApi from 'helpers/use-api/organisations'

const Organisations = ({ organisationList }) => {
  const [organisations, setOrganisations] = useState(organisationList)
  const [checkedNewData, setCheckedNewData] = useState([])
  const [allClick, setAllClick] = useState(false)
  const router = useRouter();


  console.log(organisations, 'hed------------------------------')

  const HeaderGoods = [
    { label: "Organization Name", name: "name" },
    { label: "GSTIN", name: "gst" },
    { label: "Email ID", name: "email" },
    { label: "CONTACT No", name: "contactNo" },
    { label: "CReated ON", name: "createdAt" },
    { label: "Action", name: "action" },

  ];
  const Headerbody = [
    { _id: 1, name: "prince", types: "employe", verification: <Verified />, batch: "B", id: "234" },
    { _id: 2, name: "siddhu", types: "employe", verification: <Verified />, batch: "B", id: "231" },
    { _id: 3, name: "john", types: "employe", verification: <ResendEmail />, batch: "C", id: "3241" },
  ];
  const clickAll = (e) => {
    setAllClick(!allClick)
  }

  const onNewCheck = (data) => {
    console.log(data, 'data')
    const exist = checkedNewData.find(
      (element) => element._id === data._id
    );
    console.log(exist, 'exit')
    if (exist) {
      setCheckedNewData(
        checkedNewData.filter((single) => single._id !== data._id)
      );
    } else {
      setCheckedNewData([...checkedNewData, data]);
    }
  }

  const onpageSize = () => {

  }

  const callApi = useCallback(async (e) => {
    console.log('call Api', e.page)
    let organizationList

    try {
      const res = await orgApi.getAll(access_token);
      organizationList = res?.data
    } catch (err) {
      console.log(err, 'err')
    }
    setList(res.data)
    setMembers(res?.data?.members)
    setPage(res.data.currentPage)
    console.log(res.data, 'res')
  }, [])

  const handleSearchChange = Debounce(callApi
    , 2000)


  const handlePage = async (e) => {
    //  console.log(e,'ee')
    let value = e
    handleSearchChange({ page: value })
    setPage(value)
  }

  useEffect(() => {
    console.log(checkedNewData, 'cehc')
  }, [checkedNewData])

  useEffect(() => {
    if (allClick === true) {
      setCheckedNewData(Headerbody)
    } else {
      setCheckedNewData([])
    }
  }, [allClick])

  return (
    <div>
      <OrganisationTableNew
        response={organisations?.organizations?.map((cur) => {
          return {
            ...cur,
            name: cur?.organizationName,
            types: cur?.organizationType,
            id: cur?.organizationRegistrationNumber,
            contactNo: cur?.contactNo,
            email: cur?.userId?.email,
            gst: cur?.gstin,
            createdAt: DateTime.fromISO(cur?.createdAt).toFormat('MMM-dd-yy, hh:mm:a'),
          }
        })}

        headerData={[{ name: 'check', label: '' }, ...HeaderGoods]}
        checkedData={checkedNewData}
        responseData={(e) => onNewCheck(e)}
        //  href={`/dashboard/root/organisation/organizationprofile?`}
        clickAll={clickAll}
        onClick={(e) => console.log(e, 'onclick')}
        checkAllStatus={allClick}
        totalDoc={organisationList?.totalDocuments}
        currentPage={organisationList?.currentPage}
        start={organisationList.startSerialNumber}
        end={organisationList.endSerialNumber}
        pageSize={organisationList?.totalPages}
        onpageSize={onpageSize}
        onPageChange={handlePage}
      />
    </div>
  )
}

export default Organisations
