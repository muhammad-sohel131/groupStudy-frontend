import './Header.css'
import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { toast } from 'react-toastify';

export default function Header() {
    const { user, loading, signOutUser } = useContext(AuthContext);
 
    const navigate = useNavigate();

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

    if(loading){
        return <h2>Loading...</h2>
    }
    
  return (
    <nav className='py-4 border-b border-gray-100'>
        <div className='flex justify-between items-center cs-container'>
        <h2 className='text-[#F4B503] text-[30px] font-extrabold'>Group Study</h2>
        <ul className='flex gap-5 items-center'>
            <li><NavLink to='/' className="text-lg hover:text-[#f4b503]">Home</NavLink></li>
            <li><NavLink to='/assignments' className="text-lg hover:text-[#f4b503]">Assignments</NavLink></li>
            <li><NavLink to='/pending-assignments' className="text-lg hover:text-[#f4b503]">Pending Assignments</NavLink></li>
            {
                !user ? <li><NavLink to='/login' className="text-lg hover:text-[#f4b503]">Login</NavLink></li> : <li><button onClick={handleLogout} className="text-lg hover:text-[#f4b503]">Logout</button></li>
            }
        </ul>
        </div>
    </nav>
  )
}
