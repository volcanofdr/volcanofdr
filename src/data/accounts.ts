import { MinecraftAccount } from '../types';

export const accounts: MinecraftAccount[] = [
  // Owner accounts
  {
    username: "Riuchi",
    password: "pito",
    last_ip: "192.168.1.1",
    premium: true,
    visibility: "owner",
    staffLevel: 4,
    llamasBalance: 999999,
    lastLogin: "2024-01-04 03:20:28",
    warnings: 0,
    isBanned: false,
    banExpiration: null
  },
  {
    username: "SaiayDev",
    password: "pito",
    last_ip: "192.168.1.2",
    premium: true,
    visibility: "owner",
    staffLevel: 4,
    llamasBalance: 999999,
    lastLogin: "2024-01-04 03:20:28",
    warnings: 0,
    isBanned: false,
    banExpiration: null
  },
  // Example accounts with the format you provided
  {
    username: "BP_KennisBa12",
    password: "200.119.178.55",
    last_ip: "200.119.178.55",
    premium: true,
    visibility: "vip",
    llamasBalance: 100,
    lastLogin: "2024-01-04 03:20:28",
    warnings: 0,
    isBanned: false,
    banExpiration: null
  },
  {
    username: "Voce_Zzzz",
    password: null,
    last_ip: "190.237.33.33",
    premium: false,
    visibility: "free",
    llamasBalance: 5,
    lastLogin: "2024-01-04 03:20:28",
    warnings: 0,
    isBanned: false,
    banExpiration: null
  }
];

export const ownerAccounts: { [key: string]: string } = {
  "Riuchi": "pito",
  "SaiayDev": "pito"
};