import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddSeller from './AddSeller'; 

interface Seller {
    _id: string;
    name: string;
    email: string;
    storeName: string;
}

const AdminSellers: React.FC = () => {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [isAddingSeller, setIsAddingSeller] = useState(false); 

    const fetchSellers = async () => {
        try {
            const response = await fetch('/api/v1/admin/sellers');
            const data = await response.json();
            setSellers(data);
        } catch (error) {
            console.error('Error fetching sellers:', error);
        }
    };

    const removeSeller = async (sellerId: string) => {
        if (window.confirm('Are you sure you want to remove this seller?')) {
            try {
                await fetch(`/api/v1/admin/sellers/${sellerId}`, {
                    method: 'DELETE',
                });
                setSellers(sellers.filter(seller => seller._id !== sellerId));
            } catch (error) {
                console.error('Error removing seller:', error);
            }
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []);

    // Function to handle when a new seller is added
    const handleSellerAdded = (newSeller: Seller) => {
        setSellers([...sellers, newSeller]); 
        setIsAddingSeller(false); 
    };

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            fontFamily: '"Arial", sans-serif',
            padding: '20px',
            backgroundColor: '#f4f4f4',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            backgroundColor: '#228B22',
            color: 'white',
            padding: '10px',
            textAlign: 'left',
        },
        td: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
        button: {
            padding: '5px 10px',
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        noSellers: {
            textAlign: 'center',
            padding: '20px',
            fontSize: '18px',
            color: '#777',
        },
        header: {
            fontSize: '24px',
            marginBottom: '20px',
            textAlign: 'center',
            position: 'relative',
        },
        addButton: {
            position: 'absolute',
            right: '20px',
            top: '0',
            backgroundColor: '#228B22',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            border: 'none',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>
                Registered Sellers
                <button style={styles.addButton} onClick={() => setIsAddingSeller(true)}>
                    Add Seller
                </button>
            </h1>
            
            {/* Conditionally render AddSeller form */}
            {isAddingSeller && <AddSeller onSellerAdded={handleSellerAdded} />}

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Store Name</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.length > 0 ? (
                        sellers.map((seller) => (
                            <tr key={seller._id}>
                                <td style={styles.td}>{seller.name}</td>
                                <td style={styles.td}>{seller.email}</td>
                                <td style={styles.td}>{seller.storeName}</td>
                                <td style={styles.td}>
                                    <button style={styles.button} onClick={() => removeSeller(seller._id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} style={styles.noSellers}>No sellers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminSellers;
