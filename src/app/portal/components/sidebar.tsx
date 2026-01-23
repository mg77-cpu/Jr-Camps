"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Sparkles, 
  FileText, 
  Settings 
} from "lucide-react";

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-20 bg-white border-r border-slate-100 flex flex-col items-center py-8 gap-8 fixed h-full z-10 left-0 top-0">
      <Link href="/" className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
        C
      </Link>
      
      <nav className="flex flex-col gap-6 w-full items-center">
        <NavItem 
            icon={<Home size={22} />} 
            label="Home" 
            href="/portal" 
            active={pathname === "/portal"} 
        />
        <NavItem 
            icon={<Sparkles size={22} />} 
            label="Programs" 
            href="/portal/pricing" 
            active={pathname === "/portal/pricing"} 
        />
        <NavItem 
            icon={<FileText size={22} />} 
            label="Billing" 
            href="#" 
            active={pathname === "/portal/billing"} 
        />
      </nav>

      <div className="mt-auto flex flex-col gap-6 w-full items-center">
        <NavItem 
            icon={<Settings size={22} />} 
            label="Settings" 
            href="/profile" 
            active={pathname === "/profile/settings"} 
        />
        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
          {/* User Avatar Placeholder */}
          <div className="w-full h-full bg-gradient-to-tr from-indigo-400 to-purple-400" />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, active, href, label }: { icon: React.ReactNode; active?: boolean; href: string; label?: string }) {
  return (
    <Link href={href} className="w-full flex justify-center xl:justify-start group">
        <div className={`p-3 rounded-xl transition-all flex items-center gap-3 ${active ? "text-indigo-600 bg-indigo-50" : "text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-50"}`}>
        {icon}
        {label && <span className="sr-only xl:not-sr-only xl:text-sm xl:font-medium">{label}</span>}
        </div>
    </Link>
  );
}
