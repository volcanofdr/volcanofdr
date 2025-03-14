import React, { useState } from 'react';
import { Search, Users, ArrowLeft, Copy, Check, Shield, Crown, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface SearchResult {
  username?: string;
  name?: string;
  password: string | null;
  last_ip?: string;
  ip?: string;
  isPremium?: boolean;
  skinUrl?: string;
}

function NickFinderPage() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkPremiumStatus = async (username: string): Promise<boolean> => {
    try {
      const response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!username.trim()) {
      setError('Por favor ingresa un nombre de usuario');
      return;
    }

    setLoading(true);
    try {
      const databases = ['free', 'vip', 'extended'];
      let foundUser = null;

      for (const db of databases) {
        try {
          const response = await fetch(`/src/data/database_${db}.json`);
          const data = await response.json();
          const user = data.find((u: any) => {
            const nameMatch = 
              (u.username?.toLowerCase() === username.toLowerCase()) ||
              (u.name?.toLowerCase() === username.toLowerCase());
            return nameMatch;
          });
          
          if (user) {
            foundUser = {
              username: user.username || user.name,
              password: user.password,
              last_ip: user.last_ip || user.ip
            };
            break;
          }
        } catch (error) {
          console.error(`Error loading ${db} database:`, error);
        }
      }

      if (foundUser) {
        const isPremium = await checkPremiumStatus(foundUser.username);
        const skinUrl = isPremium 
          ? `https://crafatar.com/avatars/${foundUser.username}?size=100&overlay=true`
          : 'https://mc-heads.net/avatar/steve';

        setResult({
          ...foundUser,
          isPremium,
          skinUrl
        });
      } else {
        setError('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error during search:', error);
      setError('Error al buscar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/"
          className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Nick Finder</h2>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.3)] backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-red-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 pointer-events-none"></div>
        
        <form onSubmit={handleSearch} className="space-y-6 relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500/50 w-5 h-5 group-hover:text-red-500 transition-colors duration-300" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa el nombre del usuario..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-[rgba(0,0,0,0.4)] border border-white/10 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white placeholder-gray-400 transition-all duration-300 font-medium"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-red-500/20 relative group ${
              loading ? 'opacity-50 cursor-not-allowed' : 'transform hover:-translate-y-0.5'
            }`}
            disabled={loading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Search className="w-5 h-5" />
            <span className="tracking-wide">{loading ? 'Buscando...' : 'Buscar Usuario'}</span>
          </button>
        </form>

        {result && (
          <div className="mt-8 animate-slideUp">
            <div className="bg-gradient-to-b from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.2)] backdrop-blur-xl rounded-xl border border-white/10 p-6 shadow-xl relative overflow-hidden group hover:border-red-500/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 pointer-events-none"></div>
              
              <div className="flex items-start gap-6 relative z-10">
                <div className="relative">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-[rgba(0,0,0,0.4)] shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    {result.skinUrl && (
                      <img 
                        src={result.skinUrl}
                        alt={`${result.username}'s skin`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {result.isPremium && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-1.5 shadow-lg">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
                      {result.username}
                      {result.isPremium ? (
                        <span className="text-xs font-medium px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full shadow-md">
                          Premium
                        </span>
                      ) : (
                        <span className="text-xs font-medium px-2 py-1 bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 rounded-full shadow-md">
                          Cracked
                        </span>
                      )}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/20 backdrop-blur-lg rounded-lg p-4 border border-white/5 group/card hover:border-red-500/20 transition-all duration-300">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">Última IP</span>
                      </div>
                      <code className="font-mono text-white text-sm bg-black/20 px-3 py-1.5 rounded-lg block overflow-x-auto">{result.last_ip}</code>
                    </div>

                    <div className="bg-black/20 backdrop-blur-lg rounded-lg p-4 border border-white/5 group/card hover:border-red-500/20 transition-all duration-300">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm font-medium">Contraseña</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {result.password ? (
                          <>
                            <code className="font-mono text-white text-sm bg-black/20 px-3 py-1.5 rounded-lg block overflow-x-auto flex-1">
                              {result.password}
                            </code>
                            <button
                              onClick={() => copyToClipboard(result.password!)}
                              className="p-1.5 hover:bg-white/10 rounded-lg transition-all duration-300 transform hover:scale-105"
                              title="Copiar contraseña"
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                              )}
                            </button>
                          </>
                        ) : (
                          <span className="text-red-400">No disponible</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NickFinderPage;