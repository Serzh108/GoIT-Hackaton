export const MENU_ARRAY = [
  {
    title: 'Home',
    link: '',
  },
  {
    title: 'About Us',
    link: 'about',
  },
  {
    title: 'Donations',
    link: 'donations',
  },
  {
    title: 'Звіти',
    link: 'reporting',
  },
  {
    title: 'Link-button',
    link: 'link-button',
  },
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
