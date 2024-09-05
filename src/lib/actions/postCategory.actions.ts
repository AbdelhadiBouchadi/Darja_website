'use server';

import { CreatePostCategoryParams } from '@/types';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import PostCategory from '../database/models/postCategory.model';

export const createPostCategory = async ({
  postCategoryName,
}: CreatePostCategoryParams) => {
  try {
    await connectToDatabase();

    const newPostCategory = await PostCategory.create({
      name: postCategoryName,
    });

    return JSON.parse(JSON.stringify(newPostCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllPostCategories = async () => {
  try {
    await connectToDatabase();

    const postCategories = await PostCategory.find();

    return JSON.parse(JSON.stringify(postCategories));
  } catch (error) {
    handleError(error);
  }
};
