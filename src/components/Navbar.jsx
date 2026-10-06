import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, Sparkles, Image as ImageIcon, Gift } from 'lucide-react';
import { useClient } from '../context/ClientContext';

const ALL_NAV_DEFS = [
  { 
    id: 'hero', 
    label: 'Beranda', 
    icon: Home,
    isVisible: (client) => (!client.activeSections || client.activeSections.includes('hero'))
  },
  { 
    id: 'couple', 
    label: 'Mempelai', 
    icon: Users,
    isVisible: (client) => (!client.activeSections || client.activeSections.includes('couple')) && Boolean(client.couple?.groom && client.couple?.bride)
  },
  { 
    id: 'events', 
    label: 'Acara', 
    icon: Calendar,
    isVisible: (client) => (!client.activeSections || client.activeSections.includes('events')) && Array.isArray(client.events) && client.events.length > 0
  },
  { 
    id: 'story', 
    label: 'Cerita', 
    icon: Sparkles,
    isVisible: (client) => (!client.activeSections || client.activeSections.includes('story')) && Array.isArray(client.loveStory) && client.loveStory.length > 0
  },
  { 
    id: 'gallery', 
    label: 'Galeri', 
    icon: ImageIcon,
    isVisible: (client) => (!client.activeSections || client.activeSections.includes('gallery')) && Array.isArray(client.gallery) && client.gallery.length > 0
  },
  { 
    id: 'gift', 
    label: 'Hadiah', 
    icon: Gift,
    isVisible: (client) => (!client.activeSections || client.activeSections.includes('gift')) && Boolean(
      (Array.isArray(client.gift?.bankAccounts) && client.gift.bankAccounts.length > 0) || client.gift?.physicalGift
    )
  },
];

const Navbar = ({ isOpen }) => {
  const context = useClient();
  const client = context?.client || context || {};
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Filter menu items dynamically according to client config and presence of content
  const navItems = ALL_NAV_DEFS.filter(def => def.isVisible(client));

  // Scroll-spy observer
  useEffect(() => {
    if (!isOpen) return;

    const sections = navItems
      .map(item => document.getElementById(item.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-25% 0px -40% 0px',
      threshold: 0.1
    });

    sections.forEach(el => observer.observe(el));

    // Handle scroll for desktop top bar background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle virtual keyboard detection on mobile
    const handleResize = () => {
      if (window.visualViewport) {
        setIsKeyboardVisible(window.visualViewport.height < window.innerHeight - 150);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, [isOpen, navItems.length]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const isDesktop = window.innerWidth >= 1024;
    const offset = isDesktop ? 80 : 20;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  if (!isOpen) return null;

  const groomInitial = (client.couple?.groom?.shortName || 'A').charAt(0);
  const brideInitial = (client.couple?.bride?.shortName || 'S').charAt(0);

  return (
    <>
      {/* DESKTOP & TABLET TOP NAVBAR (>= 768px) */}
      <header className={`desktop-navbar ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="desktop-navbar-inner">
          <button 
            className="navbar-brand font-display text-gold" 
            onClick={() => scrollToSection('hero')}
            aria-label="Kembali ke atas"
          >
            {groomInitial} &amp; {brideInitial}
          </button>
          
          <nav className="desktop-nav-links" aria-label="Navigasi Utama">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link font-sans ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="nav-gold-underline" aria-hidden="true" />}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* MOBILE BOTTOM APP-BAR (< 768px) */}
      <nav 
        className={`mobile-bottom-nav ${isKeyboardVisible ? 'nav-hidden' : ''}`}
        aria-label="Navigasi Menu Bawah"
      >
        <div className="mobile-bottom-nav-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`mobile-nav-item ${isActive ? 'is-active' : ''}`}
                aria-label={`Buka bagian ${item.label}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="mobile-nav-icon-wrap">
                  <Icon size={20} className="mobile-nav-icon" />
                  {isActive && <span className="mobile-nav-indicator" aria-hidden="true" />}
                </div>
                <span className="mobile-nav-label font-sans">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
