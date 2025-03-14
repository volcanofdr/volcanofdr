import { User, UserRole, StaffLevel } from '../types';
import { ownerAccounts } from '../data/accounts';

const HOUR_IN_MS = 3600000;

export function isSubscriptionValid(user: User): boolean {
  if (user.role === 'owner') return true;
  if (!user.subscriptionEnd) return false;
  
  const now = new Date().getTime();
  const end = new Date(user.subscriptionEnd).getTime();
  return now < end;
}

export function canAccessFeature(user: User, requiredRole: UserRole): boolean {
  if (user.role === 'owner') return true;
  if (user.isBlocked) return false;
  if (!isSubscriptionValid(user)) return false;

  const roles: UserRole[] = ['free', 'vip', 'expert', 'extended', 'expert_extended'];
  const userRoleIndex = roles.indexOf(user.role);
  const requiredRoleIndex = roles.indexOf(requiredRole);

  return userRoleIndex >= requiredRoleIndex;
}

export function hasStaffPermission(user: User, requiredLevel: StaffLevel): boolean {
  if (user.role === 'owner') return true;
  if (!user.staffLevel) return false;
  return user.staffLevel >= requiredLevel;
}

export function initializeUser(username: string, email: string, password: string, ip: string): User {
  const isOwner = username in ownerAccounts && ownerAccounts[username] === password;
  
  return {
    username,
    email,
    password,
    role: isOwner ? 'owner' : 'free',
    isBlocked: false,
    lastIp: ip,
    llamasBalance: isOwner ? Infinity : 5,
    devices: [ip],
    staffLevel: isOwner ? 4 : undefined
  };
}

export function shouldBlockUser(user: User): boolean {
  if (user.role === 'free') {
    const now = new Date().getTime();
    const loginTime = new Date(user.lastIp).getTime();
    return (now - loginTime) > HOUR_IN_MS;
  }
  return false;
}

export function getVisibleAccounts(user: User) {
  if (user.role === 'owner') return 'all';
  if (!isSubscriptionValid(user)) return 'none';
  
  switch (user.role) {
    case 'vip': return 'free';
    case 'expert': return 'expert';
    case 'extended': return 'extended';
    case 'expert_extended': return 'all';
    default: return 'none';
  }
}