import { hostedAxios } from "./hostedAxios";

const orgApi = {}

orgApi.getAll = async (access_token)=>  hostedAxios.get('/organization', { headers: { cookie:access_token} })



export default orgApi;