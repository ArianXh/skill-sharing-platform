import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UsersTab() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Check if token is null or undefined
            if (!token) {
              throw new Error("No token found in localStorage.");
            }
    
            const response = await axios.get('http://localhost:5000/api/admin/users', {
              headers: { Authorization: `Bearer ${token}` },
            });
    
            setUsers(response.data);
            setLoading(false);
          } catch (error) {
              if (error.response && error.response.status === 403) {
                setError('Access denied. Admin privileges are required.');
              } else {
                setError('Failed to retrieve users.');
              }
          } finally {
            setLoading(false);
        }
        };

    fetchUsers();
  }, []);

  // Fetch a single user by ID
  const fetchUserById = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedUser(response.data);
    } catch (error) {
      setError('Failed to retrieve user details.');
    }
  };

  // Handle user update
  const handleUpdateUser = async (id, role, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/admin/user/${id}`,
        { role, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the user in the list
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? response.data : user
        )
      );
    } catch (error) {
      setError('Failed to update user.');
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the user from the list
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      setError('Failed to delete user.');
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Users</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={user.status}
                  onChange={(e) => handleUpdateUser(user.id, user.role, e.target.value)}
                  className="border p-1"
                />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => fetchUserById(user.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display selected user details */}
      {selectedUser && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h4 className="text-lg font-semibold">User Details</h4>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Bio:</strong> {selectedUser.bio}</p>
          <p><strong>Experience:</strong> {selectedUser.experience}</p>
          <p><strong>Credits:</strong> {selectedUser.credits}</p>
          <p><strong>Ratings Average:</strong> {selectedUser.ratings_average}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p>
          <p><strong>Status:</strong> {selectedUser.status}</p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Skills</h2>
                <ul className="space-y-4">
                    {selectedUser.skills.map(skill => (
                        <li key={skill.id} className="p-4 border rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                            <Link to={`/skills/${skill.id}`} className="block">
                                <h3 className="text-xl font-bold text-gray-800">{skill.title}</h3>
                                <p className="text-gray-600">{skill.description}</p>
                                <p className="text-gray-800 font-semibold">Price: ${skill.price}</p>
                                <p className="text-gray-800 font-semibold">Skill Level: {skill.skill_level}</p>
                                <p className="text-gray-800 font-semibold">Popularity Score: {skill.popularity_score}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
          <button
            onClick={() => setSelectedUser(null)}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default UsersTab;
