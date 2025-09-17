import { ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="pt-[140px]">
      {children}
    </div>
  );
};

export default Layout;