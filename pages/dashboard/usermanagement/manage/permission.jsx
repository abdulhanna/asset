import React, { useCallback, useEffect, useMemo, useState } from "react";
import MainLayout from "proj-components/MainLayout";
import { LeftArrowIcon } from "@/components/atoms/icons";
import { Text1 } from "@/components/atoms/field";
import Button from "@/components/atoms/button";
import { useRouter } from "next/router";
import { TextField, CustomSelect } from "@/components/atoms/field";
import PermissionToggle from "proj-components/Dashboard/user-management/permissionItem";
import authApi from "helpers/use-api/auth";
import userManageApi from "helpers/use-api/user-management/manage";

const Permission = ({ user, access_token }) => {
  const router = useRouter();
  const [permission, setPermission] = useState({
    moduleName: "",
    dashboardType: "",
    read: true,
    readWrite: false,
    actions: false,
    allAccess: false,
    removeAccess: false,
  });
  //  console.log(access_token,'token')
  const handleToggle = useCallback(
    (e) => {
      // console.log(e,'e')
      let obj = { ...permission, [e.name]: e.status };
      if (obj.actions && obj.read && obj.readWrite) {
        obj["allAccess"] = true;
      } else {
        obj["allAccess"] = false;
      }
      setPermission(obj);
    },
    [permission]
  );

  const handleSubmit = async () => {
    try {
      const res = await userManageApi.addPermission(access_token, permission);
      console.log(res, "res");
      if (res.status == "201") {
        router.push("/dashboard/usermanagement/manage");
      }
    } catch (err) {
      console.error("Error", err);
    }
  };

  useEffect(() => {
    console.log(permission, "per");
  }, [permission]);

  return (
    <>
      <MainLayout User={user}>
        <div>
          <div className="flex justify-between items-center">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => router.back()}
            >
              <LeftArrowIcon />
              <Text1 size="2xl">Create Permission</Text1>
            </div>
            <div>
              <Button variant="contained" onClick={() => handleSubmit()}>
                SAVE{" "}
              </Button>
            </div>
          </div>
          <div className="my-10">
            <Text1>Module Name</Text1>
            <div className="flex items-center gap-4 mt-6">
              <TextField
                className="w-1/4"
                label="Module Name"
                value={permission.moduleName}
                onChange={(e) =>
                  setPermission({ ...permission, moduleName: e.target.value })
                }
              />
              <CustomSelect
                className="w-1/4"
                label="Dashboard Type"
                onChange={(e) =>
                  setPermission({
                    ...permission,
                    dashboardType: e.target.value,
                  })
                }
              >
                <option value={""}>Choose one</option>
                <option value={"root"}>Root</option>
                <option value={"user"}>SuperAdmin</option>
              </CustomSelect>
            </div>
          </div>
          <div className="space-y-6">
            <Text1>Permissions </Text1>
            <div className="flex gap-10">
              <PermissionToggle
                label="VIEW"
                value={"read"}
                status={permission.read}
                handleClick={(e) => handleToggle(e)}
              />
              <PermissionToggle
                label="EDIT"
                value={"readWrite"}
                status={permission.readWrite}
                handleClick={(e) => handleToggle(e)}
              />
              <PermissionToggle
                label="ACTION"
                value={"actions"}
                status={permission.actions}
                handleClick={(e) => handleToggle(e)}
              />
            </div>
          </div>
          {/* <div className='my-10 flex space-x-4'>
                <input type='checkbox' checked={permission.allAccess} value={permission.allAccess} onChange={(e)=>{
                  // console.log(e.target.checked?"checked":"unChecked",'ss')
                   if(e.target.checked){
                    setPermission({...permission,allAccess:e.target.checked,actions:true,read:true,readWrite:true,removeAccess:false})
                   }else{
                    setPermission({...permission,allAccess:e.target.checked,actions:false,read:false,readWrite:false,removeAccess:true})
                   }
                } }/>
                <Text1>show All Access/Remove All Access</Text1>
               </div> */}
        </div>
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

  return {
    props: {
      user: auth,
      access_token,
    },
  };
};

export default Permission;
