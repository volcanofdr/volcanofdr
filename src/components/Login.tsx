import React, { useState } from 'react';
import { Lock, User, Mail } from 'lucide-react';
import { login, register } from '../lib/auth';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, email: string, password: string) => void;
}

function Login({ onLogin, onRegister }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = login(username, password);
      if (user) {
        onLogin(username, password);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } else {
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }

      const user = register(username, email, password);
      if (user) {
        onRegister(username, email, password);
      } else {
        setError('El usuario ya existe');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#1a0f0f]">
      <div className="relative bg-[rgba(0,0,0,0.4)] backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-red-500/30">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-lg shadow-red-500/20">
            <Lock className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-center mb-2 text-white bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          VolcanoFDR
        </h2>
        <p className="text-center text-gray-400 mb-8">
          {isLogin ? 'Accede a tu cuenta' : 'Crea tu cuenta'}
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500 focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                placeholder="Usuario"
                required
              />
            </div>
            {!isLogin && (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500 focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                  placeholder="Email"
                  required
                />
              </div>
            )}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500 focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                placeholder="Contraseña"
                required
              />
            </div>
            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500 focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                  placeholder="Confirmar Contraseña"
                  required
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-4 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;