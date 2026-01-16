import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

async function createProgram(formData: FormData) {
  "use server";
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) return;
  const adminList = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  const email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase() || "";
  if (!adminList.includes(email)) return;

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "").trim();

  if (!name || !category) return;

  await prisma.program.create({
    data: {
      name,
      description: description || null,
      category: category as any,
    },
  });

  revalidatePath("/admin/programs");
}

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Create Program</CardTitle>
          <CardDescription>Add a new program type</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={createProgram} className="grid gap-4 max-w-md">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input name="name" required placeholder="e.g., Coding Camp" />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                required
                className="h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="SPORTS">Sports</option>
                <option value="STEM">STEM</option>
                <option value="DEFENSE">Defense</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input name="description" placeholder="Optional details" />
            </div>
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Existing Programs</CardTitle>
          <CardDescription>Newest first</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-3">
            {programs.length === 0 && (
              <p className="text-sm text-muted-foreground">No programs yet.</p>
            )}
            {programs.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-md border px-4 py-3">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                </div>
                {p.description && <p className="text-sm text-muted-foreground">{p.description}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

