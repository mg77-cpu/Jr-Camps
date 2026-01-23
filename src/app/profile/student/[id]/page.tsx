import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, FileText, MapPin, MoreHorizontal, PieChart, Plus, User as UserIcon } from "lucide-react";

type EnrollmentItem = {
  id: string;
  programName: string;
  category: string;
  partnerName: string;
  startDate: Date;
  endDate: Date;
  status: string;
  paymentId: string;
};

export default async function StudentProfilePage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId }
  });

  if (!dbUser) notFound();

  const student = await prisma.student.findFirst({
    where: {
      id: params.id,
      parentId: dbUser.id
    },
    include: {
      payments: {
        where: { sessionId: { not: null } },
        include: {
          session: {
            include: {
              program: true,
              partner: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!student) notFound();

  const getSessionStatus = (startDate: Date, endDate: Date) => {
    const now = new Date();
    const normalizedEnd = new Date(endDate);
    if (
      normalizedEnd.getHours() === 0 &&
      normalizedEnd.getMinutes() === 0 &&
      normalizedEnd.getSeconds() === 0 &&
      normalizedEnd.getMilliseconds() === 0
    ) {
      normalizedEnd.setHours(23, 59, 59, 999);
    }
    if (now > normalizedEnd) return "Completed";
    if (now < startDate) return "Upcoming";
    return "Active";
  };

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", { timeZone: "UTC" });

  const enrollments: EnrollmentItem[] = student.payments
    .filter((payment) => payment.session && payment.session.program)
    .map((payment) => {
      const startDate = new Date(payment.session!.startDate);
      const endDate = new Date(payment.session!.endDate);
      return {
        id: payment.id,
        programName: payment.session!.program.name,
        category: payment.session!.program.category,
        partnerName: payment.session!.partner.name,
        startDate,
        endDate,
        status: getSessionStatus(startDate, endDate),
        paymentId: payment.id
      };
    });

  const totals = enrollments.reduce(
    (acc, item) => {
      acc.total += 1;
      if (item.status === "Active") acc.active += 1;
      if (item.status === "Upcoming") acc.upcoming += 1;
      if (item.status === "Completed") acc.completed += 1;
      return acc;
    },
    { total: 0, active: 0, upcoming: 0, completed: 0 }
  );

  const age = new Date().getFullYear() - new Date(student.dob).getFullYear();
  const initials = student.name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Button asChild variant="ghost" size="sm" className="-ml-3 text-slate-500 hover:text-slate-800">
            <Link href="/portal">
              <ArrowLeft size={16} className="mr-2" />
              Back to Portal
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline">
              <Link href="/profile">Profile Settings</Link>
            </Button>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 gap-2">
              <Link href="/portal">
                <Plus size={16} />
                Find new Sessions
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  {initials}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
                  <p className="text-sm text-slate-500">
                    {student.grade || "No grade"} • {age}y
                  </p>
                </div>
              </div>
              {student.notes ? (
                <div className="mt-5 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-amber-800 text-sm">
                  ⚠️ {student.notes}
                </div>
              ) : (
                <div className="mt-5 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-slate-500 text-sm">
                  No notes on file.
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Enrollment Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Total</p>
                  <p className="text-2xl font-bold text-slate-900">{totals.total}</p>
                </div>
                <div className="rounded-xl bg-indigo-50 p-4">
                  <p className="text-xs text-slate-500">Active</p>
                  <p className="text-2xl font-bold text-indigo-700">{totals.active}</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-slate-500">Upcoming</p>
                  <p className="text-2xl font-bold text-blue-700">{totals.upcoming}</p>
                </div>
                <div className="rounded-xl bg-slate-100 p-4">
                  <p className="text-xs text-slate-500">Completed</p>
                  <p className="text-2xl font-bold text-slate-700">{totals.completed}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Need help?</h3>
                <p className="text-indigo-100 text-sm mb-4">Contact our support team for assistance.</p>
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 border-none rounded-xl px-6">
                  Contact Support
                </Button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute top-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Enrollments</h2>
                <p className="text-sm text-slate-500">Sessions for this student</p>
              </div>
              <Button asChild variant="outline" className="rounded-xl border-slate-200 text-slate-600 gap-2">
                <Link href="/portal">
                  <Plus size={16} />
                  New enrollment
                </Link>
              </Button>
            </div>

            {enrollments.length === 0 ? (
              <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="text-slate-300" size={32} />
                </div>
                <p className="font-medium text-slate-600">No enrollments yet.</p>
                <p className="text-sm mt-1 mb-4">Pick a session to get started.</p>
                <Button asChild variant="outline">
                  <Link href="/portal">Browse Sessions</Link>
                </Button>
              </div>
            ) : (
              enrollments.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group relative overflow-hidden">
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        item.category === "SPORTS" ? "bg-orange-50 text-orange-600" :
                        item.category === "STEM" ? "bg-blue-50 text-blue-600" :
                        "bg-indigo-50 text-indigo-600"
                      }`}>
                        {item.category === "SPORTS" ? <UserIcon size={20} /> :
                        item.category === "STEM" ? <PieChart size={20} /> :
                        <FileText size={20} />}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{item.programName}</span>
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{item.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        item.status === "Active" ? "default" : 
                        item.status === "Upcoming" ? "secondary" : "outline"
                      } className={
                        item.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-100 border-none" :
                        item.status === "Upcoming" ? "bg-blue-50 text-blue-700 hover:bg-blue-50 border-none" :
                        "text-slate-500"
                      }>
                        {item.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-600" asChild>
                        <Link href={`/portal/subscription/${item.paymentId}`}>
                          <MoreHorizontal size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 relative z-10">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={16} className="text-slate-400" />
                        <span>{formatDate(item.startDate)} - {formatDate(item.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={16} className="text-slate-400" />
                        <span>{item.partnerName}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end">
                      <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-100">
                          {initials}
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium">Student</p>
                          <p className="text-sm font-semibold text-slate-700">{student.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                </div>
              ))
            )}

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Billing History</h3>
                  <p className="text-sm text-slate-500">Payments linked to this student</p>
                </div>
              </div>

              {student.payments.length === 0 ? (
                <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="font-medium text-slate-600">No billing history yet.</p>
                  <p className="text-sm mt-1">Enroll in a session to start a history.</p>
                </div>
              ) : (
                student.payments.map((payment) => {
                  if (!payment.session) return null;
                  return (
                    <div key={payment.id} className="rounded-xl border border-slate-100 p-4 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">{payment.session.program.name}</p>
                          <p className="text-xs text-slate-500">
                            {payment.session.partner.name} • {student.name}
                          </p>
                        </div>
                        <Badge className="bg-slate-100 text-slate-600 border-none">
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-400" />
                          <span>
                            {formatDate(payment.session.startDate)} - {formatDate(payment.session.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-slate-400" />
                          <span>{payment.session.partner.name}</span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400">
                        Billed on {formatDate(payment.createdAt)}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
