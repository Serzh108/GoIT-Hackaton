export const MENU_ARRAY = [
  {
    title: 'Збори',
    link: 'donations',
  },
  {
    title: 'Звітність',
    link: 'reporting',
  },
  // {
  //   title: 'Звітність "ІнХармоні.Юа"',
  //   link: 'reporting/reporting-in-harmony',
  //   parent: 'reporting',
  // },
  // {
  //   title: 'Реалізовані проєкти',
  //   link: 'reporting/projects',
  //   parent: 'reporting',
  // },
  // { title: 'Відгуки ', link: 'reporting/reviews', parent: 'reporting' },
  {
    title: 'Мерч',
    link: 'merch',
  },
  // {
  //   title: 'Про нас',
  //   link: 'about',
  // },
  { title: 'Партнери', link: 'partners' },

  {
    title: 'Адміністратор',
    link: 'admin',
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

  REFRESH_USER: '/api/auth/users/', // REFRESH_USER: '/api/auth/users/{userId}',
  DELETE_USER: '/api/auth/users/', // DELETE_USER: '/api/auth/users/{userId}',
  ALL_USERS: '/api/auth/users',
  USER: '/api/auth/users/current',

  REFRESH_REPORT: '/api/reports/', // REFRESH_REPORT: '/api/reports/{id}',
  DELETE_REPORT: '/api/reports/', // DELETE_REPORT: '/api/reports/{id}',
  ALL_REPORTS: '/api/reports',
  CREATE_REPORT: '/api/reports',

  ALL_DONATIONS: '/api/collections/', // ALL_DONATIONS: '/COLLECTIONS/{locale}',
  DONATION: '/api/collections/', //  DONATION: '/api/collections/{locale}/{id}',
  DELETE_DONATION: '/api/collections/', //   DELETE_DONATION: '/api/collections/{locale}/{id}',
  CREATE_DONATION: '/api/collections/', // CREATE_DONATIONS: '/COLLECTIONS/{locale}',
  REFRESH_DONATION: '/api/reports/', // REFRESH_DONATION: '/api/collections/{locale}/{id}',

  MERCH: '/api/merch',
  REFRESH_MERCH: '/api/merch/', // REFRESH_MERCH: '/api/merch/{locale}',

  ALL_PARTNERS: '/api/partners', // ALL_PARTNERS: '/partners',
  DELETE_PARTNER: '/api/partners/', //   DELETE_PARTNERS: '/api/partners/{id}',
  CREATE_PARTNER: '/api/partners', // CREATE_PARTNERS: '/partners',
  REFRESH_PARTNER: '/api/partners/', // REFRESH_PARTNERS: '/api/partners/{id}',
};
// !!! Correct !!! ------------------
export const INTERNAL_LINKS = {
  ADMIN: 'admin',
  DONATIONS: 'donations',
  REPORTING: 'reporting',
  EDITING: 'editing',
  NEW: 'new',
  MERCH: 'merch',
  PARTNERS: 'partners',
};

export const pathRenderName = {
  [INTERNAL_LINKS.ADMIN]: 'Адміністратор',
  [INTERNAL_LINKS.DONATIONS]: 'Збори',
  [INTERNAL_LINKS.REPORTING]: 'Звітність',
  [INTERNAL_LINKS.PARTNERS]: 'Партнери',
  [INTERNAL_LINKS.NEW]: 'Додавання',
  [INTERNAL_LINKS.EDITING]: 'Редагування',
};
