export const navLinks = [
  {
    title: 'Acceuil',
    href: '/',
  },
  {
    title: 'A propos',
    href: '/about',
  },
  {
    title: 'Dérive 2024',
    href: '/derive-2024',
  },
  {
    title: 'Editions précédentes',
    href: '/previous',
  },
  {
    title: 'Espace Darja',
    href: '/espace-darja',
  },
  {
    title: 'Communauté',
    href: '/community',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export const postDefaultValues = {
  frenchTitle: '',
  arabicTitle: '',
  frenchText: '',
  arabicText: '',
  images: [],
  videoSource: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  postCategory: '',
  location: '',
  isInHomepage: false,
  url: '',
};

export const artistDefaultValues = {
  frenchName: '',
  arabicName: '',
  frenchText: '',
  arabicText: '',
  images: [],
  videoSource: '',
  artistCategoryId: '',
  isInHomepage: false,
  url: '',
};
