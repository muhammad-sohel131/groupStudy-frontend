import './Header.css'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <nav className='py-4 border-b border-gray-100'>
        <div className='flex justify-between items-center cs-container'>
        <h2 className='text-[#F4B503] text-[30px] font-extrabold'>Group Study</h2>
        <ul className='flex gap-5 items-center'>
            <li><NavLink to='/' className="text-lg hover:text-[#f4b503]">Home</NavLink></li>
            <li><NavLink to='/assignments' className="text-lg hover:text-[#f4b503]">Assignments</NavLink></li>
            <li><NavLink to='/pending-assignments' className="text-lg hover:text-[#f4b503]">Pending Assignments</NavLink></li>
            <li><NavLink to='/login' className="text-lg hover:text-[#f4b503]">Login</NavLink></li>
        </ul>
        </div>
    </nav>
  )
}
