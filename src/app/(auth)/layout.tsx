import Logo from '@/icons/logo.svg';
export default function AuthPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="pt-[52px] mb-8">
        <Logo className="w-16 h-16" />
      </div>
      {children}
    </div>
  );
}

