import React, { useState, useEffect } from 'react';
import Cover from './components/Cover';
import Hero from './components/Hero';
import Ayat from './components/Ayat';
import Couple from './components/Couple';
import Events from './components/Events';
import Story from './components/Story';
import Gallery from './components/Gallery';
import GiftSection from './components/Gift';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import NotFound from './components/NotFound';
import GuestLinkGenerator from './components/GuestLinkGenerator';
import ErrorBoundary from './components/ErrorBoundary';
import { ClientProvider, useClient } from './context/ClientContext';
import { resolveCurrentRoute, getClientData } from './services/clientDataService';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useScrollReveal } from './hooks/useScrollReveal';

/**
 * Komponen utama undangan pernikahan digital untuk klien aktif.
 * Mengonsumsi data dari ClientContext yang disuplai oleh ClientProvider.
 */
function InvitationContent() {
  const context = useClient();
  const client = context?.client || context || {};
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('open') === 'true';
  });

  const previewSection = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('section') 
    : null;

  // Resolusi sumber audio musik latar dengan proteksi null-safe
  const audioSrc = typeof client.music === 'string'
    ? client.music
    : (client.music?.src || client.music?.file || client.audio || '/song.mp3');

  const { isPlaying, play, toggle } = useAudioPlayer(audioSrc);

  // Trigger scroll observer saat cover dibuka
  useScrollReveal(isOpen);

  // Kunci scroll body saat cover tertutup
  useEffect(() => {
    if (!isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Dukungan lompat ke section tertentu via ?section=id
  useEffect(() => {
    if (isOpen) {
      const params = new URLSearchParams(window.location.search);
      const sectionId = params.get('section');
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'instant' });
        }
      }
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    play();
  };

  // Helper untuk mengecek apakah suatu section diaktifkan di konfigurasi klien
  const isSectionActive = (sectionId) => {
    if (!client.activeSections || !Array.isArray(client.activeSections)) return true;
    return client.activeSections.includes(sectionId);
  };

  return (
    <div className="app-container">
      {/* Cover / Opening Screen */}
      <Cover isOpen={isOpen} onOpen={handleOpen} />

      {/* Responsive Navigation (Top Navbar Desktop + Bottom App-Bar Mobile) */}
      <Navbar isOpen={isOpen} />
      
      {/* Main Invitation Content */}
      <main 
        className="main-content"
        style={{
          display: isOpen ? 'block' : 'none'
        }}
      >
        {previewSection === 'couple' && <Couple />}
        {previewSection === 'events' && <Events />}
        {previewSection === 'story' && <Story />}
        {previewSection === 'gallery' && <Gallery />}
        {previewSection === 'gift' && <GiftSection />}
        
        {!previewSection && (
          <>
            {isSectionActive('hero') && <Hero />}
            {isSectionActive('ayat') && <Ayat />}
            {isSectionActive('couple') && <Couple />}
            {isSectionActive('events') && <Events />}
            {isSectionActive('story') && <Story />}
            {isSectionActive('gallery') && <Gallery />}
            {isSectionActive('gift') && <GiftSection />}
            
            {/* Footer Section */}
            {isSectionActive('closing') && (
              <footer className="footer-section section text-center">
                <div className="section-container content-z reveal-on-scroll">
                  <p className="footer-greeting text-white font-serif mb-4">
                    {client.closing?.greeting || 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.'}
                  </p>
                  <p className="footer-salutation font-serif text-gold mb-3">
                    {client.closing?.salutation || 'Kami yang berbahagia'}
                  </p>
                  <p className="footer-couple-name font-display text-gold">
                    {client.couple?.groom?.shortName} &amp; {client.couple?.bride?.shortName}
                  </p>
                  <div className="gold-divider-small" style={{ margin: '1.2rem auto' }}></div>
                  <p className="footer-credit font-sans">
                    {client.closing?.credit || `The Wedding of ${client.couple?.groom?.shortName} & ${client.couple?.bride?.shortName} • ${client.events?.[0]?.date?.fullDate || ''}`}
                  </p>
                </div>
              </footer>
            )}
          </>
        )}
      </main>

      {/* Floating Audio Controller */}
      {isOpen && (
        <button 
          className={`audio-btn ${isPlaying ? 'is-playing' : 'is-paused'}`} 
          onClick={toggle}
          aria-label={isPlaying ? "Jeda musik latar" : "Putar musik latar"}
          title={isPlaying ? "Mute Musik" : "Play Musik"}
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          {isPlaying && <span className="audio-wave-pulse" aria-hidden="true"></span>}
        </button>
      )}
    </div>
  );
}

/**
 * Root Router App
 * Menangani pemilihan klien via slug URL, generator link tamu, serta halaman fallback 404 & Landing.
 */
function App() {
  const [route, setRoute] = useState(() => resolveCurrentRoute());

  useEffect(() => {
    const handlePopState = () => {
      setRoute(resolveCurrentRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 1. Rute Halaman Root (/) -> Landing sederhana dengan daftar klien aktif
  if (route.isRoot) {
    return <Landing />;
  }

  // 2. Rute Generator Link Tamu (/generator atau ?page=generator)
  if (route.isGenerator) {
    return <GuestLinkGenerator initialSlug={route.slug || 'arjuna-srikandi'} />;
  }

  // 3. Rute Undangan Klien (/{slug} atau ?client={slug})
  const clientData = getClientData(route.slug);

  // Jika slug tidak ditemukan di registry -> 404 Undangan Tidak Ditemukan
  if (!clientData) {
    return <NotFound slug={route.slug} />;
  }

  // Klien ditemukan -> Render template undangan dengan ClientProvider
  return (
    <ErrorBoundary>
      <ClientProvider clientData={clientData}>
        <InvitationContent />
      </ClientProvider>
    </ErrorBoundary>
  );
}

export default App;
