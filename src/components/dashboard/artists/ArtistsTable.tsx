'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface Artist {
  id: number;
  name: string;
  category: string;
  createdAt: string;
}

const artistData: Artist[] = [
  {
    id: 1,
    name: 'Eric Clapton',
    category: 'blues',
    createdAt: '2024',
  },
  {
    id: 2,
    name: 'Eric Clapton',
    category: 'blues',
    createdAt: '2024',
  },
  {
    id: 3,
    name: 'Eric Clapton',
    category: 'blues',
    createdAt: '2024',
  },
  {
    id: 4,
    name: 'Eric Clapton',
    category: 'blues',
    createdAt: '2024',
  },
  {
    id: 5,
    name: 'Eric Clapton',
    category: 'blues',
    createdAt: '2024',
  },
];

const ArtistsTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(artistData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = artistData.filter(
      (post) =>
        post.name.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term)
    );
    setFilteredArtists(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Les Artistes</h2>
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                1 rejoint le :
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredArtists.map((artist) => (
              <motion.tr
                key={artist.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {artist.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">
                        {artist.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{artist.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {artist.createdAt}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                    Modifier
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    Supprimer
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ArtistsTable;
