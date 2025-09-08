'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MainPage = ({ isMyCookie }: { isMyCookie: boolean }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(isMyCookie ? '/donations' : '/login');
  }, [isMyCookie, router]);
  
  return (
    <div className="pt-[52px] mb-8 tablet:pt-8 tablet:mb-[112px]">
      <h1>Team 3 Logo</h1>
      <div className="pt-20 text-5xl text-center">Loading...</div>
    </div>
  );
};

export default MainPage;