import React, { useState, useEffect, useContext } from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

export default function HeaderLoading() {
   const [timeout, setTimeoutState] = useState(false);
   const {setLoading} = useContext(AuthContext)

    useEffect(() => {
      const ref = setTimeout(() => {
        toast.error("Please, Check the Internet Connection");
        setTimeoutState(true);
        setLoading(false)
      }, 9000);

      return () => clearTimeout(ref);
    }, []);

    if (timeout) return null;

    return (
      <div className='w-full bg-white z-10 h-[100vh] fixed top-0 left-0 flex items-center justify-center'>
          <BounceLoader color="#F4B503" />
      </div>
    );
}
