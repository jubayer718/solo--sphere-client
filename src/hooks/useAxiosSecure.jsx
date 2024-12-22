import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials:true,
})

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(res => {
      console.log('from response ',res);
      return res
    })
   ,async error => {
    console.log('error caught from my own axios hook', error);
    if (error.status === 401 || error.status === 403) {
      // logout
      logOut();
      // navigate to redirect login
      navigate('/login')
    }
  }
  }, [logOut, navigate])
  return axiosSecure;
}
export default useAxiosSecure;