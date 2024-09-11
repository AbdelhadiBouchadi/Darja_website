'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/shared/Navbar';
import StatCard from '@/components/shared/StatsCard';
import PostsTable from '@/components/dashboard/posts/PostsTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Headphones } from 'lucide-react';

const ArtistsPage = () => {
  const isAdmin = false;

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Navbar title="Gérer les artistes" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-1 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Nombre d'artistes"
            icon={Headphones}
            value="14"
            color="#6EE7B7"
          />
        </motion.div>

        <PostsTable currentUserIsAdmin={isAdmin} />

        <Button
          asChild
          className="w-full p-4 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl  border border-gray-700 my-4"
          variant="outline"
        >
          <Link href="/darja-admin/artists/create">
            Créer un nouvel artiste
          </Link>
        </Button>
      </main>
    </div>
  );
};

export default ArtistsPage;
