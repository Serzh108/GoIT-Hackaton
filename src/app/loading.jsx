'use client';
import { ClockLoader } from 'react-spinners';

function Page() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <ClockLoader color="black" size={100} />
    </div>
  );
}

export default Page;
