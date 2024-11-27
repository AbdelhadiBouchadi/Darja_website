'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const Categories = {
  '2022': { fr: 'Édition 2022', ar: 'نسخة 2022' },
  '2024': { fr: 'Édition 2024', ar: 'نسخة 2024' },
} as const;

export type CategoryKey = keyof typeof Categories;

interface CategoryFilterProps {
  selectedCategories: Set<CategoryKey>;
  onCategoryChange: (category: CategoryKey) => void;
  isArabic: boolean;
  heading: string;
}

export const CategoryFilter = ({
  selectedCategories,
  onCategoryChange,
  isArabic,
  heading,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-col mb-8">
      <h3
        className={cn(
          'text-xl mb-4 text-[#094142]',
          isArabic ? 'arabic-subtitle-bold' : 'latin-subtitle-bold'
        )}
      >
        {isArabic ? 'النسخ' : 'Éditions'}
      </h3>
      <div className="flex flex-col gap-4">
        {(Object.keys(Categories) as CategoryKey[]).map((category) => (
          <div key={category} className="flex items-center space-x-2 gap-2">
            <Checkbox
              id={`category-${category}`}
              checked={selectedCategories.has(category)}
              onCheckedChange={() => onCategoryChange(category)}
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
              {isArabic ? Categories[category].ar : Categories[category].fr}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
