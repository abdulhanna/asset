import { hostedAxios } from "../hostedAxios"
const masterTableApi = {}

masterTableApi.allTable = (access_token)=> hostedAxios.get('/master-table/listAllTables',{
    headers: { Cookie: access_token }
})

masterTableApi.addTable = (access_token,data)=> hostedAxios.post('/master-table/add',data,{
    headers: { Cookie: access_token }
})

masterTableApi.getTable = (access_token,id) => hostedAxios.get(`/master-table/tableDetails/${id}`,{
    headers: { Cookie: access_token } 
})

masterTableApi.getFileModel = (access_token,id)=> hostedAxios.get(`/master-table/generateSampleFile/${id}`,{
    headers: { Cookie: access_token } 
})

masterTableApi.removeTableById = (access_token,id)=> hostedAxios.delete(`/master-table/deleteTable/${id}`,{
    headers: { Cookie: access_token } 
})

masterTableApi.uploadFile = (access_token,data) => hostedAxios.put(`master-table/uploadTableData`,data,{
    headers: { 
        'Content-Type': 'multipart/form-data',
        Cookie: access_token }
})

masterTableApi.discardDraft = (access_token,id)=> hostedAxios.delete(`/master-table/deleteDraftTable/${id}`,{
    headers: { Cookie: access_token } 
})

masterTableApi.publishDraftTable = (access_token,id) => hostedAxios.put(`/master-table/publish/${id}`,{
    headers: { Cookie: access_token } 
})

masterTableApi.modifyTable = (access_token,id,data) => hostedAxios.put(`master-table/modifyTable/${id}`,data,{
    headers: { Cookie: access_token } 
})

export default masterTableApi