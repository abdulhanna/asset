import React, { useState, useEffect } from "react";
import MainLayout from "proj-components/MainLayout";
import { Text1, TextField, TextInputArea } from "@/components/atoms/field";
import {
  LeftArrowIcon,
  ToggleButton,
  ToggleOnButton,
  DropDownIcon,
} from "@/components/atoms/icons";
import Button from "@/components/atoms/button";
import { Accordin } from "@/components/molecules/accordion";
import userRolesApi from "helpers/use-api/user-management/roles";
import { useRouter } from "next/router";
import authApi from "helpers/use-api/auth";
import { ToastContainer, toast } from "react-toastify";


const AddRoles = ({ user, access_token, permissions }) => {
  const router = useRouter();
  const [role, setRole] = useState({
    roleName: "",
    description: "",
    permissions: permissions,
  });
  const notify  = (msg) => toast.success(msg)

  const handleClick = (e) => {
    // console.log(e,'e')
    const data = [...role.permissions];
     const d = data[e.id]
    let key = Object.keys(e)[0];
  
  if (key === "removeAccess" && e[key] === true) {
    let obj = {}
        Object.entries(d).map((val,id) => {
      const [key, value] = val;
       
      if ( key === "actions" || key === 'read' || key === "readWrite"|| key === "allAccess" ) {
          console.log(key, value, 'val');
          obj[`${key}`]=false
      }
  });
  console.log(obj,'obj')
    data[e.id] = {
      ...data[e.id],
      [`${key}`]: e[key],
      ...obj
      // allAccess: false,
      // read: false,
      // readWrite: false,
      // delete: false,
      // actions:false
    };
    // console.log(obj,'ss')
  } else if (key === "allAccess" && e[key] === true) {
    let obj = {}
        Object.entries(d).map((val,id) => {
      const [key, value] = val;
      
      if ( key === "actions" || key === 'read' || key === "readWrite" ) {
          console.log(key, value, 'val');
          obj[`${key}`]=true
      }
    });
    data[e.id] = {
      ...data[e.id],
      [`${key}`]: e[key],
      removeAccess: false,
      ...obj
      // read: true,
      // readWrite: true,
      // delete: true,
      // actions:true
    };
  } else {
    let obj = {}
        Object.entries(d).map((val,id) => {
      const [key, value] = val;
      
      if ( key === "actions" || key === 'read' || key === "readWrite"|| key ==='removeAccesss' ) {
          console.log(key, value, 'val');
          obj[`${key}`]=false
      }
    });
    data[e.id] = {
      ...data[e.id],
      [`${key}`]: e[key],
      ...obj
      // removeAccess: false,
      // read: false,
      // readWrite: false,
      // delete: false,
      // actions:false
    };
  }
    setRole({
      ...role,
      permissions: data,
    });
  };

  const handleToggle = (e) => {
    const data = [...role.permissions];
    const key = Object.keys(e)[0];
    data[e.id] = { ...data[e.id], [`${key}`]: e[key], removeAccess: false };

    if (data[e.id].read && data[e.id].readWrite && data[e.id].actions) {
      // console.log('allacess')
      data[e.id] = { ...data[e.id], allAccess: true };
    } else {
      data[e.id] = { ...data[e.id], allAccess: false };
    }

    setRole({
      ...role,
      permissions: data,
    });
  };


  const handleSubmit =async()=>{
     try{
         const res = await  userRolesApi.addRole(access_token,role)
         if(res.status == "201"){
          notify('role added')
          setTimeout(()=>{
            router.push('/dashboard/usermanagement/roles')
          },2000)
         }
        //  console.log(res,'res')
     }catch(err){
      console.log(err,'err')
     }
  }
  useEffect(() => {
    // console.log(role, "d");
  }, [role]);

  return (
    <>
      <MainLayout isScroll={true} User={user}>
        <div>
          <div className="flex justify-between items-center py-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.back()}
            >
              <LeftArrowIcon />
              <Text1 size="2xl">Create Roles</Text1>
            </div>
            <Button variant="contained" onClick={handleSubmit}>SAVE</Button>
          </div>
          <div className="mt-8 space-y-8">
            <div className="space-y-3">
              <Text1>Role Name</Text1>
              <TextField
                className="w-1/4"
                value={role.roleName}
                label="Role Name"
                onChange={(e) => setRole({ ...role, roleName: e.target.value })}
              />
            </div>
            <div className="space-y-3">
              <Text1>Role Description</Text1>
              <TextInputArea
                value={role.description}
                label="Description"
                onChange={(e) => setRole({ ...role, description: e.target.value })}
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <Text1>Role Permissions</Text1>
                <Button
                  onClick={() => {
                    const data = [...role.permissions];
                    role.permissions.map((item, id) => {
                      role.permissions[id] = {
                        ...role.permissions[id],
                        removeAccess: true,
                        read: false,
                        readWrite: false,
                        allAccess: false,
                        delete: false,
                      };
                    });

                    setRole({ ...role, permissions: role.permissions });
                  }}
                >
                  RESTORE DEFAULTS
                </Button>
              </div>
              <div>
                {role.permissions.map((item, index) => {
                  {/* console.log(item,'row') */}

                return <Accordin  label={item.moduleName}
                      handleClick={handleClick}
                      data={item}
                      key={index}
                      id={index}>
                       
               <div className="flex gap-6 items-center">
               {Object.entries(item).map((val,id) => {
                 const [key, value] = val;
                  if ( key === "actions" || key === 'read' || key === "readWrite") {
                     return<div className="flex gap-1" key={id}> <Text1 className="capitalize" size="lg">{key}</Text1>
                               {value  ? <ToggleOnButton onClick={()=> handleToggle({ [`${key}`]:!value,id:index })}/>:<ToggleButton onClick={()=> handleToggle({ [`${key}`]:!value,id:index })}/>}
                          </div>
                      
                      }
               })}
               </div>

                     </Accordin>
   

                  {/* return (
                    <Accordin
                      label={item.moduleName}
                      handleClick={handleClick}
                      data={item}
                      key={index}
                      id={index}
                    >
                      <div className="flex items-center gap-6">

                        <div className="flex items-center gap-1">
                          <Text1 size="lg">READ</Text1>
                          {item.read ? (
                            <ToggleOnButton
                              onClick={() =>
                                handleToggle({ read: !item.read, id: index })
                              }
                            />
                          ) : (
                            <ToggleButton
                              onClick={() =>
                                handleToggle({ read: !item.read, id: index })
                              }
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Text1 size="lg">READ WRITE</Text1>
                          {item.readWrite ? (
                            <ToggleOnButton
                              onClick={() =>
                                handleToggle({
                                  readWrite: !item.readWrite,
                                  id: index,
                                })
                              }
                            />
                          ) : (
                            <ToggleButton
                              onClick={() =>
                                handleToggle({
                                  readWrite: !item.readWrite,
                                  id: index,
                                })
                              }
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Text1 size="lg">DELETE</Text1>
                          {item.delete ? (
                            <ToggleOnButton
                              onClick={() =>
                                handleToggle({
                                  delete: !item.delete,
                                  id: index,
                                })
                              }
                            />
                          ) : (
                            <ToggleButton
                              onClick={() =>
                                handleToggle({
                                  delete: !item.delete,
                                  id: index,
                                })
                              }
                            />
                          )}
                        </div>
                      </div>
                    </Accordin>
                  ); */}
                })}
              </div>
            </div>
          </div>
          <ToastContainer/>
        </div>
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async (appCtx) => {
  let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
  const auth = await authApi.WhoAmI(appCtx);
  console.log(access_token, "aa");
  if (!auth) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  let permissions;
  try {
    const { data } = await userRolesApi.getPermissions(access_token);
    permissions = data && data.map((role)=>{
      return {...role,moduleId:role._id}
    })
    // console.log(permissions, "per");
  } catch (err) {
    console.log(err, "err");
  }

  return {
    props: {
      user: auth,
      access_token,
      permissions: permissions || [],
    },
  };
};

export default AddRoles;
