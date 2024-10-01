import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useItem } from '../context/ItemContext';
import { useCart } from '../context/CartContext';

const FruitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedItem, getItemDetailById } = useItem();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) getItemDetailById(id);
  }, [id, getItemDetailById]);

  // Function to handle increment
  const incrementQuantity = () => {
    setQuantity((prev: number) => prev + 1);
  };

  // Function to handle decrement
  const decrementQuantity = () => {
    setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1));
  };

  // Function to handle adding to cart
  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart(selectedItem, quantity);
    }
  };

  if (!selectedItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{selectedItem.productName}</h2>
      <p className="text-lg text-gray-600 mb-2">{selectedItem.description}</p>
      <p className="text-xl text-gray-900 font-semibold">Price: ${selectedItem.price}</p>
      <p className="text-lg text-gray-600 mb-4">Stock: {selectedItem.stock}</p>

      {/* Quantity Controls */}
      <div className="flex items-center mb-4">
        <button
          className="px-4 py-2 bg-gray-300 text-lg font-bold"
          onClick={decrementQuantity}
        >
          -
        </button>
        <span className="mx-4 text-xl">{quantity}</span>
        <button
          className="px-4 py-2 bg-gray-300 text-lg font-bold"
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>

      <button
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default FruitDetail;
