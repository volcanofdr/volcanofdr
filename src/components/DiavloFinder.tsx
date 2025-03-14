import React, { useState } from 'react';
import { Search, Users, Globe2, Store, Database, Server, Map, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type SearchType = 'nick' | 'domain' | 'server' | 'store' | 'global' | 'coordinates';

function DiavloFinder() {
  const [searchType, setSearchType] = useState<SearchType>('coordinates');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert('Por favor ingresa un término de búsqueda');
      return;
    }
    setSearchResult(`Búsqueda realizada: ${searchQuery} (Tipo: ${searchType})`);
  };

  const searchCards = [
    {
      type: 'nick' as SearchType,
      icon: Users,
      title: 'NICK FINDER',
      description: 'Encuentra usuarios VIP o STAFF en servidores de Minecraft',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      type: 'domain' as SearchType,
      icon: Globe2,
      title: 'DOMAIN LOOKUP',
      description: 'Encuentra información relacionada a un dominio',
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'server' as SearchType,
      icon: Server,
      title: 'SERVER FINDER',
      description: 'Encuentra servidores de Minecraft a partir de filtros',
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'store' as SearchType,
      icon: Store,
      title: 'TIENDAS',
      description: 'Explora las tiendas de los servidores más populares',
      color: 'from-purple-500 to-purple-600'
    },
    {
      type: 'global' as SearchType,
      icon: Search,
      title: 'BÚSQUEDA GLOBAL',
      description: 'Busca en toda nuestra base de datos',
      color: 'from-red-500 to-red-600'
    },
    {
      type: 'coordinates' as SearchType,
      icon: Map,
      title: 'DIAVLO FINDER',
      description: 'Encuentra las coordenadas exactas de Diavlo',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/"
          className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <div className="flex items-center gap-3">
          <Map className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold text-white">Diavlo Finder</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchCards.map((card) => (
          <button
            key={card.type}
            onClick={() => setSearchType(card.type)}
            className={`group relative overflow-hidden p-6 rounded-xl transition-all duration-300 ${
              searchType === card.type
                ? 'bg-[rgba(0,0,0,0.6)] scale-105 border-red-500/40'
                : 'bg-[rgba(0,0,0,0.4)] hover:bg-[rgba(0,0,0,0.5)] border-red-500/20'
            } text-white border hover:border-red-500/40`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            <div className="relative flex flex-col items-center text-center space-y-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} p-4 shadow-lg`}>
                <card.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="text-sm text-gray-300">
                {card.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-[rgba(0,0,0,0.4)] backdrop-blur-sm rounded-xl shadow-xl p-8 border border-red-500/30">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="relative">
            <Database className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-white placeholder-gray-400"
              placeholder={`Buscar ${searchType === 'coordinates' ? 'coordenadas' : 'término'}...`}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-4 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Search className="w-6 h-6" />
            Buscar
          </button>
        </form>

        {searchResult && (
          <div className="mt-6 p-6 bg-[rgba(0,255,0,0.1)] text-green-400 rounded-lg border border-green-500">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-green-500" />
              <p className="font-medium">{searchResult}</p>
            </div>
          </div>
        )}

        <div className="mt-6 bg-[rgba(0,0,0,0.3)] p-6 rounded-lg border border-red-500/30">
          <h3 className="font-bold text-white mb-3">Instrucciones de búsqueda:</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Para coordenadas: Usa formato X, Z (ej: 100, -200)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Para nombres: Ingresa el nombre exacto del jugador
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Para dominios: Ingresa la dirección del servidor
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DiavloFinder;