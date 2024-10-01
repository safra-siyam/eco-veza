import { useNavigate } from "react-router-dom";
import { ItemProps } from "./context/ItemContext";

const ProductCard = ( {_id, productName, description, price, stock }: ItemProps) => {
  const navigate = useNavigate();

  // Function to handle click and navigate to the product details page
  const handleClick = () => {
    navigate(`/products/${_id}`);
  };

    return (
      <div onClick={handleClick} className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
        {/* <img src={image} alt={name} className="w-full h-48 object-cover" /> */}
        <div className="p-4">
          <h2 className="text-lg font-semibold">{productName}</h2>
          <p className="mt-2 text-gray-600">{description}</p>
          <p className="mt-2 text-gray-500">${price}</p>
          <p className="mt-2 text-gray-500">Stock: {stock}</p>
        </div>
      </div>
    );
  };

export default ProductCard;