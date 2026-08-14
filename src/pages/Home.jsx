import React from 'react'
import Introduction from '../components/Introduction'
import AcademicProjects from '../components/AcademicProjects'
import Experience from '../components/Experience'
import TechSkills from '../components/TechSkills'
import Services from '../components/Services'
import Education from '../components/Education'
import Testimonials from '../components/Testimonials'
import ContactForm from '@/UI/ContactForm'

const SectionWrapper = ({ children, bgImage }) => (
  <div className="relative w-full min-h-[100vh]">
    <div
      className="sticky top-0 w-full h-[100vh] z-0 overflow-hidden bg-transparent transform-gpu p-1.5 sm:p-2 md:p-3"
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      <div className="w-full h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 sm:border-white/30 shadow-2xl">
        <img
          src={bgImage}
          alt="Space Background"
          className="w-full h-full object-cover filter contrast-125 brightness-110 saturate-150 transform-gpu"
        />
        <div className="absolute inset-0 bg-black/80" /> {/* Dark overlay for perfect text readability */}
      </div>
    </div>
    <div className="relative z-10 w-full -mt-[100vh]">
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

      <SectionWrapper bgImage="/Banners/BG-Banners/edu.jpeg">
        <Education />
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