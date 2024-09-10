'use server';

import { CreatePostParams, DeletePostParams, UpdatePostParams } from '@/types';
import PostCategory from '../database/models/postCategory.model';
import { connectToDatabase } from '../database';
import Post, { IPost } from '../database/models/post.model';
import { handleError } from '../utils';
import { revalidatePath } from 'next/cache';
import { Types } from 'mongoose';

const getPostCategoryByName = async (name: string) => {
  return PostCategory.findOne({ name: { $regex: name, $options: 'i' } });
};

// Populate post
const populatePost = async (query: any) => {
  return query.populate({
    path: 'postCategory',
    model: PostCategory,
    select: '_id name',
  });
};

// Create Post
export async function createPost(post: CreatePostParams) {
  try {
    await connectToDatabase();

    const newPost = await Post.create({
      ...post,
      postCategory: post.postCategoryId,
    });

    return JSON.parse(JSON.stringify(newPost));
  } catch (error) {
    handleError(error);
  }
}

// Update Post
export async function updatePost({ post }: UpdatePostParams) {
  try {
    await connectToDatabase();

    const postToUpdate = await Post.findById(post._id);

    if (!postToUpdate) {
      throw new Error('Post Not Found!');
    }

    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      { ...post, postCategory: post.postCategoryId },
      { new: true }
    );

    revalidatePath('/darja-admin/posts');
    return JSON.parse(JSON.stringify(updatedPost));
  } catch (error) {
    console.error('Error updating the post', error);
    handleError(error);
  }
}

// Delete post
export async function deletePost(postId: string) {
  try {
    await connectToDatabase();

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (deletedPost) revalidatePath('/darja-admin/posts');
  } catch (error) {
    console.error('Error deleting post', error);
    handleError(error);
  }
}

// Get Post By Id
export async function getPostById(postId: string) {
  try {
    await connectToDatabase();

    const post = await Post.findById(new Types.ObjectId(postId));

    if (!post) throw new Error('Error getting post by its Id');

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error('Error fetching the post', error);
    handleError(error);
  }
}

// Get All Posts
export async function getAllPosts(category: string) {
  try {
    await connectToDatabase();

    const categoryCondition = category
      ? await getPostCategoryByName(category)
      : null;

    const condition = categoryCondition
      ? { category: categoryCondition._id }
      : {};

    const postsQuery = Post.find(condition).sort({ createdAt: 'desc' });

    const posts = await populatePost(postsQuery);

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error('Error Getting All Posts', error);
    handleError(error);
  }
}

// Get Related Posts
export async function getRelatedPosts({
  postCategoryId,
  postId,
}: {
  postCategoryId: string;
  postId: string;
}) {
  try {
    await connectToDatabase();

    const conditions = {
      $and: [{ postCategory: postCategoryId }, { _id: { $ne: postId } }],
    };

    const postsQuery = Post.find(conditions).sort({ createdAt: 'desc' });

    const posts = await populatePost(postsQuery);

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error('Error Getting Related Posts', error);
    handleError(error);
  }
}

export async function getPostCounts() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all posts and post categories
    const posts = await Post.find();
    const postCategories = await PostCategory.find();

    // Return the total counts for both
    return {
      totalPosts: posts.length, // Total posts count
      totalPostCategories: postCategories.length, // Total post categories count
    };
  } catch (error) {
    console.error('Failed to fetch post statistics:', error);
    handleError(error);
    throw new Error('Failed to fetch post statistics');
  }
}
