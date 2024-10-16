import React, { createContext, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface ItemProps {
    _id: string,
    description: string
    price: string
    productName: string
    stock: string
};

interface ItemContextProps {
    addItem: (itemProps: ItemProps) => Promise<void>;
    getAllItems: () => Promise<ItemProps[]>;
    items: ItemProps[];
    selectedItem: ItemProps | null;
    getItemDetailById: (id: string) => Promise<ItemProps | null>;
}

const ItemContext = createContext<ItemContextProps>({
    addItem: async () => {},
    getAllItems: async () => [],
    items: [],
    selectedItem: null,
    getItemDetailById: async () => null,
});

export const useItem = () => useContext(ItemContext);

export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = React.useState<ItemProps []>([]);
    const [selectedItem, setSelectedItem] = React.useState<ItemProps | null>(null);

  const navigate = useNavigate();

  const addItem = useCallback(async (itemDetails: ItemProps) => {
    try {
        const response = await axios.post("http://localhost:3000/api/v1/items/addItem", itemDetails, 
        { withCredentials: true } 
        );

        if (response.status === 201) {
            toast.success("Item added successfully");
            navigate("/products");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add item");
    }
  },[]);

  const getAllItems = useCallback(async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/v1/items", {
            withCredentials: true,
        });
        console.log(response.data);
        setItems(response.data.item);
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        return [];
    }
}, []); 

  const getItemDetailById = useCallback(async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/items/get/${id}`, {
        withCredentials: true,
      });
      setSelectedItem(response.data.item);
      return response.data.item;
    } catch (error) {
      console.error("Error fetching item detail:", error);
      return null;
    }
  },[]);


return (
    <ItemContext.Provider value={{ addItem, items, getAllItems, getItemDetailById, selectedItem }}>
        {children}
    </ItemContext.Provider>
);
};
