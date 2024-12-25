import './Header.css'
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { toast } from 'react-toastify';
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

export default function Header() {
    const { user, loading, signOutUser } = useContext(AuthContext);
    const [dropDown, setDropDown] = useState(false);
    const [mobileDrop, setMobileDrop] = useState(false)
    const imgSrc = user?.photoURL || "https://i.ibb.co.com/jywg152/man-303792-640.png"

    const navigate = useNavigate();
    const handleDropdown = () => {
        setDropDown(!dropDown)
    }
    const handleLogout = () => {
        signOutUser()
            .then(e => {
                console.log(e)
                toast.success("Logout Success!")
                navigate("/");
            })
            .catch(e => {
                console.log(e)
                toast.error("Something Wrong")
            })
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <nav className='py-4 border-b border-gray-100'>
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
                                <li onClick={handleDropdown} className='border-2 rounded-full p-2 border-[#f4b503]'><img className='w-6' src={imgSrc} alt={user.displayName} /></li>
                            </>
                        )
                    }
                </ul>

                <div className='flex lg:hidden gap-10 items-center'>
                    <div onClick={() => setMobileDrop(!mobileDrop)}>
                        {!mobileDrop ? <CiMenuBurger className='text-lg' /> : <IoMdClose className='text-lg' />}
                    </div>
                    {user && <div onClick={handleDropdown} className='border-2 rounded-full p-2 border-[#f4b503]'><img className='w-6' src={imgSrc} alt={user.displayName} /></div>}
                </div>
                {mobileDrop && <ul className='flex flex-col gap-5 items-center absolute bg-white top-14 left-0 w-full border-2 border-gray-200 rounded-md p-5 text-left'>
                    <li><NavLink to='/' className="text-lg hover:text-[#f4b503]">Home</NavLink></li>
                    <li><NavLink to='/assignments' className="text-lg hover:text-[#f4b503]">Assignments</NavLink></li>
                    <li><NavLink to='/pending-assignments' className="text-lg hover:text-[#f4b503]">Pending Assignments</NavLink></li>
                    {
                        !user ? <li><NavLink to='/login' className="text-lg hover:text-[#f4b503]">Login</NavLink></li> : (
                            <>
                                <li><button onClick={handleLogout} className="text-lg hover:text-[#f4b503]">Logout</button></li>
                            </>
                        )
                    }
                </ul>}

                {dropDown && <ul className='absolute bg-white border-gray-200 right-0 top-12 p-4 rounded-sm'>
                    <li className='text-lg hover:text-[#f4b503]'><NavLink to='/create-assignment'>Create Assignment</NavLink></li>
                    <li className='text-lg hover:text-[#f4b503]'><NavLink to='/attempted-assignments'>My Attempted</NavLink></li>
                </ul>}
            </div>

        </nav>
    )
}
