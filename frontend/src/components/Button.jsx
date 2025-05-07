import React from 'react';

export default function Button({ text, onClick, customstyles, icon }) {
  const hasIcon = !!icon;

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer px-6 py-2 bg-[#7E3D2D] text-white rounded-md font-medium transition duration-300 hover:bg-[#9f4a39] hover:scale-105 ${
        hasIcon ? 'flex items-center gap-2' : ''
      } ${customstyles}`}
    >
      <span>{text}</span>
      {hasIcon && <span><img src={icon} className='w-5'/></span>}
    </button>
  );
}
