import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../constants/images';
import Button from '../components/Button';
import ProductDetailsPage from './ProductDetailsPage';

export default function OccasionTheme() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [customImage, setCustomImage] = useState(null);

  const themes = [
    { id: 1, image: images.c1 },
    { id: 2, image: images.c2 },
    { id: 3, image: images.c3 },
  ];

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setCustomImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomImage(URL.createObjectURL(file));
      setSelectedTheme(null);
    }
  };

  const goToGifts = () => {
    navigate('/gifts', { state: { selectedTheme, customImage } });
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-6">Pick a theme for your gift combo pack!</h1>
      <div className="flex justify-center gap-5 mb-6">
        {themes.map(theme => (
          <div
            key={theme.id}
            onClick={() => handleThemeSelect(theme)}
            className={`w-40 h-60 cursor-pointer border-2 rounded-md overflow-hidden ${
              selectedTheme?.id === theme.id ? 'border-[#7E382D]' : 'border-transparent'
            }`}
          >
            <img src={theme.image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="my-4">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {customImage && (
          <img src={customImage} alt="Custom" className="mt-4 w-48 h-48 object-cover mx-auto rounded-md" />
        )}
      </div>
      <Button text="Pick Gifts" onClick={goToGifts} />
      
    </div>
  );
}
