import React from 'react';
import { Crown, Flame, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { User } from '../lib/auth';

interface HeaderProps {
  currentUser: User;
  onLogout: () => void;
  onOpenSettings: () => void;
  onClaimDaily: () => void;
}

function Header({ currentUser, onLogout, onOpenSettings, onClaimDaily }: HeaderProps) {
  const getRoleIcon = () => {
    switch (currentUser.subscription_type) {
      case 'owner':
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'staff':
        return <Crown className="w-5 h-5 text-blue-500" />;
      case 'extended':
        return <Crown className="w-5 h-5 text-red-500" />;
      case 'expert':
        return <Crown className="w-5 h-5 text-purple-500" />;
      case 'vip':
        return <Crown className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getRoleText = () => {
    if (currentUser.staff_level) {
      return `Staff Nivel ${currentUser.staff_level}`;
    }
    return currentUser.subscription_type.toUpperCase();
  };

  return (
    <header className="bg-[#1a0f0f] border-b border-red-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-14">
          {/* User Info */}
          <div className="flex items-center gap-2">
            {getRoleIcon()}
            <span className="text-white font-medium">{currentUser.username}</span>
            <span className="text-gray-400 text-sm">({getRoleText()})</span>
          </div>

          {/* Llamas Balance */}
          <div className="ml-6 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-white">{currentUser.llamas_balance} Llamas</span>
            <button
              onClick={onClaimDaily}
              className="ml-2 px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 rounded-md transition-colors text-white"
            >
              Reclamar
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="ml-auto flex items-center gap-3">
            <button 
              onClick={onOpenSettings}
              className="p-2 hover:bg-white/10 rounded-md transition-colors"
            >
              <SettingsIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;