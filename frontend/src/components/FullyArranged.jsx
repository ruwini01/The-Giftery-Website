import React, { useState } from 'react';
import { Heart, Gift, Calendar, Star, Sparkles, Camera, Music, Flower, Wine, Diamond, ArrowRight, ArrowLeft, ShoppingCart, Check } from 'lucide-react';

// Mock cart context for this example
const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => 
      cartItem.id === item.id && cartItem.type === item.type
    );

    if (existingItem) {
      setCartItems(prevItems =>
        prevItems.map(cartItem =>
          cartItem.id === item.id && cartItem.type === item.type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems(prevItems => [...prevItems, { ...item, quantity: 1 }]);
    }
    
    setTotalItems(prevTotal => prevTotal + 1);
  };

  const isItemInCart = (id, type) => {
    return cartItems.some(item => item.id === id && item.type === type);
  };

  return {
    addToCart,
    isItemInCart,
    totalItems
  };
};

export default function DynamicSurpriseCollection() {
  const [selectedOccasion, setSelectedOccasion] = useState('Birthday');
  const [currentSection, setCurrentSection] = useState('decorations');
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showGiftHampers, setShowGiftHampers] = useState(false);
  
  
  const { addToCart, isItemInCart } = useCart();

  const occasions = [
    { name: 'Birthday', icon: '🎂' },
    { name: 'Anniversary', icon: '💕' },
    { name: 'Valentine', icon: '💝' },
    { name: 'Graduation', icon: '🎓' },
    { name: 'Wedding', icon: '💒' },
    { name: 'Baby Shower', icon: '👶' }
  ];

  // Dynamic decoration types based on occasion
  const getDecorationTypes = (occasion) => {
    const decorationData = {
      'Birthday': [
        {
          id: 1,
          name: 'Colorful Birthday Bash',
          image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
          price: '$75',
          features: ['Colorful balloons', 'Birthday banner', 'Cake table setup', 'Party music playlist'],
          popular: true,
          type: 'decoration'
        },
        {
          id: 2,
          name: 'Elegant Birthday Celebration',
          image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop',
          price: '$95',
          features: ['Gold & silver theme', 'Premium decorations', 'Photo booth', 'Custom backdrop'],
          popular: false,
          type: 'decoration'
        }
      ],
      'Anniversary': [
        {
          id: 1,
          name: 'Romantic Rose Paradise',
          image: 'https://images.unsplash.com/photo-1518899175650-9c3096ffb17e?w=400&h=300&fit=crop',
          price: '$89',
          features: ['Red roses arrangement', 'Candles & fairy lights', 'Heart balloons', 'Romantic music playlist'],
          popular: true,
          type: 'decoration'
        },
        {
          id: 2,
          name: 'Golden Elegance',
          image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop',
          price: '$125',
          features: ['Gold & cream theme', 'Premium flowers', 'Champagne setup', 'Photo booth props'],
          popular: false,
          type: 'decoration'
        }
      ],
      'Valentine': [
        {
          id: 1,
          name: 'Love Birds Theme',
          image: 'https://images.unsplash.com/photo-1518621012118-227b8b0e7a6e?w=400&h=300&fit=crop',
          price: '$85',
          features: ['Heart decorations', 'Red & pink balloons', 'Love letters display', 'Soft lighting'],
          popular: true,
          type: 'decoration'
        },
        {
          id: 2,
          name: 'Cupid\'s Garden',
          image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
          price: '$110',
          features: ['Floral arrangements', 'Garden setup', 'Fairy lights', 'Rose petals'],
          popular: false,
          type: 'decoration'
        }
      ],
      'Graduation': [
        {
          id: 1,
          name: 'Achievement Celebration',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
          price: '$65',
          features: ['Graduation banners', 'Cap & gown props', 'Achievement board', 'Success playlist'],
          popular: true,
          type: 'decoration'
        },
        {
          id: 2,
          name: 'Future Success Theme',
          image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop',
          price: '$80',
          features: ['Gold & black theme', 'Inspirational quotes', 'Photo memories', 'Celebration setup'],
          popular: false,
          type: 'decoration'
        }
      ],
      'Wedding': [
        {
          id: 1,
          name: 'Bridal Bliss',
          image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
          price: '$150',
          features: ['White & gold theme', 'Floral arrangements', 'Elegant lighting', 'Bridal setup'],
          popular: true,
          type: 'decoration'
        },
        {
          id: 2,
          name: 'Garden Wedding',
          image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
          price: '$175',
          features: ['Natural flowers', 'Outdoor setup', 'Rustic elements', 'Garden lights'],
          popular: false,
          type: 'decoration'
        }
      ],
      'Baby Shower': [
        {
          id: 1,
          name: 'Sweet Baby Theme',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
          price: '$70',
          features: ['Pastel decorations', 'Baby balloons', 'Cute banners', 'Soft music'],
          popular: true,
          type: 'decoration'
        },
        {
          id: 2,
          name: 'Stork Arrival',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
          price: '$85',
          features: ['Stork decorations', 'Baby blue/pink theme', 'Welcome baby setup', 'Photo props'],
          popular: false,
          type: 'decoration'
        }
      ]
    };
    return decorationData[occasion] || decorationData['Anniversary'];
  };

  // Dynamic gift hampers based on occasion
  const getGiftHampers = (occasion) => {
    const hamperData = {
      'Birthday': [
        {
          id: 1,
          name: 'Birthday Surprise Box',
          image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop',
          price: '$55',
          items: ['Birthday card', 'Party favors', 'Sweet treats', 'Mini cake'],
          bestseller: true,
          type: 'hamper'
        },
        {
          id: 2,
          name: 'Birthday Celebration Kit',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          price: '$75',
          items: ['Birthday crown', 'Confetti poppers', 'Photo booth props', 'Birthday playlist'],
          bestseller: false,
          type: 'hamper'
        }
      ],
      'Anniversary': [
        {
          id: 1,
          name: 'Love Letters Collection',
          image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop',
          price: '$65',
          items: ['Handwritten love notes', 'Chocolate box', 'Scented candles', 'Photo album'],
          bestseller: true,
          type: 'hamper'
        },
        {
          id: 2,
          name: 'Memory Makers',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
          price: '$95',
          items: ['Custom photo book', 'Polaroid camera', 'Memory jar', 'Love coupons'],
          bestseller: false,
          type: 'hamper'
        }
      ],
      'Valentine': [
        {
          id: 1,
          name: 'Valentine Love Box',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
          price: '$80',
          items: ['Valentine chocolates', 'Love letters', 'Red roses', 'Romantic playlist'],
          bestseller: true,
          type: 'hamper'
        },
        {
          id: 2,
          name: 'Cupid\'s Collection',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
          price: '$120',
          items: ['Heart jewelry', 'Love poems book', 'Romantic candles', 'Wine & glasses'],
          bestseller: false,
          type: 'hamper'
        }
      ],
      'Graduation': [
        {
          id: 1,
          name: 'Success Celebration',
          image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop',
          price: '$60',
          items: ['Congratulations card', 'Success book', 'Motivational quotes', 'Celebration treats'],
          bestseller: true,
          type: 'hamper'
        },
        {
          id: 2,
          name: 'Future Leader Kit',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          price: '$85',
          items: ['Professional accessories', 'Leadership book', 'Success journal', 'Achievement certificate'],
          bestseller: false,
          type: 'hamper'
        }
      ],
      'Wedding': [
        {
          id: 1,
          name: 'Newlywed Bliss',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
          price: '$150',
          items: ['Wedding keepsakes', 'Champagne set', 'Photo frame', 'Marriage book'],
          bestseller: true,
          type: 'hamper'
        },
        {
          id: 2,
          name: 'Couple\'s Journey',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
          price: '$200',
          items: ['Couple\'s journal', 'Adventure vouchers', 'Memory book', 'Wedding album'],
          bestseller: false,
          type: 'hamper'
        }
      ],
      'Baby Shower': [
        {
          id: 1,
          name: 'Baby Welcome Kit',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
          price: '$90',
          items: ['Baby clothes', 'Soft toys', 'Baby book', 'Welcome card'],
          bestseller: true,
          type: 'hamper'
        },
        {
          id: 2,
          name: 'New Parent Essentials',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          price: '$120',
          items: ['Baby care items', 'Parent guide book', 'Comfort items', 'Memory book'],
          bestseller: false,
          type: 'hamper'
        }
      ]
    };
    return hamperData[occasion] || hamperData['Anniversary'];
  };

  const handleOccasionSelect = (occasion) => {
    setSelectedOccasion(occasion);
    setCurrentSection('decorations');
    setShowGiftHampers(false);
    setSelectedTheme(null);
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setShowGiftHampers(true);
  };

  const goBackToThemes = () => {
    setShowGiftHampers(false);
    setSelectedTheme(null);
  };

  const handleAddToCart = (item) => {
  addToCart(item);
  // Remove the temporary timeout logic - items should stay marked until checkout
};

  const currentDecorations = getDecorationTypes(selectedOccasion);
  const currentHampers = getGiftHampers(selectedOccasion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-rose-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-rose-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Surprise Collection
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <span className="text-gray-600 font-medium">Create Magic Together</span>
            </div>
          </div>
        </div>
      </div>

      {/* Occasion Selector */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Select Occasion:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {occasions.map((occasion, index) => (
              <button
                key={index}
                onClick={() => handleOccasionSelect(occasion.name)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedOccasion === occasion.name
                    ? 'bg-rose-500 text-white shadow-lg ring-2 ring-rose-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{occasion.icon}</span>
                <span>{occasion.name}</span>
                {selectedOccasion === occasion.name && <Star className="w-4 h-4 fill-current" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button (when viewing gift hampers) */}
      {showGiftHampers && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <button
              onClick={goBackToThemes}
              className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Themes</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Tabs (only show when not viewing gift hampers) */}
      {!showGiftHampers && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-8">
              <button
                onClick={() => setCurrentSection('decorations')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  currentSection === 'decorations'
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Flower className="w-4 h-4" />
                  <span>Decoration Types</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!showGiftHampers ? (
          // Theme Selection
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedOccasion} Decoration Packages</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Transform your special day with our professionally curated decoration themes. Each package includes setup, styling, and cleanup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentDecorations.map((decoration) => {
                const itemKey = `${decoration.type}-${decoration.id}`;
                const isAdded = isItemInCart(decoration.id, decoration.type);
                
                return (
                  <div
                    key={decoration.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src={decoration.image}
                        alt={decoration.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {decoration.popular && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Popular</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full font-bold">
                        {decoration.price}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{decoration.name}</h3>
                      <div className="space-y-2 mb-4">
                        {decoration.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-gray-600">
                            <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleThemeSelect(decoration)}
                          className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <span>Choose Theme</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleAddToCart(decoration)}
                          className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                            isAdded 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          disabled={isAdded}
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Gift Hampers for Selected Theme
          <div>
            <div className="text-center mb-8">
              <div className="bg-rose-50 rounded-lg p-4 mb-6 inline-block">
                <p className="text-rose-700 font-medium">Selected Theme: <span className="font-bold">{selectedTheme?.name}</span></p>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Perfect Gift Hampers for Your {selectedOccasion}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete your celebration with these carefully curated gift collections that perfectly complement your chosen theme.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentHampers.map((hamper) => {
                const itemKey = `${hamper.type}-${hamper.id}`;
                const isAdded = isItemInCart(hamper.id, hamper.type);
                
                return (
                  <div
                    key={hamper.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src={hamper.image}
                        alt={hamper.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {hamper.bestseller && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                          <Diamond className="w-3 h-3 fill-current" />
                          <span>Bestseller</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full font-bold">
                        {hamper.price}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{hamper.name}</h3>
                      <div className="space-y-2 mb-4">
                        {hamper.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 text-gray-600">
                            <Gift className="w-3 h-3 text-rose-400" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => handleAddToCart(hamper)}
                        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                          isAdded 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'
                        }`}
                        disabled={isAdded}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Cart</span>
                          </>
                        ) : (
                          <>
                            <Gift className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-12 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Music className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Ready to Create Magic?</h2>
          <p className="text-rose-100 mb-6 text-lg">
            Let us help you create an unforgettable {selectedOccasion.toLowerCase()} celebration that you'll treasure forever.
          </p>
          <button className="bg-white text-rose-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-rose-50 transition-colors flex items-center space-x-2 mx-auto">
            <Camera className="w-5 h-5" />
            <span>Book Your Surprise</span>
          </button>
        </div>
      </div>
    </div>
  );
}