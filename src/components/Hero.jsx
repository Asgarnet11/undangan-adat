import React from 'react';
import { useClient } from '../context/ClientContext';
import Countdown from './Countdown';
import { formatTanggal } from '../utils/dateFormatter';

const Hero = () => {
  const client = useClient();
  const eyebrow = client.hero?.eyebrow || "Walimatul 'Urs";
  const groomName = client.couple?.groom?.shortName || 'Pria';
  const brideName = client.couple?.bride?.shortName || 'Wanita';
  const rawDate = client.hero?.date || client.date || client.events?.[0]?.date || '';
  const dateStr = formatTanggal(rawDate);

  return (
    <section id="hero" className="section hero-section text-center">
      <img src="/assets/sunda_bg.jpg" alt="Latar Belakang Tradisional" className="bg-image" />
      <div className="bg-overlay"></div>
      
      <div className="section-container content-z hero-content">
        <p className="hero-eyebrow font-sans reveal-on-scroll">
          {eyebrow}
        </p>
        
        <div className="hero-names-wrapper reveal-on-scroll delay-100">
          <h1 className="hero-couple-name">
            {groomName}
          </h1>
          <div className="gold-divider"></div>
          <h1 className="hero-couple-name">
            {brideName}
          </h1>
        </div>
        
        <div className="hero-date-wrapper reveal-on-scroll delay-200">
          <p className="hero-date font-serif">
            {dateStr}
          </p>
        </div>

        {/* Live Countdown & Add to Calendar */}
        <Countdown />
      </div>
    </section>
  );
};

export default Hero;

