import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ProductDetails = ({ isOpen, onClose, product }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-5xl flex"
          >
            {/* Left side - Image */}
            <div className="w-1/2 relative">
              <img
                src={product.image_url || '/api/placeholder/400/300'}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/300';
                }}
              />
            </div>

            {/* Right side - Content */}
            <div className="w-1/2 p-8 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {product.name}
                  </h2>
                </div>

                {/* IDs Section */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Product ID</p>
                    <p className="text-base font-semibold text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {product.id}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Stock ID</p>
                    <p className="text-base font-semibold text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {product.stock_id || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Description Section */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {product.description || 'No description available'}
                    </p>
                  </div>
                </div>

                {/* Category Tag */}
                {product.category && (
                  <div className="pt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-50 text-orange-700">
                      {product.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetails;