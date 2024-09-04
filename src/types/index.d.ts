/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// User Params
// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};
