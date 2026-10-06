import React, { useEffect } from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { setRobotsNoIndex } from '../utils/seo';

const AccessDenied = ({ slug }) => {
  useEffect(() => {
    setRobotsNoIndex();
    document.title = 'Akses Ditolak - Undangan Pernikahan';
  }, []);

  const cleanSlug = String(slug || '').toLowerCase();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #052016 0%, #0a3123 50%, #052016 100%)',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '520px',
        width: '100%',
        background: 'rgba(5, 32, 22, 0.95)',
        border: '1px solid rgba(212, 175, 55, 0.4)',
        borderRadius: '20px',
        padding: '3rem 2rem',
        textAlign: 'center',
        boxShadow: '0 15px 50px rgba(0,0,0,0.6)',
        position: 'relative',
        zIndex: 2,
        backdropFilter: 'blur(10px)'
      }}>
        {/* Shield Icon Badge */}
        <div style={{
          display: 'inline-flex',
          padding: '16px',
          borderRadius: '50%',
          background: 'rgba(139, 30, 34, 0.25)',
          border: '1px solid rgba(139, 30, 34, 0.6)',
          color: '#e63946',
          marginBottom: '1.5rem'
        }}>
          <ShieldAlert size={36} />
        </div>

        <h1 className="font-display text-gold" style={{ fontSize: '1.75rem', marginBottom: '0.8rem' }}>
          Akses Ditolak
        </h1>

        <div className="gold-divider-small" style={{ margin: '0.8rem auto 1.4rem' }}></div>

        <p className="font-serif text-white" style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.9, marginBottom: '1.5rem' }}>
          Halaman Generator Link Tamu untuk{' '}
          <code style={{
            fontFamily: 'monospace',
            textTransform: 'none',
            background: 'rgba(212, 175, 55, 0.15)',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            color: '#f3e5ab'
          }}>
            /{cleanSlug}
          </code>{' '}
          memerlukan token otentikasi admin yang valid.
        </p>

        <p className="font-sans" style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.5, marginBottom: '2rem' }}>
          Silakan periksa kembali tautan yang Anda terima dan pastikan menyertakan parameter <code style={{ fontFamily: 'monospace', textTransform: 'none' }}>?key=TOKEN</code> yang sesuai di URL.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={`/${cleanSlug}`}
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.6rem',
              textDecoration: 'none',
              borderRadius: '30px',
              fontSize: '0.9rem'
            }}
          >
            <ArrowLeft size={16} />
            <span>Ke Halaman Undangan</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
