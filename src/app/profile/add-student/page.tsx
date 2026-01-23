import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AddStudentPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="mb-6">
            <Button asChild variant="ghost" size="sm" className="-ml-3 text-slate-500 hover:text-slate-800">
                <Link href="/portal">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Portal
                </Link>
            </Button>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Add a Child</h1>
        <p className="text-slate-500 mb-8">Register a new student for programs.</p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 mb-8">
            <p className="font-medium">🚧 Under Construction</p>
            <p className="text-sm mt-1">The ability to add students will be available soon. Please check back later.</p>
        </div>
        
        <Button asChild variant="outline">
            <Link href="/portal">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
