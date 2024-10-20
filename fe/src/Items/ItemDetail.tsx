import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useItem } from '../context/ItemContext';
import { useCart } from '../context/CartContext';

const ItemDetail = () => {
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
    <div className="container mx-auto p-4 bg-green-50 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-green-700 mb-4">{selectedItem.productName}</h2>
      <p className="text-lg text-green-600 mb-2">{selectedItem.description}</p>
      <p className="text-xl text-green-800 font-semibold">Price: ${selectedItem.price}</p>
      <p className="text-lg text-green-600 mb-4">Stock: {selectedItem.stock}</p>

      {/* Quantity Controls */}
      <div className="flex items-center mb-4">
        <button
          className="px-4 py-2 bg-green-300 hover:bg-green-400 text-lg font-bold rounded-lg"
          onClick={decrementQuantity}
        >
          -
        </button>
        <span className="mx-4 text-xl text-green-800">{quantity}</span>
        <button
          className="px-4 py-2 bg-green-300 hover:bg-green-400 text-lg font-bold rounded-lg"
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>

      <button
        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      <div className="mt-6 text-green-600">
        <p>🌿 Every purchase supports eco-friendly practices. Thank you for contributing to a greener planet! 🌍</p>
      </div>
    </div>
  );
};

export default ItemDetail;
