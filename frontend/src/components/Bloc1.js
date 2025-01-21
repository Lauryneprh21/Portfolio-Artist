import React, { useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import '../styles/Bloc1.css';

const Bloc1 = () => {
  useEffect(() => {
    const handleScroll = () => {
      const bloc = document.querySelector('.container');
      if (bloc.getBoundingClientRect().top < window.innerHeight) {
        bloc.classList.add('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const adjustSpacing = () => {
      const container = document.querySelector('.container');
      container.style.marginBottom = '100px'; 
    };
  
    window.addEventListener('resize', adjustSpacing);
    adjustSpacing();
  
    return () => window.removeEventListener('resize', adjustSpacing);
  }, []);
  

  document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.classList.add('visible');
    });
});

  return (
    <section className="container" role="main">
      <div className="text-section">
        <h1>Bienvenue dans mon studio de design.</h1>
        <p>Artisan de l'interface, je crée des designs intuitifs et esthétiques pour offrir des expériences utilisateur mémorables et engageantes.</p>
        <p>Explorez mes créations et n'hésitez pas à me contacter pour toute collaboration ou demande de services.</p>
        <Link smooth to="/#bloc2">
          <button>Commencer</button>
        </Link>
      </div>
      <div className="image-section">
        <img 
          src="https://res.cloudinary.com/des6g45rz/image/upload/v1723219920/JPFklpE_-_Imgur_1_e4kbz3.webp" 
          alt="Studio de design" 
          loading="lazy" 
          width="565" 
          height="800"
          style={{ opacity: 0, transition: 'opacity 1s' }}
          onLoad={(e) => e.target.style.opacity = 1}
        />
      </div>
    </section>
  );
}

export default Bloc1;
