import { ChangeEvent, useState } from "react";
import { useAuth } from "./context/AuthContext";

const SignupPage = () => {
  const { signup } = useAuth();

  // State to store form values
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  // State to store errors
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    };
    let isValid = true;

    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted with data:", formData);
      // Perform your form submission logic here, e.g., send data to backend
      await signup(
        formData.username,
        formData.email,
        formData.password,
        formData.address,
        formData.phone
      );

      // Reset form data
      setFormData({
        username: "",
        email: "",
        password: "",
        address: "",
        phone: "",
      });
      // Clear errors
      setErrors({
        username: "",
        email: "",
        password: "",
        address: "",
        phone: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5DC]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-[#228B22]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#228B22]">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-[#228B22] font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.username ? "border-red-500" : "border-[#228B22]"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#228B22]`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#228B22] font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.email ? "border-red-500" : "border-[#228B22]"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#228B22]`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-[#228B22] font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.password ? "border-red-500" : "border-[#228B22]"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#228B22]`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-[#228B22] font-semibold mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.address ? "border-red-500" : "border-[#228B22]"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#228B22]`}
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-[#228B22] font-semibold mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.phone ? "border-red-500" : "border-[#228B22]"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#228B22]`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#228B22] text-white p-3 rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
