import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

function isAdminEmail(email?: string | null) {
  const list = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  const target = (email || "").toLowerCase();
  return list.includes(target);
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId, sessionId } = await auth();
  const user = await currentUser();

  if (sessionId) {
    const client = await clerkClient();
    const session = await client.sessions.getSession(sessionId);

    const toMs = (timestamp: number) => (timestamp < 1_000_000_000_000 ? timestamp * 1000 : timestamp);
    const now = Date.now();
    const maxIdleMs = 30 * 60 * 1000;
    const maxAbsoluteMs = 12 * 60 * 60 * 1000;

    if (typeof session.lastActiveAt === "number" && now - toMs(session.lastActiveAt) > maxIdleMs) {
      redirect("/sign-out?redirect_url=/");
    }

    if (typeof session.createdAt === "number" && now - toMs(session.createdAt) > maxAbsoluteMs) {
      redirect("/sign-out?redirect_url=/");
    }
  }

  if (!userId || !user) {
    redirect("/coming-soon");
  }

  const primaryEmail = user.emailAddresses?.[0]?.emailAddress;
  const allowed = isAdminEmail(primaryEmail);

  if (!allowed) {
    redirect("/");
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="text-sm text-muted-foreground">Manage programs, sessions, and partners</p>
        </header>
        {children}
      </div>
    </div>
  );
}
