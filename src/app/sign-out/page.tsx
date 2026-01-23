'use client';

import { useClerk } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function SignOutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh grid place-items-center px-6">
          <p className="text-sm text-muted-foreground">Signing you out…</p>
        </div>
      }
    >
      <SignOutInner />
    </Suspense>
  );
}

function SignOutInner() {
  const { signOut } = useClerk();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectUrl = searchParams.get("redirect_url") || "/";

    void (async () => {
      try {
        await signOut({ redirectUrl });
      } catch {
        router.replace(redirectUrl);
      }
    })();
  }, [router, searchParams, signOut]);

  return (
    <div className="min-h-dvh grid place-items-center px-6">
      <p className="text-sm text-muted-foreground">Signing you out…</p>
    </div>
  );
}
