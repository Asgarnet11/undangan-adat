import React, { useState, useMemo } from 'react';
import { getAvailableClients, getClientConfig } from '../data/clientRegistry';
import { Copy, Check, Download, MessageCircle, Link as LinkIcon, Users, ArrowLeft } from 'lucide-react';

const DEFAULT_MESSAGE_TEMPLATE = `Kepada Yth.
Bapak/Ibu/Saudara/i: *{nama}*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

*{mempelai}*

Info lengkap & konfirmasi kehadiran dapat dilihat melalui tautan undangan resmi berikut:
{link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu.

Terima kasih.`;

const GuestLinkGenerator = ({ initialSlug }) => {
  const clients = getAvailableClients();
  const [selectedSlug, setSelectedSlug] = useState(initialSlug || clients[0]?.slug || 'arjuna-srikandi');
  const [namesInput, setNamesInput] = useState(
    'Budi Santoso\nKeluarga Bapak Hendra\ndr. Siti Rahmawati & Partner\nRian Pratama\nAnisa Putri'
  );
  const [messageTemplate, setMessageTemplate] = useState(DEFAULT_MESSAGE_TEMPLATE);
  const [copiedId, setCopiedId] = useState(null);
  const [copyAllStatus, setCopyAllStatus] = useState(false);

  const activeClient = useMemo(() => {
    return getClientConfig(selectedSlug);
  }, [selectedSlug]);

  const coupleNames = useMemo(() => {
    if (!activeClient) return 'Mempelai';
    return `${activeClient.couple?.groom?.shortName || 'Pria'} & ${activeClient.couple?.bride?.shortName || 'Wanita'}`;
  }, [activeClient]);

  // Origin URL untuk tautan
  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://undangan.com';

  // Parse daftar nama tamu
  const guests = useMemo(() => {
    const lines = namesInput.split('\n').map(l => l.trim()).filter(Boolean);
    return lines.map((name, index) => {
      const encodedName = encodeURIComponent(name);
      const url = `${originUrl}/${selectedSlug}?to=${encodedName}`;
      
      const message = messageTemplate
        .replace(/\{nama\}/g, name)
        .replace(/\{mempelai\}/g, coupleNames)
        .replace(/\{link\}/g, url);

      const waLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

      return {
        id: index + 1,
        name,
        url,
        message,
        waLink
      };
    });
  }, [namesInput, selectedSlug, originUrl, messageTemplate, coupleNames]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleCopyAll = () => {
    const textAll = guests.map(g => `${g.name}: ${g.url}`).join('\n');
    navigator.clipboard.writeText(textAll).then(() => {
      setCopyAllStatus(true);
      setTimeout(() => setCopyAllStatus(false), 2500);
    });
  };

  const handleDownloadCsv = () => {
    const headers = ['No', 'Nama Tamu', 'Tautan Undangan', 'Teks Pesan WhatsApp'];
    const rows = guests.map(g => [
      g.id,
      `"${g.name.replace(/"/g, '""')}"`,
      `"${g.url}"`,
      `"${g.message.replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `daftar-tamu-${selectedSlug}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="section generator-section" style={{ minHeight: '100vh', padding: '3rem 1.5rem', background: '#052016' }}>
      <img src="/assets/sunda_bg.jpg" alt="Latar Belakang Tradisional" className="bg-image" style={{ opacity: 0.15 }} />
      <div className="bg-overlay" style={{ background: 'linear-gradient(to bottom, #0a3123 0%, #052016 100%)' }}></div>

      <div className="section-container content-z" style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Navigation Back */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a 
            href={`/${selectedSlug}?open=true`}
            className="btn-instagram font-sans"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={16} />
            Kembali ke Undangan {coupleNames}
          </a>

          <a 
            href="/"
            className="font-sans text-xs text-gold"
            style={{ textDecoration: 'none', opacity: 0.8 }}
          >
            Portal Utama
          </a>
        </div>

        {/* Title Header */}
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
            <Users size={24} />
            <span className="font-sans text-xs uppercase" style={{ letterSpacing: '3px' }}>Alat Distribusi Undangan</span>
          </div>
          <h1 className="font-display text-gold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '0 0 0.8rem' }}>
            Generator Link &amp; Pesan Tamu
          </h1>
          <p className="font-serif text-white" style={{ fontSize: '0.95rem', opacity: 0.85, maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            Masukkan nama-nama tamu undangan (satu nama per baris) untuk membuat tautan khusus yang aman dan langsung siap dikirimkan melalui WhatsApp.
          </p>
        </div>

        {/* Form Controls Card */}
        <div className="ayat-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          {/* Client Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="font-sans text-xs text-gold" style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem', fontWeight: 600 }}>
              Pilih Klien Undangan:
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                border: '1px solid rgba(212,175,55,0.4)',
                fontFamily: 'inherit',
                fontSize: '0.95rem'
              }}
            >
              {clients.map((c) => (
                <option key={c.slug} value={c.slug} style={{ background: '#052016', color: '#fff' }}>
                  {c.names} (/{c.slug})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Input Daftar Nama */}
            <div>
              <label className="font-sans text-xs text-gold" style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem', fontWeight: 600 }}>
                Daftar Nama Tamu (1 Nama Per Baris):
              </label>
              <textarea
                rows={7}
                value={namesInput}
                onChange={(e) => setNamesInput(e.target.value)}
                placeholder="Contoh:&#10;Budi Santoso&#10;Keluarga dr. Hendra&#10;Siti Rahmawati"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: '1px solid rgba(212,175,55,0.3)',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  resize: 'vertical'
                }}
              />
              <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginTop: '4px' }}>
                Total terdeteksi: <strong>{guests.length}</strong> tamu
              </span>
            </div>

            {/* Template Pesan WhatsApp */}
            <div>
              <label className="font-sans text-xs text-gold" style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem', fontWeight: 600 }}>
                Template Pesan WhatsApp (Dapat Diedit):
              </label>
              <textarea
                rows={7}
                value={messageTemplate}
                onChange={(e) => setMessageTemplate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: '1px solid rgba(212,175,55,0.3)',
                  fontFamily: 'inherit',
                  fontSize: '0.82rem',
                  lineHeight: '1.45',
                  resize: 'vertical'
                }}
              />
              <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginTop: '4px' }}>
                Gunakan tag variabel: <code style={{ color: '#f3e5ab' }}>&#123;nama&#125;</code>, <code style={{ color: '#f3e5ab' }}>&#123;mempelai&#125;</code>, <code style={{ color: '#f3e5ab' }}>&#123;link&#125;</code>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
            <button
              type="button"
              onClick={handleCopyAll}
              className="btn-instagram font-sans"
              style={{ margin: 0, padding: '10px 18px', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              {copyAllStatus ? <Check size={16} /> : <Copy size={16} />}
              {copyAllStatus ? 'Semua Link Tersalin!' : 'Salin Semua Link'}
            </button>
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="btn-calendar font-sans"
              style={{ margin: 0, padding: '10px 18px', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              <Download size={16} />
              Unduh CSV ({guests.length} Tamu)
            </button>
          </div>
        </div>

        {/* Guest Output List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 className="font-display text-gold" style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>
            Daftar Link Undangan Per Tamu
          </h2>

          {guests.map((guest) => (
            <div
              key={guest.id}
              style={{
                background: 'rgba(0,0,0,0.35)',
                borderRadius: '10px',
                padding: '14px 18px',
                border: '1px solid rgba(212,175,55,0.2)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{ minWidth: '220px', flex: '1 1 300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-sans text-xs text-gold" style={{ opacity: 0.7 }}>#{guest.id}</span>
                  <h3 className="font-display text-white" style={{ fontSize: '1.05rem', margin: 0 }}>
                    {guest.name}
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <LinkIcon size={13} className="text-gold" style={{ opacity: 0.7 }} />
                  <a
                    href={guest.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-xs"
                    style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', wordBreak: 'break-all' }}
                  >
                    {guest.url}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => handleCopy(guest.url, `url-${guest.id}`)}
                  className="btn-instagram font-sans text-xs"
                  style={{ margin: 0, padding: '6px 12px', cursor: 'pointer' }}
                  title="Salin tautan saja"
                >
                  {copiedId === `url-${guest.id}` ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === `url-${guest.id}` ? 'Tersalin' : 'Salin Link'}
                </button>

                <a
                  href={guest.waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-calendar font-sans text-xs"
                  style={{ margin: 0, padding: '6px 14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <MessageCircle size={14} />
                  Kirim via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestLinkGenerator;
