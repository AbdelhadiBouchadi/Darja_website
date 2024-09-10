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

// POST PARAMS
export type CreatePostParams = {
  frenchTitle: string;
  arabicTitle: string;
  frenchText: string;
  arabicText: string;
  imageSource: string;
  videoSource: string;
  postCategoryId: string;
  url: string;
};

export type UpdatePostParams = {
  post: {
    _id: string;
    frenchTitle: string;
    arabicTitle: string;
    frenchText: string;
    arabicText: string;
    imageSource: string;
    videoSource: string;
    postCategoryId: string;
    url: string;
  };
};

export type DeletePostParams = {
  postId: string;
};

export type getAllPostsParams = {};
