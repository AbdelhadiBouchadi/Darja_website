'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IPostCategory } from '@/lib/database/models/postCategory.model';
import { startTransition, useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

type DropdownProps = {
  value?: string;
  onChangeHandler: (value: string) => void;
};

const categories = [
  { id: 'mercredi 04.12', name: 'Mercredi 04.12' },
  { id: 'jeudi 05.12', name: 'Jeudi 05.12' },
  { id: 'vendredi 06.12', name: 'Vendredi 06.12' },
  { id: 'samedi 07.12', name: 'Samedi 07.12' },
  { id: 'dimanche 08.12', name: 'Dimanche 08.12' },
];

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(value?.toString() || '');

  useEffect(() => {
    setSelectedValue(value?.toString() || '');
  }, [value]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChangeHandler(value);
  };

  return (
    <Select defaultValue={value} onValueChange={onChangeHandler}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Date de l'événement" />
      </SelectTrigger>
      <SelectContent className=" bg-gray-800 bg-opacity-50 backdrop-blur-md  shadow-lg border ">
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
              className="select-item text-gray-100  focus:text-gray-900"
            >
              {category.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
