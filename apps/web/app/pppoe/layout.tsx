"use client";

import { ReactNode, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WifiIcon, CheckIcon } from "../components/icons";
import { getTheme } from "../components/theme";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile default closed
  const pathname = usePathname();
  const t = useMemo(() => getTheme(dark), [dark]);

  // Simple inline icons using your existing icon components
  const navItems = [
    { href: "/client", label: "Overview", icon: <WifiIcon active /> },
    { href: "/client/billing", label: "Billing", icon: <CheckIcon /> },
    { href: "/client/usage", label: "Usage", icon: <WifiIcon active /> },
    { href: "/client/support", label: "Support", icon: <CheckIcon /> },
    { href: "/client/settings", label: "Settings", icon: <CheckIcon /> },
  ];

  // Basic responsive helpers (no CSS files)
  const isActive = (href: string) => pathname === href;

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, display: "flex", transition: "background 0.4s, color 0.4s" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 20,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "260px",
          background: t.sidebarBg,
          borderRight: `1px solid ${t.sidebarBorder}`,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Brand */}
        <div style={{ padding: "22px 18px", borderBottom: `1px solid ${t.sidebarBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`,
                display: "grid",
                placeItems: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: 14,
              }}
            >
              ISP
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 900, lineHeight: 1.1 }}>Client Portal</div>
              <div style={{ fontSize: "12px", color: t.textMuted, fontWeight: 700 }}>My Internet</div>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: "transparent",
              border: `1px solid ${t.cardBorder}`,
              borderRadius: "10px",
              padding: "8px 10px",
              cursor: "pointer",
              color: t.text,
              fontWeight: 900,
            }}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)} // close on mobile after navigation
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  marginBottom: "8px",
                  textDecoration: "none",
                  color: active ? t.accent : t.textMuted,
                  background: active ? `${t.accent}15` : "transparent",
                  fontWeight: active ? 800 : 700,
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => !active && (e.currentTarget.style.background = t.hoverBg)}
                onMouseLeave={(e) => !active && (e.currentTarget.style.background = "transparent")}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}>
        {/* Topbar */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: dark ? "rgba(10,14,26,0.72)" : "rgba(255,255,255,0.88)",
            borderBottom: `1px solid ${dark ? "rgba(99,102,241,0.12)" : "#e2e8f0"}`,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {/* Left: burger + title */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  background: "transparent",
                  border: `1px solid ${t.cardBorder}`,
                  borderRadius: "10px",
                  padding: "8px 10px",
                  cursor: "pointer",
                  color: t.text,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 900,
                }}
                aria-label="Open sidebar"
              >
                ☰
              </button>

              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "15px", fontWeight: 900, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Client Dashboard
                </div>
                <div style={{ fontSize: "12px", color: t.textMuted, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Manage your plan, billing & support
                </div>
              </div>
            </div>

            {/* Right: quick actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Status chip (demo) */}
              <span style={{ padding: "8px 12px", borderRadius: "999px", background: "rgba(34,197,94,0.12)", color: "#22c55e", fontWeight: 900, fontSize: "12px" }}>
                Call 254700000000
              </span>

              <button
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "12px",
              border: `1px solid ${t.cardBorder}`,
              background: "transparent",
              color: t.textMuted,
              fontWeight: 800,
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(100,116,139,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={() => {
              // wire to logout
              console.log("logout");
            }}
          >
            Logout
          </button>

              {/* Theme toggle */}
              <button
                onClick={() => setDark(!dark)}
                style={{
                  background: dark ? "rgba(99,102,241,0.15)" : "#e2e8f0",
                  border: `1px solid ${dark ? "rgba(99,102,241,0.3)" : "#cbd5e1"}`,
                  borderRadius: "12px",
                  padding: "10px 12px",
                  cursor: "pointer",
                  color: t.text,
                  fontWeight: 900,
                  transition: "all 0.2s",
                }}
                aria-label="Toggle theme"
              >
                {dark ? "☀" : "🌙"}
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main
          style={{
            flex: 1,
            width: "100%",
            padding: "18px 16px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>{children}</div>
        </main>

        {/* Mobile bottom nav (extra usability) */}
        <MobileBottomNav t={t} pathname={pathname} />
      </div>
    </div>
  );
}

function MobileBottomNav({ t, pathname }: { t: any; pathname: string }) {
  // Only show on small screens: we can't use CSS media queries,
  // so we show it always but make it subtle; you can remove if you dislike it.
  // If you want true breakpoint behavior, we can add a tiny useEffect listener for window width.
  const items = [
    { href: "/client", label: "Home" },
    { href: "/client/billing", label: "Billing" },
    { href: "/client/usage", label: "Usage" },
    { href: "/client/support", label: "Support" },
    { href: "/client/settings", label: "Settings" },
  ];

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        zIndex: 9,
        borderTop: `1px solid ${t.sidebarBorder}`,
        background: t.sidebarBg,
        padding: "10px 10px",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", maxWidth: "1200px", margin: "0 auto" }}>
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              style={{
                textDecoration: "none",
                color: active ? t.accent : t.textMuted,
                fontWeight: 900,
                fontSize: "11px",
                textAlign: "center",
                padding: "10px 8px",
                borderRadius: "12px",
                background: active ? `${t.accent}15` : "transparent",
                border: active ? `1px solid ${t.cardBorder}` : `1px solid transparent`,
              }}
            >
              {it.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
