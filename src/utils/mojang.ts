const premiumCache = new Map<string, boolean>();
let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 100; // Minimum time between requests in milliseconds

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export interface PremiumCheckResult {
  isPremium: boolean;
  error?: string;
}

export async function checkPremiumStatus(username: string): Promise<PremiumCheckResult> {
  // Check cache first
  if (premiumCache.has(username)) {
    return { isPremium: premiumCache.get(username)! };
  }

  // Rate limiting
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await delay(RATE_LIMIT_DELAY - timeSinceLastRequest);
  }
  lastRequestTime = Date.now();

  try {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    
    if (response.status === 429) {
      return { 
        isPremium: false, 
        error: 'Demasiadas peticiones a Mojang API. Por favor, espera un momento.' 
      };
    }
    
    const isPremium = response.status === 200;
    premiumCache.set(username, isPremium);
    
    return { isPremium };
  } catch (error) {
    console.error('Error checking premium status:', error);
    return { 
      isPremium: false, 
      error: 'Error al verificar estado premium. Reintenta más tarde.' 
    };
  }
}
