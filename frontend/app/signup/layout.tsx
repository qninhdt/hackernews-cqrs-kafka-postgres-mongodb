

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-center items-center font-extrabold h-screen bg-zinc-100">
      {children}
    </div>
  );
}
