import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, ShoppingCart, Plus, Minus, Share2, Shield, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetailsPage() {
  // Mock product data for demonstration
  const product = {
    id: 1,
    name: 'Red Roses Bouquet',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 124,
    category: 'Premium',
    images: [
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=500&h=500&fit=crop'
    ],
    description: 'Beautiful hand-picked red roses arranged in an elegant bouquet. Perfect for expressing love, celebrating anniversaries, or brightening someone\'s day. Each bouquet contains 12 premium roses with complementary greenery.',
    features: [
      'Hand-picked premium roses',
      'Professional arrangement',
      'Includes complementary greenery',
      'Fresh guarantee for 7 days',
      'Comes with care instructions'
    ],
    specifications: {
      'Number of Roses': '12',
      'Color': 'Deep Red',
      'Arrangement Style': 'Classic Bouquet',
      'Vase': 'Not Included',
      'Delivery': 'Same Day Available'
    }
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  const handleGoBack = () => {
    alert('Going back to category list - In your app, this would navigate back');
  };

  const adjustQuantity = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleGoBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Product Details</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-green-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className={`text-gray-600 leading-relaxed ${showFullDescription ? '' : 'line-clamp-3'}`}>
                {product.description}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:text-blue-700 text-sm mt-1"
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </button>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => adjustQuantity(-1)}
                    disabled={quantity <= 1}
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => adjustQuantity(1)}
                    disabled={quantity >= 10}
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Service Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                                    <div className="text-sm font-medium text-gray-800">Free Delivery</div>
                  <div className="text-xs text-gray-500">Same-day delivery available</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <RotateCcw className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="text-sm font-medium text-gray-800">Easy Returns</div>
                  <div className="text-xs text-gray-500">7-day return policy</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm font-medium text-gray-800">Secure Checkout</div>
                  <div className="text-xs text-gray-500">Your payment is protected</div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold mb-3 mt-6">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div key={index} className="flex justify-between border-b pb-1">
                    <span className="font-medium">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
