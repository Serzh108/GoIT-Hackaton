export default function AuthPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="pt-[52px] mb-8">
        <span>Team 3 Logo</span>
      </div>
      {children}
    </div>
  );
}
