"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, UsersIcon, CreditCardIcon, SettingsIcon, LogOutIcon, FireIcon, SunIcon, MoonIcon, MenuIcon } from "../components/icons";
import { getTheme } from "../components/theme";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const t = getTheme(dark);

  const navItems = [
    { icon: <HomeIcon />, label: "Overview", href: "/dashboard" },
    { icon: <UsersIcon />, label: "Hotspot", href: "/dashboard/hotspot" },
    { icon: <UsersIcon />, label: "PPPoe", href: "/dashboard/pppoe" },
    { icon: <CreditCardIcon />, label: "Payments", href: "/dashboard/payments" },
    { icon: <SettingsIcon />, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, display: "flex", transition: "background 0.4s, color 0.4s" }}>
      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? "260px" : "0", background: t.sidebarBg, borderRight: `1px solid ${t.sidebarBorder}`, transition: "width 0.3s", overflow: "hidden", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px", borderBottom: `1px solid ${t.sidebarBorder}`, display: "flex", alignItems: "center", gap: "8px" }}>
          <FireIcon />
          <span style={{ fontSize: "18px", fontWeight: "700", background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HotPot ISP</span>
        </div>

        <nav style={{ padding: "20px 12px" }}>
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={i}
                href={item.href}
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "10px", marginBottom: "8px", textDecoration: "none", color: isActive ? t.accent : t.textMuted, background: isActive ? `${t.accent}15` : "transparent", fontWeight: isActive ? "600" : "500", fontSize: "14px", transition: "all 0.2s" }}
                onMouseEnter={e => !isActive && (e.currentTarget.style.background = t.hoverBg)}
                onMouseLeave={e => !isActive && (e.currentTarget.style.background = "transparent")}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ position: "absolute", bottom: "20px", left: "12px", right: "12px" }}>
          <button
            style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "10px", background: "transparent", border: "none", color: "#ef4444", fontWeight: "500", fontSize: "14px", cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <LogOutIcon />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Top Bar */}
        <header style={{ background: dark ? "rgba(10,14,26,0.7)" : "rgba(255,255,255,0.85)", borderBottom: `1px solid ${dark ? "rgba(99,102,241,0.1)" : "#e2e8f0"}`, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "transparent", border: `1px solid ${t.cardBorder}`, borderRadius: "8px", padding: "8px", cursor: "pointer", color: t.text, display: "flex", alignItems: "center" }}>
              <MenuIcon />
            </button>
            <h1 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>Dashboard</h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "10px", padding: "8px 14px", fontSize: "13px", fontWeight: "600" }}>
              <span style={{ color: t.textMuted }}>User:</span> <span style={{ color: t.accent }}>Admin</span>
            </div>
            <button onClick={() => setDark(!dark)} style={{ background: dark ? "rgba(99,102,241,0.15)" : "#e2e8f0", border: `1px solid ${dark ? "rgba(99,102,241,0.3)" : "#cbd5e1"}`, borderRadius: "10px", padding: "8px 10px", cursor: "pointer", color: t.text, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: "32px", overflow: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
