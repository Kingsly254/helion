"use client";
import { useState } from "react";
import Link from "next/link";
import { WifiIcon, FireIcon, ActivityIcon, SunIcon, MoonIcon } from "../../../components/icons";
import { getTheme } from "../../../components/theme";

export default function HotspotStatusPage() {
  const [dark, setDark] = useState(true);
  const t = getTheme(dark);

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, transition: "background 0.4s, color 0.4s" }}>
      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 28px", borderBottom: `1px solid ${dark ? "rgba(99,102,241,0.1)" : "#e2e8f0"}`, background: dark ? "rgba(10,14,26,0.7)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FireIcon />
          <span style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.5px", background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HotPot</span>
        </div>
        <button onClick={() => setDark(!dark)} style={{ background: dark ? "rgba(99,102,241,0.15)" : "#e2e8f0", border: `1px solid ${dark ? "rgba(99,102,241,0.3)" : "#cbd5e1"}`, borderRadius: "10px", padding: "8px 10px", cursor: "pointer", color: t.text, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "600px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#22c55e" }}>
            <WifiIcon active />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "800", margin: "0 0 12px" }}>Connection Active</h1>
          <p style={{ fontSize: "16px", color: t.textMuted }}>Your session is running smoothly</p>
        </div>

        {/* Session Info */}
        <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "20px", padding: "32px 28px", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "24px", color: t.accent }}>Session Details</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "20px", borderBottom: `1px solid ${t.cardBorder}` }}>
            <span style={{ fontSize: "14px", color: t.textMuted }}>Voucher Code</span>
            <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "'Courier New', monospace", color: t.accent }}>A1B2C3D4</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "20px", borderBottom: `1px solid ${t.cardBorder}` }}>
            <span style={{ fontSize: "14px", color: t.textMuted }}>Duration</span>
            <span style={{ fontSize: "14px", fontWeight: "700", color: t.text }}>24 Hours</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "20px", borderBottom: `1px solid ${t.cardBorder}` }}>
            <span style={{ fontSize: "14px", color: t.textMuted }}>Time Remaining</span>
            <span style={{ fontSize: "18px", fontWeight: "800", color: "#22c55e" }}>18h 26m</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "20px", borderBottom: `1px solid ${t.cardBorder}` }}>
            <span style={{ fontSize: "14px", color: t.textMuted }}>Data Used</span>
            <span style={{ fontSize: "14px", fontWeight: "700", color: t.text }}>2.4 GB</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "14px", color: t.textMuted }}>IP Address</span>
            <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "'Courier New', monospace", color: t.text }}>192.168.1.45</span>
          </div>
        </div>

        {/* Usage Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>📥</div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: t.text, marginBottom: "4px" }}>1.4 GB</div>
            <div style={{ fontSize: "12px", color: t.textMuted, fontWeight: "600" }}>Downloaded</div>
          </div>
          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>📤</div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: t.text, marginBottom: "4px" }}>1.0 GB</div>
            <div style={{ fontSize: "12px", color: t.textMuted, fontWeight: "600" }}>Uploaded</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/hotspot" style={{ flex: 1, padding: "14px 24px", borderRadius: "12px", background: `linear-gradient(135deg, ${t.accent}, #818cf8)`, color: "#fff", fontSize: "14px", fontWeight: "700", textDecoration: "none", textAlign: "center", boxShadow: `0 4px 16px ${t.accent}44` }}>
            Buy More Time
          </Link>
          <button style={{ flex: 1, padding: "14px 24px", borderRadius: "12px", border: `2px solid #ef4444`, background: "transparent", color: "#ef4444", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
            Disconnect
          </button>
        </div>
      </main>
    </div>
  );
}
