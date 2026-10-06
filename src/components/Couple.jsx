import React from 'react';
import { useClient } from '../context/ClientContext';

const Couple = () => {
  const client = useClient();
  const coupleData = client.couple || {};
  const groom = coupleData.groom || {};
  const bride = coupleData.bride || {};

  const groomHandle = groom.instagramHandle || (groom.shortName ? groom.shortName.toLowerCase() : 'arjuna');
  const brideHandle = bride.instagramHandle || (bride.shortName ? bride.shortName.toLowerCase() : 'srikandi');

  const sectionTitle = coupleData.sectionTitle || 'Pasangan Mempelai';
  const greeting = coupleData.greeting || "Assalamu'alaikum Warahmatullahi Wabarakatuh\n\nDengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami:";

  return (
    <section id="couple" className="section couple-section text-center">
      <img src="/assets/sunda_bg.jpg" alt="Latar Belakang Pasangan" className="bg-image" style={{ opacity: 0.10 }} />
      <div className="bg-overlay" style={{ background: 'linear-gradient(to bottom, #062318 0%, #052016 50%, #072a1e 100%)' }}></div>

      <div className="section-container content-z">
        <h2 className="section-title text-center reveal-on-scroll">
          {sectionTitle}
        </h2>
        
        <p className="couple-greeting text-center font-serif reveal-on-scroll delay-100" style={{ whiteSpace: 'pre-line' }}>
          {greeting}
        </p>

        {/* Multi-column Grid on Desktop: Groom | & | Bride */}
        <div className="couple-cards-grid">
          {/* Groom */}
          <div className="couple-card couple-card-groom text-center reveal-on-scroll delay-200">
            <div className="frame-container">
              <img 
                src={groom.photo || "/assets/groom_photo.jpg"} 
                alt={groom.name || 'Mempelai Pria'} 
                className="photo-inner"
                loading="lazy"
              />
              <img src="/assets/ornate_frame.png" alt="Bingkai Mempelai Pria" className="frame-image" />
            </div>
            
            <div className="couple-details">
              <h3 className="couple-full-name">
                {groom.name}
              </h3>
              <p className="couple-parents font-serif">
                {groom.parents}
              </p>
              {groom.instagram && (
                <a 
                  href={groom.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-instagram"
                  aria-label={`Buka akun Instagram ${groom.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span className="font-sans text-xs">@{groomHandle}</span>
                </a>
              )}
            </div>
          </div>

          {/* Ampersand Center Column */}
          <div className="couple-ampersand-col reveal-on-scroll delay-100" aria-hidden="true">
            <div className="couple-ampersand-slot">
              <span className="couple-ampersand text-gold font-display">&amp;</span>
            </div>
          </div>

          {/* Bride */}
          <div className="couple-card couple-card-bride text-center reveal-on-scroll delay-200">
            <div className="frame-container">
              <img 
                src={bride.photo || "/assets/bride_photo.jpg"} 
                alt={bride.name || 'Mempelai Wanita'} 
                className="photo-inner"
                loading="lazy"
              />
              <img src="/assets/ornate_frame.png" alt="Bingkai Mempelai Wanita" className="frame-image" />
            </div>
            
            <div className="couple-details">
              <h3 className="couple-full-name">
                {bride.name}
              </h3>
              <p className="couple-parents font-serif">
                {bride.parents}
              </p>
              {bride.instagram && (
                <a 
                  href={bride.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-instagram"
                  aria-label={`Buka akun Instagram ${bride.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span className="font-sans text-xs">@{brideHandle}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Couple;

