import { Footer } from "@/components/Footer";
import MainNav from "@/components/Main-nav";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {}
      <MainNav />
      <main className="flex-grow">
        {" "}
        {}
        {children}
      </main>
      <Footer />
    </div>
  );
}