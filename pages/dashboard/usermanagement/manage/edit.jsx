import React, { useState, useCallback } from "react";
import MainLayout from "proj-components/MainLayout";
import { Text1, CustomSelect, TextField } from "@/components/atoms/field";
import { LeftArrowIcon } from "@/components/atoms/icons";
import Button from "@/components/atoms/button";
import PermissionToggle, {
  PermissionToggleRead,
} from "proj-components/Dashboard/user-management/permissionItem";
import { useRouter } from "next/router";
import authApi from "helpers/use-api/auth";
import userManageApi from "helpers/use-api/user-management/manage";
import { ToastContainer, toast } from "react-toastify";
import { DeleteConfirm } from "@/components/molecules/dialog";

const Edit = ({ user, access_token, singlePermission }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen,setIsOpen] = useState(false)
  const [permission, setPermission] = useState(singlePermission.permission);
  const router = useRouter();
  const { id } = router.query;
  const notify = (msg) => toast.success(msg);
  // console.log(permission,'prer');

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

  const submitPermission = async () => {
    try {
      const res = await userManageApi.updatePermission(
        access_token,
        id,
        permission
      );
      console.log(res.status, "res");
      if (res.status == "200") {
        notify("permission update");
      }

      setTimeout(() => {
        router.push("/dashboard/usermanagement/manage");
      }, 2000);
    } catch (err) {
      console.error("submit permission err", err);
    }
    // console.log("submit", permission);
  };

  const deActivateRole = async () => {
    try {
      const res = await userManageApi.deActivate(access_token, permission._id);
      if (res.status == "200") {
        notify("role deactivate successfully");
      }

      setTimeout(() => {
        router.push("/dashboard/usermanagement/manage");
      }, 2000);
    } catch (err) {
      notify("error");
    }
    // alert(permission._id);
  };

// console.log(permission,'dd')
  return (
    <>
      <MainLayout User={user}>
        <div className="space-y-10">

        {/* HEADER SECTION */}
          <div className="flex justify-between items-center">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => router.back()}
            >
              <LeftArrowIcon />
              <Text1 size="2xl">Permission</Text1>
            </div>
            <div className="flex gap-5">
               <Button variant="danger" onClick={()=> setIsOpen(true)}>
                DELETE
              </Button>
              {isEdit ? (
                <Button variant="contained" onClick={submitPermission}>
                  SAVE
                </Button>
              ) : (
                <Button variant="contained" onClick={() => setIsEdit(!isEdit)}>
                  EDIT
                </Button>
              )}
             
            </div>
          </div>

          <div className="flex gap-11">
            <TextField
              className="w-1/4"
              label="Module Name"
              value={permission.moduleName}
              onChange={(e) =>
                setPermission({ ...permission, moduleName: e.target.value })
              }
              disabled={!isEdit}
            />
            <CustomSelect
              className={"w-1/4"}
              label={"Dashboard Type"}
              disabled={!isEdit}
            >
              <option value={permission.dashboardType}>
                {permission.dashboardType}
              </option>
              <option value={"root"}>Root</option>
              <option value={"superadmin"}>SuperAdmin</option>
            </CustomSelect>
          </div>

          {/* PERMISSION SECTION */}
          <div className="space-y-10">
            <Text1>Permissions</Text1>
            <div className="flex gap-10">
              {isEdit ? (
                <PermissionToggle
                  label={"VIEW"}
                  value={"read"}
                  status={permission.read}
                  handleClick={(e) => handleToggle(e)}
                />
              ) : (
                <PermissionToggleRead label={"VIEW"} status={permission.read} />
              )}
              {isEdit ? (
                <PermissionToggle
                  label={"EDIT"}
                  value={"readWrite"}
                  status={permission.readWrite}
                  handleClick={(e) => handleToggle(e)}
                />
              ) : (
                <PermissionToggleRead
                  label={"EDIT"}
                  status={permission.readWrite}
                />
              )}
              {isEdit ? (
                <PermissionToggle
                  label={"ACTION"}
                  value={"actions"}
                  status={permission.actions}
                  handleClick={(e) => handleToggle(e)}
                />
              ) : (
                <PermissionToggleRead
                  label={"ACTION"}
                  status={permission.actions}
                />
              )}
            </div>
          </div>

          {/* STATUS SECTION */}
          <div className="space-y-6 ">
            <Text1>Status</Text1>
            <CustomSelect
                className="w-1/4"
                label="Status"
                name={'isDeactivated'}
                disabled={!isEdit}
                value={permission.isDeactivated}
                onChange={(e) =>
                // console.log(e.target.value,'ss')
                  setPermission({
                    ...permission,
                    [e.target.name]:e.target.value
                    // dashboardType: e.target.value,
                  })
                }
              >
                <option value={""}>Choose one</option>
                <option value={false}>Active</option>
                <option value={true}>Inactive</option>
              </CustomSelect>
          </div>

          
          {/* <div className='my-10 flex space-x-4'>
                <input type='checkbox' checked={permission.allAccess} value={permission.allAccess} onChange={(e)=> setPermission({...permission,allAccess:e.target.checked})} disabled={!isEdit}/>
                <Text1>show All Access/Remove All Access</Text1>
               </div> */}

          {/* <div className='my-10 flex space-x-4'>
                <input type='checkbox' checked={permission.allAccess} value={permission.allAccess} onChange={(e)=>{
                  // console.log(e.target.checked?"checked":"unChecked",'ss')
                   if(e.target.checked){
                    setPermission({...permission,allAccess:e.target.checked,actions:true,read:true,readWrite:true,removeAccess:false})
                   }else{
                    setPermission({...permission,allAccess:e.target.checked,actions:false,read:false,readWrite:false,removeAccess:true})
                   }
                } } disabled={!isEdit}/>
                <Text1>show All Access/Remove All Access</Text1>
               </div> */}
          <ToastContainer />
          <DeleteConfirm check={isOpen}
             close={()=> setIsOpen(!isOpen)} 
            callDelete={deActivateRole} 
            heading={'Are you sure want to deactivate Permission'}
             para={'Are you want to deactivate the premission from the list'}/>
        </div>
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async (appCtx) => {
  let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;

  const { id } = appCtx.query;

  const auth = await authApi.WhoAmI(appCtx);

  if (!auth) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const { data } = await userManageApi.getPermission(access_token, id);

  return {
    props: {
      user: auth,
      access_token,
      singlePermission: data,
    },
  };
};

export default Edit;
