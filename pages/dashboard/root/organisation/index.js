import React from "react";
import MainLayout from "../../../../proj-components/MainLayout";
import authApi from "helpers/use-api/auth";
import orgApi from "helpers/use-api/organisations";
import Organisations from "proj-components/Dashboard/organisation/organisations";
import { Text1 } from "@/components/atoms/field";
import Button from "@/components/atoms/button";
import { Nodata } from "@/components/atoms/icons";

const Page = ({ user, organisationList, access_token }) => {
  // console.log(user,'user',organisationList)


  return (
    <>
      <MainLayout User={user} isScroll={true}>
        <div className="flex justify-between   my-0">
          <Text1 size="2xl">All Organizations</Text1>
          <Button href={"/dashboard/root/organisation/add"} variant="contained">
            <span className="mr-2.5">+</span> ADD ORGANIZATION
          </Button>
        </div>

        {
          organisationList?.organizations?.length == 0 ? <>
            <div className=' rounded-md flex items-center justify-center inset-y-2/4 inset-x-2/4  mt-[320px] overflow-hidden'>
              <div className='text-center'>
                <Nodata className={'flex justify-center'} />
                <div className='mt-3'>
                  <span className='text-gray-600'> No Added Sub-group</span>
                </div>
              </div>
            </div>
          </> : <>
            <Organisations
              organisationList={organisationList}
              access_token={access_token}
            />
          </>
        }

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
  let page = 1
  let pageSize = 10
  let sort = { "createdAt": -1 };
  let memberList


  try {
    const res = await orgApi.getAll(access_token, page, pageSize, JSON.stringify(sort));
    organizationList = res?.data
  } catch (err) {
    console.log(err, 'err')
  }

  return {
    props: {
      user: auth,
      organisationList: organizationList || [],
      access_token,
    },
  };
};

export default Page;
