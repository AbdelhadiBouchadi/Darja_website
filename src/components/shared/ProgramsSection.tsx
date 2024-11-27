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
import { IPost } from '@/lib/database/models/post.model';
import {
  endOfDay,
  format,
  isWithinInterval,
  parseISO,
  startOfDay,
} from 'date-fns';
import { fr, arMA } from 'date-fns/locale';
import { useSearchParams, useRouter } from 'next/navigation';

const Categories = {
  danse: { fr: 'Danse', ar: 'رقص' },
  concert: { fr: 'Concert', ar: 'حفلة موسيقية' },
  theatre: { fr: 'Théâtre', ar: 'مسرح' },
  lectures: { fr: 'Lectures', ar: 'قراءات' },
  cinema: { fr: 'Cinéma', ar: 'سينما' },
  ateliers: { fr: 'Ateliers', ar: 'ورش عمل' },
} as const;

type CategoryKey = keyof typeof Categories;

const ProgramSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [posts, setPosts] = useState<IPost[]>([]);
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('Derive2024');
  const [selectedCategories, setSelectedCategories] = useState<
    Set<CategoryKey>
  >(new Set());
  const searchParams = useSearchParams();
  const router = useRouter();

  // Define the festival dates
  const festivalDates = [
    '2024-12-04', // Wednesday
    '2024-12-05', // Thursday
    '2024-12-06', // Friday
    '2024-12-07', // Saturday
    '2024-12-08', // Sunday
  ];

  useEffect(() => {
    // Get category from URL parameters
    const categoryParam = searchParams.get('category') as CategoryKey | null;
    if (categoryParam && Object.keys(Categories).includes(categoryParam)) {
      setSelectedCategories(new Set([categoryParam]));
    }
  }, [searchParams]);

  const formatDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isArabic) {
      return format(date, 'EEEE dd.MM', { locale: arMA });
    }
    return format(date, 'EEEE dd.MM', { locale: fr });
  };

  const isEventVisible = (post: IPost, selectedDate: string) => {
    const selectedDateTime = parseISO(selectedDate);
    const dayStart = startOfDay(selectedDateTime);
    const dayEnd = endOfDay(selectedDateTime);
    const eventStart = new Date(post.startDateTime);
    const eventEnd = new Date(post.endDateTime);

    // Check if the selected date falls within the event's duration
    return (
      // Case 1: Selected date is between start and end dates
      (eventStart <= dayEnd && eventEnd >= dayStart) ||
      // Case 2: Event starts on selected date
      isWithinInterval(eventStart, { start: dayStart, end: dayEnd }) ||
      // Case 3: Event ends on selected date
      isWithinInterval(eventEnd, { start: dayStart, end: dayEnd }) ||
      // Case 4: Event spans over selected date
      (eventStart <= dayStart && eventEnd >= dayEnd)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      if (allPosts) {
        let filteredPosts = allPosts;

        // Filter by categories if selected
        if (selectedCategories.size > 0) {
          filteredPosts = filteredPosts.filter((post: IPost) =>
            selectedCategories.has(post.postCategory as CategoryKey)
          );
        }

        // Filter by dates if selected
        if (selectedDates.size > 0) {
          filteredPosts = filteredPosts.filter((post: IPost) =>
            Array.from(selectedDates).some((selectedDate) =>
              isEventVisible(post, selectedDate)
            )
          );
        }

        setPosts(filteredPosts);
      }
    };
    fetchPosts();
  }, [selectedDates, selectedCategories]);

  const handleCategoryToggle = (category: CategoryKey) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = new Set(prevCategories);
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }

      // Update URL with categories parameter
      const params = new URLSearchParams(searchParams);
      if (newCategories.size > 0) {
        params.set('category', Array.from(newCategories).join(','));
      } else {
        params.delete('category');
      }
      router.push(`?${params.toString()}`);

      return newCategories;
    });
  };

  const handleDateToggle = (date: string) => {
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

  const formatEventTime = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // If the event spans multiple days, show the full date range
    if (format(start, 'yyyy-MM-dd') !== format(end, 'yyyy-MM-dd')) {
      return `${format(start, 'dd/MM')} - ${format(end, 'dd/MM')}`;
    }

    // For same-day events, show only the time range
    return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
  };

  return (
    <section ref={sectionRef} id="program_section" className="">
      <motion.div
        variants={landingSlideUp}
        initial="initial"
        animate="enter"
        className="mx-auto py-8 xl:py-20 px-4 md:px-8 lg:px-16 "
      >
        <div className="flex flex-col md:flex-row gap-8 mt-16 sm:mt-0">
          {/* Date Selection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/4 flex flex-col justify-center items-start md:justify-start"
          >
            <h2
              className={cn(
                'text-2xl xl:text-4xl text-[#FF5C00] mb-12 w-full xl:w-[50%] text-start',
                isArabic ? 'arabic-title-bold' : 'latin-title-bold'
              )}
            >
              {t('heading')}
            </h2>

            {/* Categories Filter */}
            <div className="flex flex-col mb-8">
              <h3
                className={cn(
                  'text-xl mb-4 text-[#094142]',
                  isArabic ? 'arabic-subtitle-bold' : 'latin-subtitle-bold'
                )}
              >
                {isArabic ? 'الفئات' : 'Catégories'}
              </h3>
              <div className="flex flex-col  gap-4">
                {(Object.keys(Categories) as CategoryKey[]).map((category) => (
                  <div
                    key={category}
                    className="flex items-center space-x-2 gap-2"
                  >
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.has(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                      className="border-[#094142] border-2 data-[state=checked]:bg-[#00b0db] data-[state=checked]:text-[#094142] flex items-center justify-center rounded-none"
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className={cn(
                        'text-lg md:text-xl cursor-pointer',
                        selectedCategories.has(category)
                          ? 'text-[#00b0db] font-bold'
                          : 'text-[#094142]',
                        isArabic
                          ? 'arabic-subtitle-regular text-right space-x-2'
                          : 'latin-subtitle-regular'
                      )}
                    >
                      {isArabic
                        ? Categories[category].ar
                        : Categories[category].fr}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full xl:w-[50%] h-[0.1rem] bg-[#094142] mb-4" />
            <div className="flex flex-col gap-4">
              {festivalDates.map((date) => (
                <div key={date} className="flex items-center space-x-2 gap-2">
                  <Checkbox
                    id={date}
                    checked={selectedDates.has(date)}
                    onCheckedChange={() => handleDateToggle(date)}
                    className="border-[#094142] border-2 data-[state=checked]:bg-[#00b0db] data-[state=checked]:text-[#094142] flex items-center justify-center rounded-none"
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
                    {formatDateLabel(date)}
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
                      className="block aspect-[16/9] md:aspect-[3/4] lg:aspect-[1/1] relative group overflow-hidden p-16 group"
                    >
                      <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                          backgroundImage:
                            'linear-gradient(135deg, #094142 0%, #00b0db 100%)',
                        }}
                      />
                      {post.images && (
                        <div className="absolute inset-6 flex justify-center items-center overflow-hidden">
                          <Image
                            src={post.images[0]}
                            alt={isArabic ? post.arabicTitle : post.frenchTitle}
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
                          {isArabic ? post.arabicTitle : post.frenchTitle}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {format(
                            new Date(post.startDateTime),
                            'dd MMMM yyyy',
                            {
                              locale: isArabic ? arMA : fr,
                            }
                          )}
                        </p>
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
