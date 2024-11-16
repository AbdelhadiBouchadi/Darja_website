/* eslint-disable no-unused-vars */

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== CATEGORY PARAMS
export type CreatePostCategoryParams = {
  postCategoryName: string;
};

export type CreateArtistCategoryParams = {
  artistCategoryName: string;
};

// POST PARAMS
export type CreatePostParams = {
  frenchTitle: string;
  arabicTitle: string;
  frenchText: string;
  arabicText: string;
  images: string[];
  videoSource?: string;
  postCategory?:
    | 'mercredi 04.12'
    | 'jeudi 05.12'
    | 'vendredi 06.12'
    | 'samedi 07.12'
    | 'dimanche 08.12'
    | null;
  horaire: string;
  isInHomepage: boolean;
  url?: string;
};

export type UpdatePostParams = {
  post: {
    _id: string;
    frenchTitle: string;
    arabicTitle: string;
    frenchText: string;
    arabicText: string;
    images: string[];
    videoSource?: string;
    postCategory?:
      | 'mercredi 04.12'
      | 'jeudi 05.12'
      | 'vendredi 06.12'
      | 'samedi 07.12'
      | 'dimanche 08.12'
      | null;
    horaire: string;
    isInHomepage: boolean;
    url?: string;
  };
};

export type DeletePostParams = {
  postId: string;
};

// Artist Params
export type CreateArtistParams = {
  frenchName: string;
  arabicName: string;
  frenchText: string;
  arabicText: string;
  imageSource?: string;
  videoSource?: string;
  artistCategoryId: string;
  isInHomepage: boolean;
  url?: string;
};

export type UpdateArtistParams = {
  artist: {
    _id: string;
    frenchName: string;
    arabicName: string;
    frenchText: string;
    arabicText: string;
    imageSource?: string;
    videoSource?: string;
    artistCategoryId: string;
    isInHomepage: boolean;
    url?: string;
  };
};

export type DeleteArtistParams = {
  artistId: string;
};
