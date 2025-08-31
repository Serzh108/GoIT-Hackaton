export const MENU_ARRAY = [
  // {
  //   title: 'Home',
  //   link: '',
  // },
  {
    title: 'Дашборд',
    link: 'dashboard',
  },
  {
    title: 'Збори',
    link: 'donations',
  },
  {
    title: 'Звітність',
    link: 'reporting',
  },
  { title: 'Мерч', link: 'merch' },
  {
    title: 'Про нас',
    link: 'about',
    children: [
      { title: 'Партнери', link: 'about/partners' },
      { title: 'Команда', link: 'about/team' },
      { title: 'Досягнення', link: 'about/achievements' },
    ],
  },
  {
    title: 'Адміністратор',
    link: 'admin',
  },
  {
    title: 'Редактори',
    link: 'admin',
  },
];

export const COOKIES_VALUE = {
  usual: 'usual',
  super: 'super',
};
