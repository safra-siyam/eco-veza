import React, { createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// Define the structure of an item in the cart
export interface ItemProps {
  _id: string;
  description: string;
  price: number;
  productName: string;
  stock: string;
  addToCartQuantity: number;
}

// Define the structure of the CartContext
interface ItemContextProps {
  addToCart: (itemDetails: ItemProps, quantity: number) => Promise<void>;
  cart: ItemProps[];
  clearCart: () => void;
}

// Create the CartContext with default values
const CartContext = createContext<ItemContextProps>({
  addToCart: async () => {},
  cart: [],
  clearCart: () => {},
});

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap around parts of the app that need cart functionality
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = React.useState<ItemProps[]>([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      console.log("Loading cart from localStorage:", savedCart);
      setCart(JSON.parse(savedCart)); // Parse and load cart from localStorage
    }
  }, []);

  // Save cart to localStorage whenever the cart state changes
  useEffect(() => {
    if (cart.length > 0) {
      console.log("Saving cart to localStorage:", cart);
      localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    } else {
      localStorage.removeItem("cart"); // Clear localStorage if the cart is empty
    }
  }, [cart]);

  // Function to add an item to the cart or update its quantity if it already exists
  const addToCart = async (itemDetails: ItemProps, quantity: number) => {
    try {
      // Check if the item is already in the cart
      const existingItemIndex = cart.findIndex(
        (item) => item._id === itemDetails._id
      );

      let updatedCart: ItemProps[];

      if (existingItemIndex !== -1) {
        // If the item already exists, update its quantity
        updatedCart = cart.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                addToCartQuantity: item.addToCartQuantity + quantity,
              }
            : item
        );
      } else {
        // If the item is new to the cart, add it
        updatedCart = [...cart, { ...itemDetails, addToCartQuantity: quantity }];
      }

      setCart(updatedCart); // Update the state with the new or modified cart
      toast.success(`Added ${quantity} ${itemDetails.productName} to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  // Function to clear the cart (on sign-out or when needed)
  const clearCart = () => {
    setCart([]); // Clear cart state
    localStorage.removeItem("cart"); // Remove cart from localStorage
    console.log("Cart cleared.");
  };

  // Provide the context values (addToCart, cart, clearCart)
  return (
    <CartContext.Provider value={{ addToCart, cart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
