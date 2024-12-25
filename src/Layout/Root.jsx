import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Root() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
        <ToastContainer />
    </>
  )
}
