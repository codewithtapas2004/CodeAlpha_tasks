
import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate, Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Placing order...');
    clearCart();
    navigate('/order-confirmation');
  };

  if (cartItems.length === 0) {
      return (
        <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-800">Your cart is empty.</h2>
            <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Start Shopping</Link>
        </div>
      )
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" required className="p-2 border rounded-md"/>
                    <input type="text" placeholder="Last Name" required className="p-2 border rounded-md"/>
                    <input type="text" placeholder="Address" required className="sm:col-span-2 p-2 border rounded-md"/>
                    <input type="text" placeholder="City" required className="p-2 border rounded-md"/>
                    <input type="text" placeholder="State / Province" required className="p-2 border rounded-md"/>
                    <input type="text" placeholder="Zip / Postal Code" required className="p-2 border rounded-md"/>
                </div>
            </section>
            {/* Payment Details */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                <div className="space-y-4">
                    <input type="text" placeholder="Card Number" required className="w-full p-2 border rounded-md"/>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder="MM / YY" required className="p-2 border rounded-md"/>
                        <input type="text" placeholder="CVC" required className="p-2 border rounded-md"/>
                    </div>
                </div>
            </section>
        </div>
        {/* Order Summary */}
        <aside className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-lg"
            >
              Place Order
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default Checkout;
