import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Payment {
    paymentid: string;
    BuyerID: string;
    amount: number;
    status: string;
    OrderDate : string;
}

const PaymentManagement: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);

    const fetchPayments = async () => {
        try {
            var res= await axios.get('http://localhost:3000/api/v1/admin/orders',{
                withCredentials: true,
              });
            if(res.status==200){
                const data = await res.data;
                console.log(data)
                var payments:Payment[]=[];
                data.forEach((element: { paymentid: any; BuyerID: any;  amount: any; status: any; OrderDate: any; }) => {
                    const formattedDate = new Date(element.OrderDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true
                    });
                    payments.push({
                        "paymentid": element.paymentid,
                        "BuyerID": element.BuyerID,
                        "amount": element.amount,
                        "status": element.status,
                        "OrderDate" : formattedDate,
                    })
                });
                setPayments(payments)
            }else{
                throw new Error("Failed Fetching")
            }
            
        } catch (error) {
            console.error('Error fetching sellers:', error);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    // Inline styles
    const containerStyle = {
        maxWidth: '1800px',
        margin: '0 auto',
        padding: '2px',
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
                        <th style={thStyle}>BuyerId</th>
                        {/* <th style={thStyle}>Item Count</th> */}
                        <th style={thStyle}>Order Date</th>
                        <th style={thStyle}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.paymentid}>
                            <td style={tdStyle}>{payment.paymentid}</td>
                            <td style={tdStyle}>${payment.amount.toFixed(2)}</td>
                            <td style={tdStyle}>{payment.BuyerID}</td>
                            <td style={tdStyle}>{payment.OrderDate}</td>
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
