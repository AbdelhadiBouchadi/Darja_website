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
  images: z.array(z.string()).default([]),
  videoSource: z.string().optional(),
  postCategory: z.enum(
    ['danse', 'concert', 'theatre', 'lectures', 'cinema', 'ateliers'],
    {
      message: 'Veuillez Choisir Une Date',
    }
  ),
  startDateTime: z.date(),
  endDateTime: z.date(),
  location: z.string().min(3, "Veuillez rentrer le lieu de l'événement. "),
  isInHomepage: z.boolean(),
  url: z.string().optional(),
});

export const artistFormSchema = z.object({
  frenchName: z
    .string()
    .min(3, 'Le nom doit consister de 3 caractères ou plus.'),
  arabicName: z
    .string()
    .min(3, 'Le nom doit consister de 3 caractères ou plus.'),
  frenchText: z
    .string()
    .min(3, 'Le texte doit consister de 3 caractères ou plus.'),
  arabicText: z
    .string()
    .min(3, 'Le texte doit consister de 3 caractères ou plus.'),
  images: z.array(z.string()).default([]),
  videoSource: z.string().optional(),
  artistCategoryId: z.string(),
  isInHomepage: z.boolean(),
  url: z.string().optional(),
});
