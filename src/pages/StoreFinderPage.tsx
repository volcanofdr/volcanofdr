import React, { useState } from 'react';
import { Store, Search, ArrowLeft, Star, Flame, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StoreFinderPageProps {
  llamasBalance: number;
  setLlamasBalance: (balance: number) => void;
}

interface Subscription {
  name: string;
  duration: string;
  price: number;
  features: string[];
  type: 'vip' | 'expert' | 'extended';
}

function StoreFinderPage({ llamasBalance, setLlamasBalance }: StoreFinderPageProps) {
  const [activeTab, setActiveTab] = useState<'store' | 'subscriptions'>('subscriptions');

  const subscriptions: Subscription[] = [
    {
      name: 'VIP',
      duration: '1 día',
      price: 145,
      features: ['Acceso a búsqueda básica', 'Soporte prioritario'],
      type: 'vip'
    },
    {
      name: 'VIP',
      duration: '1 semana',
      price: 500,
      features: ['Acceso a búsqueda básica', 'Soporte prioritario'],
      type: 'vip'
    },
    {
      name: 'Expert',
      duration: '1 día',
      price: 735,
      features: ['Todo lo de VIP', 'Búsqueda avanzada', 'Scraper de servidores'],
      type: 'expert'
    },
    {
      name: 'Expert',
      duration: '1 semana',
      price: 1355,
      features: ['Todo lo de VIP', 'Búsqueda avanzada', 'Scraper de servidores'],
      type: 'expert'
    },
    {
      name: 'Extended+',
      duration: '1 semana',
      price: 500,
      features: ['Mejora tu suscripción actual', 'Herramientas Extended', 'Archivos premium'],
      type: 'extended'
    }
  ];

  const handlePurchase = (subscription: Subscription) => {
    if (llamasBalance >= subscription.price) {
      setLlamasBalance(llamasBalance - subscription.price);
      alert(`¡Has adquirido ${subscription.name} por ${subscription.duration}!`);
    } else {
      alert('No tienes suficientes Llamas para esta compra');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/"
          className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <div className="flex items-center gap-3">
          <Store className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold text-white">Tienda</h2>
        </div>
        <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.4)]">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-white">{llamasBalance} Llamas</span>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            activeTab === 'subscriptions'
              ? 'bg-red-600 text-white'
              : 'bg-[rgba(0,0,0,0.4)] text-gray-300 hover:bg-[rgba(0,0,0,0.6)]'
          }`}
        >
          Suscripciones
        </button>
        <button
          onClick={() => setActiveTab('store')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            activeTab === 'store'
              ? 'bg-red-600 text-white'
              : 'bg-[rgba(0,0,0,0.4)] text-gray-300 hover:bg-[rgba(0,0,0,0.6)]'
          }`}
        >
          Tienda
        </button>
      </div>

      {activeTab === 'subscriptions' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((sub, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 hover:border-red-500/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <Crown className={`w-6 h-6 ${
                  sub.type === 'vip' ? 'text-yellow-500' :
                  sub.type === 'expert' ? 'text-purple-500' :
                  'text-red-500'
                }`} />
                <h3 className="text-xl font-bold text-white">{sub.name}</h3>
              </div>
              <p className="text-gray-300 mb-4">{sub.duration}</p>
              <ul className="space-y-2 mb-6">
                {sub.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-white font-bold">{sub.price}</span>
                </div>
                <button
                  onClick={() => handlePurchase(sub)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-lg transition-colors"
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl text-white mb-4">Próximamente</h3>
          <p className="text-gray-400">La tienda de items estará disponible pronto</p>
        </div>
      )}
    </div>
  );
}

export default StoreFinderPage;