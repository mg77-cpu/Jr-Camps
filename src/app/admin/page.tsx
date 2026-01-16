import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AdminHome() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Programs</CardTitle>
          <CardDescription>Create and manage program types</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Sports, STEM, Defense categories</p>
            <Link href="/admin/programs" className="text-sm font-medium text-primary hover:underline">
              Manage
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Partners</CardTitle>
          <CardDescription>Organizations you collaborate with</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Schools, City Rec, Communities</p>
            <Link href="/admin/partners" className="text-sm font-medium text-primary hover:underline">
              Manage
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="border-b">
          <CardTitle>Sessions</CardTitle>
          <CardDescription>Schedule specific program runs</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Dates, capacity, location, linked program and partner</p>
            <Link href="/admin/sessions" className="text-sm font-medium text-primary hover:underline">
              Manage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

