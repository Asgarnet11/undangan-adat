import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useClient } from '../context/ClientContext';

const Gallery = () => {
  const client = useClient();
  const photos = client.gallery || [];
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const isOpen = lightboxIndex !== null;

  const handleOpen = (index) => {
    setLightboxIndex(index);
  };

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (photos.length === 0) return;
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    if (photos.length === 0) return;
    setLightboxIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  }, [photos.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation (← / → / Esc)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, handlePrev, handleNext]);

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSwipeLeft = distance > 45;
    const isSwipeRight = distance < -45;

    if (isSwipeLeft) handleNext();
    if (isSwipeRight) handlePrev();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (photos.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-container content-z">
        <div className="text-center reveal-on-scroll">
          <h2 className="section-title">
            Galeri Foto
          </h2>
          <p className="section-subtitle font-serif text-white mb-10">
            Untaian momen indah dan kenangan manis kebersamaan kami
          </p>
        </div>

        {/* Responsive Gallery Grid */}
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <div 
              key={photo.id || index}
              className={`gallery-item reveal-on-scroll delay-${(index % 4 + 1) * 100}`}
              onClick={() => handleOpen(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { 
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpen(index);
                }
              }}
              aria-label={`Buka foto: ${photo.title || photo.alt}`}
            >
              <div className="gallery-card-inner">
                <img 
                  src={photo.src} 
                  alt={photo.alt} 
                  loading="lazy" 
                  className="gallery-thumbnail"
                />
                <div className="gallery-overlay">
                  <ZoomIn size={24} className="text-gold gallery-zoom-icon" />
                  <span className="gallery-overlay-title font-sans">{photo.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div 
          className="lightbox-backdrop animate-fade-in"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Tampilan foto layar penuh"
        >
          {/* Header with Counter and Close Button */}
          <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-counter font-sans">
              {lightboxIndex + 1} / {photos.length}
            </span>
            <button 
              className="lightbox-close-btn"
              onClick={handleClose}
              aria-label="Tutup tampilan penuh (Esc)"
            >
              <X size={26} />
            </button>
          </div>

          {/* Previous Button */}
          <button 
            className="lightbox-nav-btn lightbox-prev"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Foto sebelumnya (Panah Kiri)"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Main Image View */}
          <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
            <img 
              src={photos[lightboxIndex]?.src} 
              alt={photos[lightboxIndex]?.alt} 
              className="lightbox-main-image animate-zoom-in"
            />
            {photos[lightboxIndex]?.title && (
              <p className="lightbox-caption font-serif">
                {photos[lightboxIndex].title}
              </p>
            )}
          </div>

          {/* Next Button */}
          <button 
            className="lightbox-nav-btn lightbox-next"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Foto selanjutnya (Panah Kanan)"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
