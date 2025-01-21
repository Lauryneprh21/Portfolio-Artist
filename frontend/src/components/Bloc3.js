import React, { useState, useContext, useEffect, useRef } from 'react';
import '../styles/Bloc3.css';
import AuthContext from '../AuthContext';
import axios from 'axios';

const Bloc3 = () => {
  const { isAdmin } = useContext(AuthContext);
  const paragraphRef = useRef(null);

  const apiUrl = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_LOCAL;

  const [paragraph, setParagraph] = useState('');
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchParagraph = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/get-paragraph`);
        setParagraph(response.data.paragraph || '');
      } catch (error) {
        console.error('Erreur lors du chargement du paragraphe :', error);
      }
    };
    fetchParagraph();
  }, [apiUrl]);

  const handleBlur = async () => {
    if (!isAdmin()) return; 

    setIsSaving(true);

    const finalText = paragraphRef.current.innerText;

    setParagraph(finalText);

    try {
      await axios.put(
        `${apiUrl}/api/update-paragraph`,
        { paragraph: finalText },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setMessage('Paragraphe sauvegardé avec succès !');
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de la sauvegarde du paragraphe.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <section className="container3">
      <div className="bloc3-text-section">
        <h2>Le design d'un jeu vidéo, c'est l'art de rendre l'impossible possible.</h2>
      </div>

      <div className="line-container">
        <hr className="custom-line" />
      </div>

      <div className={`bloc3-text-section ${isAdmin() ? "admin-editable" : ""}`}>
        <p
          ref={paragraphRef}
          contentEditable={isAdmin()}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          style={{
            outline: isAdmin() ? '1px solid #ccc' : 'none',
            padding: '5px',
          }}
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />

        {isSaving && <p style={{ color: 'blue' }}>Sauvegarde en cours...</p>}
        {message && (
          <p style={{ color: message.includes('Erreur') ? 'red' : 'green' }}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default Bloc3;
