import config from '../config';
import { sampleGifts } from './mockData';

const MOCK_USERS_KEY = 'giftlink-mock-users';

function isAbsoluteUrl(value) {
  return /^https?:\/\//.test(value);
}

function readMockUsers() {
  const raw = localStorage.getItem(MOCK_USERS_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch (_error) {
    return [];
  }
}

function writeMockUsers(users) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

function normalizeGift(gift) {
  return {
    ...gift,
    id: gift.id || gift._id,
    image: resolveImageUrl(gift.image)
  };
}

function filterGifts(gifts, filters = {}) {
  const query = String(filters.q || '').toLowerCase();
  const category = String(filters.category || '').toLowerCase();
  const location = String(filters.location || '').toLowerCase();

  return gifts.filter((gift) => {
    const joined = [gift.name, gift.description, gift.owner, gift.location].join(' ').toLowerCase();
    const matchesQuery = !query || joined.includes(query);
    const matchesCategory = !category || String(gift.category || '').toLowerCase().includes(category);
    const matchesLocation = !location || String(gift.location || '').toLowerCase().includes(location);
    return matchesQuery && matchesCategory && matchesLocation;
  });
}

async function fetchJson(path, options) {
  if (!config.apiBaseUrl) {
    throw new Error('API unavailable');
  }

  const response = await fetch(`${config.apiBaseUrl}${path}`, options);
  const data = await response.json();

  if (!response.ok) {
    const message = data && data.error ? data.error : 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

export function resolveImageUrl(imagePath) {
  if (!imagePath) {
    return `${config.publicUrl}/images/sparkle-box.svg`;
  }

  if (isAbsoluteUrl(imagePath) || imagePath.startsWith('data:')) {
    return imagePath;
  }

  if (imagePath.startsWith('/images/')) {
    return `${config.publicUrl}${imagePath}`;
  }

  if (imagePath.startsWith('/') && config.apiBaseUrl) {
    return `${config.apiBaseUrl}${imagePath}`;
  }

  return imagePath;
}

export async function getGifts() {
  try {
    const data = await fetchJson('/api/gifts');
    return Array.isArray(data) ? data.map(normalizeGift) : [];
  } catch (_error) {
    return sampleGifts.map(normalizeGift);
  }
}

export async function searchGifts(filters) {
  const params = new URLSearchParams();
  if (filters.q) {
    params.set('q', filters.q);
  }
  if (filters.category) {
    params.set('category', filters.category);
  }
  if (filters.location) {
    params.set('location', filters.location);
  }

  try {
    const queryString = params.toString();
    const path = queryString ? `/api/gifts/search?${queryString}` : '/api/gifts/search';
    const data = await fetchJson(path);
    return Array.isArray(data) ? data.map(normalizeGift) : [];
  } catch (_error) {
    return filterGifts(sampleGifts, filters).map(normalizeGift);
  }
}

export async function getGiftById(id) {
  try {
    const data = await fetchJson(`/api/gifts/${id}`);
    return normalizeGift(data);
  } catch (_error) {
    const gift = sampleGifts.find((item) => item.id === id);
    if (!gift) {
      throw new Error('Gift not found');
    }
    return normalizeGift(gift);
  }
}

export async function getSentiment(text) {
  try {
    const data = await fetchJson(`/sentiment?text=${encodeURIComponent(text || '')}`);
    return data.sentiment || 'neutral';
  } catch (_error) {
    const normalized = String(text || '').toLowerCase();
    if (normalized.includes('great') || normalized.includes('beautiful') || normalized.includes('love')) {
      return 'positive';
    }
    if (normalized.includes('broken') || normalized.includes('bad') || normalized.includes('sad')) {
      return 'negative';
    }
    return 'neutral';
  }
}

export async function registerUser(form) {
  try {
    return await fetchJson('/api/auths/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
  } catch (error) {
    if (!form.username || !form.email || !form.password) {
      throw new Error('username, email and password are required');
    }

    const users = readMockUsers();
    const normalizedEmail = form.email.toLowerCase();
    const exists = users.some((user) => user.email === normalizedEmail);
    if (exists) {
      throw new Error('Email already registered');
    }

    const newUser = {
      username: form.username,
      email: normalizedEmail,
      password: form.password
    };

    writeMockUsers([...users, newUser]);

    return {
      username: newUser.username,
      email: newUser.email,
      authtoken: 'mock-token',
      mode: 'mock'
    };
  }
}

export async function loginUser(form) {
  try {
    return await fetchJson('/api/auths/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer login-request'
      },
      body: JSON.stringify(form)
    });
  } catch (_error) {
    const users = readMockUsers();
    const normalizedEmail = String(form.email || '').toLowerCase();
    const user = users.find((entry) => entry.email === normalizedEmail);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== form.password) {
      throw new Error('Incorrect password');
    }

    return {
      username: user.username,
      email: user.email,
      authtoken: 'mock-token',
      mode: 'mock'
    };
  }
}