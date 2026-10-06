import React, { useEffect } from 'react';
import { Sparkles, MessageCircle, ShieldCheck, HeartHandshake, Music } from 'lucide-react';

const ProductionLanding = () => {
  const brandName = import.meta.env?.VITE_BRAND_NAME || 'Kalyana Undangan Adat';
  const whatsappNumber = import.meta.env?.VITE_WHATSAPP_NUMBER || '6281234567890';
  const brandDesc = 'Platform undangan pernikahan digital bernuansa adat tradisional Nusantara yang sakral, elegan, dan berkelas bagi hari bahagia Anda.';

  useEffect(() => {
    document.title = `${brandName} - Layanan Undangan Pernikahan Adat Digital`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', brandDesc);
  }, [brandName, brandDesc]);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo, saya ingin berkonsultasi mengenai pembuatan undangan pernikahan digital adat.')}`;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #052016 0%, #0a3123 50%, #052016 100%)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Ornaments (Optimized WebP with JPG fallback) */}
      <picture style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}>
        <source srcSet="/assets/sunda_bg.webp" type="image/webp" />
        <img 
          src="/assets/sunda_bg.jpg" 
          alt="" 
          role="presentation"
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width="1024"
          height="1024"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.1
          }} 
        />
      </picture>

      {/* Main Content Area (Semantic main landmark for 100 Accessibility) */}
      <main style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Brand Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1.2rem',
          background: 'rgba(212, 175, 55, 0.12)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '30px',
          color: '#d4af37',
          fontSize: '0.85rem',
          marginBottom: '1.8rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}>
          <Sparkles size={16} />
          <span>Layanan Undangan Adat Digital</span>
        </div>

        {/* Brand Title */}
        <h1 className="font-display text-gold" style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          lineHeight: 1.2,
          marginBottom: '1rem',
          textShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
          Kalyana Undangan Adat
        </h1>

        <div className="gold-divider-small" style={{ margin: '1rem auto 1.5rem' }}></div>

        {/* Subtitle */}
        <p className="font-serif text-white" style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          maxWidth: '620px',
          lineHeight: 1.6,
          opacity: 0.9,
          marginBottom: '2.5rem'
        }}>
          Platform undangan pernikahan digital bernuansa adat tradisional Nusantara yang sakral, elegan, dan berkelas bagi hari bahagia Anda.
        </p>

        {/* Value Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.2rem',
          width: '100%',
          maxWidth: '740px',
          marginBottom: '3rem',
          textAlign: 'left'
        }}>
          <div style={{
            background: 'rgba(10, 49, 35, 0.65)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '12px',
            padding: '1.2rem',
            backdropFilter: 'blur(8px)'
          }}>
            <HeartHandshake className="text-gold" size={22} style={{ marginBottom: '0.5rem' }} />
            <h2 className="font-display text-gold" style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>
              Estetika Adat Sakral
            </h2>
            <p className="font-sans text-white" style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.5 }}>
              Sentuhan wayang, ornamen merak, dan nuansa keraton yang memikat.
            </p>
          </div>

          <div style={{
            background: 'rgba(10, 49, 35, 0.65)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '12px',
            padding: '1.2rem',
            backdropFilter: 'blur(8px)'
          }}>
            <ShieldCheck className="text-gold" size={22} style={{ marginBottom: '0.5rem' }} />
            <h2 className="font-display text-gold" style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>
              Amplop Digital &amp; Kado
            </h2>
            <p className="font-sans text-white" style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.5 }}>
              Kemudahan penyampaian tanda kasih secara digital maupun pengiriman fisik.
            </p>
          </div>

          <div style={{
            background: 'rgba(10, 49, 35, 0.65)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '12px',
            padding: '1.2rem',
            backdropFilter: 'blur(8px)'
          }}>
            <Music className="text-gold" size={22} style={{ marginBottom: '0.5rem' }} />
            <h2 className="font-display text-gold" style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>
              Gending &amp; Peta Interaktif
            </h2>
            <p className="font-sans text-white" style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.5 }}>
              Latar musik tradisional berpadu panduan lokasi langsung ke Google Maps.
            </p>
          </div>
        </div>

        {/* Primary CTA: WhatsApp Contact */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.9rem 2.2rem',
            fontSize: '1rem',
            textDecoration: 'none',
            borderRadius: '50px',
            boxShadow: '0 8px 30px rgba(212, 175, 55, 0.35)'
          }}
        >
          <MessageCircle size={20} />
          <span>Konsultasi via WhatsApp</span>
        </a>

        <p className="font-sans" style={{ fontSize: '0.8rem', opacity: 0.65, marginTop: '1rem' }}>
          Hubungi tim kami untuk pembuatan undangan pernikahan adat Anda
        </p>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1.5rem',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
        position: 'relative',
        zIndex: 2,
        fontSize: '0.8rem',
        opacity: 0.6
      }}>
        <p className="font-sans">
          &copy; 2027 Kalyana Undangan Adat &bull; All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default ProductionLanding;
