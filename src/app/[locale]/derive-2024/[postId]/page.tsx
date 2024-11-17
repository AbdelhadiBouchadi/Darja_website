import { Transition } from '@/components/shared/preloader';
import { getPostById } from '@/lib/actions/post.actions';
import { useLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';
import React from 'react';

type PostProps = {
  params: {
    postId: string;
  };
};

const page = async ({ params: { postId } }: PostProps) => {
  const post = await getPostById(postId);
  const locale = await getLocale();
  const isArabic = locale === 'ar';

  return (
    <Transition pageName={isArabic ? post.arabicTitle : post.frenchTitle}>
      <div>Post's Page</div>
    </Transition>
  );
};

export default page;
