import Logo from '@/icons/logo.svg';
export default function AuthPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center w-full  max-w-[668px] h-screen bg-white py-6 px-37 shadow-md">
      <div className=" mb-7">
        <Logo className="w-16 h-16" />
      </div>
      {children}
    </div>
  );
}
