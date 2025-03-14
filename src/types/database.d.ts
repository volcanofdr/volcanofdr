export interface MinecraftAccount {
  username: string;
  password: string | null;
  last_ip: string;
}

export interface MinecraftAccountMixed {
  username: string;
  password: string | null;
  last_ip: string | null;
}

export type MinecraftDatabase = (MinecraftAccount | MinecraftAccountMixed)[];

declare module '*.json' {
  const value: MinecraftDatabase;
  export default value;
}
