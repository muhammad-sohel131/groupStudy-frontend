import React, { useContext } from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext'

export default function Root() {
  const {theme} = useContext(AuthContext)
  const style = theme == 'dark' ? {background:'black', color: 'white'} : {background: 'white', color: 'black'}
  return (
    <div style={style}>
        <Header />
        <Outlet />
        <Footer />
        <ToastContainer />
    </div>
  )
}
