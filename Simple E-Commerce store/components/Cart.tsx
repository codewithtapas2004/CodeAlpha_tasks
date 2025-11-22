
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10 bg-white p-8 rounded-lg shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h1 className="text-3xl font-bold text-gray-900 my-4">Your cart is empty</h1>
        <Link to="/" className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Shopping Cart</h1>
      <div className="space-y-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
              <div>
                <Link to={`/product/${item.id}`} className="font-semibold text-lg text-gray-800 hover:text-indigo-600">{item.name}</Link>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold hover:bg-gray-100 rounded-l-md">-</button>
                <span className="px-4 py-1">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold hover:bg-gray-100 rounded-r-md">+</button>
              </div>
              <p className="font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-end">
        <div className="text-right">
          <p className="text-xl font-bold text-gray-800">
            Total: <span className="text-3xl ml-2">${cartTotal.toFixed(2)}</span>
          </p>
          <p className="text-gray-500">Taxes and shipping calculated at checkout.</p>
        </div>
        <Link
          to="/checkout"
          className="mt-6 w-full sm:w-auto bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-lg"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
