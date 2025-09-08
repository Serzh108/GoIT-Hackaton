import { ReactNode } from 'react';
import Sidebar from './Sidebar/Sidebar';

interface ILayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <main className="w-full h-full">{children}</main>
    </div>
  );
};

export default Layout;
