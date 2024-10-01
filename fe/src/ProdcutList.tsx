import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import { ItemProps, useItem } from './context/ItemContext';

const ProductList = () => {

  const { getAllItems, items } = useItem();

  useEffect(() => {
    // Fetch products
    getAllItems();
  }, [getAllItems]);
    
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <Link to={'/add-fruit'} className="text-gray-700 hover:text-blue-500 transition">
              <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Product</button>
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((product: ItemProps) => (
                    <ProductCard key={product._id} productName={product.productName} description={product.description} price={product.price} stock={product.stock} _id={product._id} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
