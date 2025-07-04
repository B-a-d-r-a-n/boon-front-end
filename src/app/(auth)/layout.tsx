import Link from "next/link";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <div className="container mx-auto">
          <Link href="/" className="font-bold text-xl">
            Boon
          </Link>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}