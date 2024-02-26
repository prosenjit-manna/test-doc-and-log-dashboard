import React from 'react';
import { useAppSelector } from '../../Lib/Store/hooks';

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user.currentUser);


  return (
    <section className='h-screen bg-gray-100 bg-opacity-50 pt-8'>
      <form className='container max-w-2xl mx-auto shadow-md md:w-3/4'>
        <div className='p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5'>
          <div className='max-w-sm mx-auto md:w-full md:mx-0'>
            <div className='inline-flex items-center space-x-4'>
              <h1 className='text-gray-600'>
                {user?.me?.username}
              </h1>
            </div>
          </div>
        </div>
        <div className='space-y-6 bg-white'>
          <div className='items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0'>
            <h2 className='max-w-sm mx-auto md:w-1/3'>Account</h2>
            <div className='max-w-sm mx-auto md:w-2/3'>
              <div className=' relative '>
               {user?.me?.email}
              </div>
            </div>
          </div>
          <hr />
          <div className='items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0'>
            <h2 className='max-w-sm mx-auto md:w-1/3'>Personal info</h2>
            <div className='max-w-sm mx-auto space-y-5 md:w-2/3'>
              <div>
                <div className=' relative '>
                  <input
                    type='text'
                    id='user-info-name'
                    className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                    placeholder='Name'
                  />
                </div>
              </div>
              <div>
                <div className=' relative '>
                  <input
                    type='text'
                    id='user-info-phone'
                    className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                    placeholder='Phone number'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
