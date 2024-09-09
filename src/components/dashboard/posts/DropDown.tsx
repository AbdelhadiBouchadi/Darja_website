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
import {
  createPostCategory,
  getAllPostCategories,
} from '@/lib/actions/postCategory.actions';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<IPostCategory[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    createPostCategory({
      postCategoryName: newCategory.trim(),
    }).then((category) => {
      setCategories((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllPostCategories();

      categoryList && setCategories(categoryList as IPostCategory[]);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
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
