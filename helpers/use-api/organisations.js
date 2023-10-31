import { hostedAxios } from "./hostedAxios";

const orgApi = {}

orgApi.getAll = async (access_token, page, pageSize, sort) => hostedAxios.get(`/organization?page=${page}&size=${pageSize}&sort=${sort}`, { headers: { cookie: access_token } })
orgApi.saveProfile = async (access_token, data) => hostedAxios.post('/organization/add', data, { headers: { cookie: access_token } })
orgApi.getOrganizationvyId = async (access_token, id) => hostedAxios.get(`/organization/data/${id}`, { headers: { cookie: access_token } })
orgApi.editOrganization = async (access_token, id, data) => hostedAxios.put(`/organization/edit/${id}`, data, { headers: { cookie: access_token } })
orgApi.resendEmail = async (email) => hostedAxios.post(`/auth/resen-verification-email`, email)



export default orgApi;