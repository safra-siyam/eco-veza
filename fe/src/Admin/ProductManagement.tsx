import React, { useEffect, useState } from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
}

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const response = await fetch('/api/v1/admin/products');
        const data = await response.json();
        setProducts(data);
    };

    const deleteProduct = async (productId: string) => {
        await fetch(`/api/v1/admin/products/${productId}`, { method: 'DELETE' });
        setProducts(products.filter(product => product.id !== productId));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Inline styles
    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    };

    const headingStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    };

    const tableStyle: React.CSSProperties = {
        width: '100%',
        borderCollapse: 'collapse',
    };

    const thStyle: React.CSSProperties = {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#4CAF50', // Primary color
        color: 'white',
    };

    const tdStyle: React.CSSProperties = {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };

    const buttonStyle = {
        backgroundColor: '#f44336', // Red color for delete
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#d32f2f', // Darker red on hover
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Manage Products</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Price</th>
                        <th style={thStyle}>Stock</th>
                        <th style={thStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td style={tdStyle}>{product.name}</td>
                            <td style={tdStyle}>${product.price.toFixed(2)}</td>
                            <td style={tdStyle}>{product.stock}</td>
                            <td style={tdStyle}>
                                <button
                                    style={buttonStyle}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                                    onClick={() => deleteProduct(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManagement;
