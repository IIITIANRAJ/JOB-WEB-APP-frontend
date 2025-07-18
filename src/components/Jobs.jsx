import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import {motion} from "framer-motion";

const Jobs = () => {
  const {allJobs,searchedQuery} = useSelector(store=>store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    const filterJobs = () => {
      if (searchedQuery) {
        const filtered = allJobs.filter(job =>
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.company.name.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
        setFilteredJobs(filtered);
      } else {
        setFilteredJobs(allJobs);
      }
    };

    filterJobs();
  },[allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>

          {filteredJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <motion.div key={job._id} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} exit={{ opacity: 0, x: -100 }}>
                    <Job job={job}/>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
