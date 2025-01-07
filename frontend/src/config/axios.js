import axios from 'axios';

const axiosInstance = axios.create({
     baseURL:"https://aiconvohub-backend.onrender.com",
   
    headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance;
