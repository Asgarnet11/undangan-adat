import React, { useState } from 'react';
import { Copy, Check, CreditCard, Gift, MapPin } from 'lucide-react';
import { useClient } from '../context/ClientContext';

const GiftSection = () => {
  const context = useClient();
  const client = context?.client || context || {};
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const bankAccounts = client.gift?.bankAccounts || [];
  const physicalGift = client.gift?.physicalGift || null;

  // Sembunyikan section jika tidak ada rekening maupun kado fisik
  if (bankAccounts.length === 0 && !physicalGift) {
    return null;
  }

  const handleCopy = (number, index) => {
    navigator.clipboard.writeText(number).then(() => {
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2500);
    }).catch(() => {
      // Fallback bila clipboard API dibatasi peramban
      const textarea = document.createElement('textarea');
      textarea.value = number;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    });
  };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = address;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    });
  };

  return (
    <section id="gift" className="section gift-section text-center">
      <div className="section-container content-z">
        <div className="reveal-on-scroll">
          <h2 className="section-title">
            Tanda Kasih
          </h2>
          <p className="gift-description font-serif text-white">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberikan kado secara digital:
          </p>
        </div>

        {/* Daftar Rekening Bank / Dompet Digital */}
        {bankAccounts.length > 0 && (
          <div className="gift-cards-container">
            {bankAccounts.map((account, index) => {
              const accNumber = account.accountNumber || account.number || '';
              const accHolder = account.accountHolder || account.holder || '';
              return (
                <div key={index} className="gift-card reveal-on-scroll delay-200">
                  <div className="gift-card-header">
                    <div className="bank-logo-chip">
                      <CreditCard size={18} className="text-gold" />
                      <span className="font-sans font-bold text-white tracking-wider">{account.bank}</span>
                    </div>
                  </div>

                  <div className="gift-card-body">
                    <p className="account-number font-sans">{accNumber}</p>
                    <p className="account-holder font-serif text-gold">a.n. {accHolder}</p>
                  </div>

                  <button
                    onClick={() => handleCopy(accNumber, index)}
                    className={`btn-copy ${copiedIndex === index ? 'is-copied' : ''}`}
                    aria-label={`Salin nomor rekening ${account.bank}`}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check size={16} />
                        <span>Tersalin ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Hadiah Fisik (Opsional) */}
        {physicalGift && physicalGift.address && (
          <div className="gift-physical-box reveal-on-scroll delay-300 mt-8" style={{
            maxWidth: '520px',
            margin: '2rem auto 0',
            padding: '1.8rem',
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}>
            <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', marginBottom: '0.8rem' }}>
              <Gift size={24} className="text-gold" />
            </div>
            <h3 className="font-display text-gold" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              Kirim Kado Fisik
            </h3>
            <p className="font-serif text-white mb-2" style={{ fontSize: '0.95rem' }}>
              Penerima: <strong>{physicalGift.recipient || 'Mempelai'}</strong>
            </p>
            <p className="font-sans text-white" style={{ fontSize: '0.85rem', opacity: 0.85, lineHeight: 1.6, marginBottom: '1.2rem' }}>
              {physicalGift.address}
            </p>
            <button
              onClick={() => handleCopyAddress(physicalGift.address)}
              className={`btn-copy ${copiedAddress ? 'is-copied' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
              aria-label="Salin alamat pengiriman"
            >
              {copiedAddress ? (
                <>
                  <Check size={16} />
                  <span>Alamat Tersalin ✓</span>
                </>
              ) : (
                <>
                  <MapPin size={16} />
                  <span>Salin Alamat</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GiftSection;
