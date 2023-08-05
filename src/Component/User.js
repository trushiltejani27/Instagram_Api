import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/User.css';
import { Link } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='body'>
      <div className="container">
        <div className='users-container'>
          {users.map((user, index) => (
            <Link to={`/Profile/${user.id}/${user.name}`} key={index} className='user-link'>
              <div className='users'>
                <div className='user-dp'>
                  <img src={require(`../image/profile${index + 1}.jpg`)} width={100} alt='' />
                </div>
                <div className='user-info'>
                  <h4>{user.name}</h4>
                  <p>@{user.username}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
