import React, { useEffect, useState } from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import { toast } from 'react-toastify';

export default function Loading() {
  const [timeout, setTimout] = useState(false)
  useEffect(() => {
    const ref = setTimeout(() => {
      toast.error("Please, Check the Internet Connection")
      setTimout(true)
    }, 9000)

    return () => clearTimeout(ref)
  },[])

  if(timeout) return <div className='text-2xl text-center my-5'>No Data Found</div>
  return (
    <div className='w-full bg-white h-[100vh] flex items-center justify-center'>
        <BounceLoader color="#F4B503" />
    </div>
  )
}
