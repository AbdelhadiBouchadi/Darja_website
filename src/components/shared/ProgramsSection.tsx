'use client';

import { useEffect, useRef, useState } from 'react';
import { cn, landingSlideUp } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { getAllPosts } from '@/lib/actions/post.actions';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { motion, useInView } from 'framer-motion';
import SubHeader from './SubHeader';

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
  'linear-gradient(135deg, #094142 0%, #00b0db 100%)',
  'linear-gradient(90deg, #ee7103 0%, #00b0db 100%)',
  'linear-gradient(135deg, #00b0db 0%, #094142 100%)',
];

const ProgramSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
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
    <section ref={sectionRef} id="program_section" className="min-h-screen ">
      <motion.main
        variants={landingSlideUp}
        initial="initial"
        animate="enter"
        className="relative flex h-full w-full mb-8 lg:mb-16 2xl:mb-64"
      >
        <SubHeader />
      </motion.main>
      <motion.div
        variants={landingSlideUp}
        initial="initial"
        animate="enter"
        className="mx-auto mt-8 md:mt-64 xl:mt-80 py-16 px-4 md:px-8 lg:px-16 "
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Date Selection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/4 flex flex-col justify-center items-center md:items-start md:justify-start"
          >
            <h2
              className={cn(
                'text-2xl xl:text-4xl text-[#FF5C00] mb-12 w-full xl:w-[50%] text-center md:text-start',
                isArabic ? 'arabic-title-bold' : 'latin-title-bold'
              )}
            >
              {t('heading')}
            </h2>

            <div className="w-full xl:w-[50%] h-[0.1rem] bg-[#094142] mb-4" />
            <div className="flex flex-col gap-4">
              {dates.map((date) => (
                <div key={date} className="flex items-center space-x-2 gap-2">
                  <Checkbox
                    id={date}
                    checked={selectedDates.has(date)}
                    onCheckedChange={() => handleDateToggle(date)}
                    className="border-[#094142] border-2 data-[state=checked]:bg-[#00b0db] data-[state=checked]:text-[#094142] flex items-center justify-center rounded-none "
                  />
                  <Label
                    htmlFor={date}
                    className={cn(
                      'text-lg md:text-xl cursor-pointer',
                      selectedDates.has(date)
                        ? 'text-[#00b0db] font-bold'
                        : 'text-[#094142]',
                      isArabic
                        ? 'arabic-subtitle-regular text-right space-x-2'
                        : 'latin-subtitle-regular capitalize'
                    )}
                  >
                    {isArabic ? arabicDates[date] : date}
                  </Label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Posts Grid */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2, // Adjust delay for staggered effect
                    }}
                    className="shadow-lg"
                  >
                    <Link
                      href={`/${locale}/derive-2024/${post._id}`}
                      className="block aspect-[16/9] md:aspect-[3/4] xl:aspect-[1/1] relative group overflow-hidden p-16 group"
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
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent ">
                        <h3
                          className={cn(
                            'text-white text-lg mb-1 font-semibold ',
                            isArabic
                              ? 'arabic-subtitle-regular'
                              : 'latin-subtitle-regular'
                          )}
                        >
                          {isArabic ? post.arabicTitle : post.frenchTitle}
                        </h3>
                        <p className="text-white/60 text-sm">{post.horaire}</p>
                      </div>
                    </Link>
                  </motion.div>
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
      </motion.div>
    </section>
  );
};

export default ProgramSection;
