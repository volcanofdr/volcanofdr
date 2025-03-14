import React, { useState } from 'react';
import { Globe2, Search } from 'lucide-react';

function DomainLookup() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setResults([
      'IP: 192.168.1.1',
      'Estado: Activo',
      'Jugadores: 1000/2000'
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Globe2 className="w-6 h-6 text-red-500" />
        <h2 className="text-2xl font-bold text-white">Domain Lookup</h2>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Ingresa el dominio del servidor..."
          className="w-full px-4 py-3 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500 focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 rounded-lg transition-all duration-300 font-semibold"
        >
          <Search className="w-5 h-5" />
          Buscar Dominio
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-6 space-y-2">
          {results.map((result, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-[rgba(0,0,0,0.3)] border border-red-500/30"
            >
              <p className="text-white">{result}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DomainLookup;