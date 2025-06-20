import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import { ArrowLeft, Filter, Search, Star, Heart, Palette, Gift, Cake, Flower2, ShoppingBag, Clock, Truck, Award } from 'lucide-react';

// Enhanced mock data with category-specific attributes
const categoryData = {
  'flowers': {
    name: 'Flowers',
    icon: Flower2,
    color: 'rose',
    products: [
      { id: 1, name: 'Red Roses Bouquet', price: 29.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop', 
        category: 'Roses', occasion: 'Romance', size: 'Medium', freshness: '5 days', colors: ['Red'] },
      { id: 2, name: 'Mixed Spring Bouquet', price: 24.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit:crop', 
        category: 'Mixed', occasion: 'Birthday', size: 'Large', freshness: '7 days', colors: ['Multi'] },
      { id: 3, name: 'Sunflower Bouquet', price: 19.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=300&h=300&fit:crop', 
        category: 'Sunflowers', occasion: 'Friendship', size: 'Medium', freshness: '6 days', colors: ['Yellow'] },
      { id: 4, name: 'White Lily Arrangement', price: 34.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1495427255793-d531698dd8fd?w=300&h=300&fit:crop', 
        category: 'Lilies', occasion: 'Sympathy', size: 'Large', freshness: '4 days', colors: ['White'] },
    ]
  },
  'cake': {
    name: 'Cakes',
    icon: Cake,
    color: 'amber',
    products: [
      { id: 1, name: 'Chocolate Birthday Cake', price: 39.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit:crop', 
        category: 'Birthday', flavor: 'Chocolate', size: '8 inch', servings: '8-10', dietary: 'Regular' },
      { id: 2, name: 'Vanilla Wedding Cake', price: 89.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=300&fit:crop', 
        category: 'Wedding', flavor: 'Vanilla', size: '12 inch', servings: '20-25', dietary: 'Regular' },
      { id: 3, name: 'Red Velvet Cupcakes', price: 24.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&h=300&fit:crop', 
        category: 'Cupcakes', flavor: 'Red Velvet', size: '12 pack', servings: '12', dietary: 'Regular' },
      { id: 4, name: 'Vegan Chocolate Cake', price: 44.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit:crop', 
        category: 'Specialty', flavor: 'Chocolate', size: '8 inch', servings: '8-10', dietary: 'Vegan' },
    ]
  },
  'teddy-bear': {
    name: 'Teddy Bears',
    icon: Gift,
    color: 'pink',
    products: [
      { id: 1, name: 'Large Brown Teddy Bear', price: 49.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit:crop', 
        category: 'Classic', size: 'Large', color: 'Brown', material: 'Plush', age: '3+' },
      { id: 2, name: 'Small White Bear', price: 19.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1543335606-c8cca2d4ea68?w=300&h=300&fit:crop', 
        category: 'Mini', size: 'Small', color: 'White', material: 'Soft Cotton', age: '0+' },
      { id: 3, name: 'Pink Heart Bear', price: 29.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit:crop', 
        category: 'Romantic', size: 'Medium', color: 'Pink', material: 'Velvet', age: '3+' },
      { id: 4, name: 'Giant Teddy Bear', price: 79.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit:crop', 
        category: 'Jumbo', size: 'Extra Large', color: 'Brown', material: 'Premium Plush', age: '3+' },
    ]
  },
  'jewelry': {
    name: 'Jewelry',
    icon: Award,
    color: 'purple',
    products: [
      { id: 1, name: 'Diamond Stud Earrings', price: 199.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit:crop', 
        category: 'Earrings', material: 'Gold', gemstone: 'Diamond', occasion: 'Formal' },
      { id: 2, name: 'Silver Heart Necklace', price: 79.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit:crop', 
        category: 'Necklaces', material: 'Silver', gemstone: 'None', occasion: 'Casual' },
      { id: 3, name: 'Rose Gold Bracelet', price: 149.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=300&h=300&fit:crop', 
        category: 'Bracelets', material: 'Rose Gold', gemstone: 'Cubic Zirconia', occasion: 'Special' },
      { id: 4, name: 'Vintage Style Ring', price: 249.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit:crop', 
        category: 'Rings', material: 'Platinum', gemstone: 'Sapphire', occasion: 'Engagement' },
    ]
  }
};

// Component for different category layouts
const FlowerTemplate = ({ category, products, searchTerm, setSearchTerm, handleProductClick }) => {
  const [occasionFilter, setOccasionFilter] = useState('All');
  const [colorFilter, setColorFilter] = useState('All');
  
  const occasions = ['All', ...new Set(products.map(p => p.occasion))];
  const colors = ['All', ...new Set(products.flatMap(p => p.colors))];
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (occasionFilter === 'All' || product.occasion === occasionFilter) &&
    (colorFilter === 'All' || product.colors.includes(colorFilter))
  );

  return (
    <div className="space-y-6">
      {/* Flower-specific filters */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search flowers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white"
            />
          </div>
          
          <select
            value={occasionFilter}
            onChange={(e) => setOccasionFilter(e.target.value)}
            className="border border-rose-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-500 bg-white"
          >
            <option value="">Occasion</option>
            {occasions.map(occasion => (
              <option key={occasion} value={occasion}>{occasion}</option>
            ))}
          </select>
          
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="border border-rose-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-500 bg-white"
          >
            <option value="">Color</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products grid with flower-specific styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-rose-100"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </div>
              <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full">
                <Clock className="w-4 h-4 text-rose-600" />
              </div>
              <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                Fresh for {product.freshness}
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{product.name}</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-rose-600">${product.price}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Size: {product.size}</span>
                <span>Occasion: {product.occasion}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all font-medium">
                Add to Gift Box
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CakeTemplate = ({ category, products, searchTerm, setSearchTerm, handleProductClick }) => {
  const [flavorFilter, setFlavorFilter] = useState('All');
  const [dietaryFilter, setDietaryFilter] = useState('All');
  const [sizeFilter, setSizeFilter] = useState('All');
  
  const flavors = ['All', ...new Set(products.map(p => p.flavor))];
  const dietary = ['All', ...new Set(products.map(p => p.dietary))];
  const sizes = ['All', ...new Set(products.map(p => p.size))];
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (flavorFilter === 'All' || product.flavor === flavorFilter) &&
    (dietaryFilter === 'All' || product.dietary === dietaryFilter) &&
    (sizeFilter === 'All' || product.size === sizeFilter)
  );

  return (
    <div className="space-y-6">
      {/* Cake-specific filters */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search cakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>
          
          <select
            value={flavorFilter}
            onChange={(e) => setFlavorFilter(e.target.value)}
            className="border border-amber-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 bg-white"
          >
            <option value="">Flavor</option>
            {flavors.map(flavor => (
              <option key={flavor} value={flavor}>{flavor}</option>
            ))}
          </select>
          
          <select
            value={dietaryFilter}
            onChange={(e) => setDietaryFilter(e.target.value)}
            className="border border-amber-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 bg-white"
          >
            <option value="">Dietary</option>
            {dietary.map(diet => (
              <option key={diet} value={diet}>{diet}</option>
            ))}
          </select>
          
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="border border-amber-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 bg-white"
          >
            <option value="">Size</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products grid with cake-specific styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-amber-100"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </div>
              <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full">
                <Cake className="w-4 h-4 text-amber-600" />
              </div>
              {product.dietary !== 'Regular' && (
                <div className="absolute bottom-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                  {product.dietary}
                </div>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{product.name}</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-amber-600">${product.price}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                <span>Flavor: {product.flavor}</span>
                <span>Size: {product.size}</span>
                <span>Serves: {product.servings}</span>
                <span>Type: {product.dietary}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all font-medium">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TeddyBearTemplate = ({ category, products, searchTerm, setSearchTerm, handleProductClick }) => {
  const [sizeFilter, setSizeFilter] = useState('All');
  const [colorFilter, setColorFilter] = useState('All');
  const [materialFilter, setMaterialFilter] = useState('All');
  
  const sizes = ['All', ...new Set(products.map(p => p.size))];
  const colors = ['All', ...new Set(products.map(p => p.color))];
  const materials = ['All', ...new Set(products.map(p => p.material))];
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (sizeFilter === 'All' || product.size === sizeFilter) &&
    (colorFilter === 'All' || product.color === colorFilter) &&
    (materialFilter === 'All' || product.material === materialFilter)
  );

  return (
    <div className="space-y-6">
      {/* Teddy bear-specific filters */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search teddy bears..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>
          
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="border border-pink-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 bg-white"
          >
            <option value="">Size</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="border border-pink-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 bg-white"
          >
            <option value="">Color</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
          
          <select
            value={materialFilter}
            onChange={(e) => setMaterialFilter(e.target.value)}
            className="border border-pink-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 bg-white"
          >
            <option value="">Material</option>
            {materials.map(material => (
              <option key={material} value={material}>{material}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products grid with teddy bear-specific styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-pink-100"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.size}
              </div>
              <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full">
                <Heart className="w-4 h-4 text-pink-600" />
              </div>
              <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                Age {product.age}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-pink-600">${product.price}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <div>Color: {product.color}</div>
                <div>Material: {product.material}</div>
                <div>Category: {product.category}</div>
              </div>
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all font-medium">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JewelryTemplate = ({ category, products, searchTerm, setSearchTerm, handleProductClick }) => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [materialFilter, setMaterialFilter] = useState('All');
  const [occasionFilter, setOccasionFilter] = useState('All');
  
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const materials = ['All', ...new Set(products.map(p => p.material))];
  const occasions = ['All', ...new Set(products.map(p => p.occasion))];
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'All' || product.category === categoryFilter) &&
    (materialFilter === 'All' || product.material === materialFilter) &&
    (occasionFilter === 'All' || product.occasion === occasionFilter)
  );

  return (
    <div className="space-y-6">
      {/* Jewelry-specific filters */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jewelry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-purple-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 bg-white"
          >
            <option value="">Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select
            value={materialFilter}
            onChange={(e) => setMaterialFilter(e.target.value)}
            className="border border-purple-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 bg-white"
          >
            <option value="">Material</option>
            {materials.map(material => (
              <option key={material} value={material}>{material}</option>
            ))}
          </select>
          
          <select
            value={occasionFilter}
            onChange={(e) => setOccasionFilter(e.target.value)}
            className="border border-purple-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 bg-white"
          >
            <option value="">Occasion</option>
            {occasions.map(occasion => (
              <option key={occasion} value={occasion}>{occasion}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products grid with jewelry-specific styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-purple-100"
          >
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </div>
              <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full">
                <Award className="w-4 h-4 text-purple-600" />
              </div>
              <div className="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.material}
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{product.name}</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                <span>Material: {product.material}</span>
                <span>Stone: {product.gemstone}</span>
                <span>Occasion: {product.occasion}</span>
                <span>Type: {product.category}</span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all font-medium">
                  Add to Cart
                </button>
                <button className="p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                  <Heart className="w-5 h-5 text-purple-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component that switches between templates
export default function CategoryListPage() {
  const { categoryName } = useParams(); // Get categoryName from URL params
  const navigate = useNavigate(); // For programmatic navigation
  const [searchTerm, setSearchTerm] = useState('');
  
  // Set currentCategory based on URL param, default to 'flowers' if not found
  const currentCategory = categoryData[categoryName] ? categoryName : 'flowers';
  
  const category = categoryData[currentCategory];
  const IconComponent = category.icon;

  const handleProductClick = (product) => {
    navigate(`/category/${categoryName}/${product.id}`);
  };

  const handleGoBack = () => {
    // Navigate back to a general gift selection page, or homepage
    navigate('/'); 
  };

  const renderTemplate = () => {
    const props = {
      category,
      products: category.products,
      searchTerm,
      setSearchTerm,
      handleProductClick
    };

    switch(currentCategory) {
      case 'flowers':
        return <FlowerTemplate {...props} />;
      case 'cake':
        return <CakeTemplate {...props} />;
      case 'teddy-bear':
        return <TeddyBearTemplate {...props} />;
      case 'jewelry':
        return <JewelryTemplate {...props} />;
      default:
        return <FlowerTemplate {...props} />;
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      rose: 'from-rose-500 to-pink-500',
      amber: 'from-amber-500 to-orange-500',
      pink: 'from-pink-500 to-purple-500',
      purple: 'from-purple-500 to-indigo-500'
    };
    return colors[color] || colors.rose;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dynamic Header */}
      <div className={`bg-gradient-to-r ${getColorClasses(category.color)} text-white shadow-lg`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleGoBack}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-full">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{category.name}</h1>
                  <p className="text-white/90">Discover beautiful {category.name.toLowerCase()} for your perfect gift</p>
                </div>
              </div>
            </div>
            
            {/* Category Switcher - Now uses navigate for routing */}
            <div className="flex space-x-2">
              {Object.entries(categoryData).map(([key, cat]) => {
                const CatIcon = cat.icon;
                return (
                  <button
                    key={key}
                    onClick={() => navigate(`/category/${currentCategory}/${key}`)} // Use navigate to change route
                    className={`p-3 rounded-lg transition-all ${
                      currentCategory === key 
                        ? 'bg-white text-gray-900' 
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                    title={cat.name}
                  >
                    <CatIcon className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Category Stats */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-gradient-to-r ${getColorClasses(category.color)} rounded-lg`}>
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{category.products.length}</div>
                <div className="text-gray-600 text-sm">Products Available</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-gradient-to-r ${getColorClasses(category.color)} rounded-lg`}>
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-gray-600 text-sm">Average Rating</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-gradient-to-r ${getColorClasses(category.color)} rounded-lg`}>
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">FREE</div>
                <div className="text-gray-600 text-sm">Delivery Available</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-gradient-to-r ${getColorClasses(category.color)} rounded-lg`}>
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24H</div>
                <div className="text-gray-600 text-sm">Express Orders</div>
              </div>
            </div>
          </div>
        </div>

        {/* Render the appropriate template */}
        {renderTemplate()}
      </div>
    </div>
  );
}