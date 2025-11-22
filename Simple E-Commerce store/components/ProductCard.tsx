
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    addToast(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col group">
      <Link to={`/product/${product.id}`} className="block relative">
        <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-gray-500 text-sm mb-1">{product.category}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex-grow">
          <Link to={`/product/${product.id}`} className="hover:text-indigo-600 transition-colors">{product.name}</Link>
        </h3>
        <p className="text-2xl font-bold text-gray-900 mt-auto">${product.price.toFixed(2)}</p>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleAddToCart}
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
