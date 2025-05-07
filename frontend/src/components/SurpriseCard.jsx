import React from 'react'
import { images } from '../constants/images';
import { Link } from 'react-router-dom';

export default function SurpriseCard({ image, title, description, buttonColor, buttonhoverColor }) {

  return (
    <div className="flex flex-col dm-sans w-80 rounded-2xl border-1 border-[#7e382d25] overflow-hidden shadow-md justify-center items-center hover:shadow-xl transition-shadow duration-300 ease-in-out px-6 py-10">
      <div className='flex flex-row justify-between items-center pb-5'>
        <img
          className="w-24 object-cover mr-5"
          src={image}
          alt="Card Image"
        />
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
      </div>
      <div className="p-5">

        <p className="text-gray-600 text-sm mb-6">
          {description}
        </p>
        <Link to={`/surprise/${title}`}>
        <button
          className="cursor-pointer px-4 w-full py-2 text-white rounded-lg transition duration-300 ease-in-out"
          style={{ backgroundColor: buttonColor }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonhoverColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonColor}
        >
          Select
        </button>
        </Link>
      </div>
    </div>
  );


}
