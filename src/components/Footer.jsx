import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-10 border-t-2 border-theme pt-6 pb-4 text-center text-theme-secondary text-sm flex flex-wrap sm:justify-between justify-center'>
      <p className='mb-2'>&copy; {new Date().getFullYear()} Krutarth Raval. All rights reserved.</p>
      <p >Crafted with ❤️ using React & Tailwind CSS</p>
    </footer>
  )
}

export default Footer
