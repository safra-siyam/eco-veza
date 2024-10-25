import React, { useEffect, useState, CSSProperties } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        const response = await fetch('/api/v1/admin/users');
        const data = await response.json();
        setUsers(data);
    };

    const deleteUser = async (userId: string) => {
        await fetch(`/api/v1/admin/users/${userId}`, { method: 'DELETE' });
        setUsers(users.filter(user => user.id !== userId));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Inline styles
    const containerStyle: CSSProperties = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    };

    const headingStyle: CSSProperties = {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    };

    const tableStyle: CSSProperties = {
        width: '100%',
        borderCollapse: 'collapse',
    };

    const thStyle: CSSProperties = {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#4CAF50',
        color: 'white',
    };

    const tdStyle: CSSProperties = {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };

    const trHoverStyle: CSSProperties = {
        backgroundColor: '#f1f1f1',
    };

    const buttonStyle: CSSProperties = {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle: CSSProperties = {
        ...buttonStyle,
        backgroundColor: '#d32f2f',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Manage Users</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} style={{ ...trHoverStyle }}>
                            <td style={tdStyle}>{user.name}</td>
                            <td style={tdStyle}>{user.email}</td>
                            <td style={tdStyle}>
                                <button
                                    style={buttonStyle}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor || ''}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor || ''}
                                    onClick={() => deleteUser(user.id)}
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

export default UserManagement;
