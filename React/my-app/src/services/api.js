const BASE_URL = 'https://d2h6rsg43otiqk.cloudfront.net/prod';
const API_KEY = 'EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV';

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
    body: JSON.stringify(userData), 
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Registration failed');
  }

  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
    body: JSON.stringify(credentials), 
  });

  const text = await res.text();
  console.log('Raw login response:', res.status, text);

  let parsed;
  try {
    parsed = JSON.parse(text); 
    if (typeof parsed === 'string') {
      parsed = JSON.parse(parsed); 
    }
  } catch (err) {
    throw new Error(`Invalid JSON response: ${text}`);
  }

  if (!parsed.token) {
    throw new Error('Login failed: token not found');
  }

  return parsed; 
};