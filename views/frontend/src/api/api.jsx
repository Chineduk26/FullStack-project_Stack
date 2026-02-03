import axios from 'axios';

const api=create({
    baseUrl:"http://localhost:5000/api",
    headers:{
        "Content-Type":"application/json"
    }
})
export default api;