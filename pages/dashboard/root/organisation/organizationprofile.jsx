import React, { useState } from "react";
import MainLayout from "../../../../proj-components/MainLayout";
import Overview from "../../overview";
import { Text1 } from "../../../../components/atoms/field";
import Button from "../../../../components/atoms/button";
import { doCheckAuth } from "@/utils/doCheckAuth";
import orgApi from "helpers/use-api/organisations";
import { useRouter } from 'next/router';
import { LeftArrowIcon } from "@/components/atoms/icons";
import { Nodata } from "@/components/atoms/icons";
import EditOrganisation from "proj-components/Dashboard/organisation/edit-organisation";
import authApi from "helpers/use-api/auth";


const Profile = ({ user, getOrganizationbyId, access_token }) => {

  const [companyProfile, setCompanyprofileData] = useState(true)
  const [editme, setEditme] = useState(false)

  // console.log(getOrganizationbyId, "this is orangaisation")
  const [organisationName, setorganizationName] = useState(getOrganizationbyId)
  console.log(organisationName?.organization?.organizationName, "this is name")



  const router = useRouter();

  const handleAddButtonClick = () => {
    console.log("this is orangaisation")
    setCompanyprofileData(false)

  }

  const showedit = () => {
    console.log("show me")
    setEditme(true)
  }

  return (
    <>
      <MainLayout User={user} isScroll={true}>
        <div className="">
          {
            companyProfile == true ? <>
              <div className='flex justify-between mb-4'>
                <div className="flex items-center cursor-pointer space-x-2" onClick={() => router.back()}>
                  <LeftArrowIcon />
                  <Text1 size="2xl" weight="medium">
                    {organisationName?.organization?.organizationName}
                  </Text1>
                </div>
                {
                  companyProfile == true && <Button onClick={handleAddButtonClick} variant="contained">View Company Profile</Button>
                }

              </div>
              <div className=' rounded-md flex items-center justify-center inset-y-2/4 inset-x-2/4  mt-[350px] overflow-hidden'>
                <div className='text-center'>
                  <Nodata className={'flex justify-center'} />
                  <div className='mt-3'>
                    <span className='text-gray-600'>We have nothing here yet</span>
                    {/* <span className='text-blue-600 underline underline-offset-4'>Know how?</span> */}
                  </div>
                </div>
              </div>
            </> :
              <>
                <div>
                </div>
                <div className='px-3 mb-4'>

                  <EditOrganisation getOrganizationdetails={organisationName} access_token />

                </div>

              </>
          }
        </div>
      </MainLayout>
      {/* <Overview user={"root"}/> */}
    </>
  );
};


export const getServerSideProps = async (appCtx) => {



  const { id } = appCtx.query


  let access_token = 'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;

  const auth = await authApi.WhoAmI(appCtx);
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const { data } = await orgApi.getOrganizationvyId(access_token, id)
  {
    return {
      props: {
        user: auth,
        getOrganizationbyId: data,
        access_token
      },
    };
  }
};

export default Profile;
