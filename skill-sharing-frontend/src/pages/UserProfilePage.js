import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UserProfilePage = () => {
  const [user, setUser] = useState({name: '', email: ''});

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
      } catch(error){
        console.error('Error fetching profile: ', error);
      }
    };

    fetchUserProfile();

}, []);


  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>Name: </strong> {user.name}</p>
      <p><strong>Email: </strong> {user.email}</p>
    </div>
  )
}

export default UserProfilePage
