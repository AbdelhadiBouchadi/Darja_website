'use client';

import { UserCheck, UsersIcon, UserX } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/shared/Navbar';
import StatCard from '@/components/shared/StatsCard';
import UsersTable from '@/components/dashboard/posts/PostsTable';

const userStats = {
  totalUsers: 152845,
  adminUsers: 98520,
};

const UsersPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Navbar title="Gérer les utilisateurs" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Utilisateurs"
            icon={UsersIcon}
            value={userStats.totalUsers.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="Admin"
            icon={UserCheck}
            value={userStats.adminUsers.toLocaleString()}
            color="#6EE7B7"
          />
        </motion.div>

        <UsersTable />
      </main>
    </div>
  );
};
export default UsersPage;
