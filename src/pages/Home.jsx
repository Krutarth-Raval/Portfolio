import React from 'react'
import Introduction from '../components/Introduction'
import AcademicProjects from '../components/AcademicProjects'
import Experience from '../components/Experience'
import TechSkills from '../components/TechSkills'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import ContactForm from '@/UI/ContactForm'

const SectionWrapper = ({ children, bgImage }) => (
  <div className="relative w-full">
     <div className="sticky top-0 w-full h-[100dvh] z-0 overflow-hidden bg-black">
        <img 
          src={bgImage} 
          alt="Space Background" 
          className="w-full h-full object-cover filter contrast-125 brightness-110 saturate-150" 
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay for perfect text readability */}
     </div>
     <div className="relative z-10 w-full -mt-[100dvh]">
        {children}
     </div>
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <SectionWrapper bgImage="/Banners/BG-Banners/HeroBanner.png">
        <Introduction />
      </SectionWrapper>
      
      <SectionWrapper bgImage="/Banners/BG-Banners/ProjectsBanner.png">
        <AcademicProjects />
      </SectionWrapper>
      
      <SectionWrapper bgImage="/Banners/BG-Banners/ExperienceBanner.png">
        <Experience />
      </SectionWrapper>
      
      <SectionWrapper bgImage="/Banners/BG-Banners/SkillsBanner.png">
        <TechSkills />
      </SectionWrapper>
      
      <SectionWrapper bgImage="/Banners/BG-Banners/ServicesBanner.png">
        <Services />
      </SectionWrapper>
      
      <SectionWrapper bgImage="/Banners/BG-Banners/TestimonialsBanner.png">
        <Testimonials />
      </SectionWrapper>
      
      <SectionWrapper bgImage="/Banners/BG-Banners/ContactBanner.png">
        <ContactForm />
      </SectionWrapper>
    </div>
  )
}

export default Home