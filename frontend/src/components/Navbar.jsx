import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <div>
      <ul className="flex flex-row items-center justify-center gap-10 h-12 w-full px-4 bg-[#7E3D2D] text-white font-medium text-md my-4">
        <li className={`cursor-pointer hover:text-orange-200 ${isActive("/") ? "text-yellow-400" : ""}`}>
          <Link to="/">Home</Link>
        </li>
        <li className={`cursor-pointer hover:text-orange-200 ${isActive("/surprise") ? "text-yellow-400" : ""}`}>
          <Link to="/surprise">Surprise Planning</Link>
        </li>

        <li className={`cursor-pointer hover:text-orange-200 ${isActive("/gifts") ? "text-yellow-400" : ""}`}>
          <Link to="/gifts">Customize Gifts</Link>
        </li>
        <li className={`cursor-pointer hover:text-orange-200 ${isActive("/collection") ? "text-yellow-400" : ""}`}>
          <Link to="/collection">Our Collection</Link>
        </li>
        <li className={`cursor-pointer hover:text-orange-200 ${isActive("/about") ? "text-yellow-400" : ""}`}>
          <Link to="/about">About</Link>
        </li>
        <li className={`cursor-pointer hover:text-orange-200 ${isActive("/gallery") ? "text-yellow-400" : ""}`}>
          <Link to="/gallery">Gallery</Link>
        </li>
      </ul>
    </div>
  );
}
