"use client";
import { useState } from "react";
import { WifiIcon, CheckIcon } from "../../components/icons";
import { getTheme } from "../../components/theme";

export default function HotspotDashboard() {
  const [dark] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"active" | "vouchers">("active");
  const t = getTheme(dark);

  const activeSessions = [
    { id: "1", user: "192.168.1.45", voucher: "A1B2C3D4", started: "2:34 PM", duration: "12hr", remaining: "9h 26m", usage: "1.2 GB" },
    { id: "2", user: "192.168.1.67", voucher: "E5F6G7H8", started: "11:15 AM", duration: "24hr", remaining: "18h 41m", usage: "3.8 GB" },
    { id: "3", user: "192.168.1.89", voucher: "I9J0K1L2", started: "3:02 PM", duration: "12hr", remaining: "8h 58m", usage: "0.7 GB" },
    { id: "4", user: "192.168.1.123", voucher: "M3N4O5P6", started: "1:47 PM", duration: "24hr", remaining: "21h 13m", usage: "2.1 GB" },
  ];

  const voucherBatches = [
    { id: "1", code: "A1B2C3D4", type: "12hr", status: "used", created: "Feb 6, 2:30 PM", usedBy: "192.168.1.45" },
    { id: "2", code: "E5F6G7H8", type: "24hr", status: "used", created: "Feb 6, 11:10 AM", usedBy: "192.168.1.67" },
    { id: "3", code: "Q7R8S9T0", type: "12hr", status: "available", created: "Feb 6, 3:45 PM", usedBy: "-" },
    { id: "4", code: "U1V2W3X4", type: "24hr", status: "available", created: "Feb 6, 4:12 PM", usedBy: "-" },
    { id: "5", code: "Y5Z6A7B8", type: "12hr", status: "available", created: "Feb 6, 4:30 PM", usedBy: "-" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 8px" }}>Hotspot Management</h2>
        <p style={{ fontSize: "15px", color: t.textMuted, margin: 0 }}>Monitor active sessions and manage vouchers</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {[
          { label: "Active Sessions", value: "4", color: "#22c55e" },
          { label: "Available Vouchers", value: "3", color: t.accent },
          { label: "Used Today", value: "12", color: t.accent2 },
          { label: "Revenue Today", value: "KSh 540", color: "#f59e0b" },
        ].map((stat, i) => (
          <div key={i} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "14px", padding: "20px", animation: `fadeUp 0.5s ease ${0.1 * i}s both` }}>
            <div style={{ fontSize: "13px", color: t.textMuted, marginBottom: "8px", fontWeight: "600" }}>{stat.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", borderBottom: `1px solid ${t.cardBorder}`, paddingBottom: "0" }}>
        {[
          { id: "active" as const, label: "Active Sessions", icon: <WifiIcon active /> },
          { id: "vouchers" as const, label: "Voucher Codes", icon: <CheckIcon /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            style={{ padding: "14px 24px", borderRadius: "10px 10px 0 0", border: "none", background: selectedTab === tab.id ? t.cardBg : "transparent", color: selectedTab === tab.id ? t.accent : t.textMuted, fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", borderBottom: selectedTab === tab.id ? `2px solid ${t.accent}` : "2px solid transparent", transition: "all 0.2s" }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {selectedTab === "active" ? (
        <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", margin: 0 }}>Active Sessions</h3>
            <button style={{ padding: "10px 20px", borderRadius: "10px", background: `linear-gradient(135deg, ${t.accent}, #818cf8)`, color: "#fff", border: "none", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>
              Refresh
            </button>
          </div>

          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                  {["IP Address", "Voucher", "Started", "Duration", "Remaining", "Usage", "Action"].map((header) => (
                    <th key={header} style={{ textAlign: "left", padding: "12px 16px", fontSize: "12px", fontWeight: "700", color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeSessions.map((session, i) => (
                  <tr key={session.id} style={{ borderBottom: `1px solid ${t.cardBorder}`, animation: `fadeUp 0.4s ease ${0.1 * i}s both` }}>
                    <td style={{ padding: "16px", fontSize: "14px", fontFamily: "'Courier New', monospace", color: t.text }}>{session.user}</td>
                    <td style={{ padding: "16px", fontSize: "14px", fontFamily: "'Courier New', monospace", color: t.accent, fontWeight: "600" }}>{session.voucher}</td>
                    <td style={{ padding: "16px", fontSize: "14px", color: t.textMuted }}>{session.started}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: "12px", background: session.duration === "12hr" ? `${t.pill12}15` : `${t.pill24}15`, color: session.duration === "12hr" ? t.pill12 : t.pill24, fontSize: "12px", fontWeight: "700" }}>
                        {session.duration}
                      </span>
                    </td>
                    <td style={{ padding: "16px", fontSize: "14px", fontWeight: "600", color: "#22c55e" }}>{session.remaining}</td>
                    <td style={{ padding: "16px", fontSize: "14px", color: t.textMuted }}>{session.usage}</td>
                    <td style={{ padding: "16px" }}>
                      <button style={{ padding: "6px 16px", borderRadius: "8px", border: `1px solid #ef4444`, background: "transparent", color: "#ef4444", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        Disconnect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", margin: 0 }}>Voucher Codes</h3>
            <button style={{ padding: "10px 20px", borderRadius: "10px", background: `linear-gradient(135deg, ${t.accent2}, #fb923c)`, color: "#fff", border: "none", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>
              Generate Batch
            </button>
          </div>

          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                  {["Code", "Type", "Status", "Created", "Used By"].map((header) => (
                    <th key={header} style={{ textAlign: "left", padding: "12px 16px", fontSize: "12px", fontWeight: "700", color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {voucherBatches.map((voucher, i) => (
                  <tr key={voucher.id} style={{ borderBottom: `1px solid ${t.cardBorder}`, animation: `fadeUp 0.4s ease ${0.1 * i}s both` }}>
                    <td style={{ padding: "16px", fontSize: "14px", fontFamily: "'Courier New', monospace", color: t.accent, fontWeight: "700" }}>{voucher.code}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: "12px", background: voucher.type === "12hr" ? `${t.pill12}15` : `${t.pill24}15`, color: voucher.type === "12hr" ? t.pill12 : t.pill24, fontSize: "12px", fontWeight: "700" }}>
                        {voucher.type}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: "12px", background: voucher.status === "available" ? "rgba(34,197,94,0.1)" : "rgba(100,116,139,0.1)", color: voucher.status === "available" ? "#22c55e" : t.textMuted, fontSize: "12px", fontWeight: "700", textTransform: "capitalize" }}>
                        {voucher.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px", fontSize: "14px", color: t.textMuted }}>{voucher.created}</td>
                    <td style={{ padding: "16px", fontSize: "14px", fontFamily: "'Courier New', monospace", color: t.textMuted }}>{voucher.usedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
