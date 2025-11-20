
import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You For Your Order!</h1>
      <p className="text-gray-700 mb-6">Your order has been placed successfully. A confirmation email has been sent to you.</p>
      <Link to="/" className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;
