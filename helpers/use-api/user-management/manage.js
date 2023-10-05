import { hostedAxios } from "../hostedAxios";

const userManageApi = {};

userManageApi.addPermission = (access_token, data) => {
  return hostedAxios.post("/user-management/permissions/create", data, {
    headers: { cookie: access_token }
  });
};

userManageApi.getAllPermission = (access_token) => {
  return hostedAxios.get("/user-management/permissions/all", {
    headers: { cookie: access_token }
  });
};

userManageApi.getPermission = (access_token, id) => {
  return hostedAxios.get(`/user-management/permissions/list/${id}`, {
    headers: { cookie: access_token }
  });
};

userManageApi.removePermission = (access_token, id) => {
  return hostedAxios.delete(`/user-management/permissions/v2/${id}`, {
    headers: { cookie: access_token }
  });
};

userManageApi.updatePermission = (access_token, id, data) => {
  return hostedAxios.put(`user-management/permissions/update/${id}`, data, {
    headers: { cookie: access_token }
  });
};

userManageApi.deActivate = (access_token, id) => {
  return hostedAxios.put(`/user-management/permissions/deactivate/${id}`, {
    headers: { cookie: access_token }
  });
};

export default userManageApi;
