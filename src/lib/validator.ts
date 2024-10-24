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
  postCategory: z.enum(
    [
      'mercredi 04.12',
      'jeudi 05.12',
      'vendredi 06.12',
      'samedi 07.12',
      'dimanche 08.12',
    ],
    {
      message: 'Veuillez Choisir Une Date',
    }
  ),
  horaire: z.string().min(3, "Veuillez rentrer l'horaire "),
  isInHomepage: z.boolean(),
  url: z.string().url(),
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
  imageSource: z.string(),
  videoSource: z.string(),
  artistCategoryId: z.string(),
  isInHomepage: z.boolean(),
  url: z.string().url(),
});
