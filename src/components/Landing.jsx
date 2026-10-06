import React from 'react';
import { getAvailableClients } from '../data/clientRegistry';
import { Sparkles, ExternalLink, Users } from 'lucide-react';

const Landing = () => {
  const clients = getAvailableClients();

  return (
    <div className="section landing-section text-center" style={{ minHeight: '100vh', justifyContent: 'center', padding: '3rem 1.5rem', background: '#052016' }}>
      <img src="/assets/sunda_bg.jpg" alt="Latar Belakang Tradisional" className="bg-image" style={{ opacity: 0.15 }} />
      <div className="bg-overlay" style={{ background: 'linear-gradient(to bottom, #0a3123 0%, #052016 100%)' }}></div>

      <div className="section-container content-z" style={{ maxWidth: '840px', margin: '0 auto' }}>
        {/* Header Logo & Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <img 
            src="/assets/wayang.png" 
            alt="Gunungan Wayang" 
            className="animate-sway"
            style={{ width: '80px', height: 'auto', margin: '0 auto 1.2rem', opacity: 0.95 }}
          />
          <p className="font-sans text-gold" style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.85rem', marginBottom: '0.6rem' }}>
            Template Berbasis Data
          </p>
          <h1 className="font-display text-gold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.2, marginBottom: '1rem' }}>
            Undangan Pernikahan Adat
          </h1>
          <p className="font-serif text-white" style={{ fontSize: '1.05rem', opacity: 0.85, maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
            Platform undangan digital multi-klien. Silakan pilih undangan mempelai atau gunakan fitur generator link tamu di bawah ini.
          </p>
        </div>

        {/* Client Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {clients.map((c) => (
            <div 
              key={c.slug}
              className="ayat-card"
              style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'center', margin: 0 }}
            >
              <div>
                <span className="font-sans text-xs text-gold" style={{ textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8, display: 'block', marginBottom: '0.5rem' }}>
                  Slug: /{c.slug}
                </span>
                <h2 className="font-display text-gold" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {c.names}
                </h2>
                <p className="font-serif text-white" style={{ fontSize: '0.92rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                  {c.date || 'Tanggal Pernikahan'}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a 
                  href={`/${c.slug}?open=true`}
                  className="btn-calendar font-sans"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 16px', fontSize: '0.88rem' }}
                >
                  <ExternalLink size={16} />
                  Buka Undangan
                </a>
                <a 
                  href={`/generator?client=${c.slug}`}
                  className="btn-instagram font-sans"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.82rem', margin: 0 }}
                >
                  <Users size={15} />
                  Generator Link Tamu
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(212,175,55,0.25)', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
            <Sparkles size={18} className="text-gold" />
            <h3 className="font-display text-gold" style={{ fontSize: '1.05rem', margin: 0 }}>
              Cara Menambah Klien Baru
            </h3>
          </div>
          <p className="font-sans" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>
            Jalankan perintah terminal: <code style={{ background: 'rgba(212,175,55,0.15)', padding: '2px 6px', borderRadius: '4px', color: '#f3e5ab' }}>npm run new-client -- nama-slug</code> untuk otomatis menyalin template dan folder aset klien baru.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
