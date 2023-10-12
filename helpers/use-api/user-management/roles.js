import { hostedAxios } from "../hostedAxios";

const userRolesApi = {};

userRolesApi.getPermissions = (access_token) =>{
  return hostedAxios.get("user-management/permissions/dashboardPermission", {  headers: { Cookie: access_token } })};


userRolesApi.addRole = (access_token, data) => {
  return hostedAxios.post("/user-management/roles", data, {
    headers: { Cookie: access_token }
  });
};

userRolesApi.getRoles = (access_token) => {
  return hostedAxios.get("user-management/roles", {
    headers: { Cookie: access_token }
  });
};

userRolesApi.getRole = (access_token,id)=>{
   return  hostedAxios.get(`/user-management/roles/${id}`,{
    headers: { Cookie: access_token }
   })
}

userRolesApi.update = (access_token,id,data)=> hostedAxios.put(`/user-management/roles/${id}`,data,{
  headers: { Cookie: access_token }
})

export default userRolesApi;
