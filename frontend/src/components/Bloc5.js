import React, { useState, useEffect, useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AuthContext from '../AuthContext';
import '../styles/Bloc5.css';

const Bloc5 = () => {
  const { isAdmin } = useContext(AuthContext); 

 
  const [oeuvres, setOeuvres] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [selectedTag, setSelectedTag] = useState(''); 
  const [editingOeuvre, setEditingOeuvre] = useState(null); 

 
  const apiUrl = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_LOCAL;

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const oeuvresResult = await axios.get(`${apiUrl}/api/oeuvres`);
        const categoriesResult = await axios.get(`${apiUrl}/api/categories`);
        const tagsResult = await axios.get(`${apiUrl}/api/tags`);
        setOeuvres(oeuvresResult.data);
        setCategories(categoriesResult.data);
        setTags(tagsResult.data);
      } catch (error) {
        console.error('Failed to fetch data:', error); 
      }
    };
    fetchData();
  }, [apiUrl]);  

  const addOeuvre = async () => {
    const title = document.getElementById('oeuvreTitle').value;
    const category = document.getElementById('oeuvreCategory').value;
    const tags = document.getElementById('oeuvreTags').value.split(',').map(tag => tag.trim());  
    const imageUrl = document.getElementById('oeuvreImageUrl').value;
  
    if (!title || !category || !tags.length || !imageUrl) {
      alert('Tous les champs (Titre, Catégorie, Tags, URL de l\'image) doivent être remplis.');
      return;
    }
  
    const newOeuvre = { title, category, tags, imageUrl };
  
    try {
      const result = await axios.post(`${apiUrl}/api/oeuvres`, newOeuvre, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOeuvres([...oeuvres, result.data]);
    } catch (error) {
      console.error('Failed to add oeuvre:', error); 
    }
  };

  const deleteOeuvre = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/oeuvres/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOeuvres(oeuvres.filter(oeuvre => oeuvre._id !== id));  
    } catch (error) {
      console.error('Failed to delete oeuvre:', error);
    }
  };

  
  const editOeuvre = async (id) => {
    const title = document.getElementById('editOeuvreTitle').value;
    const category = document.getElementById('editOeuvreCategory').value;
    const tags = document.getElementById('editOeuvreTags').value.split(',');
    const imageUrl = document.getElementById('editOeuvreImageUrl').value;
    const updatedOeuvre = { title, category, tags, imageUrl };

    try {
      const result = await axios.put(`${apiUrl}/api/oeuvres/${id}`, updatedOeuvre, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOeuvres(oeuvres.map(oeuvre => (oeuvre._id === id ? result.data : oeuvre))); 
      setEditingOeuvre(null);  
    } catch (error) {
      console.error('Failed to update oeuvre:', error);
    }
  };

  const [hiddenOeuvres, setHiddenOeuvres] = useState([]);

  const toggleVisibility = async (id) => {
    try {
      const result = await axios.put(`${apiUrl}/api/oeuvres/${id}/visibility`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOeuvres(oeuvres.map(oeuvre => (oeuvre._id === id ? result.data : oeuvre)));  
    } catch (error) {
      console.error('Failed to update visibility:', error);
    }
  };

  const addCategory = async () => {
    const category = document.getElementById('newCategory').value;
    try {
      const result = await axios.post(`${apiUrl}/api/categories`, { name: category }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCategories([...categories, result.data]);  
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      try {
        await axios.delete(`${apiUrl}/api/categories/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCategories(categories.filter(category => category._id !== id));
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  
  const addTag = async () => {
    const tag = document.getElementById('newTag').value;
    try {
      const result = await axios.post(`${apiUrl}/api/tags`, { name: tag }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTags([...tags, result.data]);  
    } catch (error) {
      console.error('Failed to add tag:', error);
    }
  };

 
  const deleteTag = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/tags/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTags(tags.filter(tag => tag._id !== id));  
    } catch (error) {
      console.error('Failed to delete tag:', error);
    }
  };

  
  const filteredOeuvres = oeuvres.filter(oeuvre => 
    (isAdmin() || oeuvre.isVisible) &&  
    (selectedCategory ? oeuvre.category === selectedCategory : true) &&
    (selectedTag ? oeuvre.tags.includes(selectedTag) : true)
  );

  
  const statusFormatter = (current, total) => `Diapo ${current} sur ${total}`;

  return (
    <div className="projet-container">
      <h2>Vous voulez voir d'autres de mes créations ?</h2>
      <p>C'est très simple, il vous suffit d'interagir ici avec la boîte de recherche</p>

      <div className="filters">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Select category"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          aria-label="Select tag"
        >
          <option value="">Tous les tags</option>
          {tags.map((tag) => (
            <option key={tag._id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-container">
        {isAdmin() && (
          <div className="commands-cell">
            <div>
              <input
                type="text"
                placeholder="Titre de l'œuvre"
                id="oeuvreTitle"
                aria-label="Titre de l'œuvre"
                aria-required="true"
              />
              <input
                type="text"
                placeholder="Catégorie"
                id="oeuvreCategory"
                aria-label="Catégorie"
                aria-required="true"
              />
              <input
                type="text"
                placeholder="Tags (séparés par des virgules)"
                id="oeuvreTags"
                aria-label="Tags"
                aria-required="true"
              />
              <input
                type="text"
                placeholder="URL de l'image"
                id="oeuvreImageUrl"
                aria-label="URL de l'image"
                aria-required="true"
              />
              <div className="add-button-container">
                <button onClick={addOeuvre}>Ajouter</button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <FontAwesomeIcon
                icon={faPlus}
                onClick={addCategory}
                style={{ cursor: 'pointer', fontSize: '22px', marginRight: '8px' }}
              />
              <input id="newCategory" type="text" placeholder="Nouvelle catégorie" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <FontAwesomeIcon
                icon={faPlus}
                onClick={addTag}
                style={{ cursor: 'pointer', fontSize: '22px', marginRight: '8px' }}
              />
              <input id="newTag" type="text" placeholder="Nouveau tag" />
            </div>

            <div className="existing-categories">
              <h3>Catégories Existantes</h3>
              {categories.map((category) => (
                <div key={category._id} className="existing-item">
                  <span>– {category.name}</span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteCategory(category._id)}
                    style={{ cursor: 'pointer', marginLeft: '15px', fontSize: '22px' }}
                  />
                </div>
              ))}
            </div>

            <div className="existing-tags">
              <h3>Tags Existants</h3>
              {tags.map((tag) => (
                <div key={tag._id} className="existing-item">
                  <span>– {tag.name}</span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteTag(tag._id)}
                    style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '22px' }}
                  />
                </div>
              ))}
            </div>

            {editingOeuvre && (
              <div className="edit-oeuvre">
                <h3>Modifier Œuvre</h3>
                <input
                  type="text"
                  placeholder="Titre de l'œuvre"
                  defaultValue={editingOeuvre.title}
                  id="editOeuvreTitle"
                />
                <input
                  type="text"
                  placeholder="Catégorie"
                  defaultValue={editingOeuvre.category}
                  id="editOeuvreCategory"
                />
                <input
                  type="text"
                  placeholder="Tags (séparés par des virgules)"
                  defaultValue={editingOeuvre.tags.join(',')}
                  id="editOeuvreTags"
                />
                <input
                  type="text"
                  placeholder="URL de l'image"
                  defaultValue={editingOeuvre.imageUrl}
                  id="editOeuvreImageUrl"
                />
                <div className="edit-buttons">
                  <button onClick={() => editOeuvre(editingOeuvre._id)}>Enregistrer</button>
                  <button onClick={() => setEditingOeuvre(null)}>Annuler</button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={`oeuvres-cell ${isAdmin() ? '' : 'user-view'}`}>
          <Carousel
            showThumbs={false}
            showIndicators={false}
            showArrows={true}
            statusFormatter={statusFormatter}
          >
            {filteredOeuvres.map((oeuvre) => (
              <div key={oeuvre._id}>
                <img
                  src={oeuvre.imageUrl}
                  alt={oeuvre.title}
                  loading="lazy"
                  className="carousel-image"
                />
                <div classname ="a-legend">
                <p className="legend">
                  {oeuvre.title} - {oeuvre.category} - {oeuvre.tags.join(', ')}
                </p></div>
                {isAdmin() && (
                  <div className="oeuvre-actions">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteOeuvre(oeuvre._id)}
                      style={{ cursor: 'pointer', fontSize: '22px' }}
                    />
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() => setEditingOeuvre(oeuvre)}
                      style={{ cursor: 'pointer', fontSize: '22px' }}
                    />
                    <FontAwesomeIcon
                      icon={oeuvre.isVisible ? faEye : faEyeSlash}
                      onClick={() => toggleVisibility(oeuvre._id)}
                      style={{ cursor: 'pointer', fontSize: '22px' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Bloc5;