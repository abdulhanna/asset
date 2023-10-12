import React, { useState } from "react";
import MainLayout from "../../../../proj-components/MainLayout";
import Overview from "../../overview";
import { Text1 } from "../../../../components/atoms/field";
import Button from "../../../../components/atoms/button";
import { doCheckAuth } from "@/utils/doCheckAuth";
import { LeftArrowIcon } from "@/components/atoms/icons";
import orgApi from "helpers/use-api/organisations";
import { useRouter } from 'next/router';

const Profile = ({ user, getOrganizationbyId }) => {

  const router = useRouter();

  console.log(getOrganizationbyId, "this is orangaisation")
  return (
    <>
      <MainLayout User={user}>
        <div className='flex justify-between mb-4'>
          <div className='flex items-center cursor-pointer space-x-2' >
            <LeftArrowIcon />
            <Text1 size="2xl" weight="medium">
              {getOrganizationbyId?.organization?.organizationName}
              <p className="text-sm font-normal text-slate-400">We have nothing here yet. Start by adding an Organization.</p>
            </Text1>
          </div>


          <Button onClick={"handleAddButtonClick"} variant="contained">Add Organizations</Button>
        </div>
      </MainLayout>
      {/* <Overview user={"root"}/> */}
    </>
  );
};


export const getServerSideProps = async (appCtx) => {



  const { id } = appCtx.query


  let access_token = 'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;

  const auth = await doCheckAuth(appCtx);
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
        getOrganizationbyId: data
      },
    };
  }
};

export default Profile;
