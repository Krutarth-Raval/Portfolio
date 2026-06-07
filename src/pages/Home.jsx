import React from 'react'
import Introduction from '../components/Introduction'
import AcademicProjects from '../components/AcademicProjects'
import Experience from '../components/Experience'
import TechSkills from '../components/TechSkills'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import ContactForm from '@/UI/ContactForm'

const Home = () => {
  return (
    <>

      <Introduction />
      <AcademicProjects />
      <Experience />
      <TechSkills />
      <Services />
      <Testimonials />
      <ContactForm />
    </>
  )
}

export default Home