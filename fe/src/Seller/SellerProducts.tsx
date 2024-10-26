import { Link } from 'react-router-dom';
import ProductCard from './SellerProductCard';
import { useEffect } from 'react';
import { ItemProps, useItem } from '../context/ItemContext';

const ProductList = () => {

  const { getAllItems, items } = useItem();

  useEffect(() => {
    // Fetch products
    getAllItems();
  }, [getAllItems]);
    
    return (
        <div className="min-h-screen bg-[#F5F5DC]">
            <div className="container mx-auto p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-[#228B22]">My Products</h2>
                    <Link to={'/add-item'}>
                      <button className="bg-[#228B22] text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300">
                        Add Product
                      </button>
                    </Link>
                </div>
                
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((product: ItemProps) => (
                        <ProductCard 
                          key={product._id} 
                          productName={product.productName} 
                          description={product.description} 
                          price={product.price} 
                          stock={product.stock} 
                          _id={product._id} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
