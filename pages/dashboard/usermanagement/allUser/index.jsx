import React, { useState, useEffect, useCallback } from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import NodataPage from '@/components/molecules/nodataPage'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { SampleTableNew } from '@/components/organism/tablecomp'
import authApi from 'helpers/use-api/auth'
import memberAccessApi from 'helpers/use-api/user-management/member'
import { DateTime } from 'luxon'
import Debounce from 'helpers/debounce'

const AllUser = ({ user, access_token, memberList }) => {
  const [list, setList] = useState(memberList)
  const [members, setMembers] = useState(memberList?.members)
  const [data, setData] = useState([])
  const [checkedNewData, setCheckedNewData] = useState([])
  const [page, setPage] = useState(memberList?.currentPage)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState({ "createdAt": -1 })
  const [allClick, setAllClick] = useState(false)
  const router = useRouter()
  const headerData = [
    { label: 'User Id', name: 'userCodeId' },
    { label: 'User Name', name: 'name' },
    { label: 'User Role', name: 'roleName' },
    // {label:'Branch', name:'branch'},
    // {label:'Email Id', name:'email'},
    // {label:'Contact No', name:'contact'},
    { label: 'Status', name: 'isDeactivated' },
    { label: 'created on', name: 'createdAt' }
  ]


  const clickAll = (e) => {
    setAllClick(!allClick)
  }

  const onNewCheck = (data) => {
    // console.log(data,'data')
    const exist = checkedNewData.find(
      (element) => element._id === data._id
    );
    // console.log(exist,'exit')
    if (exist) {
      setCheckedNewData(
        checkedNewData.filter((single) => single._id !== data._id)
      );
    } else {
      setCheckedNewData([...checkedNewData, data]);
    }
  }


  useEffect(() => {
    // console.log(checkedNewData,'cehc')
  }, [checkedNewData])

  useEffect(() => {
    if (allClick === true) {
      setCheckedNewData(members)
    } else {
      setCheckedNewData([])
    }
  }, [allClick])


  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        // console.log(args,'dd')
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      // console.log(timeout)
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      // console.log(callNow)
      if (callNow) func.apply(context, args);
    };
  };

  const callApi = useCallback(async (e) => {
    console.log('call Api', e.page)
    const res = await memberAccessApi.getAllMember(access_token, e.page, pageSize, JSON.stringify(sort))
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

  const onPageSize = useCallback(async (e) => {
    setPageSize(e.target.value)
    const res = await memberAccessApi.getAllMember(access_token, page, e.target.value, JSON.stringify(sort))
    setList(res.data)
    setMembers(res?.data?.members)
    setPage(res.data.currentPage)
    //  console.log(e.target.value,'onPageSoze',res)
  }, [])
  useEffect(() => {
    console.log(page, pageSize, 'useEffect')
  }, [page])
  //  console.log(memberList,'list',page,pageSize,sort)
  return (
    <>
      <MainLayout User={user}>
        <div className=''>
          <div className='flex justify-between items-center'>
            <div>
              <Text1 size='2xl'>All Member</Text1>
              <Text1 className='text-lightGray' size='sm'>We have nothing here yet. Start by adding a Field Group.</Text1>
            </div>
            <Button variant='contained' onClick={() => router.push('/dashboard/usermanagement/allUser/add-user')}>ADD MEMBER</Button>
          </div>
          {members?.length === 0 ? <NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'} /> : <div className=''>
            <SampleTableNew
              response={members?.map((row) => {
                return {
                  ...row, userCodeId: row?.userProfile?.userCodeId,
                  name: row.userProfile?.name,
                  // createdAt:row.createdAt,
                  // createdAt: DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
                  // createdAt: DateTime.fromISO(row.createdAt).toFormat('MM/dd/yy,hh:mm:a'),

                  roleName: row?.teamRoleId?.roleName
                }
              })}
              headerData={[{ name: 'check', label: '' }, ...headerData]}
              checkedData={checkedNewData}
              responseData={(e) => onNewCheck(e)}
              clickAll={clickAll}
              onClick={(e) => console.log(e, 'onclick')}
              href={`/dashboard/usermanagement/allUser/single?`}
              checkAllStatus={allClick}
              totalDoc={list?.totalDocuments}
              currentPage={page}
              start={list.startSerialNumber}
              end={list.endSerialNumber}
              pageSize={list?.totalPages}
              onPageChange={handlePage}
              onPageSize={onPageSize}
            />
          </div>}
        </div>
      </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
  let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
  // const auth = await authApi.WhoAmI(appCtx)
  // console.log(auth,'ddd')
  // if (!auth) {
  //   return {
  //     redirect: {
  //       destination: '/auth/login',
  //       permanent: false,
  //     },
  //   };
  // } 
  let page = 1
  let pageSize = 10
  let sort = { "createdAt": -1 };
  let memberList
  let auth
  try {
    auth = await authApi.WhoAmI(appCtx)
    if (!auth) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }
    const { data } = await memberAccessApi.getAllMember(access_token, page, pageSize, JSON.stringify(sort))
    memberList = data
  } catch (err) {
    console.log(err, 'err')
  }

  return {
    props: {
      user: auth,
      access_token,
      memberList: memberList || []
    }
  }

}


export default AllUser
