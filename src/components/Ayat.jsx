import React from 'react';
import { useClient } from '../context/ClientContext';

const Ayat = () => {
  const client = useClient();

  if (!client.ayat?.text) {
    return null;
  }

  return (
    <section className="section ayat-section text-center">
      <img src="/assets/sunda_bg.jpg" alt="Latar Belakang Ayat" className="bg-image" style={{ opacity: 0.12 }} />
      <div className="bg-overlay" style={{ background: 'linear-gradient(to bottom, #0a3123 0%, #062318 100%)' }}></div>
      
      <div className="section-container content-z">
        <div className="ayat-card reveal-on-scroll">
          <div className="ayat-wayang-wrapper">
            <img 
              src="/assets/wayang.png" 
              alt="Ornamen Wayang" 
              className="ayat-wayang animate-sway"
            />
          </div>
          
          <blockquote className="ayat-text font-serif">
            &ldquo;{client.ayat.text}&rdquo;
          </blockquote>
          
          <div className="gold-divider-small" style={{ margin: '1.2rem auto' }}></div>
          
          {client.ayat.source && (
            <cite className="ayat-source font-sans text-gold">
              {client.ayat.source}
            </cite>
          )}
        </div>
      </div>
    </section>
  );
};

export default Ayat;

