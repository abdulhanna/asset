import { hostedAxios } from "../hostedAxios";

const memberAccessApi = {}

 memberAccessApi.add = (access_token,data)=>{
    return hostedAxios.post('/user-management/members/createMember', data,{
        headers: { 
         'Content-Type': 'multipart/form-data',
         Cookie: access_token }
    })
 }

 memberAccessApi.getAllMember =(access_token,page,pageSize,sort)=>{
    return hostedAxios.get(`/user-management/members?page=${page}&size=${pageSize}&sort=${sort}`,{
        headers: { Cookie: access_token }
    })
 }

 memberAccessApi.getRoles = (access_token)=>hostedAxios.get('user-management/roles/members-addition',{
    headers: { Cookie: access_token }
 })

 memberAccessApi.getMember = (access_token,id)=>hostedAxios.get(`user-management/members/member/${id}`,{
   headers: { Cookie: access_token }
 })

 memberAccessApi.updateMember = (access_token,id,data) =>hostedAxios.put(`/user-management/members/updateMember/${id}`,data,{
   headers: { 
      'Content-Type': 'multipart/form-data',
      Cookie: access_token }
 })

 memberAccessApi.deactivate = (access_token,id) => hostedAxios.put(`/user-management/members/deactivate/${id}`,{
   headers: { Cookie: access_token }
 })

 memberAccessApi.removeMember = (access_token,id) => hostedAxios.delete(`/user-management/members/delete/${id}`,{
   headers: { Cookie: access_token }
 })

 

export default memberAccessApi