import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import '../styles/Login.css'; 

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

    try {
      const response = await axios.post(`${apiUrl}/api/forgot-password`, { email });
      if (response.status === 200) {
        setMessage('Un email de réinitialisation du mot de passe a été envoyé.');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Erreur lors de l\'envoi de l\'email de réinitialisation.');
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="login-container">
          <h2>Mot de passe oublié</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Envoyer</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
