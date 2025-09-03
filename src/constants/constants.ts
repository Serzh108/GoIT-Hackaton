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
  {
    title: 'Звітність "ІнХармоні.Юа"',
    link: 'reporting/reporting-in-harmony',
    parent: 'reporting',
  },
  {
    title: 'Реалізовані проєкти',
    link: 'reporting/projects',
    parent: 'reporting',
  },
  { title: 'Відгуки ', link: 'reporting/reviews', parent: 'reporting' },
  {
    title: 'Мерч',
    link: 'merch',
  },
  {
    title: 'Про нас',
    link: 'about',
  },
  { title: 'Партнери', link: 'about/partners', parent: 'about' },
  { title: 'Команда', link: 'about/team', parent: 'about' },
  { title: 'Досягнення', link: 'about/achievements', parent: 'about' },
  {
    title: 'Адміністратор',
    link: 'admin',
  },
  {
    title: 'Редактори',
    link: 'editor',
  },
];

export const COOKIES_VALUE = {
  usual: 'Htlfrnjh',
  super: 'Flvsyscnhfnjh',
};

export const ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REGISTER: '/api/auth/register',
  REFRESH_USER: '/api/auth/users/{userId}',
  DELETE_USER: '/api/auth/users/{userId}',
  ALL_USERS: '/api/auth/users',
  // LOGIN: '',
  REFRESH_REPORT: '/api/reports/{id}',
  DELETE_REPORT: '/api/reports/{id}',
  ALL_REPORTS: '/api/reports',
  CREATE_REPORT: '/api/reports',
  // LOGIN: '',
}
