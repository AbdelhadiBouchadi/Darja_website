'use client';

import {
  BarChart2,
  BookUser,
  HandCoins,
  Headphones,
  NewspaperIcon,
  ShoppingBag,
  Users,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '@/components/shared/StatsCard';
import SalesOverviewChart from '@/components/dashboard/overview/SalesOverviewChart';
import CategoryDistributionChart from '@/components/dashboard/overview/CategoryDistributionChart';
import SalesChannelChart from '@/components/dashboard/overview/SalesChannelChart';
import Navbar from '@/components/shared/Navbar';
import UsersTable from '@/components/dashboard/posts/PostsTable';
import PostsTable from '@/components/dashboard/posts/PostsTable';
import ArtistsTable from '@/components/dashboard/artists/ArtistsTable';

export default function Home() {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Navbar title="Espace Darja Admin" />
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
          <PostsTable />
          <ArtistsTable />
        </motion.div>
      </main>
    </div>
  );
}
