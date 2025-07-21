import React from 'react'
import Introduction from '../components/Introduction'
import AcademicProjects from '../components/AcademicProjects'
import Experience from '../components/Experience'
import TechSkills from '../components/TechSkills'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <>
    <Introduction/>
    <AcademicProjects/>
    <Experience/>
    <TechSkills/>
    <Testimonials/>
    </>
  )
}

export default Home