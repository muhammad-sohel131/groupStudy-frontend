import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";

export default function Loading() {
  return (
    <div className='w-full bg-white h-[100vh] flex items-center justify-center'>
        <BounceLoader color="#F4B503" />
    </div>
  )
}
