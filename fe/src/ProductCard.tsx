import { useNavigate } from "react-router-dom";
import { ItemProps } from "./context/ItemContext";

const ProductCard = ({ _id, productName, description, price, stock, image }: ItemProps) => {
  const navigate = useNavigate();

  // Function to handle click and navigate to the product details page
  const handleClick = () => {
    navigate(`/products/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#F5F5DC] rounded-lg shadow-md overflow-hidden max-w-sm cursor-pointer border-2 border-transparent hover:border-[#228B22] transition-all duration-300"
    >
      {/* Product Image */}
      <img
        src={image}
        alt={productName}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        {/* Product Name */}
        <h2 className="text-xl font-semibold text-[#228B22]">{productName}</h2>

        {/* Product Description */}
        <p className="mt-2 text-gray-700">{description}</p>

        {/* Price and Stock Information */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-[#228B22]">${Number(price).toFixed(2)}</span>
          <span
            className={`text-sm font-medium ${
              Number(stock) > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {Number(stock) > 0 ? `In Stock (${stock})` : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
