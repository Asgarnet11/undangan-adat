import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[UndanganError]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a3123',
          color: '#ffffff',
          fontFamily: "'Plus Jakarta Sans', sans-serif', padding: '2rem', textAlign: 'center'",
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '500px',
            background: 'rgba(5, 32, 22, 0.9)',
            border: '1px solid #d4af37',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ fontFamily: "'Cinzel', serif", color: '#d4af37', fontSize: '1.5rem', marginBottom: '1rem' }}>
              Terjadi Kendala Memuat Undangan
            </h2>
            <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Mohon maaf, terdapat kendala saat memuat data undangan. Silakan muat ulang halaman atau periksa konfigurasi klien.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: 'linear-gradient(135deg, #d4af37, #aa820a)',
                  color: '#052016',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Muat Ulang Halaman
              </button>
              <a
                href="/"
                style={{
                  background: 'transparent',
                  color: '#d4af37',
                  border: '1px solid #d4af37',
                  borderRadius: '30px',
                  padding: '0.75rem 1.5rem',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                Ke Beranda
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
