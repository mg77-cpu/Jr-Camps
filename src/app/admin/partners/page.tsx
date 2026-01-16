import { prisma } from "@/lib/prisma";
import { Partner } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

async function geocodeQ(q: string) {
  const mapbox = process.env.MAPBOX_ACCESS_TOKEN;
  const google = process.env.GOOGLE_MAPS_API_KEY;
  if (mapbox) {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json?access_token=${mapbox}&limit=1&country=US`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const data = await res.json();
      const f = data?.features?.[0];
      if (f?.center && Array.isArray(f.center)) {
        return { lat: Number(f.center[1]), lon: Number(f.center[0]) };
      }
    } catch {}
  } else if (google) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(q)}&key=${google}&components=country:US`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const data = await res.json();
      const r = data?.results?.[0];
      const loc = r?.geometry?.location;
      if (loc?.lat != null && loc?.lng != null) {
        return { lat: Number(loc.lat), lon: Number(loc.lng) };
      }
    } catch {}
  }
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=us&q=${encodeURIComponent(q)}`, { headers: { Accept: "application/json" } });
    const json = await res.json();
    const hit = Array.isArray(json) && json[0] ? json[0] : null;
    if (hit?.lat && hit?.lon) {
      return { lat: parseFloat(hit.lat), lon: parseFloat(hit.lon) };
    }
  } catch {}
  return null;
}

async function createPartner(formData: FormData) {
  "use server";
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) return;
  const adminList = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  const email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase() || "";
  if (!adminList.includes(email)) return;

  const name = String(formData.get("name") || "").trim();
  const type = String(formData.get("type") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const state = String(formData.get("state") || "").trim();
  const postalCode = String(formData.get("postalCode") || "").trim();

  if (!name || !type) return;

  let latitude: number | null = null;
  let longitude: number | null = null;
  const qParts = [address, city, state, postalCode].filter(Boolean);
  const q = (qParts.join(", ") || location).trim();
  if (q) {
    const hit = await geocodeQ(q);
    if (hit) {
      latitude = hit.lat;
      longitude = hit.lon;
    }
  }

  await prisma.partner.create({
    data: {
      name,
      type: type as any,
      location: location || null,
      addressLine1: address || null,
      city: city || null,
      state: state || null,
      postalCode: postalCode || null,
      latitude,
      longitude,
    } as any,
  });

  revalidatePath("/admin/partners");
}

async function geocodeMissingPartners() {
  "use server";
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) return;
  const adminList = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  const email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase() || "";
  if (!adminList.includes(email)) return;

  const partners = await prisma.partner.findMany();

  for (const p of partners) {
    const pa = p as any;
    const parts = [pa.addressLine1 || "", pa.city || "", pa.state || "", pa.postalCode || ""].filter(Boolean);
    const q = (parts.join(", ") || pa.location || "").trim();
    if (!q) continue;
    const hit = await geocodeQ(q);
    if (hit) {
      await prisma.partner.update({
        where: { id: pa.id },
        data: { latitude: hit.lat, longitude: hit.lon } as any,
      });
    }
  }

  revalidatePath("/admin/partners");
}

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Create Partner</CardTitle>
          <CardDescription>Add a collaborating organization</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={createPartner} className="grid gap-4 max-w-md">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input name="name" required placeholder="e.g., Riverside Elementary" />
            </div>
            <div>
              <label className="text-sm font-medium">Type</label>
              <select
                name="type"
                required
                className="h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="SCHOOL">School</option>
                <option value="CITY_REC">City Recreation</option>
                <option value="APARTMENT_COMMUNITY">Apartment Community</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input name="address" placeholder="Street address (optional)" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium">City</label>
                <Input name="city" placeholder="City (optional)" />
              </div>
              <div>
                <label className="text-sm font-medium">State</label>
                <Input name="state" placeholder="CA" />
              </div>
              <div>
                <label className="text-sm font-medium">ZIP</label>
                <Input name="postalCode" placeholder="e.g., 95814" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input name="location" placeholder="Optional address or area" />
            </div>
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Utilities</CardTitle>
          <CardDescription>Geocode missing coordinates</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={geocodeMissingPartners}>
            <Button type="submit" variant="outline">Geocode Missing Partners</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Existing Partners</CardTitle>
          <CardDescription>Newest first</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-3">
            {partners.length === 0 && (
              <p className="text-sm text-muted-foreground">No partners yet.</p>
            )}
            {partners.map((p: Partner) => (
              <div key={p.id} className="flex items-center justify-between rounded-md border px-4 py-3">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.type}</p>
                </div>
                {p.location && <p className="text-sm text-muted-foreground">{p.location}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
