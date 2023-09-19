import axios from "axios";


const liveUrl = "https://api.asset.dev.client.kloudlite.io"

const local = "http://localhost:4000";
const dj = "http://10.0.0.51:3000"

export const hostedAuthAxios = axios.create({
    baseURL: `${liveUrl}/auth`,
    // baseURL: 'http://localhost:3000/auth',
    baseURL:'http://10.0.0.51:3000/auth',

    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

