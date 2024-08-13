import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function AccountSummary() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/account-summary');
        setUser(response.data);
      } catch (err) {
        history.push('/login');
      }
    };
    fetchData();
  }, [history]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Account Summary</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phoneNumber}</p>
    </div>
  );
}

export default AccountSummary;
