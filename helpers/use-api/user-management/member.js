import { hostedAxios } from "../hostedAxios";

const memberAccessApi = {}

 memberAccessApi.add = (access_token,data)=>{
    return hostedAxios.post('/user-management/members/createMember', data,{
        headers: { cookie: access_token }
    })
 }

 memberAccessApi.getAllMember =(access_token)=>{
    return hostedAxios.get('/user-management/members',{
        headers: { cookie: access_token }
    })
 }

export default memberAccessApi