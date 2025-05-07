import React from 'react';
import { icons } from '../constants/icon';
import Navbar from './Navbar';

export default function HelloWorld() {
  return (
    <>

      <div className="fixed top-0 left-0 w-full z-50 bg-[#FEF8F0] shadow-md">

        <div className="flex flex-row items-center justify-between h-16 w-full px-4 bg-[#FEF8F0]">
          <img src={icons.logo} className="w-36 p-2" />


          <div className="relative w-1/2">
            <input
              type="text"
              className="w-full h-12 pl-4 pr-12 border-2 border-[#b18f89] focus:border-[#7E382D] rounded-md outline-none"
              placeholder="Search"
            />
            <img
              src={icons.search}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#7E3D2D] p-3 rounded-md cursor-pointer"
            />
          </div>


          <div className="flex flex-row items-center justify-between w-1/5 h-12">
            <h6 className="text-[#7E382D] text-sm font-semibold">
              Balance:<br />Rs.5000
            </h6>
            <img src={icons.cart} className="w-12 h-12 p-2" />
            <div className="w-5 h-5 flex justify-center items-center mt-[-35px] ml-[-55px] rounded-2xl bg-red-500 text-white text-sm">
              0
            </div>
            <img src={icons.user} className="w-12 h-12 p-2" />
          </div>
        </div>


        <Navbar />
      </div>


      <div className="pt-32"></div>
    </>
  );
}
