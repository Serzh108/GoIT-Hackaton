import MainPage from '@/components/MainPage/MainPage';
import { checkCookie } from '@/services/actions';

export default async function Home() {
  const isMyCookie = await checkCookie();

  return (
    <main className={`flex flex-col items-center justify-center w-full px-4 `}>
      <MainPage isMyCookie={isMyCookie} />
    </main>
  );
}
