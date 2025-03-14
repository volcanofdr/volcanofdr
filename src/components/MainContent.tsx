import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Globe2, Store, Server } from 'lucide-react';

interface MainContentProps {
  isOwner: boolean;
}

function MainContent({ isOwner }: MainContentProps) {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'nick',
      icon: Users,
      title: 'NICK FINDER',
      description: 'Encuentra usuarios VIP o STAFF en servidores de Minecraft',
      path: '/nick-finder',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'domain',
      icon: Globe2,
      title: 'DOMAIN LOOKUP',
      description: 'Encuentra información relacionada a un dominio',
      path: '/domain-lookup',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'server',
      icon: Server,
      title: 'SERVER FINDER',
      description: 'Encuentra servidores de Minecraft a partir de filtros',
      path: '/server-finder',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'store',
      icon: Store,
      title: 'TIENDAS',
      description: 'Explora las tiendas de los servidores más populares',
      path: '/store-finder',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'global',
      icon: Search,
      title: 'BÚSQUEDA GLOBAL',
      description: 'Busca en toda nuestra base de datos',
      path: '/global-search',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="p-6 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm rounded-2xl border border-red-500/30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => navigate(section.path)}
            className="group relative overflow-hidden p-6 rounded-xl transition-all duration-300 bg-[rgba(0,0,0,0.4)] hover:bg-[rgba(0,0,0,0.6)] text-white hover:scale-105 border border-red-500/20 hover:border-red-500/40"
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{
              backgroundImage: `linear-gradient(to right, ${section.color})`
            }}></div>
            <div className="relative flex flex-col items-center text-center space-y-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.color} p-4 shadow-lg`}>
                <section.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-bold">{section.title}</h3>
              <p className="text-sm text-gray-300">
                {section.description}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                backgroundImage: `linear-gradient(to right, ${section.color})`
              }}></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MainContent;