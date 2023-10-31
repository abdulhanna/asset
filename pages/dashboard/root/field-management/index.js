import React from 'react'
import MainLayout from '../../../../proj-components/MainLayout'
import FieldOverview from './fieldoverview'
import field from '../../../../helpers/use-api/fieldmanagment'
import SubGroupview from './subgroupview'
import Fieldgroupdescription from './fieldgroupdescription'
import { doCheckAuth } from '@/utils/doCheckAuth'
import authApi from 'helpers/use-api/auth'


const FieldMangment = ({ user, allgroups }) => {
  const handleAddButtonClick = () => {
    console.log("thhh",allgroups)
  }
  return (
    <>
      <MainLayout User={user} isScroll={false}>
        <div className=' mb-4  w-full h-[50px] items-center sticky top-0 '>
          <FieldOverview />
        </div>
        <div className=''>
          <SubGroupview allgroups={allgroups} />
        </div>
      </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {

  let access_token = 'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;

  const auth = await authApi.WhoAmI(appCtx)
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };

  }
  const getAllgroups = await field.getAllGroups(access_token)

  return {
    props: {
      user: auth,
      allgroups: getAllgroups.data || []
    }
  }


}


export default FieldMangment
