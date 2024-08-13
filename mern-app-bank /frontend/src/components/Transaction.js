import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Transaction() {
  const [type, setType] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/transaction', { type, amount: parseFloat(amount) });
      history.push('/account-summary');
    } catch (err) {
      setError('Transaction failed.');
    }
  };

  return (
    <div>
      <h2>Transaction</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Transaction;
