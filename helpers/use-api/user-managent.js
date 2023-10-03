import { hostedAxios } from "./hostedAxios";

const userManageApi = {}

userManageApi.addPermission = (access_token,data)=> hostedAxios.post('/user-management/permissions/create',data,{ headers: { cookie:access_token} })

userManageApi.getAllPermission = (access_token )=> hostedAxios.get('/user-management/permissions/all',{ headers: { cookie:access_token} })

userManageApi.getPermission = (access_token,id)=> hostedAxios.get(`/user-management/permissions/list/${id}`,{ headers: { cookie:access_token} })

userManageApi.removePermission = (access_token,id)=> hostedAxios.delete(`/user-management/permissions/v2/${id}`,{ headers: { cookie:access_token} })

userManageApi.updatePermission = (access_token,id,data)=> hostedAxios.put(`user-management/permissions/update/${id}`,data,{ headers: { cookie:access_token} })

export default userManageApi