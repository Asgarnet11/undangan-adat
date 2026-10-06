import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { useClient } from '../context/ClientContext';

const Events = () => {
  const client = useClient();
  const events = client.events || [];

  if (events.length === 0) {
    return null;
  }

  return (
    <section id="events" className="section events-section text-center">
      <img src="/assets/sunda_bg.jpg" alt="Latar Belakang Acara" className="bg-image" style={{ opacity: 0.15 }} />
      <div className="bg-overlay" style={{ background: 'linear-gradient(to bottom, #052016, #0a3123)' }}></div>
      
      <div className="section-container content-z">
        <h2 className="section-title reveal-on-scroll">
          Jadwal Acara
        </h2>
        
        <div className={`events-container mt-8 ${events.length === 1 ? 'single-event' : ''}`}>
          {events.map((event, index) => (
            <div 
              key={index} 
              className={`event-card reveal-on-scroll delay-${(index + 1) * 200}`}
            >
              <h3 className="event-title font-display text-gold">
                {event.title}
              </h3>
              <div className="gold-divider-small" style={{ margin: '0.8rem auto 1.8rem' }}></div>
              
              <div className="event-info-list">
                <div className="event-info-item">
                  <div className="event-icon-badge">
                    <Calendar className="text-gold" size={18} />
                  </div>
                  <div className="event-info-text text-left">
                    <span className="event-info-label font-sans">Hari &amp; Tanggal</span>
                    <p className="text-white font-serif">{event.date}</p>
                  </div>
                </div>
                
                <div className="event-info-item">
                  <div className="event-icon-badge">
                    <Clock className="text-gold" size={18} />
                  </div>
                  <div className="event-info-text text-left">
                    <span className="event-info-label font-sans">Waktu Acara</span>
                    <p className="text-white font-serif">{event.time} {event.timezone ? event.timezone : ''}</p>
                  </div>
                </div>
                
                <div className="event-info-item">
                  <div className="event-icon-badge">
                    <MapPin className="text-gold" size={18} />
                  </div>
                  <div className="event-info-text text-left">
                    <span className="event-info-label font-sans">Lokasi Acara</span>
                    <p className="event-venue text-gold font-serif">{event.venue}</p>
                    <p className="event-address text-white font-sans">{event.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="event-action text-center">
                <a 
                  href={event.mapsUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-maps"
                  aria-label={`Buka petunjuk arah Google Maps untuk ${event.title}`}
                >
                  <MapPin size={16} />
                  <span>Petunjuk Lokasi (Google Maps)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;

