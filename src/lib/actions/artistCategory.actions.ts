'use server';

import { CreateArtistCategoryParams, CreatePostCategoryParams } from '@/types';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import ArtistCategory from '../database/models/artistCategory.model';

export const createArtistCategory = async ({
  artistCategoryName,
}: CreateArtistCategoryParams) => {
  try {
    await connectToDatabase();

    const newArtistCategory = await ArtistCategory.create({
      name: artistCategoryName,
    });

    return JSON.parse(JSON.stringify(newArtistCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllArtistCategories = async () => {
  try {
    await connectToDatabase();

    const artistCategories = await ArtistCategory.find();

    return JSON.parse(JSON.stringify(artistCategories));
  } catch (error) {
    handleError(error);
  }
};
