import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDetails = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const currentTotal = item.price * item.addToCartQuantity
      return total + currentTotal;
    }, 0);
  };

  // Handle checkout button click
  const handleCheckout = () => {
    console.log('Checkout clicked');
    navigate('/checkout');
  };

  if (!cart.length) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => {
          return (
            <div key={item._id} className="flex justify-between items-center p-4 border-b">
              <div>
                <h3 className="text-xl font-semibold">{item.productName}</h3>
                <p className="text-gray-600">Quantity: {item.addToCartQuantity}</p>
              </div>
              <p className="text-lg font-semibold">${(item.price * item.addToCartQuantity).toFixed(2)}</p>
            </div>
          );
        })}
      </div>

      {/* Total Price */}
      <div className="mt-4">
        <h3 className="text-2xl font-bold">
          Total: ${calculateTotalPrice().toFixed(2)}
        </h3>
      </div>

      {/* Checkout Button */}
      <div className="mt-6">
        <button
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDetails;
