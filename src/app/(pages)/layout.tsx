import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import PageHeader from '@/components/PageHeader/PageHeader';

interface ILayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex w-full h-screen ">
      <Sidebar />
      <main className=" flex-1 flex justify-center">
        <section className="flex flex-col justify-start items-center w-full ml-[256px] ">
          <PageHeader />
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
