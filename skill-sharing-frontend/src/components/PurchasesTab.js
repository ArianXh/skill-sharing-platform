import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PurchasesTab() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/transactions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTransactions(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch transactions.');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return <p className="text-center mt-5 text-gray-600">Loading transactions...</p>;
    if (error) return <p className="text-center text-red-500 mt-5">Error: {error}</p>;

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Purchase History</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3 text-left border-b">Transaction ID</th>
                            <th className="px-6 py-3 text-left border-b">Buyer</th>
                            <th className="px-6 py-3 text-left border-b">Seller</th>
                            <th className="px-6 py-3 text-left border-b">Skill</th>
                            <th className="px-6 py-3 text-left border-b">Amount</th>
                            <th className="px-6 py-3 text-left border-b">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {transactions.map((transaction, index) => (
                            <tr
                                key={transaction.id}
                                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                            >
                                <td className="px-6 py-4 border-b">{transaction.id}</td>
                                <td className="px-6 py-4 border-b">
                                    <span className="font-medium">{transaction.buyer.name}</span> <br />
                                    <span className="text-gray-500">{transaction.buyer.email}</span>
                                </td>
                                <td className="px-6 py-4 border-b">
                                    <span className="font-medium">{transaction.seller.name}</span> <br />
                                    <span className="text-gray-500">{transaction.seller.email}</span>
                                </td>
                                <td className="px-6 py-4 border-b">{transaction.skill.title}</td>
                                <td className="px-6 py-4 border-b font-semibold">{transaction.amount} credits</td>
                                <td className="px-6 py-4 border-b">
                                    {new Date(transaction.created_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PurchasesTab;
