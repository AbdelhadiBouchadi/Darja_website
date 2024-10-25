'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { getAllPosts } from '@/lib/actions/post.actions';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type Post = {
  _id: string;
  frenchTitle: string;
  arabicTitle: string;
  frenchText: string;
  arabicText: string;
  imageSource: string;
  videoSource: string;
  postCategory:
    | 'mercredi 04.12'
    | 'jeudi 05.12'
    | 'vendredi 06.12'
    | 'samedi 07.12'
    | 'dimanche 08.12';
  horaire: string;
  isInHomepage: boolean;
  url: string;
};

// Gradient backgrounds array
const gradients = [
  'linear-gradient(135deg, #00b0db 0%, #094142 100%)',
  'linear-gradient(90deg, #ee7103 0%, #00b0db 100%)',
  'linear-gradient(90deg, #00b0db 0%, #ee7103 100%)',
  'linear-gradient(135deg, #094142 0%, #00b0db 100%)',
];

const ProgramSection = () => {
  const [selectedDates, setSelectedDates] = useState<Set<Post['postCategory']>>(
    new Set()
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('Derive2024');

  const dates: Post['postCategory'][] = [
    'mercredi 04.12',
    'jeudi 05.12',
    'vendredi 06.12',
    'samedi 07.12',
    'dimanche 08.12',
  ];

  // Arabic translations for days
  const arabicDates: Record<Post['postCategory'], string> = {
    'mercredi 04.12': 'الأربعاء 04.12',
    'jeudi 05.12': 'الخميس 05.12',
    'vendredi 06.12': 'الجمعة 06.12',
    'samedi 07.12': 'السبت 07.12',
    'dimanche 08.12': 'الأحد 08.12',
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      if (allPosts) {
        if (selectedDates.size === 0) {
          setPosts(allPosts);
        } else {
          const filteredPosts = allPosts.filter((post: Post) =>
            selectedDates.has(post.postCategory)
          );
          setPosts(filteredPosts);
        }
      }
    };
    fetchPosts();
  }, [selectedDates]);

  const handleDateToggle = (date: Post['postCategory']) => {
    setSelectedDates((prevDates) => {
      const newDates = new Set(prevDates);
      if (newDates.has(date)) {
        newDates.delete(date);
      } else {
        newDates.add(date);
      }
      return newDates;
    });
  };

  return (
    <section
      id="program_section"
      className="min-h-screen py-16 px-4 md:px-8 lg:px-16"
    >
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Date Selection */}
          <div className="md:w-1/4 flex flex-col justify-center items-center md:items-start md:justify-start">
            <h2
              className={cn(
                'text-2xl xl:text-4xl text-[#FF5C00] mb-12 w-full xl:w-[50%] px-4 text-center md:text-start',
                isArabic ? 'arabic-title-bold' : 'latin-title-bold'
              )}
            >
              {t('heading')}
            </h2>

            <div className="w-full xl:w-[50%] h-[0.1rem] bg-[#094142] mb-4" />
            <div className="flex flex-col gap-4">
              {dates.map((date) => (
                <div key={date} className="flex items-center space-x-2">
                  <Checkbox
                    id={date}
                    checked={selectedDates.has(date)}
                    onCheckedChange={() => handleDateToggle(date)}
                    className="border-[#094142] border-2 data-[state=checked]:bg-[#00b0db] data-[state=checked]:text-[#094142] flex items-center justify-center "
                  />
                  <Label
                    htmlFor={date}
                    className={cn(
                      'text-lg md:text-xl',
                      selectedDates.has(date)
                        ? 'text-[#00b0db] font-bold'
                        : 'text-[#094142]',
                      isArabic
                        ? 'arabic-subtitle-regular text-right'
                        : 'latin-subtitle-regular capitalize'
                    )}
                  >
                    {isArabic ? arabicDates[date] : date}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <Link
                    href={`/${locale}/derive-2024/${post._id}`}
                    key={post._id}
                    className="block aspect-[16/9] md:aspect-[3/4] xl:aspect-[1/1] relative group overflow-hidden p-16"
                  >
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        backgroundImage: gradients[index % gradients.length],
                      }}
                    />
                    {post.imageSource && (
                      <div className="absolute inset-6 flex justify-center items-center">
                        <Image
                          src={post.imageSource}
                          alt={isArabic ? post.arabicTitle : post.frenchTitle}
                          layout="fill"
                          objectFit="cover"
                          className="transform transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <h3
                        className={cn(
                          'text-white text-lg mb-1',
                          isArabic
                            ? 'arabic-subtitle-regular'
                            : 'latin-subtitle-regular'
                        )}
                      >
                        {isArabic ? post.arabicTitle : post.frenchTitle}
                      </h3>
                      <p className="text-white/90 text-sm">{post.horaire}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] bg-[#E9EAEB] rounded-lg">
                  <Calendar className="w-16 h-16 text-[rgb(9,65,66)] mb-4" />
                  <p
                    className={cn(
                      'text-xl text-[#094142]',
                      isArabic
                        ? 'arabic-subtitle-regular'
                        : 'latin-subtitle-regular'
                    )}
                  >
                    {isArabic
                      ? 'لا يوجد محتوى متاح حاليًا'
                      : 'Aucun contenu disponible pour le moment'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;