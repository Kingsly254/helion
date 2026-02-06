"use client";
import { useMemo, useState } from "react";
import { WifiIcon, CheckIcon } from "../../components/icons";
import { getTheme } from "../../components/theme";

type Tab = "sessions" | "clients";
type ClientStatus = "active" | "suspended" | "expired";

export default function PPPoEDashboard() {
  const [dark] = useState(true);
  const t = useMemo(() => getTheme(dark), [dark]);
  const [selectedTab, setSelectedTab] = useState<Tab>("sessions");

  // Demo data (swap with API)
  const activeSessions = [
    { id: "1", username: "acme001", ip: "10.10.10.12", plan: "10 Mbps", started: "9:14 AM", uptime: "04:21:18", usage: "2.6 GB", status: "online" as const },
    { id: "2", username: "acme014", ip: "10.10.10.28", plan: "5 Mbps", started: "6:02 AM", uptime: "07:33:02", usage: "1.1 GB", status: "online" as const },
    { id: "3", username: "home127", ip: "10.10.10.77", plan: "20 Mbps", started: "11:47 AM", uptime: "01:49:54", usage: "4.9 GB", status: "online" as const },
    { id: "4", username: "shop009", ip: "10.10.10.92", plan: "10 Mbps", started: "8:30 AM", uptime: "05:05:40", usage: "0.8 GB", status: "online" as const },
  ];

  const clients = [
    { id: "c1", name: "Acme Store - CBD", username: "acme001", plan: "10 Mbps", status: "active" as ClientStatus, balance: "KSh 0", lastSeen: "Feb 6, 1:05 PM" },
    { id: "c2", name: "Acme Store - West", username: "acme014", plan: "5 Mbps", status: "active" as ClientStatus, balance: "KSh 0", lastSeen: "Feb 6, 12:52 PM" },
    { id: "c3", name: "Home Client 127", username: "home127", plan: "20 Mbps", status: "active" as ClientStatus, balance: "KSh 0", lastSeen: "Feb 6, 1:10 PM" },
    { id: "c4", name: "Small Shop 009", username: "shop009", plan: "10 Mbps", status: "suspended" as ClientStatus, balance: "KSh 600", lastSeen: "Feb 4, 9:18 PM" },
    { id: "c5", name: "Warehouse Link", username: "wh002", plan: "30 Mbps", status: "expired" as ClientStatus, balance: "KSh 1,200", lastSeen: "Jan 29, 10:01 AM" },
  ];

  const pillBg = (plan: string) => {
    // quick buckets for pills (feel free to change)
    if (plan.includes("5")) return `${t.pill12}15`;
    if (plan.includes("10")) return `${t.pill24}15`;
    return `rgba(34,197,94,0.12)`;
  };

  const pillColor = (plan: string) => {
    if (plan.includes("5")) return t.pill12;
    if (plan.includes("10")) return t.pill24;
    return "#22c55e";
  };

  const statusChip = (status: ClientStatus) => {
    if (status === "active") return { bg: "rgba(34,197,94,0.10)", color: "#22c55e", label: "active" };
    if (status === "suspended") return { bg: "rgba(239,68,68,0.10)", color: "#ef4444", label: "suspended" };
    return { bg: "rgba(100,116,139,0.12)", color: t.textMuted, label: "expired" };
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 8px" }}>PPPoE Management</h2>
        <p style={{ fontSize: "15px", color: t.textMuted, margin: 0 }}>Monitor active sessions and manage clients</p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {[
          { label: "Active Sessions", value: String(activeSessions.length), color: "#22c55e" },
          { label: "Online Clients", value: "18", color: t.accent },
          { label: "New Today", value: "3", color: t.accent2 },
          { label: "Revenue Today", value: "KSh 2,400", color: "#f59e0b" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: t.cardBg,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: "14px",
              padding: "20px",
              animation: `fadeUp 0.5s ease ${0.1 * i}s both`,
            }}
          >
            <div style={{ fontSize: "13px", color: t.textMuted, marginBottom: "8px", fontWeight: "600" }}>{stat.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", borderBottom: `1px solid ${t.cardBorder}` }}>
        {[
          { id: "sessions" as const, label: "Active Sessions", icon: <WifiIcon active /> },
          { id: "clients" as const, label: "Clients", icon: <CheckIcon /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            style={{
              padding: "14px 24px",
              borderRadius: "10px 10px 0 0",
              border: "none",
              background: selectedTab === tab.id ? t.cardBg : "transparent",
              color: selectedTab === tab.id ? t.accent : t.textMuted,
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: selectedTab === tab.id ? `2px solid ${t.accent}` : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {selectedTab === "sessions" ? (
        <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", margin: 0 }}>Active PPPoE Sessions</h3>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                background: `linear-gradient(135deg, ${t.accent}, #818cf8)`,
                color: "#fff",
                border: "none",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Refresh
            </button>
          </div>

          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                  {["Username", "IP Address", "Plan", "Started", "Uptime", "Usage", "Status", "Action"].map((header) => (
                    <th
                      key={header}
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: t.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {activeSessions.map((s, i) => (
                  <tr key={s.id} style={{ borderBottom: `1px solid ${t.cardBorder}`, animation: `fadeUp 0.4s ease ${0.1 * i}s both` }}>
                    <td style={{ padding: "16px", fontSize: "14px", fontFamily: "'Courier New', monospace", color: t.text }}>{s.username}</td>
                    <td style={{ padding: "16px", fontSize: "14px", fontFamily: "'Courier New', monospace", color: t.textMuted }}>{s.ip}</td>
                    <td style={{ padding: "16px" }}>
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: "12px",
                          background: pillBg(s.plan),
                          color: pillColor(s.plan),
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        {s.plan}
                      </span>
                    </td>
                    <td style={{ padding: "16px", fontSize: "14px", color: t.textMuted }}>{s.started}</td>
                    <td style={{ padding: "16px", fontSize: "14px", fontWeight: "700", color: t.text }}>{s.uptime}</td>
                    <td style={{ padding: "16px", fontSize: "14px", color: t.textMuted }}>{s.usage}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: "12px", background: "rgba(34,197,94,0.10)", color: "#22c55e", fontSize: "12px", fontWeight: "800" }}>
                        {s.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <button
                        style={{
                          padding: "6px 16px",
                          borderRadius: "8px",
                          border: `1px solid #ef4444`,
                          background: "transparent",
                          color: "#ef4444",
                          fontSize: "12px",
                          fontWeight: "700",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
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
            <h3 style={{ fontSize: "18px", fontWeight: "700", margin: 0 }}>PPPoE Clients</h3>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                background: `linear-gradient(135deg, ${t.accent2}, #fb923c)`,
                color: "#fff",
                border: "none",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Add Client
            </button>
          </div>

          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                  {["Client", "Username", "Plan", "Status", "Balance", "Last Seen", "Action"].map((header) => (
                    <th
                      key={header}
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: t.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {clients.map((c, i) => {
                  const chip = statusChip(c.status);
                  const isSuspended = c.status === "suspended";
                  return (
                    <tr key={c.id} style={{ borderBottom: `1px solid ${t.cardBorder}`, animation: `fadeUp 0.4s ease ${0.1 * i}s both` }}>
                      <td style={{ padding: "16px", fontSize: "14px", color: t.text, fontWeight: "700" }}>{c.name}</td>
                      <td style={{ padding: "16px", fontSize: "14px", fontFamily: "'Courier New', monospace", color: t.textMuted }}>{c.username}</td>
                      <td style={{ padding: "16px" }}>
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: "12px",
                            background: pillBg(c.plan),
                            color: pillColor(c.plan),
                            fontSize: "12px",
                            fontWeight: "700",
                          }}
                        >
                          {c.plan}
                        </span>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <span style={{ padding: "4px 12px", borderRadius: "12px", background: chip.bg, color: chip.color, fontSize: "12px", fontWeight: "800", textTransform: "capitalize" }}>
                          {chip.label}
                        </span>
                      </td>
                      <td style={{ padding: "16px", fontSize: "14px", color: c.balance === "KSh 0" ? "#22c55e" : "#f59e0b", fontWeight: "800" }}>{c.balance}</td>
                      <td style={{ padding: "16px", fontSize: "14px", color: t.textMuted }}>{c.lastSeen}</td>
                      <td style={{ padding: "16px", display: "flex", gap: "10px", alignItems: "center" }}>
                        <button
                          style={{
                            padding: "6px 14px",
                            borderRadius: "8px",
                            border: `1px solid ${isSuspended ? "#22c55e" : "#ef4444"}`,
                            background: "transparent",
                            color: isSuspended ? "#22c55e" : "#ef4444",
                            fontSize: "12px",
                            fontWeight: "800",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = isSuspended ? "rgba(34,197,94,0.10)" : "rgba(239,68,68,0.10)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {isSuspended ? "Enable" : "Disable"}
                        </button>

                        <button
                          style={{
                            padding: "6px 14px",
                            borderRadius: "8px",
                            border: `1px solid ${t.cardBorder}`,
                            background: "transparent",
                            color: t.textMuted,
                            fontSize: "12px",
                            fontWeight: "800",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(100,116,139,0.12)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
