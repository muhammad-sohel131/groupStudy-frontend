import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const UseAxiosApi = () => {
    const { handleLogout } = useContext(AuthContext);
    const axiosApi = axios.create({
        baseURL : "https://group-study-backend-six.vercel.app",
        withCredentials: true
    })
    axiosApi.interceptors.response.use((response) => response, async (error) => {
        if(error.response?.status === 401){
            handleLogout();
        }
        return Promise.reject(error)
    })
     return axiosApi
}

export default UseAxiosApi