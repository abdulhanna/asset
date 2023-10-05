import { hostedAxios } from "./hostedAxios";

const orgApi = {}

orgApi.getAll = async (access_token) => hostedAxios.get('/organization', { headers: { cookie: access_token } })
orgApi.saveProfile = async (access_token, data) => hostedAxios.post('/organization/add', data,{ headers: { cookie: access_token } })



export default orgApi;