import React, { useState } from 'react';
import UsersTab from '..//components/UsersTab';
import AnalyticsTab from '../components/AnalyticsTab';
import PurchasesTab from '../components/PurchasesTab';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Users');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul>
          <li
            className={`p-3 cursor-pointer rounded-lg mb-3 ${
              activeTab === 'Users' ? 'bg-blue-500' : ''
            }`}
            onClick={() => handleTabClick('Users')}
          >
            Users
          </li>
          <li
            className={`p-3 cursor-pointer rounded-lg mb-3 ${
              activeTab === 'Analytics' ? 'bg-blue-500' : ''
            }`}
            onClick={() => handleTabClick('Analytics')}
          >
            Analytics
          </li>
          <li
            className={`p-3 cursor-pointer rounded-lg ${
              activeTab === 'Purchases' ? 'bg-blue-500' : ''
            }`}
            onClick={() => handleTabClick('Purchases')}
          >
            Purchases / Transactions
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-10 bg-white">
        <h2 className="text-3xl font-bold mb-6">{activeTab}</h2>

        {activeTab === 'Users' && <UsersTab />}
        {activeTab === 'Analytics' && <AnalyticsTab />}
        {activeTab === 'Purchases' && <PurchasesTab />}
      </main>
    </div>
  );
}

export default AdminDashboard;
