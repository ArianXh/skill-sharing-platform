import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const UserProfilePage = () => {
  const [user, setUser] = useState({name: '', email: '', role: '', skills: [] });
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
            <Navbar />
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
                            <p className="text-gray-800 font-semibold">Skill Level: {skill.skill_level}</p>
                            <p className="text-gray-800 font-semibold">Popularity Score: {skill.popularity_score}</p>
                        </li>
                    ))}
                </ul>
            </div>
    </div>
  )
}

export default UserProfilePage
