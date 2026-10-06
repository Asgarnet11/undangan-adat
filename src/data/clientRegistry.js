/**
 * REGISTRY KLIEN & VALIDATOR KONFIGURASI
 * -------------------------------------------------------------
 * Menyimpan daftar klien yang aktif, routing slug, serta validasi
 * integritas data sebelum undangan dirender.
 */

import { arjunaSrikandiConfig } from './clients/arjuna-srikandi.js';
import { ramaShintaConfig } from './clients/rama-shinta.js';

/**
 * Registry klien yang secara dinamis memuat semua konfigurasi di ./clients/*.js
 * sekaligus mendukung registrasi manual.
 */
export const clientRegistry = {
  'arjuna-srikandi': arjunaSrikandiConfig,
  'rama-shinta': ramaShintaConfig,
};

// Auto-discovery konfigurasi klien menggunakan Vite import.meta.glob
try {
  const clientModules = import.meta.glob('./clients/*.js', { eager: true });
  for (const path in clientModules) {
    if (path.includes('client-template')) continue;
    const mod = clientModules[path];
    const config = mod.default || Object.values(mod).find((val) => val && typeof val === 'object' && val.slug);
    if (config && config.slug) {
      clientRegistry[config.slug] = config;
    }
  }
} catch {
  // Fallback untuk lingkungan non-Vite (misal unit test node murni)
}

// Klien bawaan bila slug tidak ditentukan di URL
export const DEFAULT_CLIENT_SLUG = 'arjuna-srikandi';

/**
 * Validasi konfigurasi klien saat runtime.
 * Menampilkan peringatan informatif di browser console bila ada field penting yang kosong.
 * @param {object} config 
 */
export function validateClientConfig(config) {
  if (!config) {
    console.error('[ConfigValidator] Data klien kosong atau bernilai null/undefined.');
    return false;
  }

  const warnings = [];

  // Pengecekan Field Utama
  if (!config.slug) warnings.push('Field `slug` belum didefinisikan.');
  if (!config.meta?.title) warnings.push('Field `meta.title` kosong.');
  if (!config.couple?.groom?.name) warnings.push('Field `couple.groom.name` kosong.');
  if (!config.couple?.bride?.name) warnings.push('Field `couple.bride.name` kosong.');
  
  if (!Array.isArray(config.events) || config.events.length === 0) {
    warnings.push('Array `events` minimal harus memiliki 1 acara.');
  }

  if (!config.music?.src) {
    warnings.push('Field `music.src` belum ditentukan.');
  }

  // Pengecekan Foto Mempelai
  if (!config.couple?.groom?.photo) {
    warnings.push('Foto mempelai pria `couple.groom.photo` belum diisi.');
  }
  if (!config.couple?.bride?.photo) {
    warnings.push('Foto mempelai wanita `couple.bride.photo` belum diisi.');
  }

  if (warnings.length > 0) {
    console.group(`%c[ConfigValidator] Peringatan Konfigurasi Klien: ${config.slug || 'Unknown'}`, 'color: #d4af37; font-weight: bold;');
    warnings.forEach((msg) => console.warn(`⚠ ${msg}`));
    console.groupEnd();
  }

  return warnings.length === 0;
}

/**
 * Mendapatkan konfigurasi klien berdasarkan slug
 * @param {string} slug 
 * @returns {object|null}
 */
export function getClientConfig(slug) {
  if (!slug) return null;
  const normalizedSlug = String(slug).toLowerCase().trim();
  const config = clientRegistry[normalizedSlug] || null;

  if (config) {
    validateClientConfig(config);
  }

  return config;
}

/**
 * Mendapatkan daftar seluruh slug klien yang tersedia
 * @returns {Array<{slug: string, title: string, names: string}>}
 */
export function getAvailableClients() {
  return Object.values(clientRegistry).map((c) => ({
    slug: c.slug,
    title: c.meta?.title || c.slug,
    names: `${c.couple?.groom?.shortName || 'Pria'} & ${c.couple?.bride?.shortName || 'Wanita'}`,
    date: c.hero?.date || c.events?.[0]?.date || ''
  }));
}
