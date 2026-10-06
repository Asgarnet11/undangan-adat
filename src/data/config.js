/**
 * COMPATIBILITY LAYER / DEFAULT CONFIG
 * -------------------------------------------------------------
 * Menyediakan konfigurasi bawaan (default) yang bersumber dari klien
 * 'arjuna-srikandi' agar kompatibel dengan pemanggilan legacy.
 */

import { arjunaSrikandiConfig } from './clients/arjuna-srikandi';

export const config = {
  ...arjunaSrikandiConfig,
  // Helper aliases untuk backward-compatibility
  date: arjunaSrikandiConfig.hero.date,
  weddingDateISO: arjunaSrikandiConfig.hero.weddingDateISO,
  audio: arjunaSrikandiConfig.music.src,
  bankAccounts: arjunaSrikandiConfig.gift.bankAccounts
};

export default config;
