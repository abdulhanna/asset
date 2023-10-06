import { hostedAxios } from "./hostedAxios";

const field = {}

field.addGroup = async (access_token, data) => hostedAxios.post('/field-management/add-groups', data, { headers: { cookie: access_token } })

field.getAllGroups = async (access_token) => hostedAxios.get('/field-management/allGroups', { headers: { cookie: access_token } })

field.addField = async (access_token, id) => hostedAxios.post(`/fieldmanagment/${id}/add-field`, { headers: { cookie: access_token } })

field.addSubgroupbyID = async (access_token, id, data) => hostedAxios.put(`/field-management/${id}/add-subgroups`, data, { headers: { cookie: access_token } })

field.getSubgroupsbyId = async (access_token, id) => hostedAxios.get(`/field-management/group/${id}`, { headers: { cookie: access_token } })

export default field;