'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import {
  createArtistCategory,
  getAllArtistCategories,
} from '@/lib/actions/artistCategory.actions';
import { IArtistCategory } from '@/lib/database/models/artistCategory.model';

type DropdownProps = {
  value?: string;
  onChangeHandler?: (value: string) => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<IArtistCategory[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return; // Avoid adding empty categories

    createArtistCategory({
      artistCategoryName: newCategory.trim(),
    }).then((category) => {
      setCategories((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllArtistCategories();

      categoryList && setCategories(categoryList as IArtistCategory[]);
    };

    getCategories();
  }, []);

  return (
    <Select defaultValue={value} onValueChange={onChangeHandler}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Catégorie" />
      </SelectTrigger>
      <SelectContent className=" bg-gray-800 bg-opacity-50 backdrop-blur-md  shadow-lg border ">
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item text-gray-100  focus:text-gray-900"
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="flex w-full rounded-sm py-3 pl-8 bg-gray-800 bg-opacity-50 backdrop-blur-md  shadow-lg text-gray-100  focus:text-gray-900">
            Ajouter une catégorie
          </AlertDialogTrigger>
          <AlertDialogContent className=" bg-gray-800 bg-opacity-50 backdrop-blur-md  shadow-lg border text-gray-500 ">
            <AlertDialogHeader>
              <AlertDialogTitle>Nouvelle Catégorie</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Nom de catégorie"
                  className="input-field mt-3"
                  value={newCategory} // Bind value to state
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg   border border-gray-700 '
                )}
              >
                Ajouter
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
