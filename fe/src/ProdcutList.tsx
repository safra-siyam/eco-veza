import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { ItemProps, useItem } from './context/ItemContext';

const ProductList = () => {
  const { getAllItems, items } = useItem();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Fetch products
    getAllItems();
  }, [getAllItems]);

  // Filter items based on the search text
  const filteredItems = items.filter((product: ItemProps) => 
    product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
    product.description.toLowerCase().includes(searchText.toLowerCase()) ||
    product._id.toString().includes(searchText)
  );

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#228B22]">Our Products</h2>
          
          {/* Search Bar */}
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="p-2 border rounded w-full max-w-xs"
          />
          
          {/* Uncomment to enable Add Product button */}
          {/* 
          <Link to={'/add-item'}>
            <button className="bg-[#228B22] text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300">
              Add Product
            </button>
          </Link> 
          */}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((product: ItemProps) => (
            <ProductCard 
              key={product._id}
              productName={product.productName}
              description={product.description}
              price={product.price}
              stock={product.stock}
              image={product.image}
              _id={product._id}
              addToCartQuantity={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
