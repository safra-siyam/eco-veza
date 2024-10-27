import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios'; // For sending requests to your backend
import { useLocation } from 'react-router-dom';
import { ItemProps } from './context/CartContext';
import { PaymentIntent } from '@stripe/stripe-js';
import { toast } from 'react-toastify';

// Define the Checkout component
const Checkout: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  var {cart} = location.state || { cart: [] };

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // Function to calculate total price
  const calculateTotalPrice = () => {
    console.log(cart)
    return cart.reduce((total: number, item: ItemProps) => {
      return total + (Number(item.price) * item.addToCartQuantity);
    }, 0);
  };

  // Define the type for the submit event
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Disable the form while loading
    setLoading(true);
    setErrorMessage('');

    try {
      // Create payment intent by sending a request to your backend
      const { data } = await axios.post('http://localhost:3000/api/v1/payment/create-payment-intent', {
        amount: calculateTotalPrice() * 100, // Convert total to cents
      },{
        withCredentials: true,
      });

      const intent: PaymentIntent = data.data;

      // Get the CardElement
      const cardElement = elements?.getElement(CardElement);

      if (!cardElement || !stripe) {
        throw new Error('Stripe or CardElement is not initialized.');
      }

      // Confirm the payment using Stripe
      const paymentResult = await stripe.confirmCardPayment(intent.client_secret!, {
        payment_method: {
          card: cardElement
        },
      });

      setLoading(false);

      if (paymentResult.error) {
        // Show error to the customer
        setErrorMessage(paymentResult.error.message || 'Payment failed');
      } else if (paymentResult.paymentIntent && paymentResult.paymentIntent.status === 'succeeded') {
        // Payment succeeded, show success message

        const resp = await axios.post('http://localhost:3000/api/v1/orders/createOrder', {
          paymentid : paymentResult.paymentIntent.id,
          status: "PAID",
          amount: paymentResult.paymentIntent.amount,
          items: cart
        },{
          withCredentials: true,
        });

        if(resp.status!=201){
          toast.error("Purchasing Failed")
        }else{
          setPaymentSuccess(true);
          cart = [];
        }

        
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('An error occurred during payment processing.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-green-50 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-green-700 mb-4">Checkout</h2>
      
      {/* Cart Items */}
      <div className="mb-4">
        {cart.length ? (
          <ul className="space-y-2">
            {cart.map((item: ItemProps) => (
              <li key={item._id} className="flex justify-between items-center border-b border-green-200 pb-2">
                <span className="text-lg font-semibold text-green-800">{item.productName}</span>
                <span className="text-lg text-green-700">{`$${(Number(item.price) * item.addToCartQuantity).toFixed(2)}`}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-600">No items in your cart.</p>
        )}
      </div>

      {/* Total Price */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-green-800">
          Total: ${calculateTotalPrice().toFixed(2)}
        </h3>
      </div>

      {paymentSuccess ? (
        <p className="text-green-600 text-lg mt-4">🌿 Payment succeeded! Thank you for supporting sustainable products. 🌍</p>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`px-6 py-2 ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold rounded-lg`}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
          {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default Checkout;
