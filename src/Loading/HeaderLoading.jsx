import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";

export default function HeaderLoading() {
  return (
    <div className='w-full bg-white z-10 h-[100vh] fixed top-0 left-0 flex items-center justify-center'>
        <BounceLoader color="#F4B503" />
    </div>
  )
}
