import React from "react";
import MainLayout from "../../../../proj-components/MainLayout";
import authApi from "helpers/use-api/auth";
import orgApi from "helpers/use-api/organisations";
import Organisations from "proj-components/Dashboard/organisation/organisations";
import { Text1 } from "@/components/atoms/field";
import Button from "@/components/atoms/button";

const Page = ({ user, organisationList, access_token }) => {
  // console.log(user,'user',organisationList)

  return (
    <>
      <MainLayout User={user}>
        <div className="flex justify-between   my-0">
          <Text1 size="2xl">All Organizations</Text1>
          <Button href={"/dashboard/root/organisation/add"} variant="contained">
            ADD ORGANIZATION
          </Button>
        </div>
        <Organisations
          organisationList={organisationList}
          access_token={access_token}
        />
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async (appCtx) => {
  let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;

  const auth = await authApi.WhoAmI(appCtx);
  if (!auth) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
 let organizationList
 try{
  const res = await orgApi.getAll(access_token);
  organizationList=res?.data
 }catch(err){
  console.log(err,'err')
 }

  return {
    props: {
      user: auth,
      organisationList: organizationList|| [],
      access_token,
    },
  };
};

export default Page;
