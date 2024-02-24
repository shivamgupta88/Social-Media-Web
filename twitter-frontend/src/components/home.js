import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import phonebookImage from '../photos/phonebook.png';
import Register from './register';
import { isAuth } from './helper';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  const isAuthenticated = isAuth();

  const handleContacts = () => {
    if (isAuthenticated) {
      navigate('/userpost'); 
    } else {
      openRegisterModal(); 
    }
  };

  return (
    <div className='bg-[#0F051D]'>
      <ToastContainer />
      <nav className="bg-[#0F051D] border-gray-200">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a href="#contacts" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Shivam's Twitter
            </span>
          </a>
          <div className="flex items-center">
           
            {isAuthenticated && (
              <button
                className="bg-[#0F051D] border-2 rounded-xl hover:bg-slate-600 text-white font-bold py-2 px-8   mt-4"
                onClick={handleContacts}
              >
                Post
              </button>
            )}
            {!isAuthenticated && (
              <button
                className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={openRegisterModal}
              >
                Join Now
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="w-[90vw] mx-auto text-center " >
        <section className="bg-[#0F051D] border-2 m-5 rounded-xl p-4 text-white py-2 mt-4 w-full sm:h-[85vh] min:h-screen flex justify-center items-center relative">
          <div className="text-center">
            <div className="text-5xl font-bold mb-4 text-white">
              Welcome to Shivam's Twitter App
            </div>
            
            {isAuthenticated && (
              <button
                className="bg-gray hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleContacts}
              >
                Posts
              </button>
            )}
            {!isAuthenticated && (
              <button
                className="bg-blue-300 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={openRegisterModal}
              >
                Click Join Now to Get started
              </button>
            )}
          </div>
        </section>
      </div>
      {isRegisterOpen && !isAuthenticated && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 w-1/2">
            <Register closeModal={closeRegisterModal} />
          </div>
        </div>
      )}
    </div>
  );
}
