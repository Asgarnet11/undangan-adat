import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

import { sanitizeGuestName, generateGuestInvitationLink } from '../src/utils/sanitizeGuest.js';
import { clientRegistry, validateClientConfig, getAvailableClients, DEFAULT_CLIENT_SLUG } from '../src/data/clientRegistry.js';
import { arjunaSrikandiConfig } from '../src/data/clients/arjuna-srikandi.js';
import { ramaShintaConfig } from '../src/data/clients/rama-shinta.js';

console.log('--- 1. Testing sanitizeGuest.js ---');
// Test 1: Normal names
assert.strictEqual(sanitizeGuestName('Budi Santoso'), 'Budi Santoso');
assert.strictEqual(sanitizeGuestName('Budi+Santoso'), 'Budi Santoso');
assert.strictEqual(sanitizeGuestName('Budi%20Santoso'), 'Budi Santoso');

// Test 2: Empty / Fallback
assert.strictEqual(sanitizeGuestName(''), 'Tamu Undangan');
assert.strictEqual(sanitizeGuestName(null), 'Tamu Undangan');
assert.strictEqual(sanitizeGuestName('   '), 'Tamu Undangan');

// Test 3: XSS Sanitization
const xssPayload = '<script>alert("hack")</script>Budi';
const sanitizedXss = sanitizeGuestName(xssPayload);
assert(!sanitizedXss.includes('<script>'), 'Script tag should be sanitized');
assert(!sanitizedXss.includes('</script>'), 'Script closing tag should be sanitized');
console.log('✔ XSS payload sanitized:', sanitizedXss);

// Test 4: Length truncation (max 60 chars)
const longName = 'A'.repeat(80);
const truncated = sanitizeGuestName(longName);
assert(truncated.length <= 60, 'Length should be capped at 60');
console.log('✔ Length truncation passed: length is', truncated.length);

// Test 5: Link generator
const link = generateGuestInvitationLink('arjuna-srikandi', 'Bapak Ahmad', 'https://undangan.test');
assert.strictEqual(link, 'https://undangan.test/arjuna-srikandi?to=Bapak%20Ahmad');
console.log('✔ Link generator test passed:', link);

console.log('\n--- 2. Testing clientRegistry & Config Validator ---');
// Verify registered clients
assert(clientRegistry['arjuna-srikandi'], 'arjuna-srikandi must be in clientRegistry');
assert(clientRegistry['rama-shinta'], 'rama-shinta must be in clientRegistry');

// Validation test for arjuna-srikandi
const isArjunaValid = validateClientConfig(arjunaSrikandiConfig);
assert(isArjunaValid, 'arjunaSrikandiConfig must be 100% valid');
console.log('✔ arjunaSrikandiConfig validated successfully.');

// Validation test for rama-shinta
const isRamaValid = validateClientConfig(ramaShintaConfig);
assert(isRamaValid, 'ramaShintaConfig must be 100% valid');
console.log('✔ ramaShintaConfig validated successfully.');

// Test available clients list
const available = getAvailableClients();
assert(available.length >= 2, 'Available clients should include at least 2 clients');
console.log('✔ Available clients registered:', available.map(c => c.slug).join(', '));

console.log('\n--- 3. Testing Assets Integrity ---');
const clients = ['arjuna-srikandi', 'rama-shinta', 'template'];
for (const slug of clients) {
  const dir = path.join(rootDir, 'public', 'clients', slug);
  assert(fs.existsSync(dir), `Directory ${dir} must exist`);
  const files = ['groom.jpg', 'bride.jpg', 'couple.jpg', 'song.mp3'];
  for (const file of files) {
    const filePath = path.join(dir, file);
    assert(fs.existsSync(filePath), `File ${filePath} must exist`);
    const stats = fs.statSync(filePath);
    assert(stats.size > 0, `File ${filePath} must not be empty`);
  }
  console.log(`✔ Assets for '${slug}' complete and verified.`);
}

console.log('\n--- 4. Testing Flexible Layout Schema ---');
// Arjuna: 2 events
assert.strictEqual(arjunaSrikandiConfig.events.length, 2, 'Arjuna has 2 events');
// Rama: 1 event (test case for single event adaptability)
assert.strictEqual(ramaShintaConfig.events.length, 1, 'Rama has 1 single event');

// Bank accounts flexibility
assert(Array.isArray(arjunaSrikandiConfig.gift.bankAccounts), 'Bank accounts is array');
assert(arjunaSrikandiConfig.gift.bankAccounts.length >= 1, 'Has at least 1 account');

// Active sections
assert(arjunaSrikandiConfig.activeSections.includes('events'));
assert(arjunaSrikandiConfig.activeSections.includes('gallery'));

console.log('✔ All flexible data schema assertions passed!');
console.log('\n✨ ALL AUTOMATED TESTS PASSED SUCCESSFULLY! ✨\n');
