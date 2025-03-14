/*
  # Setup de tablas para el Finder

  1. Nuevas Tablas
    - `minecraft_accounts`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password` (text, nullable)
      - `last_ip` (text)
      - `is_premium` (boolean)
      - `account_type` (enum: free, vip, extended)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Políticas basadas en suscripción del usuario
*/

-- Crear tipo enum para tipos de cuenta
CREATE TYPE account_type AS ENUM ('free', 'vip', 'extended');

-- Crear tabla de cuentas de Minecraft
CREATE TABLE IF NOT EXISTS minecraft_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text,
  last_ip text NOT NULL,
  is_premium boolean NOT NULL DEFAULT false,
  account_type account_type NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE minecraft_accounts ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad basadas en suscripción
CREATE POLICY "VIP users can read VIP accounts"
  ON minecraft_accounts
  FOR SELECT
  TO authenticated
  USING (
    account_type = 'free' OR
    (account_type = 'vip' AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.subscription_type IN ('vip', 'expert', 'extended')
      AND profiles.subscription_end > now()
    )) OR
    (account_type = 'extended' AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.subscription_type = 'extended'
      AND profiles.subscription_end > now()
    ))
  );