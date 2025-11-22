
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
        <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
            <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Products</Link>
        </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`${quantity} x ${product.name} added to cart!`);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
       <Link to="/" className="text-indigo-600 hover:underline mb-6 inline-block">&larr; Back to Products</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg shadow-md object-cover aspect-square" />
        </div>
        <div>
          <p className="text-indigo-600 font-semibold mb-2">{product.category}</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-4xl font-bold text-gray-800 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="quantity" className="font-semibold">Quantity:</label>
            <div className="flex items-center border rounded-md">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 text-lg font-bold hover:bg-gray-100 rounded-l-md">-</button>
                <input 
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                    min="1"
                    className="w-12 text-center border-none focus:ring-0"
                 />
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 text-lg font-bold hover:bg-gray-100 rounded-r-md">+</button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
