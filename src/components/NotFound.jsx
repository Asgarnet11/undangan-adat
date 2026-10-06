import React, { useEffect } from 'react';
import { getAvailableClients } from '../data/clientRegistry';
import { setRobotsNoIndex } from '../utils/seo';

const NotFound = ({ requestedSlug, slug }) => {
  useEffect(() => {
    setRobotsNoIndex();
    document.title = 'Undangan Tidak Ditemukan';
  }, []);

  const activeSlug = String(requestedSlug || slug || '').toLowerCase();
  const isDev = Boolean(import.meta.env && import.meta.env.DEV);
  const availableClients = isDev ? getAvailableClients() : [];

  return (
    <div className="section notfound-section text-center" style={{ minHeight: '100vh', justifyContent: 'center', padding: '2rem 1.5rem', background: '#052016' }}>
      <img src="/assets/sunda_bg.jpg" alt="Latar Belakang Tradisional" className="bg-image" style={{ opacity: 0.15 }} />
      <div className="bg-overlay" style={{ background: 'linear-gradient(to bottom, #0a3123, #052016)' }}></div>

      <div className="section-container content-z" style={{ maxWidth: '580px', margin: '0 auto' }}>
        <div className="ayat-card" style={{ padding: '3rem 2rem' }}>
          <div className="ayat-wayang-wrapper" style={{ marginBottom: '1.5rem' }}>
            <img 
              src="/assets/wayang.png" 
              alt="Ornamen Wayang" 
              className="ayat-wayang animate-sway"
              style={{ width: '70px', height: 'auto', opacity: 0.9 }}
            />
          </div>

          <h1 className="font-display text-gold" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', marginBottom: '1rem', lineHeight: 1.2 }}>
            Undangan Tidak Ditemukan
          </h1>

          <div className="gold-divider-small" style={{ margin: '1rem auto 1.5rem' }}></div>

          <p className="font-serif text-white" style={{ fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.85, marginBottom: '2rem' }}>
            Mohon maaf, tautan undangan pernikahan{' '}
            {activeSlug ? (
              <code style={{
                fontFamily: 'monospace',
                textTransform: 'none',
                background: 'rgba(212, 175, 55, 0.15)',
                padding: '2px 8px',
                borderRadius: '4px',
                color: '#f3e5ab'
              }}>
                /{activeSlug}
              </code>
            ) : (
              'yang Anda tuju'
            )}{' '}
            tidak terdaftar atau telah berpindah alamat.
          </p>

          {/* Hanya tampilkan daftar klien di mode development */}
          {isDev && availableClients.length > 0 && (
            <div style={{ marginBottom: '2rem', textAlign: 'left', background: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.2)' }}>
              <p className="font-sans text-xs text-gold" style={{ letterSpacing: '1.5px', marginBottom: '0.8rem', fontWeight: 600 }}>
                [DEV MODE] Undangan Terdaftar:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {availableClients.map((c) => (
                  <li key={c.slug} style={{ marginBottom: '0.6rem' }}>
                    <a 
                      href={`/${c.slug}?open=true`}
                      className="font-serif"
                      style={{ color: '#fff', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212,175,55,0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    >
                      <span className="text-gold font-display">{c.names}</span>
                      <code style={{ fontFamily: 'monospace', textTransform: 'none', fontSize: '0.75rem', opacity: 0.7 }}>
                        /{c.slug.toLowerCase()}
                      </code>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <a 
              href="/"
              className="btn-calendar font-sans"
              style={{ display: 'inline-flex', padding: '10px 24px', fontSize: '0.9rem', textDecoration: 'none' }}
            >
              Kembali ke Beranda Utama
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
