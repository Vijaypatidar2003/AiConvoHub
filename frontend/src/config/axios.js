import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL:"https://aiconvohub-backend.onrender.com",
    baseURL:"https://aiconvohub-backend.vercel.app/",
    headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance;
