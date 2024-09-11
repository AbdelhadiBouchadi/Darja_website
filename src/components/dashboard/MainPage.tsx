'use client';

import React from 'react';
import PostsTable from './posts/PostsTable';
import ArtistsTable from './artists/ArtistsTable';
import { BookUser, HandCoins, Headphones, NewspaperIcon } from 'lucide-react';
import StatCard from '../shared/StatsCard';
import { motion } from 'framer-motion';

const MainPage = () => {
  return (
    <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
      {/* STATS */}
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard
          name="Nombre de postes"
          icon={NewspaperIcon}
          value="14"
          color="#8B5CF6"
        />
        <StatCard
          name="Artistes"
          icon={Headphones}
          value="31"
          color="#6EE7B7"
        />
        <StatCard
          name="Partenaires Financiers"
          icon={HandCoins}
          value="12"
          color="#EC4899"
        />
        <StatCard
          name="Partenaires culturels"
          icon={BookUser}
          value="17"
          color="#EC4899"
        />
      </motion.div>

      {/* CHARTS */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col gap-8"
      >
        <PostsTable currentUserIsAdmin={false} />
        <ArtistsTable />
      </motion.div>
    </main>
  );
};

export default MainPage;
