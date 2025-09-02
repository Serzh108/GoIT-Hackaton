'use server';
import { COOKIES_VALUE } from "@/constants/constants";
import { cookies } from "next/headers";

const maxAge = Number(process.env.NEXT_PUBLIC_MAX_AGE);
const maxAgeRefresh = Number(process.env.NEXT_PUBLIC_MAX_AGE_REFRESH);

export async function createCookie(value: string) {
  (await cookies()).set('fec-rerb', value, {
    maxAge: maxAge,
    httpOnly: true,
    sameSite: true,
    secure: false,
  });
};

export async function getCookie(name: string) {
  return (await cookies()).get(name);
};

export async function checkCookie() {
  return (await cookies()).has('fec-rerb');
};

export async function createCookieRefresh(value: string) {
  (await cookies()).set('fec-refresh', value, {
    maxAge: maxAgeRefresh,
    httpOnly: true,
    sameSite: true,
    secure: false,
  });
}

export const refreshMyCookie = async () => {
  const myRefreshCookie = await getCookie('fec-refresh');

  await createCookie(myRefreshCookie?.value || COOKIES_VALUE.usual);
  await createCookieRefresh(myRefreshCookie?.value || COOKIES_VALUE.usual);
};