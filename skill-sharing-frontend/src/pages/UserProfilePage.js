import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UserProfilePage = () => {
  const [user, setUser] = useState({name: '', email: ''});
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false); // Stop loading once data is fetched
      } catch(error){
        console.error('Error fetching profile: ', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchUserProfile();

}, []);

if (loading) {
  return (
      <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
  );
}


  return (
    
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0">
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      <a href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">
                        Home
                      </a>
                      <a href="/explore" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                        Explore
                      </a>
                      <a href="/about" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                        About
                      </a>
                      <a href="/contact" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                        Contact
                      </a>
                    </div>
                  </div>
                  <a href="/login" className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button
                    type="button"
                    className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none"
                    >
                    Login
                    </button>
                  </a>
                </div>
              </div>
            </nav>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">{user.name}'s Profile</h1>
                <div className="text-lg text-gray-700 mb-4">
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                    <p><span className="font-semibold">Role:</span> {user.role}</p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Skills</h2>
                <ul className="space-y-4">
                    {user.skills.map(skill => (
                        <li key={skill.id} className="p-4 border rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                            <h3 className="text-xl font-bold text-gray-800">{skill.title}</h3>
                            <p className="text-gray-600">{skill.description}</p>
                            <p className="text-gray-800 font-semibold">Price: ${skill.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
    </div>
  )
}

export default UserProfilePage
