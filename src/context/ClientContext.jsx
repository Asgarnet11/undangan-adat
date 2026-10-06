/* eslint-disable react-refresh/only-export-components */
/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useEffect, useMemo } from 'react';

const ClientContext = createContext(null);

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

export const ClientProvider = ({ clientData, children }) => {
  // Update document title, description, OG image, and favicon dynamically
  useEffect(() => {
    if (!clientData) return;

    if (clientData.meta?.title) {
      document.title = clientData.meta.title;
    }

    if (clientData.meta?.description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', clientData.meta.description);
    }

    if (clientData.meta?.ogImage) {
      let ogImg = document.querySelector('meta[property="og:image"]');
      if (!ogImg) {
        ogImg = document.createElement('meta');
        ogImg.setAttribute('property', 'og:image');
        document.head.appendChild(ogImg);
      }
      ogImg.setAttribute('content', clientData.meta.ogImage);
    }

    if (clientData.meta?.favicon) {
      let favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.setAttribute('href', clientData.meta.favicon);
      }
    }

    // Inject theme CSS variables if customized in clientData.theme
    if (clientData.theme) {
      const root = document.documentElement;
      const theme = clientData.theme;

      if (theme.colorPrimary) root.style.setProperty('--color-primary', theme.colorPrimary);
      if (theme.colorPrimaryDark) root.style.setProperty('--color-primary-dark', theme.colorPrimaryDark);
      if (theme.colorSecondary) root.style.setProperty('--color-secondary', theme.colorSecondary);
      if (theme.colorSecondaryLight) root.style.setProperty('--color-secondary-light', theme.colorSecondaryLight);
      if (theme.colorAccent) root.style.setProperty('--color-accent', theme.colorAccent);
      if (theme.fontDisplay) root.style.setProperty('--font-display', theme.fontDisplay);
      if (theme.fontSerif) root.style.setProperty('--font-serif', theme.fontSerif);
      if (theme.fontSans) root.style.setProperty('--font-sans', theme.fontSans);
    }
  }, [clientData]);

  // Mendukung baik const client = useClient() maupun const { client } = useClient()
  const contextValue = useMemo(() => {
    if (!clientData) return null;
    return {
      ...clientData,
      client: clientData,
    };
  }, [clientData]);

  if (!clientData) return null;

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};

