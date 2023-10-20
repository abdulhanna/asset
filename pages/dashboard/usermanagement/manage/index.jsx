import React, { useState, useEffect } from "react";
import MainLayout from "proj-components/MainLayout";
import NodataPage from "@/components/molecules/nodataPage";
import Button from "@/components/atoms/button";
import { Text1 } from "@/components/atoms/field";
import { PermissionActionTable } from "@/components/organism/tablecomp";
import { SampleTableNew } from "@/components/organism/tablecomp";
import authApi from "helpers/use-api/auth";
import userManageApi from "helpers/use-api/user-management/manage";

const Manage = ({ user, list }) => {
  const [permissionList, setPermissionList] = useState(list?.permissions);
  const [checkedNewData, setCheckedNewData] = useState([]);
  const [allClick, setAllClick] = useState(false);

  const headers = [
    {
      label: "Module Name",
      name: "moduleName",
    },
    {
      label: "Dashboard Type",
      name: "dashboardType",
    },
    {
      label: "Status",
      name: "isDeactivated",
    },
    {
      label: "created on",
      name: "createdAt",
    }
  ];

  const clickAll = () => {
    setAllClick(!allClick);
  };

  useEffect(() => {
    if (allClick === true) {
      setCheckedNewData(permissionList);
    } else {
      setCheckedNewData([]);
    }
  }, [allClick]);

  const onNewCheck = (data) => {
    // console.log(data,'data')
    const exist = checkedNewData.find((element) => element._id === data._id);
    console.log(exist, "exit");
    if (exist) {
      setCheckedNewData(
        checkedNewData.filter((single) => single._id !== data._id)
      );
    } else {
      setCheckedNewData([...checkedNewData, data]);
    }
  };

  // console.log(permissionList, "list");

  return (
    <>
      <MainLayout User={user}>
        <div className="">
          <div className="flex items-center justify-between">
            <div>
            <Text1 size="2xl">All Permissions</Text1>
            <Text1 size="sm" className="text-lightGray">We have nothing here yet. Start by adding a Field Group.</Text1>
            </div>
            <Button
              href={"/dashboard/usermanagement/manage/permission"}
              variant="contained"
            >
              CREATE PERMISSION
            </Button>
          </div>
          <div>
            {permissionList?.length === 0 ? (
              <NodataPage
                text={
                  "We have nothing here yet. Start by adding a Location. Know how?"
                }
              />
            ) : (
              <div>
                <SampleTableNew
                  response={permissionList}
                  headerData={[{ name: "check", label: "" }, ...headers]}
                  checkedData={checkedNewData}
                  responseData={(e) => onNewCheck(e)}
                  clickAll={clickAll}
                  href={`/dashboard/usermanagement/manage/edit?`}
                  onClick={(e) => console.log(e, "onclick")}
                  checkAllStatus={allClick}
                  totalDoc={list.totalDocuments}
                  currentPage={list?.currentPage}
                  start={list.startSerialNumber}
                  end={list.endSerialNumber}
                  pageSize={list?.totalPages}
                    onPageChange={(e)=> console.log(e)}
                />
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async (appCtx) => {
  let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
  // const auth = await authApi.WhoAmI(appCtx);
  // console.log(auth,'ddd')
  
  let page = 1
  let pageSize = 10
  let sort = {"createdAt":-1};
  let permissionList
  
   let auth
  try{
     auth = await authApi.WhoAmI(appCtx);
      
     if (!auth) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    const {data} = await userManageApi.getAllPermission(access_token,page,pageSize,JSON.stringify(sort));
    
    permissionList = data;
   

  }catch(err){
    console.log(err,'err')
  }
// console.log(permissionList,'list')
  return {
    props: {
      user: auth,
      list:permissionList|| [],
    },
  };
};

export default Manage;
