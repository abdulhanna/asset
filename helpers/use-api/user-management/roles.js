import { hostedAxios } from "../hostedAxios";

const userRolesApi = {};

userRolesApi.getPermissions = (access_token) =>{
  return hostedAxios.get("user-management/permissions/dashboardPermission", {  headers: { cookie: access_token } })};


userRolesApi.addRole = (access_token, data) => {
  return hostedAxios.post("/user-management/roles", data, {
    headers: { cookie: access_token }
  });
};

userRolesApi.getRoles = () => {
  return hostedAxios.get("user-management/roles", {
    headers: { cookie: access_token }
  });
};

export default userRolesApi;
