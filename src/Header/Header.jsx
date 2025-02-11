import './Header.css'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export default function Header() {
    const [isStikcy, setSticky] = useState(false)
    const { user, loading, handleLogout, theme, setTheme } = useContext(AuthContext);
    const menuStyle = theme == 'dark' ? { background: 'black', color: 'white' } : { background: 'white', color: 'black' }
    const [dropDown, setDropDown] = useState(false);
    const [mobileDrop, setMobileDrop] = useState(false)
    const imgSrc = user?.photoURL || "https://i.ibb.co.com/jywg152/man-303792-640.png"

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
   
    const handleDropdown = () => {
        setDropDown(!dropDown)
    }

    const handleMobileMenu = () => {
        setMobileDrop(!mobileDrop)
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <nav className={`border-b top-0 transition-all duration-500 border-gray-100 sticky ${isStikcy ? "py-2" : 'py-4'} ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <div className='flex justify-between items-center cs-container relative'>
                <h2 className='text-[#F4B503] text-[30px] font-extrabold'>Group Study</h2>
                <ul className='lg:flex hidden gap-5 items-center'>
                    <li><NavLink to='/' className="text-lg hover:text-[#f4b503]">Home</NavLink></li>
                    <li><NavLink to='/assignments' className="text-lg hover:text-[#f4b503]">Assignments</NavLink></li>
                    <li><NavLink to='/pending-assignments' className="text-lg hover:text-[#f4b503]">Pending Assignments</NavLink></li>
                    {
                        !user ? <li><NavLink to='/login' className="text-lg hover:text-[#f4b503]">Login</NavLink></li> : (
                            <>
                                <li><button onClick={handleLogout} className="text-lg hover:text-[#f4b503]">Logout</button></li>
                                <li onClick={handleDropdown} className='border-2 rounded-full p-1 border-[#f4b503]'><img data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName} className='w-7 rounded-full' src={imgSrc} alt={user.displayName} /></li>
                                <Tooltip id="my-tooltip" />
                            </>
                        )
                    }
                    <li >
                        {theme === 'dark' ? <CiLight className='text-[40px]' onClick={() => setTheme("light")} /> : <CiDark className='text-[40px]' onClick={() => setTheme("dark")} />}
                    </li>
                </ul>

                <div className='flex lg:hidden gap-10 items-center'>
                    <div onClick={() => handleMobileMenu()}>
                        {!mobileDrop ? <CiMenuBurger className='text-lg' /> : <IoMdClose className='text-lg' />}
                    </div>
                    {user && <div onClick={handleDropdown} className='border-2 rounded-full p-1 border-[#f4b503]'><img className='w-7 rounded-full' src={imgSrc} alt={user.displayName} /></div>}

                    <p>
                        {theme === 'dark' ? <CiLight className='text-[40px]' onClick={() => setTheme("light")} /> : <CiDark className='text-[40px]' onClick={() => setTheme("dark")} />}
                    </p>
                </div>
                {mobileDrop && <ul style={menuStyle} className='flex flex-col gap-5 items-center absolute bg-white top-14 left-0 w-full border-2 border-gray-200 rounded-md p-5 text-left'>
                    <li onClick={handleMobileMenu}><NavLink to='/' className="text-lg hover:text-[#f4b503]">Home</NavLink></li>
                    <li onClick={handleMobileMenu}><NavLink to='/assignments' className="text-lg hover:text-[#f4b503]">Assignments</NavLink></li>
                    <li onClick={handleMobileMenu}><NavLink to='/pending-assignments' className="text-lg hover:text-[#f4b503]">Pending Assignments</NavLink></li>
                    {
                        !user ? <li onClick={handleMobileMenu}><NavLink to='/login' className="text-lg hover:text-[#f4b503]">Login</NavLink></li> : (
                            <>
                                <li><button onClick={handleLogout} className="text-lg hover:text-[#f4b503]">Logout</button></li>
                            </>
                        )
                    }
                </ul>}

                {dropDown && <ul style={menuStyle} className='absolute bg-white border-gray-200 right-0 top-12 p-4 rounded-sm'>
                    <li onClick={handleDropdown} className='text-lg hover:text-[#f4b503]'><NavLink to='/create-assignment'>Create Assignment</NavLink></li>
                    <li onClick={handleDropdown} className='text-lg hover:text-[#f4b503]'><NavLink to='/attempted-assignments'>My Attempted</NavLink></li>
                </ul>}
            </div>

        </nav>
    )
}
