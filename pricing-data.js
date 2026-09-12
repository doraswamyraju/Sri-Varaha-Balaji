/* ==========================================================================
   PRICING & CONFIGURATION DATA MANAGER
   Handles dynamic pricing between Admin Dashboard and Frontend
   ========================================================================== */

const DEFAULT_PRICING_CONFIG = {
  currency: '₹',
  lastUpdated: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  seasonalNotice: 'Special festive/peak season rates may vary. Call 24x7 for instant confirmation.',
  dormitory: {
    title: 'A/C Dormitory Bed',
    priceTransit: '299',
    unitTransit: 'per bed / up to 6 hrs',
    priceOvernight: '499',
    unitOvernight: 'per bed / 24 hrs',
    description: 'Individual spring-mattress bed with clean linen, reading light, bedside charging & locker included.',
    features: [
      '24/7 Powerful Air Conditioning',
      'Personal Secure Steel Locker',
      'Bedside Mobile Charging Socket',
      '24x7 Geyser Hot Water Restrooms'
    ]
  },
  waitingHall: {
    title: 'A/C Waiting Hall & Fresh-up',
    priceTransit: '149',
    unitTransit: 'per person / up to 3 hrs',
    priceOvernight: '249',
    unitOvernight: 'per person / up to 6 hrs',
    description: 'Perfect for transit pilgrims refreshing, bathing, and relaxing between trains or Tirumala darshan slots.',
    features: [
      'Comfortable cushioned seating',
      'Spotless Western & Indian bathrooms',
      'Instant hot water geysers',
      'Luggage temporary safe custody'
    ]
  },
  familySpace: {
    title: 'Dedicated Family Suite Space',
    priceTransit: '999',
    unitTransit: 'family of 4 / up to 6 hrs',
    priceOvernight: '1,499',
    unitOvernight: 'family of 4 / 24 hrs',
    description: 'Private partitioned separate zone for families desiring exclusive space, privacy, and peaceful stay.',
    features: [
      'Exclusive private family section',
      'Double beds + extra bedding on request',
      'Dedicated wardrobe cupboards',
      'Total privacy for kids and elders'
    ]
  },
  extraServices: [
    { name: 'Extra Bed / Mattress', price: '₹200 / day' },
    { name: 'Luggage Storage Only', price: '₹50 / bag' },
    { name: 'Mineral RO Water & Wi-Fi', price: 'FREE' }
  ]
};

// Storage Key
const STORAGE_KEY = 'balaji_dormitory_pricing_data';

// Load active pricing
function getPricingData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Error reading from localStorage, using defaults', e);
  }
  return DEFAULT_PRICING_CONFIG;
}

// Save active pricing
function savePricingData(data) {
  try {
    data.lastUpdated = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save to localStorage', e);
    return false;
  }
}

// Reset to default
function resetPricingData() {
  localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_PRICING_CONFIG;
}

// Render dynamic prices into Frontend elements
function renderFrontendPricing() {
  const data = getPricingData();

  // Update Dormitory Prices
  const dormTransit = document.getElementById('price-dorm-transit');
  const dormTransitUnit = document.getElementById('unit-dorm-transit');
  const dormNight = document.getElementById('price-dorm-night');
  const dormNightUnit = document.getElementById('unit-dorm-night');

  if (dormTransit) dormTransit.textContent = `${data.currency}${data.dormitory.priceTransit}`;
  if (dormTransitUnit) dormTransitUnit.textContent = data.dormitory.unitTransit;
  if (dormNight) dormNight.textContent = `${data.currency}${data.dormitory.priceOvernight}`;
  if (dormNightUnit) dormNightUnit.textContent = data.dormitory.unitOvernight;

  // Update Waiting Hall Prices
  const waitTransit = document.getElementById('price-wait-transit');
  const waitTransitUnit = document.getElementById('unit-wait-transit');
  const waitNight = document.getElementById('price-wait-night');
  const waitNightUnit = document.getElementById('unit-wait-night');

  if (waitTransit) waitTransit.textContent = `${data.currency}${data.waitingHall.priceTransit}`;
  if (waitTransitUnit) waitTransitUnit.textContent = data.waitingHall.unitTransit;
  if (waitNight) waitNight.textContent = `${data.currency}${data.waitingHall.priceOvernight}`;
  if (waitNightUnit) waitNightUnit.textContent = data.waitingHall.unitOvernight;

  // Update Family Space Prices
  const famTransit = document.getElementById('price-fam-transit');
  const famTransitUnit = document.getElementById('unit-fam-transit');
  const famNight = document.getElementById('price-fam-night');
  const famNightUnit = document.getElementById('unit-fam-night');

  if (famTransit) famTransit.textContent = `${data.currency}${data.familySpace.priceTransit}`;
  if (famTransitUnit) famTransitUnit.textContent = data.familySpace.unitTransit;
  if (famNight) famNight.textContent = `${data.currency}${data.familySpace.priceOvernight}`;
  if (famNightUnit) famNightUnit.textContent = data.familySpace.unitOvernight;

  // Seasonal Notice Banner
  const seasonalEl = document.getElementById('pricing-seasonal-notice');
  if (seasonalEl && data.seasonalNotice) {
    seasonalEl.textContent = data.seasonalNotice;
  }

  // Last updated indicator
  const updatedEl = document.getElementById('pricing-last-updated');
  if (updatedEl && data.lastUpdated) {
    updatedEl.textContent = `Tariff Guide (Updated: ${data.lastUpdated})`;
  }
}

// Auto-run on frontend page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', renderFrontendPricing);
}
