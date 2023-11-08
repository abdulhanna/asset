import React, { useState, useEffect, useCallback } from 'react'
import { OrganisationTableNew } from './table'
import Button from '@/components/atoms/button'
import { Text1 } from '@/components/atoms/field'
import { useRouter } from 'next/router'
import { Verified, ResendEmail } from '@/components/atoms/icons'
import { CubeTransparentIcon } from '@heroicons/react/20/solid'
import { DateTime } from 'luxon'
import Debounce from 'helpers/debounce'
import orgApi from 'helpers/use-api/organisations'
import NodataPage from '@/components/molecules/nodataPage'
import { Homeskeleton } from '@/components/organism/Homeskeleton'

const Organisations = ({ organisationList, access_token }) => {
  const [list, setList] = useState(organisationList)
  const [organisations, setOrganisations] = useState(organisationList)
  const [checkedNewData, setCheckedNewData] = useState([])
  const [allClick, setAllClick] = useState(false)
  const [page, setPage] = useState(organisationList?.currentPage)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState({ "createdAt": -1 })
  const [loading, setLoading] = useState(false)
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

  const onPageSize = async (e) => {
    setPageSize(e.target.value)
    try {
      const res = await orgApi.getAll(access_token, page, e.target.value, JSON.stringify(sort));
      setList(res.data)
      setOrganisations(res?.data)
      setPage(res.data.currentPage)
    } catch (err) {
      console.log(err, 'err')
    }

  }

  const callApi = useCallback(async (e) => {
    console.log('call Api', e.page)
    let organizationList

    try {
      const res = await orgApi.getAll(access_token, e.page, pageSize, JSON.stringify(sort));
      setList(res.data)
      setOrganisations(res?.data)
      setPage(res.data.currentPage)
      console.log(res.data, 'res')
    } catch (err) {
      console.log(err, 'err')
    }

  }, [])

  const handleSearchChange = Debounce(callApi, 2000)


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

  useEffect(() => {
    setLoading(true)
    const wait = setTimeout(() => {
      // getInventoryData();
      // getInventorycarcount();
      setLoading(false);
    }, 1000)
    return () => clearTimeout(wait);
  }, []);

  console.log(organisationList.length, "this is length")

  return (
    <div>
      {
        organisationList.length == 0 ?
          <>
            <NodataPage text={"Add Organisation"} />
          </>
          :
          loading == false ? <>
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
                  createdAt: DateTime.fromISO(cur.createdAt).toFormat('dd-MM-yy, hh:mm:a'),
                }
              })}

              headerData={[{ name: 'check', label: '' }, ...HeaderGoods]}
              checkedData={checkedNewData}
              responseData={(e) => onNewCheck(e)}
              //  href={`/dashboard/root/organisation/organizationprofile?`}
              clickAll={clickAll}
              onClick={(e) => console.log(e, 'onclick')}
              checkAllStatus={allClick}
              totalDoc={list?.totalDocuments}
              currentPage={page}
              start={list.startSerialNumber}
              end={list.endSerialNumber}
              pageSize={list?.totalPages}
              onPageSize={onPageSize}
              onPageChange={handlePage}
            />
          </> : <Homeskeleton />
      }

    </div>
  )
}

export default Organisations
