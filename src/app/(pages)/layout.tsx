import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';

interface ILayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex w-full h-screen ">
      <Sidebar />
      <main className=" flex-1 flex justify-center">{children}</main>
    </div>
  );
};

export default Layout;
