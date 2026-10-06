import React, { useState, useEffect } from 'react';
import { MailOpen } from 'lucide-react';
import { useClient } from '../context/ClientContext';
import { getGuestName } from '../utils/sanitizeGuest';

const Cover = ({ isOpen, onOpen }) => {
  const client = useClient();
  const guestName = getGuestName();
  const [isAnimationDone, setIsAnimationDone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('open') === 'true';
  });

  useEffect(() => {
    if (isOpen && !isAnimationDone) {
      const timer = setTimeout(() => setIsAnimationDone(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isAnimationDone]);

  if (isAnimationDone) return null;

  const groomName = client.couple?.groom?.shortName || 'Pria';
  const brideName = client.couple?.bride?.shortName || 'Wanita';
  const subtitle = client.cover?.subtitle || 'The Wedding Of';
  const guestPrefix = client.cover?.guestPrefix || 'Kepada Yth. Bapak/Ibu/Saudara/i';
  const buttonText = client.cover?.buttonText || 'Buka Undangan';

  return (
    <aside 
      className={`cover-screen ${isOpen ? 'is-open' : ''}`}
      aria-hidden={isOpen}
    >
      <img src="/assets/sunda_bg.jpg" alt="Latar Belakang Tradisional Sunda" className="bg-image" />
      <div className="bg-overlay"></div>
      
      {/* Decorative Ornaments */}
      <div className="decor-band-top animate-fade-in" aria-hidden="true"></div>
      <div className="decor-band-bottom animate-fade-in" aria-hidden="true"></div>
      <img src="/assets/peacock_decor.png" alt="Ornamen Merak Kiri" className="decor-corner-bl animate-slide-up delay-1" />
      <img src="/assets/peacock_decor.png" alt="Ornamen Merak Kanan" className="decor-corner-br animate-slide-up delay-1" />

      <div className="content-z cover-content">
        <p className="cover-subtitle font-sans animate-fade-in">
          {subtitle}
        </p>
        
        <div className="wayang-container animate-fade-in delay-1">
          <img 
            src="/assets/wayang.png" 
            alt="Gunungan Wayang" 
            className="animate-sway wayang-cover"
          />
        </div>
        
        <h1 className="couple-name animate-slide-up delay-2">
          {groomName}
          <span className="name-ampersand font-serif">&amp;</span>
          {brideName}
        </h1>
        
        <div className="guest-box animate-slide-up delay-3">
          <p className="guest-prefix font-sans">
            {guestPrefix}
          </p>
          <p className="guest-name font-serif text-gold">
            {guestName}
          </p>
        </div>
        
        <div className="animate-slide-up delay-4">
          <button 
            onClick={onOpen} 
            className="btn-primary btn-open"
            aria-label={buttonText}
          >
            <MailOpen size={18} />
            <span>{buttonText}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Cover;

