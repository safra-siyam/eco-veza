import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios'; // For sending requests to your backend

// Define the Checkout component
const Checkout: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // Define the type for the submit event
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Disable the form while loading
    setLoading(true);
    setErrorMessage('');

    try {
      // Create payment intent by sending a request to your backend
      const { data } = await axios.post('http://localhost:3000/api/v1/payment/create-payment-intent', {
        amount: 5000, // Example amount in cents (e.g., 5000 = $50.00)
      });

      const clientSecret: string = data.clientSecret;

      // Get the CardElement
      const cardElement = elements?.getElement(CardElement);

      if (!cardElement || !stripe) {
        throw new Error('Stripe or CardElement is not initialized.');
      }

      // Confirm the payment using Stripe
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Your Name', // Get this from your form if necessary
          },
        },
      });

      setLoading(false);

      if (paymentResult.error) {
        // Show error to the customer
        setErrorMessage(paymentResult.error.message || 'Payment failed');
      } else if (paymentResult.paymentIntent && paymentResult.paymentIntent.status === 'succeeded') {
        // Payment succeeded, show success message
        setPaymentSuccess(true);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoading(false);
      setErrorMessage('An error occurred during payment processing.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Checkout</h2>
      {paymentSuccess ? (
        <p className="text-green-600">Payment succeeded! Thank you for your purchase.</p>
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
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg"
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
