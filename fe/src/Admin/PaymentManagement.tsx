import React, { useEffect, useState } from 'react';

interface Payment {
    id: string;
    orderId: string;
    amount: number;
    status: string;
}

const PaymentManagement: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);

    const fetchPayments = async () => {
        const response = await fetch('/api/v1/admin/payments');
        const data = await response.json();
        setPayments(data);
    };

    useEffect(() => {
        fetchPayments();
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
        textAlign: 'left' as const,
        borderBottom: '1px solid #ddd',
        backgroundColor: '#4CAF50', // Primary color for header
        color: 'white',
    };

    const tdStyle: React.CSSProperties = {
        padding: '12px',
        textAlign: 'left' as const,
        borderBottom: '1px solid #ddd',
    };

    const statusStyle = (status: string) => ({
        color: status === 'Completed' ? 'green' : status === 'Pending' ? 'orange' : 'red',
        fontWeight: 'bold',
    });

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Manage Payments</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Order ID</th>
                        <th style={thStyle}>Amount</th>
                        <th style={thStyle}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id}>
                            <td style={tdStyle}>{payment.orderId}</td>
                            <td style={tdStyle}>${payment.amount.toFixed(2)}</td>
                            <td style={tdStyle}>
                                <span style={statusStyle(payment.status)}>{payment.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentManagement;
