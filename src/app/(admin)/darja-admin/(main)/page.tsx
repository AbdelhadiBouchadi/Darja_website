import Navbar from '@/components/shared/Navbar';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.actions';
import MainPage from '@/components/dashboard/MainPage';

export default async function Home() {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const user = await getUserById(userId);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Navbar title="Espace Darja Admin" />
      <MainPage />
    </div>
  );
}
