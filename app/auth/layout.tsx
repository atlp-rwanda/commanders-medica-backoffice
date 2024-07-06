import Navbar from "@/components/guest/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="px-5 py-12">
      {children}
      </main>
    </>
  );
}
