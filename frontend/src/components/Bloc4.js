import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Bloc4.css';

 
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
          borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right" />
    </button>
  );
};


 
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ 
        ...style, 
       
       
        borderRadius: '50%', 
        width: '40px', 
        height: '40px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
      onClick={onClick} 
      aria-label="Previous slide"
    >
     </button>
  );
};

const Bloc4 = () => {
  
  const settings = {
    dots: false,  
    infinite: true,  
    speed: 500,  
    slidesToShow: 3,  
    slidesToScroll: 1,  
    centerMode: false,
    nextArrow: <NextArrow />,  
    prevArrow: <PrevArrow />,  
    responsive: [
      {
        breakpoint: 1024,  
        settings: {
          slidesToShow: 2,  
          slidesToScroll: 1, 
          infinite: true,
          dots: false ,
          centerMode: false,
        }
      },
      {
        breakpoint: 600,  
        settings: {
          slidesToShow: 1,  
          slidesToScroll: 1,
          initialSlide: 1  
        }
      }
    ]
  };

  return (
    
    <div className="carousel-container" aria-roledescription="carousel">
      <h2>Mes Projets</h2>
      <Slider {...settings}>
        { }
        <div className="carousel-item" role="group" aria-roledescription="slide">
          <img src="https://res.cloudinary.com/des6g45rz/image/upload/v1723220197/bsb4mjo_-_Imgur_1_gy0o15.webp" alt="Project 1" loading="lazy" width="298" height="298" />
          <h3>Jardin Enchanté : Vie au Bord de la Forêt</h3>
          <p>Une scène en pixel art 3D détaillant un jardin forestier avec des personnages interactifs, des objets artisanaux et une cabane en bois, utilisant des textures riches et un éclairage doux pour une immersion totale.</p>
        </div>
        
        { }
        <div className="carousel-item" role="group" aria-roledescription="slide">
          <img src="https://res.cloudinary.com/des6g45rz/image/upload/v1723220318/6XkJSVq_-_Imgur_1_niibjm.webp" alt="Project 2" loading="lazy" width="298" height="298" />
          <h3>Village Enchanté : Havre de la Forêt</h3>
          <p>Scène en pixel art 3D d'un village médiéval avec des détails interactifs, des éclairages chaleureux et une palette nostalgique pour une immersion totale.</p>
        </div>
        
        <div className="carousel-item" role="group" aria-roledescription="slide">
          <img src="https://res.cloudinary.com/des6g45rz/image/upload/v1723220449/T1DF4CT_-_Imgur_2_ydviys.webp" alt="Project 3" loading="lazy" width="298" height="298" />
          <h3>Atelier Magique : Rencontre au Coin du Feu</h3>
          <p>Représentation en pixel art 3D d'un atelier chaleureux, mettant en avant des textures détaillées, un éclairage intérieur subtil, et une disposition soignée des meubles et objets, créant une atmosphère immersive et conviviale.</p>
        </div>
        
        <div className="carousel-item" role="group" aria-roledescription="slide">
          <img src="https://res.cloudinary.com/des6g45rz/image/upload/v1723220545/mY4fLFM_-_Imgur_1_cwxkuo.webp" alt="Project 4" loading="lazy" width="298" height="298" />
          <h3>​Réunion au Cœur de la Forêt</h3>
          <p>​Présentant une maison forestière avec des textures détaillées et un éclairage dynamique autour d'un feu central, cette scène en pixel art 3D est entourée de personnages variés et d'objets magiques finement pixelisés, utilisant des dégradés subtils et une palette de couleurs riche pour créer une profondeur et une ambiance immersive.</p>
        </div>
      </Slider>
    </div>
  );
};

export default Bloc4;