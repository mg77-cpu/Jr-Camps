import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Profile Settings</h1>
        
        <div className="space-y-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500 uppercase tracking-wide font-medium mb-1">Name</p>
                <p className="font-medium text-slate-900">{user?.firstName} {user?.lastName}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500 uppercase tracking-wide font-medium mb-1">Email</p>
                <p className="font-medium text-slate-900">{user?.emailAddresses[0].emailAddress}</p>
            </div>
        </div>

        <div className="flex gap-4">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/portal">Back to Portal</Link>
          </Button>
          <Button asChild variant="outline">
             <Link href="/sign-out">Sign Out</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
