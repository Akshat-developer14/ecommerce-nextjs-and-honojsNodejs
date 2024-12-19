import ThemeSwitcher from '@/components/theme/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='sticky z-[100] h-16 inset-x-0  top-0 w-full border-b border-gray-950 dark:border-gray-50 transition-all backdrop-blur-md'>
        <div className="flex justify-between items-center mx-2 md:mx-10">
      <span className='text-3xl font-bold'>E-Commerce</span>
      <div>
        <Button variant="link">Login</Button>
        <Button variant="link">Register</Button>
        <ThemeSwitcher/>
      </div>
      </div>
    </nav>
  )
}

export default Navbar
