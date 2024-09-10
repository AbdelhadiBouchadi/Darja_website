'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { IPost } from '@/lib/database/models/post.model';
import { useState } from 'react';
import { postDefaultValues } from '@/constants';
import { useRouter } from 'next/navigation';
import { useUploadThing } from '@/lib/uploadthing';
import { postFormSchema } from '@/lib/validator';
import { createPost, updatePost } from '@/lib/actions/post.actions';
import { handleError } from '@/lib/utils';
import Dropdown from './DropDown';
import { Textarea } from '@/components/ui/textarea';
import { FileUploader } from '../FileUploader';
import SubmitButton from '../SubmitButton';

type PostFormProps = {
  type: 'Create' | 'Update';
  post?: IPost;
  postId?: string;
};

const PostForm = ({ type, post, postId }: PostFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = post && type === 'Update' ? post : postDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialValues as z.infer<typeof postFormSchema>,
  });

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    console.log('Submitted values:', values); // Debugging
    setIsLoading(true);

    let uploadedImageUrl = values.imageSource;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === 'Create') {
      try {
        const newPost = await createPost({
          ...values,
          imageSource: uploadedImageUrl,
        });

        if (newPost) {
          form.reset();
          router.push(`/derive-2024/${newPost._id}`);
        }
      } catch (error) {
        console.log('Error creating a new post:', error);
      }
    }

    if (type === 'Update' && postId) {
      if (!postId) {
        router.back();
        return;
      }

      try {
        const updatedPost = await updatePost({
          post: { ...values, imageSource: uploadedImageUrl, _id: postId },
        });

        if (updatedPost) {
          console.log(updatedPost.postCategoryId);
          form.reset();
          // router.push(`/derive-2024/${updatedPost._id}`);
        }
      } catch (error) {
        console.error('Error updating the post', error);
        handleError(error);
      }
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="frenchTitle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Titre du poste en français"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arabicTitle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="العنوان  باللغة العربية"
                    className="input-field"
                    {...field}
                    dir="rtl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="postCategoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    value={field.value}
                    onChangeHandler={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoSource"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Source de la video"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="frenchText"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Texte en français"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arabicText"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="المحتوى باللغة العربية"
                    {...field}
                    className="textarea rounded-2xl"
                    dir="rtl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Lien util à partager"
                  className="input-field"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageSource"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-72">
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isLoading={isLoading}>
          {type === 'Create' ? 'Créer Le Poste' : 'Modifier Le Poste'}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default PostForm;
