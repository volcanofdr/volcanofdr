import { User, Visibility } from '../types';

// Simulated user database
const users = [
  {
    username: "Riuchi",
    password: "pito",
    email: "riuchi@gmail.com",
    visibility: "owner" as Visibility,
    staffLevel: 4,
    llamasBalance: 999999
  },
  {
    username: "SaiayDev",
    password: "pito",
    email: "saiaydev@gmail.com",
    visibility: "owner" as Visibility,
    staffLevel: 4,
    llamasBalance: 999999
  }
];

export const login = (username: string, password: string): User | null => {
  const user = users.find(u => 
    u.username.toLowerCase() === username.toLowerCase() && 
    u.password === password
  );

  if (user) {
    const userData: User = {
      username: user.username,
      visibility: user.visibility,
      staffLevel: user.staffLevel,
      llamasBalance: user.llamasBalance,
      warnings: 0,
      isBanned: false,
      banExpiration: null,
      isPremium: user.visibility !== 'free'
    };

    // Store user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return userData;
  }

  return null;
};

export const register = (username: string, email: string, password: string): User | null => {
  // Check if username exists
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    return null;
  }

  const newUser: User = {
    username,
    visibility: 'free',
    llamasBalance: 0,
    warnings: 0,
    isBanned: false,
    banExpiration: null,
    isPremium: false
  };

  // Add to users array (in a real app, this would persist to a database)
  users.push({
    username,
    password,
    email,
    visibility: 'free',
    llamasBalance: 5
  });

  // Store user data in localStorage
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return newUser;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};