import React, { createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";

export interface FruitProps {
  _id: string;
  description: string;
  price: number;
  productName: string;
  stock: string;
  addToCartQuantity: number;
}

interface FruitContextProps {
  addToCart: (fruitDetails: FruitProps, quantity: number) => Promise<void>;
  cart: FruitProps[];
}

const CartContext = createContext<FruitContextProps>({
  addToCart: async () => {},
  cart: [],
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = React.useState<FruitProps[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      console.log("Loading cart from localStorage:", savedCart);
      setCart(JSON.parse(savedCart)); // Parse and load cart from localStorage
    }
  }, []);

  // Save cart to localStorage whenever cart state changes
  useEffect(() => {
    if (cart.length > 0) {
      console.log("Saving cart to localStorage:", cart);
      localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    }
  }, [cart]);

  const addToCart = async (fruitDetails: FruitProps, quantity: number) => {
    try {
      // Check if the fruit is already in the cart
      const existingFruitIndex = cart.findIndex(
        (item) => item._id === fruitDetails._id
      );

      let updatedCart: FruitProps[];

      if (existingFruitIndex !== -1) {
        // If the fruit already exists, update its quantity
        updatedCart = cart.map((item, index) =>
          index === existingFruitIndex
            ? {
                ...item,
                addToCartQuantity: item.addToCartQuantity + quantity,
              }
            : item
        );
      } else {
        // If the fruit is new to the cart, add it
        updatedCart = [...cart, { ...fruitDetails, addToCartQuantity: quantity }];
      }

      setCart(updatedCart); // Update the state with the new or modified cart
      toast.success(`Added ${quantity} ${fruitDetails.productName} to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add fruit to cart");
    }
  };

  return (
    <CartContext.Provider value={{ addToCart, cart }}>
      {children}
    </CartContext.Provider>
  );
};
