export type UserRole = 'free' | 'vip' | 'expert' | 'extended' | 'expert_extended' | 'owner' | 'staff';
export type StaffLevel = 1 | 2 | 3 | 4;
export type Visibility = 'free' | 'vip' | 'expert' | 'extended' | 'owner' | 'staff';

export interface MinecraftAccount {
  username: string;
  password: string | null;
  last_ip: string;
  isPremium?: boolean;
}

export interface AdminAction {
  type: 'warn' | 'ban' | 'unban' | 'delete' | 'subscription';
  targetUser: string;
  performedBy: string;
  timestamp: string;
  details: {
    duration?: string;
    reason?: string;
    newRole?: UserRole;
    warningText?: string;
  };
}

export interface User {
  username: string;
  visibility: Visibility;
  staffLevel?: StaffLevel;
  llamasBalance: number;
  warnings: number;
  isBanned: boolean;
  banExpiration: string | null;
  isPremium?: boolean;
}