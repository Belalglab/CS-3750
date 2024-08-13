import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Logout() {
  const history = useHistory();

  useEffect(() => {
    const logout = async () => {
      await axios.post('/logout');
      history.push('/login');
    };
    logout();
  }, [history]);

  return <div>Logging out...</div>;
}

export default Logout;
