import { Transition } from '@/components/shared/preloader';
import { getPostById, getRelatedPosts } from '@/lib/actions/post.actions';
import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Globe } from 'lucide-react';
import { format, isEqual } from 'date-fns';
import { fr, arMA } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import React from 'react';
import VideoThumbnail from '@/components/shared/VideoThumbnail';
import SafeHtml from '@/components/shared/SafeHtml';
import ImageSlider from '@/components/shared/PostSlider';
import ImageSliderModal from '@/components/shared/PostSlider';
import ImageGallery from '@/components/shared/PostGallery';
import Contact from '@/components/shared/contact';
import AboveContact from '@/components/shared/AboveContact';
import ClientWrapper from '@/components/shared/PostWrapper';

type PostProps = {
  params: {
    postId: string;
  };
};

const page = async ({ params: { postId } }: PostProps) => {
  const post = await getPostById(postId);
  const relatedPosts = await getRelatedPosts({
    postCategory: post.postCategory,
    postId,
  });
  const locale = await getLocale();
  const isArabic = locale === 'ar';

  const startDate = new Date(post.startDateTime);
  const endDate = new Date(post.endDateTime);
  const isSameDateTime = isEqual(startDate, endDate);

  const formatTime = (date: Date) => {
    return format(date, 'HH:mm', {
      locale: isArabic ? arMA : fr,
    });
  };

  return (
    <Transition pageName={isArabic ? post.arabicTitle : post.frenchTitle}>
      <div className=" mx-auto  py-8 pt-[20vh] pb-16">
        {/* Title */}
        <h1
          className={cn(
            'text-4xl md:text-5xl lg:text-6xl mb-8 text-[#ee7103] px-4',
            isArabic ? 'arabic-title-bold text-right' : 'latin-title-bold'
          )}
        >
          {isArabic ? post.arabicTitle : post.frenchTitle}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {/* Left Column - Image Gallery */}
          <ImageGallery
            images={post.images}
            alt={isArabic ? post.arabicTitle : post.frenchTitle}
          />

          {/* Right Column - Event Details */}
          <div className="space-y-6">
            {/* Date Collapsible */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 rounded-none bg-[#094142] hover:bg-[#00b0db] transition-all duration-700"
                >
                  <Calendar className="size-6 text-[#ee7103] font-bold" />
                  <p
                    className={cn(
                      'font-semibold text-[#ee7103]',
                      isArabic
                        ? 'arabic-subtitle-regular'
                        : 'latin-subtitle-regular'
                    )}
                  >
                    {isArabic ? 'التاريخ والوقت' : 'Date et heure'}
                  </p>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4">
                <div className={cn('space-y-2', isArabic && 'text-right')}>
                  {isSameDateTime ? (
                    <p
                      className={cn(
                        'font-semibold text-[#ee7103] flex gap-2',
                        isArabic
                          ? 'arabic-subtitle-regular'
                          : 'latin-subtitle-regular'
                      )}
                    >
                      <span>
                        {format(new Date(post.startDateTime), 'PPP', {
                          locale: isArabic ? arMA : fr,
                        })}
                      </span>
                      <span>{formatTime(startDate)}</span>
                    </p>
                  ) : (
                    <p
                      className={cn(
                        'font-semibold text-[#ee7103]',
                        isArabic
                          ? 'arabic-subtitle-regular'
                          : 'latin-subtitle-regular'
                      )}
                    >
                      {format(new Date(post.startDateTime), 'PPP', {
                        locale: isArabic ? arMA : fr,
                      })}
                      {' - '}
                      {format(new Date(post.endDateTime), 'PPP', {
                        locale: isArabic ? arMA : fr,
                      })}
                    </p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* URL Collapsible */}
            {post.url && (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    {isArabic ? 'روابط مفيدة ' : 'Liens Utils'}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4">
                  <Link
                    href={post.url}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {post.url}
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>

        {/* Video Section */}
        {post.videoSource && (
          <div className="my-8 px-4">
            <VideoThumbnail
              thumbnailSrc="/images/image-slider4.png"
              videoUrl={post.videoSource}
            />
          </div>
        )}

        {/* Content */}
        <SafeHtml
          html={isArabic ? post.arabicText : post.frenchText}
          className={cn(
            'max-w-none my-8 flex flex-col justify-center items-center gap-8 px-4',
            isArabic
              ? 'text-right arabic-subtitle-regular text-lg xl:text-2xl'
              : 'latin-subtitle-regular text-lg xl:text-2xl'
          )}
        />

        {/* Related Posts */}
        <ClientWrapper>
          {relatedPosts.length > 0 && (
            <div className="my-16 px-4">
              <h2
                className={cn(
                  'text-2xl md:text-3xl mb-6 text-[#ee7103]',
                  isArabic ? 'arabic-title-bold text-right' : 'latin-title-bold'
                )}
              >
                {isArabic ? 'منشورات ذات صلة' : 'Posts similaires'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    href={`/${locale}/derive-2024/${relatedPost._id}`}
                    className="block aspect-[16/9] md:aspect-[3/4] xl:aspect-[1/1] relative group overflow-hidden p-16 group"
                  >
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        backgroundImage:
                          'linear-gradient(135deg, #094142 0%, #00b0db 100%)',
                      }}
                    />
                    {relatedPost.images && (
                      <div className="absolute inset-6 flex justify-center items-center overflow-hidden">
                        <Image
                          src={relatedPost.images[0]}
                          alt={
                            isArabic
                              ? relatedPost.arabicTitle
                              : relatedPost.frenchTitle
                          }
                          layout="fill"
                          objectFit="cover"
                          className="transform transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent ">
                      <h3
                        className={cn(
                          'text-white text-lg mb-1 font-semibold ',
                          isArabic
                            ? 'arabic-subtitle-regular'
                            : 'latin-subtitle-regular'
                        )}
                      >
                        {isArabic
                          ? relatedPost.arabicTitle
                          : relatedPost.frenchTitle}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {format(
                          new Date(relatedPost.startDateTime),
                          'dd MMMM yyyy',
                          {
                            locale: isArabic ? arMA : fr,
                          }
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </ClientWrapper>
      </div>

      <Contact />
    </Transition>
  );
};

export default page;