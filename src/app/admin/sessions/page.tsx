import { prisma } from "@/lib/prisma";
import { Program, Partner, Session } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

async function createSession(formData: FormData) {
  "use server";
  const { userId } = await auth();
  if (!userId) return;

  const programId = String(formData.get("programId") || "").trim();
  const partnerId = String(formData.get("partnerId") || "").trim();
  const startDate = String(formData.get("startDate") || "").trim();
  const endDate = String(formData.get("endDate") || "").trim();
  const capacityStr = String(formData.get("capacity") || "").trim();

  const capacity = Number.parseInt(capacityStr, 10);
  if (!programId || !partnerId || !startDate || !endDate || Number.isNaN(capacity)) return;

  await prisma.session.create({
    data: {
      programId,
      partnerId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      capacity,
    },
  });

  revalidatePath("/admin/sessions");
}

export default async function SessionsPage() {
  const [programs, partners, sessions] = await Promise.all([
    prisma.program.findMany({ orderBy: { name: "asc" } }),
    prisma.partner.findMany({ orderBy: { name: "asc" } }),
    prisma.session.findMany({
      orderBy: { startDate: "desc" },
      include: { program: true, partner: true },
    }),
  ]);

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Create Session</CardTitle>
          <CardDescription>Schedule a specific run linked to a program and partner</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={createSession} className="grid gap-4 max-w-xl">
            <div>
              <label className="text-sm font-medium">Program</label>
              <select
                name="programId"
                required
                className="h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Select program
                </option>
                {programs.map((p: Program) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Partner</label>
              <select
                name="partnerId"
                required
                className="h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Select partner
                </option>
                {partners.map((o: Partner) => (
                  <option key={o.id} value={o.id}>
                    {o.name} ({o.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <Input name="startDate" type="date" required />
              </div>
              <div>
                <label className="text-sm font-medium">End Date</label>
                <Input name="endDate" type="date" required />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Capacity</label>
              <Input name="capacity" type="number" min={1} required placeholder="e.g., 20" />
            </div>

            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Newest first</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-3">
            {sessions.length === 0 && (
              <p className="text-sm text-muted-foreground">No sessions yet.</p>
            )}
            {sessions.map((s: Session & { program: Program; partner: Partner }) => (
              <div key={s.id} className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 rounded-md border px-4 py-3">
                <p className="font-medium">{s.program.name}</p>
                <p className="text-sm text-muted-foreground">{s.partner.name}</p>
                <p className="text-sm">
                  {new Date(s.startDate).toLocaleDateString("en-US", { timeZone: "UTC" })} —{" "}
                  {new Date(s.endDate).toLocaleDateString("en-US", { timeZone: "UTC" })}
                </p>
                <p className="text-sm">Capacity: {s.capacity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
