import React, { useState } from "react";
import { useItem } from "../context/ItemContext";
import { v4 as uuidv4 } from "uuid";

const AddItem: React.FC = () => {
  const generateUniqueId = () => uuidv4();
  const { addItem } = useItem();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    image: "", 
  });

  const [errors, setErrors] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: reader.result as string, // Store base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {
      productName: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    };
    let isValid = true;

    if (!formData.productName) {
      newErrors.productName = "Product name is required";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a number";
      isValid = false;
    }

    if (!formData.stock) {
      newErrors.stock = "Stock is required";
      isValid = false;
    } else if (isNaN(Number(formData.stock))) {
      newErrors.stock = "Stock must be a number";
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = "Image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted with data:", formData);

      await addItem({
        ...formData, _id: generateUniqueId(),
        addToCartQuantity: 0
      });

      // Reset form data
      setFormData({
        productName: "",
        description: "",
        price: "",
        stock: "",
        image: "",
      });

      // Clear errors
      setErrors({
        productName: "",
        description: "",
        price: "",
        stock: "",
        image: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5DC]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-[#228B22]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#228B22]">
          Add Product
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-[#228B22] font-semibold mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.productName ? "border-red-500" : "border-[#228B22]"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#228B22]`}
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-[#228B22] font-semibold mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.description ? "border-red-500" : "border-[#228B22]"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#228B22]`}
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-[#228B22] font-semibold mb-1"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.price ? "border-red-500" : "border-[#228B22]"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#228B22]`}
              placeholder="Enter product price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-[#228B22] font-semibold mb-1"
            >
              Stock
            </label>
            <input
              type="text"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.stock ? "border-red-500" : "border-[#228B22]"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#228B22]`}
              placeholder="Enter stock quantity"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-[#228B22] font-semibold mb-1"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className={`w-full p-3 border ${
                errors.image ? "border-red-500" : "border-[#228B22]"
              } rounded-md focus:outline-none`}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#228B22] text-[#F5F5DC] p-3 rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
