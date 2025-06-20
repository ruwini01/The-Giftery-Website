import React from 'react';
import { useCart } from '../context/CartContext';
import { useBudget } from '../context/BudgetContext';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ArrowLeft, 
  Gift, 
  Flower,
  CheckCircle,
  AlertCircle,
  CreditCard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { 
    items, 
    totalItems, 
    totalAmount, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();
  
  const { budget } = useBudget();
  const navigate = useNavigate();

  const handleQuantityChange = (id, type, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, type);
    } else {
      updateQuantity(id, type, newQuantity);
    }
  };

  const handleRemoveItem = (id, type) => {
    removeFromCart(id, type);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handleContinueShopping = () => {
    navigate('/surprise-collection');
  };

  const handleCheckout = () => {
  // Replace the alert with actual checkout logic
  // After successful checkout, clear the cart
  if (window.confirm('Complete your order?')) {
    clearCart(); // This will reset all "added" states
    alert('Order placed successfully!');
    navigate('/surprise-collection');
  }
};

  const isBudgetExceeded = budget > 0 && totalAmount > budget;
  const remainingBudget = budget > 0 ? budget - totalAmount : null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
        {/* Header */}
        <div className="bg-white shadow-lg border-b-4 border-rose-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-8 h-8 text-rose-500" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Shopping Cart
                </h1>
              </div>
              <button
                onClick={handleContinueShopping}
                className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Looks like you haven't added any items to your cart yet. Let's find something special for your celebration!
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <Heart className="w-5 h-5" />
              <span>Start Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-rose-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-8 h-8 text-rose-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </h1>
            </div>
            <button
              onClick={handleContinueShopping}
              className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Items</h2>
                <button
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-700 font-medium flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear Cart</span>
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              {item.type === 'decoration' ? (
                                <Flower className="w-4 h-4 text-rose-400" />
                              ) : (
                                <Gift className="w-4 h-4 text-emerald-400" />
                              )}
                              <span className="text-sm text-gray-600 capitalize">{item.type}</span>
                            </div>
                            <p className="text-lg font-bold text-gray-800 mt-2">{item.price}</p>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.id, item.type)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 mt-4">
                          <span className="text-gray-600 font-medium">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.type, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.type, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-gray-600 ml-4">
                            Subtotal: <span className="font-bold">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Budget Status */}
            {budget > 0 && (
              <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${
                isBudgetExceeded ? 'border-red-500' : 'border-green-500'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  {isBudgetExceeded ? (
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  <h3 className="text-lg font-bold text-gray-800">Budget Status</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget Limit:</span>
                    <span className="font-bold">Rs.{budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Total:</span>
                    <span className="font-bold">${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {isBudgetExceeded ? 'Over Budget:' : 'Remaining:'}
                    </span>
                    <span className={`font-bold ${isBudgetExceeded ? 'text-red-600' : 'text-green-600'}`}>
                      Rs.{Math.abs(remainingBudget).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {isBudgetExceeded && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 text-sm">
                      Your cart total exceeds your budget. Please remove some items or increase your budget.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items):</span>
                  <span className="font-bold">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Setup Service:</span>
                  <span className="font-bold text-green-600">Included</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-800">Total:</span>
                  <span className="font-bold text-gray-800">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isBudgetExceeded}
                className={`w-full mt-6 py-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isBudgetExceeded
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Proceed to Checkout</span>
              </button>

              <p className="text-gray-500 text-sm text-center mt-4">
                Secure checkout with 256-bit SSL encryption
              </p>
            </div>

            {/* Continue Shopping */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-6 text-white text-center">
              <Heart className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <h3 className="text-lg font-bold mb-2">Need More Items?</h3>
              <p className="text-rose-100 mb-4 text-sm">
                Complete your celebration with more decorations and gifts
              </p>
              <button
                onClick={handleContinueShopping}
                className="bg-white text-rose-600 px-6 py-2 rounded-lg font-medium hover:bg-rose-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}