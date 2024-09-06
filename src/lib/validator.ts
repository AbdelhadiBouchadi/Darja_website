import * as z from 'zod';

export const postFormSchema = z.object({
  frenchTitle: z
    .string()
    .min(3, 'Le titre doit consister de 3 caractères ou plus.'),
  arabicTitle: z
    .string()
    .min(3, 'Le titre doit consister de 3 caractères ou plus.'),
  frenchText: z
    .string()
    .min(3, 'Le texte doit consister de 3 caractères ou plus.'),
  arabicText: z
    .string()
    .min(3, 'Le texte doit consister de 3 caractères ou plus.'),
  imageSource: z.string(),
  videoSource: z.string(),
  postCategoryId: z.string(),
  url: z.string().url(),
});
