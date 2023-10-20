import { hostedAxios } from "./hostedAxios";

const field = {}

field.addGroup = async (access_token, data) => hostedAxios.post('/field-management/add-groups', data, { headers: { cookie: access_token } })

field.getAllGroups = async (access_token) => hostedAxios.get('/field-management/allGroups', { headers: { cookie: access_token } })

field.addField = async (access_token, id, data) => hostedAxios.put(`/field-management/add-field/${id}`, data, { headers: { cookie: access_token } })

field.addSubgroupbyID = async (access_token, id, data) => hostedAxios.put(`/field-management/${id}/add-subgroups`, data, { headers: { cookie: access_token } })

field.getSubgroupsbyId = async (access_token, id) => hostedAxios.get(`/field-management/group/${id}`, { headers: { cookie: access_token } })

field.updateGroup = async (access_token, id, data) => hostedAxios.put(`/field-management/update-group/${id}`, data, { headers: { cookie: access_token } })

field.addStep = async (access_token, data) => hostedAxios.post(`/form-step/associateAssetFormStepWithGroups`, data, { headers: { cookie: access_token } })

field.getAllSteps = async (access_token) => hostedAxios.get('/form-step/listAllSteps', { headers: { cookie: access_token } })

field.updateStepbyID = async (access_token, id, data) => hostedAxios.put(`/form-step/update-form/${id}`, data, { headers: { cookie: access_token } })

field.getStepsbyId = async (access_token, id) => hostedAxios.get(`/form-step/stepDetails/${id}`, { headers: { cookie: access_token } })

field.deleteSteps = async (access_token, id) => hostedAxios.delete(`/form-step/delete-form/${id}`, { headers: { cookie: access_token } })

field.stepsForm = async (access_token, step) => hostedAxios.get(`/field-management/allGroupsWithStepForm?stepNo=${step}`, { headers: { cookie: access_token } })

field.allStepsShow = async (access_token) => hostedAxios.get(`/form-step/listAllSteps`, { headers: { cookie: access_token } })

field.deleteGroup = async (access_token, id) => hostedAxios.delete(`/field-management/delete-group/${id}`, { headers: { cookie: access_token } })




export default field;