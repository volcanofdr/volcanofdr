import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Pickaxe, LogOut, Settings as SettingsIcon, Flame, Crown, Shield } from 'lucide-react';
import Login from './components/Login';
import MainContent from './components/MainContent';
import Settings from './components/Settings';
import NickFinderPage from './pages/NickFinderPage';
import DomainLookupPage from './pages/DomainLookupPage';
import ServerFinderPage from './pages/ServerFinderPage';
import StoreFinderPage from './pages/StoreFinderPage';
import { getCurrentUser, login as authLogin, register as authRegister, logout as authLogout } from './lib/auth';
import { User } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [llamasBalance, setLlamasBalance] = useState(5);
  const [lastClaimDate, setLastClaimDate] = useState<string | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLlamasBalance(user.llamasBalance);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const user = authLogin(username, password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLlamasBalance(user.llamasBalance);
      return true;
    }
    return false;
  };

  const handleRegister = (username: string, email: string, password: string) => {
    const user = authRegister(username, email, password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLlamasBalance(user.llamasBalance);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    authLogout();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowSettings(false);
  };

  const claimDailyLlamas = () => {
    const today = new Date().toISOString().split('T')[0];
    if (lastClaimDate !== today) {
      setLlamasBalance(prev => prev + 5);
      setLastClaimDate(today);
      alert('¡Has reclamado tus 5 Llamas diarias!');
    } else {
      alert('Ya has reclamado tus Llamas hoy. Vuelve mañana!');
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  const getRoleIcon = () => {
    if (!currentUser) return null;
    switch (currentUser.visibility) {
      case 'owner':
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'staff':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'expert':
        return <Shield className="w-5 h-5 text-purple-500" />;
      case 'extended':
        return <Shield className="w-5 h-5 text-red-500" />;
      case 'vip':
        return <Crown className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getRoleText = () => {
    if (!currentUser) return '';
    switch (currentUser.visibility) {
      case 'owner':
        return 'Owner';
      case 'staff':
        return `Staff Nivel ${currentUser.staffLevel}`;
      case 'expert':
        return 'Expert';
      case 'extended':
        return 'Extended';
      case 'vip':
        return 'VIP';
      default:
        return 'Free User';
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#1a0f0f] bg-[url('https://i.imgur.com/RX1o7Nj.jpeg')] bg-cover bg-center bg-no-repeat">
        <div className="min-h-screen bg-black/50">
          {showSettings ? (
            <Settings 
              username={currentUser?.username || ''}
              currentUser={currentUser!}
              onClose={() => setShowSettings(false)}
            />
          ) : (
            <>
              <header className="bg-[#1a1a1a]/90 border-b border-red-500/20">
                <div className="container mx-auto px-4">
                  <div className="flex items-center h-14">
                    <div className="flex items-center gap-2">
                      {getRoleIcon()}
                      <span className="text-white font-medium">{currentUser?.username}</span>
                      <span className="text-gray-400 text-sm">({getRoleText()})</span>
                    </div>

                    <div className="ml-6 flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="text-white">{llamasBalance} Llamas</span>
                      <button
                        onClick={claimDailyLlamas}
                        className="ml-2 px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 rounded-md transition-colors text-white"
                      >
                        Reclamar
                      </button>
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                      <button 
                        onClick={() => setShowSettings(true)}
                        className="p-2 hover:bg-white/10 rounded-md transition-colors"
                      >
                        <SettingsIcon className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition-colors text-sm font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </header>

              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<MainContent isOwner={currentUser?.visibility === 'owner'} />} />
                  <Route path="/nick-finder" element={<NickFinderPage />} />
                  <Route path="/domain-lookup" element={<DomainLookupPage />} />
                  <Route path="/server-finder" element={<ServerFinderPage />} />
                  <Route path="/store-finder" element={
                    <StoreFinderPage 
                      llamasBalance={llamasBalance} 
                      setLlamasBalance={setLlamasBalance} 
                    />
                  } />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;