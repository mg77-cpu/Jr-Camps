import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] font-sans text-slate-800">
      <Navbar />
      <main className="p-8 pt-28 max-w-[1600px] mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
