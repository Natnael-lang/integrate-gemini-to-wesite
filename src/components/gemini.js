import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyBaRphOLEQVNQ8bZfKgBm1eqigdRdcpaN8'; // Replace with your actual API key

const Gemini = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`https://cors-anywhere.herokuapp.com/https://gemini.googleapis.com/v1/ask`, {
        question: question,
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      setResponse(res.data.answer); // Adjust based on actual response structure
    } catch (err) {
      setError('Error fetching response from Gemini API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Ask Gemini AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Gemini;