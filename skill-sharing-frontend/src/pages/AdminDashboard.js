import React, { useState } from 'react';
import UsersTab from '../components/analytics/UsersTab';
import AnalyticsTab from '../components/analytics/AnalyticsTab';
import PurchasesTab from '../components/analytics/PurchasesTab';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Users');
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // remove token from localStorage
    setUser(null); // Optionally clear user state
    navigate('/'); // Redirect to the login page
}

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
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
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="ml-3 mt-6 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-400 focus:outline-none"
              >
                Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-10 bg-white">
          <h2 className="text-3xl font-bold mb-6">{activeTab}</h2>

          {activeTab === 'Users' && <UsersTab />}
          {activeTab === 'Analytics' && <AnalyticsTab />}
          {activeTab === 'Purchases' && <PurchasesTab />}
          
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
