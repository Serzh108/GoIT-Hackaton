import { cookies } from "next/headers";

export async function checkCookie() {
  return (await cookies()).has('fec-rerb');
}