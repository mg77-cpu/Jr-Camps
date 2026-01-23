"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  MoreHorizontal, 
  Search, 
  Plus, 
  Filter, 
  LayoutGrid, 
  List, 
  User as UserIcon, 
  PieChart, 
  Calendar, 
  MapPin,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaymentModal } from "@/components/landing/PaymentModal";

// Types matching the data structure
type PortalSession = {
  startDate: Date;
  endDate: Date;
  program: { name: string; category: string };
  partner: { name: string };
};

type PortalPayment = {
  id: string;
  createdAt: Date;
  session: PortalSession | null;
  status: string;
};

type PortalStudent = {
  id: string;
  name: string;
  dob: Date;
  grade: string | null;
  notes: string | null;
  payments: PortalPayment[];
};

type PortalUser = {
  firstName: string | null;
  lastName: string | null;
  email: string;
  students: PortalStudent[];
};

type PortalSessionOption = {
  id: string;
  startDate: string;
  endDate: string;
  program: { name: string };
  partner: { name: string; location?: string | null };
};

// Flattened enrollment type for the list view
type EnrollmentItem = {
  id: string;
  studentName: string;
  programName: string;
  category: string;
  partnerName: string;
  startDate: Date;
  endDate: Date;
  status: string;
  paymentId: string;
};

export function PortalDesign({ dbUser, isDevPreview }: { dbUser: PortalUser; isDevPreview?: boolean }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Enrollments");
  const [isSessionsOpen, setIsSessionsOpen] = useState(false);
  const [sessions, setSessions] = useState<PortalSessionOption[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [sessionsError, setSessionsError] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: "Starter", price: 289, period: "month" });
  const [showBillingHistory, setShowBillingHistory] = useState(false);

  const userInitials = (dbUser.firstName?.[0] || "") + (dbUser.lastName?.[0] || "") || dbUser.email[0]?.toUpperCase() || "U";
  const userName = dbUser.firstName ? `${dbUser.firstName} ${dbUser.lastName || ""}` : dbUser.email;
  const plans = [
    { name: "Starter", price: 289, period: "month" },
    { name: "All Access", price: 489, period: "month" },
    { name: "Team", price: 780, period: "season" },
  ];

  useEffect(() => {
    if (!isSessionsOpen) return;
    let isActive = true;
    setSessionsLoading(true);
    setSessionsError("");
    fetch("/api/sessions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load sessions");
        return res.json() as Promise<PortalSessionOption[]>;
      })
      .then((data) => {
        if (!isActive) return;
        setSessions(data);
        if (!selectedSessionId && data.length > 0) {
          setSelectedSessionId(data[0].id);
        }
      })
      .catch(() => {
        if (!isActive) return;
        setSessionsError("Unable to load sessions. Please try again.");
      })
      .finally(() => {
        if (!isActive) return;
        setSessionsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [isSessionsOpen, selectedSessionId]);

  // Helper to determine status
  function getSessionStatus(startDate: Date, endDate: Date) {
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
  }

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", { timeZone: "UTC" });

  // Flatten the data
  const allEnrollments: EnrollmentItem[] = dbUser.students.flatMap((student) =>
    student.payments
      .filter((p) => p.session && p.session.program)
      .map((payment) => {
        const startDate = new Date(payment.session!.startDate);
        const endDate = new Date(payment.session!.endDate);
        return {
          id: payment.id,
          studentName: student.name,
          programName: payment.session!.program.name,
          category: payment.session!.program.category,
          partnerName: payment.session!.partner.name,
          startDate,
          endDate,
          status: getSessionStatus(startDate, endDate),
          paymentId: payment.id,
        };
      })
  );

  // Filter enrollments
  const filteredEnrollments = allEnrollments.filter((item) => {
    const matchesSearch = 
      item.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === "All Enrollments") return true;
    return item.status === activeTab;
  });

  const billingEntries = dbUser.students.flatMap((student) =>
    student.payments
      .filter((payment) => payment.session)
      .map((payment) => ({
        id: payment.id,
        studentName: student.name,
        programName: payment.session!.program.name,
        partnerName: payment.session!.partner.name,
        startDate: new Date(payment.session!.startDate),
        endDate: new Date(payment.session!.endDate),
        createdAt: new Date(payment.createdAt),
        status: payment.status,
      }))
  );

  return (
    <>
        {isDevPreview && (
          <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 px-5 py-3 flex items-center gap-2 text-sm text-blue-700">
             <span className="font-bold bg-blue-100 px-2 py-0.5 rounded">DEV PREVIEW</span>
             <span>Showing mock data.</span>
          </div>
        )}
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex-1 max-w-xl">
             <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
               <span className="font-bold">{userInitials}</span>
             </div>
             <div>
               <h2 className="font-bold text-slate-900 text-sm">{userName}</h2>
               <p className="text-xs text-slate-500">Manage enrollments</p>
             </div>
             <Button variant="ghost" size="icon" className="ml-auto text-slate-400">
               <MoreHorizontal size={20} />
             </Button>
          </div>

          <div className="flex items-center gap-6">
             <nav className="flex gap-6 text-sm font-medium text-slate-500">
                {["All Enrollments", "Active", "Upcoming", "Completed"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`transition-colors pb-1 ${
                      activeTab === tab 
                        ? "text-indigo-600 border-b-2 border-indigo-600" 
                        : "hover:text-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
             </nav>
             <div className="flex items-center gap-2">
               <Button variant="outline" size="icon" className="rounded-xl border-slate-200">
                 <Search size={18} />
               </Button>
               <Button asChild variant="outline" size="icon" className="rounded-xl border-slate-200">
                 <Link href="/portal/pricing">
                    <Plus size={18} />
                 </Link>
               </Button>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900">Portal Dashboard</h1>
              <p className="text-slate-500">Manage your family's camp activities</p>
              
              <div className="relative mt-4">
                <Input 
                  placeholder="Search enrollments or students..." 
                  className="h-12 pl-4 pr-10 rounded-xl border-slate-200 bg-white shadow-sm focus-visible:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              </div>
            </div>

            {/* Students List (Quick View) */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
              <div className="flex items-center justify-between px-2">
                 <h3 className="font-semibold text-slate-900">My Children</h3>
                 <Link href="/profile" className="text-xs text-indigo-600 font-medium hover:underline">Manage</Link>
              </div>
              
              <div className="space-y-1">
                {dbUser.students.length === 0 ? (
                    <p className="text-sm text-slate-400 px-2">No students added yet.</p>
                ) : (
                    dbUser.students.map(student => (
                        <Link 
                          key={student.id} 
                          href={`/profile/student/${student.id}`}
                          className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 hover:bg-slate-50 group"
                        >
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs group-hover:bg-indigo-200 transition-colors">
                                {student.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-700">{student.name}</p>
                                <p className="text-xs text-slate-400">
                                  {student.grade || "No grade"} • {new Date().getFullYear() - new Date(student.dob).getFullYear()}y
                                  {student.notes && <span className="block text-amber-600 mt-0.5 text-[10px] font-medium">⚠️ {student.notes}</span>}
                                </p>
                            </div>
                            <div className="text-slate-300">›</div>
                        </Link>
                    ))
                )}
                
                <Link href="/portal/pricing" className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                        <Plus size={14} />
                    </div>
                    <span>Add Child</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 space-y-1">
              <MenuLink label="Find new Sessions" onClick={() => setIsSessionsOpen(true)} />
              <MenuLink label="Profile Settings" href="/profile" />
              <MenuLink label="Billing History" onClick={() => setShowBillingHistory(true)} />
              <MenuLink label="Help & Support" href="/help-support" />
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Need help?</h3>
                <p className="text-indigo-100 text-sm mb-4">Contact our support team for assistance.</p>
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 border-none rounded-xl px-6">
                  Contact Support
                </Button>
              </div>
              {/* Decorative circles */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute top-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button asChild className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none rounded-xl gap-2 font-semibold">
                <Link href="/portal/pricing">
                    <Plus size={18} />
                    NEW ENROLLMENT
                </Link>
              </Button>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 gap-2">
                  <Filter size={16} />
                  Filter
                </Button>
                <div className="bg-white p-1 rounded-xl border border-slate-200 flex">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {showBillingHistory ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Billing History</h3>
                      <p className="text-sm text-slate-500">All subscriptions</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowBillingHistory(false)}>
                      Back to Enrollments
                    </Button>
                  </div>

                  {billingEntries.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      <p className="font-medium text-slate-600">No billing history yet.</p>
                      <p className="text-sm mt-1">Enroll in a session to start a history.</p>
                    </div>
                  ) : (
                    billingEntries.map((entry) => (
                      <div key={entry.id} className="rounded-xl border border-slate-100 p-4 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-slate-900">{entry.programName}</p>
                            <p className="text-xs text-slate-500">
                              {entry.partnerName} • {entry.studentName}
                            </p>
                          </div>
                          <Badge className="bg-slate-100 text-slate-600 border-none">
                            {entry.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-slate-400" />
                            <span>
                              {formatDate(entry.startDate)} - {formatDate(entry.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-slate-400" />
                            <span>{entry.partnerName}</span>
                          </div>
                        </div>
                        <div className="text-xs text-slate-400">
                          Billed on {formatDate(entry.createdAt)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <>
                  {filteredEnrollments.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText className="text-slate-300" size={32} />
                      </div>
                      <p className="font-medium text-slate-600">No enrollments found.</p>
                      <p className="text-sm mt-1 mb-4">Try adjusting your search or add a new enrollment.</p>
                      <Button asChild variant="outline">
                        <Link href="/portal/pricing">Browse Programs</Link>
                      </Button>
                    </div>
                  ) : (
                    filteredEnrollments.map((item) => (
                      <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-3 relative z-10">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                                item.category === 'SPORTS' ? 'bg-orange-50 text-orange-600' :
                                item.category === 'STEM' ? 'bg-blue-50 text-blue-600' :
                                'bg-indigo-50 text-indigo-600'
                            }`}>
                              {item.category === 'SPORTS' ? <UserIcon size={20} /> :
                               item.category === 'STEM' ? <PieChart size={20} /> :
                               <FileText size={20} />}
                            </div>
                            <div>
                                <span className="font-bold text-slate-900 block">{item.programName}</span>
                                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{item.category}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                                item.status === 'Active' ? 'default' : 
                                item.status === 'Upcoming' ? 'secondary' : 'outline'
                            } className={
                                item.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' :
                                item.status === 'Upcoming' ? 'bg-blue-50 text-blue-700 hover:bg-blue-50 border-none' :
                                'text-slate-500'
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
                                      {item.studentName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Student</p>
                                        <p className="text-sm font-semibold text-slate-700">{item.studentName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {isSessionsOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsSessionsOpen(false)} />
            <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Find new Sessions</h2>
                  <p className="text-sm text-slate-500">Choose a plan and session for enrollment</p>
                </div>
                <button
                  onClick={() => setIsSessionsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {plans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      selectedPlan.name === plan.name
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {plan.name} • ${plan.price}/{plan.period}
                  </button>
                ))}
              </div>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {sessionsLoading && (
                  <div className="text-sm text-slate-500">Loading sessions...</div>
                )}
                {!sessionsLoading && sessionsError && (
                  <div className="text-sm text-rose-500">{sessionsError}</div>
                )}
                {!sessionsLoading && !sessionsError && sessions.length === 0 && (
                  <div className="text-sm text-slate-500">No sessions available right now.</div>
                )}
                {sessions.map((session) => {
                  const isSelected = selectedSessionId === session.id;
                  return (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSessionId(session.id)}
                      className={`w-full text-left rounded-xl border p-4 transition-colors ${
                        isSelected ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{session.program.name}</p>
                          <div className="mt-2 space-y-1 text-xs text-slate-500">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-slate-400" />
                              <span>
                                {new Date(session.startDate).toLocaleDateString()} -{" "}
                                {new Date(session.endDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-slate-400" />
                              <span>
                                {session.partner.name}
                                {session.partner.location ? ` • ${session.partner.location}` : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <Button variant="outline" onClick={() => setIsSessionsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (!selectedSessionId) return;
                    setIsSessionsOpen(false);
                    setIsPaymentModalOpen(true);
                  }}
                  disabled={!selectedSessionId}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          plan={selectedPlan}
          sessionId={selectedSessionId ?? undefined}
        />
    </>
  );
}

function MenuLink({ label, active, href, onClick }: { label: string; active?: boolean; href?: string; onClick?: () => void }) {
  const content = (
    <>
      {label}
      {active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
      {!active && <div className="text-slate-300">›</div>}
    </>
  );

  const className = `w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex justify-between items-center ${active ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`;

  if (href) {
    return <Link href={href} className={className}>{content}</Link>;
  }

  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
}
