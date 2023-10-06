import axios from "axios";


const liveUrl = "https://api.asset.dev.client.kloudlite.io"

const local = "http://localhost:4000";
const dj = "http://10.0.0.26:4000"

export const hostedAuthAxios = axios.create({
    baseURL: `${liveUrl}/auth`,
    // baseURL:`${local}/auth`,
    // baseURL: 'http://localhost:3000/auth',
    // baseURL:'http://10.0.0.26:4000/auth',

    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const hostedAxios = axios.create({
    baseURL: `${liveUrl}`,
    //  baseURL:`${local}`,
    // baseURL: 'http://localhost:3000/auth',
    // baseURL:'http://10.0.0.26:4000/auth',

    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

