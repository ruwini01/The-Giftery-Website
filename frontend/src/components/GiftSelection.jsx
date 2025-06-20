import React from 'react';
import { useLocation } from 'react-router-dom';
import { images } from '../constants/images';
import { useNavigate } from 'react-router-dom';


const mockImages = {
  flower: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop',
  cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop',
  teddy: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop',
  chocolate: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=200&h=200&fit=crop',
  perfume: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop',
  gift_card: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop',
  jewelry: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop',
  mug: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop',
  photo_frame: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop',
  handmade_card: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop',
  candle: 'https://images.unsplash.com/photo-1602874801006-8ff4874d3ff9?w=200&h=200&fit=crop',
  spa_kit: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop',
  book: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop',
  board_game: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=200&h=200&fit=crop',
  travel_mug: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop',
  bluetooth_speaker: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
  puzzle: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=200&h=200&fit=crop',
  succulent: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop',
  cooking_kit: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop',
  fitness_tracker: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop'
};

// Define gift categories
const gift_categories = [
  { id: 1, name: 'Flowers', image: mockImages.flower },
  { id: 2, name: 'Cake', image: mockImages.cake },
  { id: 3, name: 'Teddy Bear', image: mockImages.teddy },
  { id: 4, name: 'Chocolates', image: mockImages.chocolate },
  { id: 5, name: 'Perfume', image: mockImages.perfume },
  { id: 6, name: 'Gift Card', image: mockImages.gift_card },
  { id: 7, name: 'Jewelry', image: mockImages.jewelry },
  { id: 8, name: 'Personalized Mug', image: mockImages.mug },
  { id: 9, name: 'Photo Frame', image: mockImages.photo_frame },
  { id: 10, name: 'Handmade Card', image: mockImages.handmade_card },
  { id: 11, name: 'Scented Candle', image: mockImages.candle },
  { id: 12, name: 'Spa Kit', image: mockImages.spa_kit },
  { id: 13, name: 'Book', image: mockImages.book },
  { id: 14, name: 'Board Game', image: mockImages.board_game },
  { id: 15, name: 'Travel Mug', image: mockImages.travel_mug },
  { id: 16, name: 'Bluetooth Speaker', image: mockImages.bluetooth_speaker },
  { id: 17, name: 'Puzzle', image: mockImages.puzzle },
  { id: 18, name: 'Succulent Plant', image: mockImages.succulent },
  { id: 19, name: 'Cooking Kit', image: mockImages.cooking_kit },
  { id: 20, name: 'Fitness Tracker', image: mockImages.fitness_tracker },
  { id: 21, name: 'Art Supplies', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=200&h=200&fit=crop' },
  { id: 22, name: 'Travel Accessories', image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=200&h=200&fit=crop' },
  { id: 23, name: 'Gourmet Snacks', image: 'https://images.unsplash.com/photo-1603052875006-8b1c3e7c1f8b?w=200&h=200&fit=crop' },
  { id: 24, name: 'Tech Gadgets', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop' }	,
  { id: 25, name: 'Home Decor', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=200&h=200&fit=crop' },
  { id: 26, name: 'Outdoor Gear', image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=200&h=200&fit=crop' },
  { id: 27, name: 'Pet Supplies', image: 'https://images.unsplash.com/photo-1603052875006-8b1c3e7c1f8b?w=200&h=200&fit=crop' },
  { id: 28, name: 'Subscription Box', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop' },
  { id: 29, name: 'DIY Kits', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=200&h=200&fit=crop' },
  { id: 30, name: 'Fashion Accessories', image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=200&h=200&fit=crop' }

];

// Predefined random-looking color classes
const colorPalette = [
  'bg-blue-200', 'bg-pink-200', 'bg-orange-300', 'bg-red-300',
  'bg-pink-300', 'bg-orange-200', 'bg-green-200', 'bg-yellow-300',
  'bg-blue-300', 'bg-red-200', 'bg-green-300', 'bg-orange-400',
  'bg-pink-200', 'bg-orange-300', 'bg-blue-200', 'bg-green-200'
];

// Varying tile sizes in a repeating pattern
const tileLayouts = [
  'col-span-1 row-span-1', // small square
  'col-span-2 row-span-1', // wide rectangle
  'col-span-1 row-span-1', // small square
  'col-span-2 row-span-2', // large square
  'col-span-1 row-span-1', // small square
  'col-span-1 row-span-1', // small square
  'col-span-2 row-span-1', // wide rectangle
  'col-span-1 row-span-2', // tall rectangle
  'col-span-1 row-span-1', // small square
  'col-span-2 row-span-1', // small square
  'col-span-2 row-span-1', // wide rectangle
  'col-span-1 row-span-2', // tall rectangle
  'col-span-1 row-span-1', // small square
  'col-span-2 row-span-1', // wide rectangle
  'col-span-1 row-span-1', // small square
  'col-span-1 row-span-1', // small square
  'col-span-2 row-span-2', // large square
  'col-span-1 row-span-1', // small square
  'col-span-1 row-span-1', // small square
  'col-span-1 row-span-1', // small square
];

export default function GiftSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTheme, customImage } = location.state || {};

  const handleCategoryClick = (category) => {
    // Navigate to category list page with category data
    navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`, {
      state: { 
        category: category,
        selectedTheme: selectedTheme 
      }
    });
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-6">Discover perfect picks for the gift box!</h1>

      <div className="mb-8">
        <p className="font-semibold mb-2">Selected Theme:</p>
        {selectedTheme ? (
          <img src={selectedTheme.image} alt="Theme" className="w-48 h-48 mx-auto rounded-md" />
        ) : customImage ? (
          <img src={customImage} alt="Custom" className="w-48 h-48 mx-auto rounded-md" />
        ) : (
          <p>No theme selected.</p>
        )}
      </div>

      {/* Masonry-style grid layout */}
      <div className="grid grid-cols-4 auto-rows-[200px] gap-4 max-w-4xl mx-auto p-4">
        {gift_categories.map((gift, index) => {
          const layoutClass = tileLayouts[index % tileLayouts.length];
          const bgColor = colorPalette[index % colorPalette.length];

          return (
            <div
              key={gift.id}
               onClick={() => handleCategoryClick(gift)}
              className={`${bgColor} ${layoutClass} rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 hover:scale-105 hover:shadow-xl transform transition-all duration-300 cursor-pointer border border-white/50`}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-3 shadow-md bg-white/20 backdrop-blur-sm">
                <img 
                  src={gift.image} 
                  alt={gift.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="text-sm font-semibold text-gray-800 text-center leading-tight">
                {gift.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
