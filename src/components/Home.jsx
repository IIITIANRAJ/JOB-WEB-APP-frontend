import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '@/redux/store'

const Home = () => {
  useGetAllJobs();
  const navigate = useNavigate();
  // Redirect to companies page if user is a recruiter
  const {user} = useSelector(store => store.auth);
  useEffect(() => {
    if(user?.role == 'recruiter'){
      navigate("/admin/companies") // Redirect to companies page if user is a recruiter
    }
  },[]);
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
