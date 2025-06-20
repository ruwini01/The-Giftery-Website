// context/CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && item.type === action.payload.type
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && item.type === action.payload.type
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + parseFloat(action.payload.price.replace('$', ''))
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + parseFloat(action.payload.price.replace('$', ''))
        };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const itemToRemove = state.items.find(item => 
        item.id === action.payload.id && item.type === action.payload.type
      );
      
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter(item => 
          !(item.id === action.payload.id && item.type === action.payload.type)
        ),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalAmount: state.totalAmount - (parseFloat(itemToRemove.price.replace('$', '')) * itemToRemove.quantity)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const item = state.items.find(item => 
        item.id === action.payload.id && item.type === action.payload.type
      );
      
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;
      const priceDiff = parseFloat(item.price.replace('$', '')) * quantityDiff;

      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => 
            !(item.id === action.payload.id && item.type === action.payload.type)
          ),
          totalItems: state.totalItems - item.quantity,
          totalAmount: state.totalAmount - (parseFloat(item.price.replace('$', '')) * item.quantity)
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.type === action.payload.type
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalItems: state.totalItems + quantityDiff,
        totalAmount: state.totalAmount + priceDiff
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0
      };

    case CART_ACTIONS.LOAD_CART:
      return action.payload;

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

// Create context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('surpriseCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('surpriseCart', JSON.stringify(cartState));
  }, [cartState]);

  // Cart actions
  const addToCart = (item) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
  };

  const removeFromCart = (id, type) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id, type } });
  };

  const updateQuantity = (id, type, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, type, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getItemQuantity = (id, type) => {
    const item = cartState.items.find(item => item.id === id && item.type === type);
    return item ? item.quantity : 0;
  };

  const isItemInCart = (id, type) => {
    return cartState.items.some(item => item.id === id && item.type === type);
  };

  const value = {
    ...cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isItemInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Export actions for external use if needed
export { CART_ACTIONS };