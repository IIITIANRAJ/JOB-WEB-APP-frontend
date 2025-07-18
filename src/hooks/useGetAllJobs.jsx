import { setAllJobs } from "@/redux/jobSlice";
import store from "@/redux/store";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = async () => {
  const dispatch = useDispatch();
  const {searchedQuery} = useSelector(store => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
        if(res.data.success){
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};
export default useGetAllJobs;
