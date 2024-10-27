import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDetails = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const currentTotal = Number(item.price) * item.addToCartQuantity;
      return total + currentTotal;
    }, 0);
  };

  // Handle checkout button click
  const handleCheckout = () => {
    console.log('Checkout clicked');
    navigate('/checkout', { state: { cart } });
  };

  if (!cart.length) {
    return <div className="text-green-800">Your cart is empty. Shop eco-friendly products and help the planet!</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-green-50 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-green-700 mb-4">Organic Cart</h2>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => {
          return (
            <div key={item._id} className="flex justify-between items-center p-4 border-b border-green-200">
              <div>
                <h3 className="text-xl font-semibold text-green-800">{item.productName}</h3>
                <p className="text-green-600">Quantity: {item.addToCartQuantity}</p>
              </div>
              <p className="text-lg font-semibold text-green-700">${(Number(item.price) * item.addToCartQuantity).toFixed(2)}</p>
            </div>
          );
        })}
      </div>

      {/* Total Price */}
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-green-800">
          Total: ${calculateTotalPrice().toFixed(2)}
        </h3>
      </div>

      {/* Checkout Button */}
      <div className="mt-6">
        <button
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Eco Message */}
      <div className="mt-6 text-green-600">
        <p>🌿 Thank you for choosing eco-friendly products! Together, we can make a difference for our planet. 🌍</p>
      </div>
    </div>
  );
};

export default CartDetails;
