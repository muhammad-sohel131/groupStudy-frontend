import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UseAxiosApi = () => {
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate()
    const axiosApi = axios.create({
        baseURL : "https://group-study-backend-six.vercel.app",
        withCredentials: true
    })
    axiosApi.interceptors.response.use((response) => response, async (error) => {
        if(error.message === 'Network Error'){
            toast.error("Network Problem, Please check you internet!")
        }
        if(error.response?.status === 401){
            handleLogout();
            navigate("/")
        }
        return Promise.reject(error)
    })
     return axiosApi
}

export default UseAxiosApi