import { hostedAxios } from "./hostedAxios";

const userManageApi = {}

userManageApi.addPermission = (access_token,data)=> hostedAxios.post('/user-management/permissions/create',data,{ headers: { cookie:access_token} })

userManageApi.getAllPermission = (access_token)=> hostedAxios.get('/user-management/permissions/all',{ headers: { cookie:access_token} })
 
export default userManageApi