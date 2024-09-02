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
      <h2>Skills</h2>
      {user.skills && user.skills.length > 0 ? (
        <ul>
          {user.skills.map(skill => (
            <li key = {skill.id}>{skill.title}</li>
          ))}
        </ul>
      ) : (
        <p>No skills listed.</p>
      )}
    </div>
  )
}

export default UserProfilePage
