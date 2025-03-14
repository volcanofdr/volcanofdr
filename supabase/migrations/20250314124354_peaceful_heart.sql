/*
  # Setup de tablas de autenticación y perfiles

  1. Nuevas Tablas
    - `profiles`
      - `id` (uuid, primary key, referencia a auth.users)
      - `username` (text, unique)
      - `subscription_type` (enum: free, vip, expert, extended)
      - `subscription_end` (timestamp)
      - `llamas_balance` (integer)
      - `staff_level` (integer, null por defecto)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS en todas las tablas
    - Políticas para lectura/escritura de perfiles
*/

-- Crear tipo enum para suscripciones
CREATE TYPE subscription_type AS ENUM ('free', 'vip', 'expert', 'extended');

-- Crear tabla de perfiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  subscription_type subscription_type NOT NULL DEFAULT 'free',
  subscription_end timestamptz,
  llamas_balance integer NOT NULL DEFAULT 5,
  staff_level integer CHECK (staff_level BETWEEN 1 AND 4),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();