import { RelatedArtists } from '@/components/shared/artists/RelatedArtists';
import Contact from '@/components/shared/contact';
import ImageGallery from '@/components/shared/PostGallery';
import ClientWrapper from '@/components/shared/PostWrapper';
import VideoThumbnail from '@/components/shared/VideoThumbnail';
import {
  getArtistById,
  getRelatedArtists,
} from '@/lib/actions/artists.actions';
import { cn } from '@/lib/utils';
import { getLocale } from 'next-intl/server';
import React from 'react';

type ArtistProps = {
  params: {
    artistId: string;
  };
};

const page = async ({ params: { artistId } }: ArtistProps) => {
  const artist = await getArtistById(artistId);
  const locale = await getLocale();
  const isArabic = locale === 'ar';

  // Fetch related artists from the same category
  const relatedArtists = await getRelatedArtists({
    artistCategory: artist.artistCategory,
    artistId: artist._id,
  });

  return (
    <div className="overflow-hidden">
      <div className=" mx-auto  py-8 pt-[20vh] pb-16">
        {/* Title */}
        <h1
          className={cn(
            'text-4xl md:text-5xl lg:text-6xl mb-8 text-[#ee7103] px-4',
            isArabic ? 'arabic-title-bold text-right' : 'latin-title-bold'
          )}
        >
          {isArabic ? artist.arabicName : artist.frenchName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {/* Left Column - Image Gallery */}
          <ImageGallery
            images={artist.images}
            alt={isArabic ? artist.arabicName : artist.frenchName}
          />

          {/* Right Column - Video Iframe */}
          {artist.videoSource && (
            <div className="my-8 px-4 w-full flex justify-center md:justify-end items-center">
              <VideoThumbnail
                thumbnailSrc={artist.images[0]}
                videoUrl={artist.videoSource}
              />
            </div>
          )}
        </div>

        <p
          className={cn(
            'max-w-none my-8 flex flex-col justify-center items-center gap-8 px-4',
            isArabic
              ? 'text-right arabic-subtitle-regular text-lg xl:text-2xl'
              : 'latin-subtitle-regular text-lg xl:text-2xl'
          )}
        >
          {isArabic ? artist.arabicText : artist.frenchText}
        </p>

        <ClientWrapper>
          {/* Related Artists Section */}
          {relatedArtists && relatedArtists.length > 0 && (
            <RelatedArtists
              artists={relatedArtists}
              isArabic={isArabic}
              locale={locale}
            />
          )}
        </ClientWrapper>
      </div>
      <Contact />
    </div>
  );
};

export default page;
