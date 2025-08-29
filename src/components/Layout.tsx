import { ReactNode } from "react";
import Sidebar from "./Sidebar/Sidebar";
// import Header from "./Header/Header";

interface ILayoutProps {
    children: ReactNode;
}
const Layout = ({children}: ILayoutProps) => {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      {/* <Header /> */}
      <main className="w-full h-full">{children}</main>
    </div>
  )    
};

export default Layout;