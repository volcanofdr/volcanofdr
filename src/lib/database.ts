import { MinecraftAccount, User } from '../types';

export const searchAccounts = async (query: string, user: User): Promise<MinecraftAccount[]> => {
  const results: MinecraftAccount[] = [];
  const databases = ['free', 'vip', 'extended'];
  
  // Determine which databases the user can access based on visibility
  let accessibleDbs = ['free'];
  
  if (user.visibility === 'owner' || user.visibility === 'staff') {
    accessibleDbs = databases;
  } else if (user.visibility === 'vip' || user.visibility === 'expert') {
    accessibleDbs = ['free', 'vip'];
  } else if (user.visibility === 'extended') {
    accessibleDbs = databases;
  }

  for (const db of accessibleDbs) {
    try {
      const data = await import(`../data/database_${db}.json`);
      const accounts = data.default || [];

      const matches = accounts
        .filter((acc: any) => {
          const username = acc.username || acc.name;
          return username.toLowerCase().includes(query.toLowerCase());
        })
        .map((acc: any) => ({
          username: acc.username || acc.name,
          password: acc.password,
          last_ip: acc.last_ip || acc.ip,
          isPremium: false // Will be updated below
        }));

      // Check premium status for each account
      for (const match of matches) {
        match.isPremium = await checkPremiumStatus(match.username);
      }

      results.push(...matches);
    } catch (error) {
      console.error(`Error searching ${db} database:`, error);
    }
  }

  return results;
};

const checkPremiumStatus = async (username: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};