import UsersPage from '@/components/dashboard/UsersPage';
import { getUserById, getUserStats } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
  try {
    // Get user statistics
    const userStats = await getUserStats();

    // Get current user from Clerk
    const activeUser = await currentUser();

    if (!activeUser) {
      // Redirect if no active user
      redirect('/sign-in');
      return null; // Ensure no component renders if redirecting
    }

    // Fetch additional user details from your database using Clerk's user ID
    const currentUserFromDb = await getUserById(activeUser.id);

    if (!currentUserFromDb) {
      // Redirect if user is not found in the database
      redirect('/sign-in');
      return null; // Ensure no component renders if redirecting
    }

    // Pass user stats and additional user data to your UsersPage component
    return (
      <UsersPage
        userStats={userStats}
        isAdmin={currentUserFromDb.isAdmin} // Use the isAdmin from your database
      />
    );
  } catch (error) {
    // Log the error for debugging
    console.error('Error loading page data:', error);

    // Handle error as needed (e.g., show an error page or redirect)
    // Redirect to an error page or a fallback page if necessary
    redirect('/error'); // Redirect to a custom error page
    return null; // Ensure no component renders if redirecting
  }
};

export default Page;
