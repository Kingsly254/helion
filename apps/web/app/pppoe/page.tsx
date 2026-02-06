"use client";
import { useMemo, useState } from "react";
import { WifiIcon, CheckIcon } from "../components/icons";
import { getTheme } from "../components/theme";

type Tab = "overview" | "billing" | "usage" | "support" | "settings";
type TicketStatus = "open" | "in_progress" | "resolved";

export default function PPPoEClientDashboard() {
  const [dark] = useState(true);
  const t = useMemo(() => getTheme(dark), [dark]);
  const [tab, setTab] = useState<Tab>("overview");

  // ---- Demo user/account data (replace with API) ----
  const account = {
    name: "Kingsley Wisietsa",
    status: "online" as const, // online | offline
    planName: "Home Pro - 100 Mbps",
    accountNumber: "ACC-102938", // (you said “IP Address” but you want account number for support)
    ipAddress: "10.10.10.77",
    daysRemaining: 12,
    balance: 0,
    lastPayment: { date: "Feb 5, 2026", amount: 2500, method: "M-Pesa" },
    networkHealth: "green" as const, // green | yellow | red
    dataCapGB: 300, // even if unlimited, keep a cap for gauge UX
    dataUsedGB: 187.4,
  };

  const invoices = [
    { id: "inv1", date: "Feb 5, 2026", amount: 2500, period: "Feb 2026", status: "paid" },
    { id: "inv2", date: "Jan 5, 2026", amount: 2500, period: "Jan 2026", status: "paid" },
    { id: "inv3", date: "Dec 5, 2025", amount: 2500, period: "Dec 2025", status: "paid" },
  ];

  const dailyUsage = [
    { day: "Mon", gb: 18 },
    { day: "Tue", gb: 22 },
    { day: "Wed", gb: 9 },
    { day: "Thu", gb: 27 },
    { day: "Fri", gb: 15 },
    { day: "Sat", gb: 34 },
    { day: "Sun", gb: 12 },
  ];

  const sessions = [
    { id: "s1", login: "Feb 6, 2026 06:02 AM", logout: "-", reason: "Active", ip: "10.10.10.77" },
    { id: "s2", login: "Feb 5, 2026 09:14 AM", logout: "Feb 5, 2026 01:52 PM", reason: "Power cut", ip: "10.10.10.77" },
    { id: "s3", login: "Feb 4, 2026 08:31 AM", logout: "Feb 4, 2026 11:10 AM", reason: "Router reboot", ip: "10.10.10.77" },
  ];

  const tickets: Array<{ id: string; subject: string; status: TicketStatus; created: string; lastUpdate: string }> = [
    { id: "TCK-1042", subject: "Slow Internet in the evening", status: "in_progress", created: "Feb 4, 2026", lastUpdate: "Feb 5, 2026" },
    { id: "TCK-1031", subject: "No connection (PPPoE auth fail)", status: "resolved", created: "Jan 28, 2026", lastUpdate: "Jan 28, 2026" },
  ];

  // ---- UI helpers ----
  const onlineChip = account.status === "online"
    ? { bg: "rgba(34,197,94,0.12)", color: "#22c55e", label: "Online" }
    : { bg: "rgba(239,68,68,0.12)", color: "#ef4444", label: "Offline" };

  const healthChip = (() => {
    if (account.networkHealth === "green") return { bg: "rgba(34,197,94,0.12)", color: "#22c55e", label: "Healthy" };
    if (account.networkHealth === "yellow") return { bg: "rgba(245,158,11,0.14)", color: "#f59e0b", label: "Degraded" };
    return { bg: "rgba(239,68,68,0.12)", color: "#ef4444", label: "Down" };
  })();

  const fmtKsh = (n: number) => `KSh ${n.toLocaleString("en-KE")}`;

  const usagePct = Math.min(100, Math.round((account.dataUsedGB / account.dataCapGB) * 100));
  const ringBg = `conic-gradient(${t.accent} ${usagePct * 3.6}deg, rgba(100,116,139,0.25) 0deg)`;

  // Quick, simple "bar chart" scaling
  const maxGb = Math.max(...dailyUsage.map(d => d.gb), 1);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 8px" }}>My Internet</h2>
          <p style={{ fontSize: "15px", color: t.textMuted, margin: 0 }}>
            Account: <span style={{ color: t.accent, fontWeight: 700 }}>{account.accountNumber}</span> • Plan:{" "}
            <span style={{ color: t.text, fontWeight: 700 }}>{account.planName}</span>
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ padding: "8px 12px", borderRadius: "999px", background: onlineChip.bg, color: onlineChip.color, fontWeight: 900, fontSize: "12px", letterSpacing: "0.4px" }}>
            {onlineChip.label}
          </span>

          <button
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              background: `linear-gradient(135deg, ${t.accent2}, #fb923c)`,
              color: "#fff",
              border: "none",
              fontSize: "13px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            Quick Pay
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", borderBottom: `1px solid ${t.cardBorder}` }}>
        {[
          { id: "overview" as const, label: "Overview", icon: <WifiIcon active /> },
          { id: "billing" as const, label: "Billing", icon: <CheckIcon /> },
          { id: "usage" as const, label: "Usage", icon: <WifiIcon active /> },
          { id: "support" as const, label: "Support", icon: <CheckIcon /> },
          { id: "settings" as const, label: "Settings", icon: <CheckIcon /> },
        ].map((x) => (
          <button
            key={x.id}
            onClick={() => setTab(x.id)}
            style={{
              padding: "14px 20px",
              borderRadius: "10px 10px 0 0",
              border: "none",
              background: tab === x.id ? t.cardBg : "transparent",
              color: tab === x.id ? t.accent : t.textMuted,
              fontSize: "14px",
              fontWeight: "800",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: tab === x.id ? `2px solid ${t.accent}` : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {x.icon}
            {x.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <>
          {/* At-a-glance tiles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            {/* Days Remaining */}
            <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "20px" }}>
              <div style={{ color: t.textMuted, fontSize: "13px", fontWeight: 700, marginBottom: "10px" }}>Days Remaining</div>
              <div style={{ fontSize: "34px", fontWeight: 900, color: account.daysRemaining <= 3 ? "#ef4444" : "#22c55e" }}>
                {account.daysRemaining} <span style={{ fontSize: "14px", color: t.textMuted, fontWeight: 800 }}>days</span>
              </div>
              <div style={{ marginTop: "10px", color: t.textMuted, fontSize: "13px" }}>
                Service renews when you pay your subscription.
              </div>
            </div>

            {/* Last Payment */}
            <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "20px" }}>
              <div style={{ color: t.textMuted, fontSize: "13px", fontWeight: 700, marginBottom: "10px" }}>Last Payment</div>
              <div style={{ fontSize: "24px", fontWeight: 900, color: t.accent }}>{fmtKsh(account.lastPayment.amount)}</div>
              <div style={{ marginTop: "8px", color: t.textMuted, fontSize: "13px", fontWeight: 700 }}>
                {account.lastPayment.date} • {account.lastPayment.method}
              </div>
            </div>

            {/* Network Health */}
            <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "20px" }}>
              <div style={{ color: t.textMuted, fontSize: "13px", fontWeight: 700, marginBottom: "10px" }}>Network Health</div>
              <span style={{ display: "inline-block", padding: "8px 12px", borderRadius: "999px", background: healthChip.bg, color: healthChip.color, fontWeight: 900, fontSize: "12px" }}>
                {healthChip.label}
              </span>
              <div style={{ marginTop: "12px", color: t.textMuted, fontSize: "13px" }}>
                Status of your local area network performance.
              </div>
            </div>

            {/* Usage Gauge */}
            <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "20px", display: "flex", gap: "16px", alignItems: "center" }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "999px",
                  background: ringBg,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <div style={{ width: "56px", height: "56px", borderRadius: "999px", background: t.cardBg, border: `1px solid ${t.cardBorder}`, display: "grid", placeItems: "center" }}>
                  <div style={{ fontSize: "12px", fontWeight: 900, color: t.text }}>{usagePct}%</div>
                </div>
              </div>
              <div>
                <div style={{ color: t.textMuted, fontSize: "13px", fontWeight: 700 }}>Usage Gauge</div>
                <div style={{ fontSize: "14px", fontWeight: 900, color: t.text }}>
                  {account.dataUsedGB.toFixed(1)} GB <span style={{ color: t.textMuted, fontWeight: 800 }}> / {account.dataCapGB} GB</span>
                </div>
                <div style={{ marginTop: "6px", color: t.textMuted, fontSize: "12px" }}>
                  Even unlimited plans show usage for visibility.
                </div>
              </div>
            </div>
          </div>

          {/* Connection details */}
          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "800", margin: "0 0 14px" }}>Connection Overview</h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <InfoRow label="Connection Status" value={onlineChip.label} valueColor={onlineChip.color} t={t} />
              <InfoRow label="Current Plan" value={account.planName} valueColor={t.accent} t={t} />
              <InfoRow label="Account Number" value={account.accountNumber} valueColor={t.text} t={t} mono />
              <InfoRow label="WAN IP Address" value={account.ipAddress} valueColor={t.textMuted} t={t} mono />
            </div>

            <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: `linear-gradient(135deg, ${t.accent}, #818cf8)`,
                  color: "#fff",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
              >
                Renew Plan
              </button>

              <button
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: "transparent",
                  color: t.text,
                  border: `1px solid ${t.cardBorder}`,
                  fontSize: "13px",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.10)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </>
      )}

      {/* BILLING */}
      {tab === "billing" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px" }}>
          {/* Balance + actions */}
          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "800", margin: "0 0 14px" }}>Billing & Finance</h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "16px" }}>
              <div style={{ background: t.inputBg, border: `1px solid ${t.cardBorder}`, borderRadius: "14px", padding: "16px" }}>
                <div style={{ fontSize: "13px", color: t.textMuted, fontWeight: 700, marginBottom: "8px" }}>Account Balance</div>
                <div style={{ fontSize: "28px", fontWeight: 900, color: account.balance > 0 ? "#f59e0b" : "#22c55e" }}>
                  {fmtKsh(account.balance)}
                </div>
                <div style={{ marginTop: "6px", fontSize: "12px", color: t.textMuted }}>
                  {account.balance > 0 ? "Please pay to avoid suspension." : "You are up to date."}
                </div>
              </div>

              <div style={{ background: t.inputBg, border: `1px solid ${t.cardBorder}`, borderRadius: "14px", padding: "16px" }}>
                <div style={{ fontSize: "13px", color: t.textMuted, fontWeight: 700, marginBottom: "8px" }}>Quick Pay</div>
                <button
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${t.accent2}, #fb923c)`,
                    color: "#fff",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: "900",
                    cursor: "pointer",
                  }}
                >
                  Pay with M-Pesa / Card
                </button>
                <div style={{ marginTop: "10px", fontSize: "12px", color: t.textMuted }}>
                  Opens your payment gateway checkout.
                </div>
              </div>
            </div>

            {/* Subscription Management */}
            <div style={{ background: t.inputBg, border: `1px solid ${t.cardBorder}`, borderRadius: "14px", padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "13px", color: t.textMuted, fontWeight: 700 }}>Subscription Management</div>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: t.text, marginTop: "6px" }}>{account.planName}</div>
                  <div style={{ fontSize: "12px", color: t.textMuted, marginTop: "6px" }}>Renew or upgrade anytime.</div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={{
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: `linear-gradient(135deg, ${t.accent}, #818cf8)`,
                      color: "#fff",
                      border: "none",
                      fontSize: "12px",
                      fontWeight: "900",
                      cursor: "pointer",
                    }}
                  >
                    Renew
                  </button>
                  <button
                    style={{
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "transparent",
                      color: t.text,
                      border: `1px solid ${t.cardBorder}`,
                      fontSize: "12px",
                      fontWeight: "900",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.10)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice History */}
          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "800", margin: "0 0 14px" }}>Invoices</h3>
            <div style={{ overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                    {["Period", "Date", "Amount", "Status", "Download"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 10px", fontSize: "12px", fontWeight: 900, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                      <td style={{ padding: "14px 10px", fontSize: "14px", fontWeight: 800, color: t.text }}>{inv.period}</td>
                      <td style={{ padding: "14px 10px", fontSize: "14px", color: t.textMuted }}>{inv.date}</td>
                      <td style={{ padding: "14px 10px", fontSize: "14px", fontWeight: 900, color: t.accent }}>{fmtKsh(inv.amount)}</td>
                      <td style={{ padding: "14px 10px" }}>
                        <span style={{ padding: "5px 10px", borderRadius: "999px", background: "rgba(34,197,94,0.12)", color: "#22c55e", fontSize: "12px", fontWeight: 900 }}>
                          {inv.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 10px" }}>
                        <button
                          style={{
                            padding: "8px 12px",
                            borderRadius: "10px",
                            border: `1px solid ${t.cardBorder}`,
                            background: "transparent",
                            color: t.text,
                            fontSize: "12px",
                            fontWeight: 900,
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(100,116,139,0.12)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "14px", fontSize: "12px", color: t.textMuted }}>
              Hook this to your backend: <span style={{ color: t.accent, fontWeight: 900 }}>GET /api/invoices</span> + signed PDF URL.
            </div>
          </div>
        </div>
      )}

      {/* USAGE */}
      {tab === "usage" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px" }}>
          {/* Data consumption chart */}
          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", margin: 0 }}>Data Consumption</h3>
              <div style={{ fontSize: "12px", color: t.textMuted, fontWeight: 800 }}>
                This week • Used {account.dataUsedGB.toFixed(1)} GB
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px", alignItems: "end", height: "170px" }}>
              {dailyUsage.map((d) => {
                const h = Math.max(10, Math.round((d.gb / maxGb) * 160));
                return (
                  <div key={d.day} style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
                    <div
                      title={`${d.gb} GB`}
                      style={{
                        width: "100%",
                        height: `${h}px`,
                        borderRadius: "12px",
                        background: `linear-gradient(180deg, ${t.accent}, rgba(99,102,241,0.25))`,
                        border: `1px solid ${t.cardBorder}`,
                      }}
                    />
                    <div style={{ fontSize: "12px", color: t.textMuted, fontWeight: 900 }}>{d.day}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: "14px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <MiniStat label="Avg / Day" value={`${(dailyUsage.reduce((a, b) => a + b.gb, 0) / dailyUsage.length).toFixed(1)} GB`} t={t} />
              <MiniStat label="Peak Day" value={`${maxGb} GB`} t={t} />
              <MiniStat label="Plan Cap" value={`${account.dataCapGB} GB`} t={t} />
            </div>
          </div>

          {/* Active sessions */}
          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "800", margin: "0 0 14px" }}>Active Sessions</h3>
            <div style={{ overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                    {["Login", "Logout", "Reason"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 10px", fontSize: "12px", fontWeight: 900, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id} style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                      <td style={{ padding: "14px 10px", fontSize: "13px", color: t.text }}>{s.login}</td>
                      <td style={{ padding: "14px 10px", fontSize: "13px", color: t.textMuted }}>{s.logout}</td>
                      <td style={{ padding: "14px 10px", fontSize: "13px", color: t.textMuted }}>{s.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "12px", fontSize: "12px", color: t.textMuted }}>
              Helps users spot <b style={{ color: t.text }}>power cuts</b> or <b style={{ color: t.text }}>router reboots</b>.
            </div>
          </div>
        </div>
      )}

      {/* SUPPORT */}
      {tab === "support" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px" }}>
          {/* Tickets */}
          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", margin: 0 }}>My Tickets</h3>
              <button
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: `linear-gradient(135deg, ${t.accent}, #818cf8)`,
                  color: "#fff",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: "900",
                  cursor: "pointer",
                }}
              >
                Open a Ticket
              </button>
            </div>

            <div style={{ overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                    {["Ticket", "Subject", "Status", "Last Update"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 10px", fontSize: "12px", fontWeight: 900, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((tk) => {
                    const chip =
                      tk.status === "resolved"
                        ? { bg: "rgba(34,197,94,0.12)", color: "#22c55e" }
                        : tk.status === "in_progress"
                        ? { bg: "rgba(245,158,11,0.14)", color: "#f59e0b" }
                        : { bg: "rgba(239,68,68,0.12)", color: "#ef4444" };

                    return (
                      <tr key={tk.id} style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                        <td style={{ padding: "14px 10px", fontSize: "13px", fontWeight: 900, color: t.accent, fontFamily: "'Courier New', monospace" }}>{tk.id}</td>
                        <td style={{ padding: "14px 10px", fontSize: "13px", color: t.text, fontWeight: 800 }}>{tk.subject}</td>
                        <td style={{ padding: "14px 10px" }}>
                          <span style={{ padding: "5px 10px", borderRadius: "999px", background: chip.bg, color: chip.color, fontSize: "12px", fontWeight: 900, textTransform: "capitalize" }}>
                            {tk.status.replace("_", " ")}
                          </span>
                        </td>
                        <td style={{ padding: "14px 10px", fontSize: "13px", color: t.textMuted }}>{tk.lastUpdate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ticket form + speed test */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Open ticket */}
            <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", margin: "0 0 14px" }}>Open a Ticket</h3>

              <label style={{ display: "block", fontSize: "12px", color: t.textMuted, fontWeight: 900, marginBottom: "8px" }}>Issue Type</label>
              <select
                style={{
                  width: "100%",
                  padding: "12px 12px",
                  borderRadius: "12px",
                  border: `1px solid ${t.inputBorder}`,
                  background: t.inputBg,
                  color: t.text,
                  outline: "none",
                  marginBottom: "12px",
                }}
                defaultValue="slow"
              >
                <option value="slow">Slow Internet</option>
                <option value="down">No Connection</option>
                <option value="billing">Billing Issue</option>
                <option value="other">Other</option>
              </select>

              <label style={{ display: "block", fontSize: "12px", color: t.textMuted, fontWeight: 900, marginBottom: "8px" }}>Message</label>
              <textarea
                rows={4}
                placeholder="Describe what you are experiencing…"
                style={{
                  width: "100%",
                  padding: "12px 12px",
                  borderRadius: "12px",
                  border: `1px solid ${t.inputBorder}`,
                  background: t.inputBg,
                  color: t.text,
                  outline: "none",
                  resize: "vertical",
                  marginBottom: "12px",
                }}
              />

              <button
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: `linear-gradient(135deg, ${t.accent}, #818cf8)`,
                  color: "#fff",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: "900",
                  cursor: "pointer",
                }}
              >
                Submit Ticket
              </button>
            </div>

            {/* Speed test */}
            <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", margin: "0 0 10px" }}>Speed Test</h3>
              <p style={{ margin: "0 0 14px", color: t.textMuted, fontSize: "13px" }}>
                Embed your preferred tool (Ookla widget) or your own test page.
              </p>

              {/* Placeholder embed area */}
              <div
                style={{
                  height: "220px",
                  borderRadius: "14px",
                  border: `1px dashed ${t.cardBorder}`,
                  background: "rgba(100,116,139,0.06)",
                  display: "grid",
                  placeItems: "center",
                  color: t.textMuted,
                  fontWeight: 800,
                  fontSize: "13px",
                }}
              >
                Speedtest Widget Placeholder
              </div>

              {/* Example (when you have the embed): */}
              {/* <iframe src="YOUR_SPEEDTEST_URL" style={{ width: "100%", height: 320, border: 0, borderRadius: 14 }} /> */}
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS */}
      {tab === "settings" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {/* Wi-Fi settings (TR-069) */}
          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "800", margin: "0 0 14px" }}>Wi-Fi Settings</h3>
            <p style={{ margin: "0 0 14px", color: t.textMuted, fontSize: "13px" }}>
              If TR-069 is enabled on your router, you can change your Wi-Fi name and password here.
            </p>

            <label style={{ display: "block", fontSize: "12px", color: t.textMuted, fontWeight: 900, marginBottom: "8px" }}>Wi-Fi Name (SSID)</label>
            <input
              placeholder="e.g., HomePro-WiFi"
              style={{
                width: "100%",
                padding: "12px 12px",
                borderRadius: "12px",
                border: `1px solid ${t.inputBorder}`,
                background: t.inputBg,
                color: t.text,
                outline: "none",
                marginBottom: "12px",
              }}
            />

            <label style={{ display: "block", fontSize: "12px", color: t.textMuted, fontWeight: 900, marginBottom: "8px" }}>Wi-Fi Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 12px",
                borderRadius: "12px",
                border: `1px solid ${t.inputBorder}`,
                background: t.inputBg,
                color: t.text,
                outline: "none",
                marginBottom: "12px",
              }}
            />

            <button
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${t.accent2}, #fb923c)`,
                color: "#fff",
                border: "none",
                fontSize: "13px",
                fontWeight: "900",
                cursor: "pointer",
              }}
            >
              Save Wi-Fi Settings
            </button>

            <div style={{ marginTop: "12px", fontSize: "12px", color: t.textMuted }}>
              Backend idea: <span style={{ color: t.accent, fontWeight: 900 }}>POST /api/tr069/wifi</span> (ssid, password, deviceId).
            </div>
          </div>

          {/* Profile */}
          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "800", margin: "0 0 14px" }}>Profile</h3>

            <label style={{ display: "block", fontSize: "12px", color: t.textMuted, fontWeight: 900, marginBottom: "8px" }}>Full Name</label>
            <input
              defaultValue={account.name}
              style={{
                width: "100%",
                padding: "12px 12px",
                borderRadius: "12px",
                border: `1px solid ${t.inputBorder}`,
                background: t.inputBg,
                color: t.text,
                outline: "none",
                marginBottom: "12px",
              }}
            />

            <label style={{ display: "block", fontSize: "12px", color: t.textMuted, fontWeight: 900, marginBottom: "8px" }}>Phone Number</label>
            <input
              placeholder="e.g., 0712 345 678"
              style={{
                width: "100%",
                padding: "12px 12px",
                borderRadius: "12px",
                border: `1px solid ${t.inputBorder}`,
                background: t.inputBg,
                color: t.text,
                outline: "none",
                marginBottom: "12px",
              }}
            />

            <label style={{ display: "block", fontSize: "12px", color: t.textMuted, fontWeight: 900, marginBottom: "8px" }}>Email</label>
            <input
              placeholder="e.g., name@example.com"
              style={{
                width: "100%",
                padding: "12px 12px",
                borderRadius: "12px",
                border: `1px solid ${t.inputBorder}`,
                background: t.inputBg,
                color: t.text,
                outline: "none",
                marginBottom: "12px",
              }}
            />

            <button
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${t.accent}, #818cf8)`,
                color: "#fff",
                border: "none",
                fontSize: "13px",
                fontWeight: "900",
                cursor: "pointer",
              }}
            >
              Save Profile
            </button>

            <div style={{ marginTop: "12px", fontSize: "12px", color: t.textMuted }}>
              Used for SMS/Email alerts and payment receipts.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
  valueColor,
  t,
  mono,
}: {
  label: string;
  value: string;
  valueColor: string;
  t: any;
  mono?: boolean;
}) {
  return (
    <div style={{ background: t.inputBg, border: `1px solid ${t.cardBorder}`, borderRadius: "14px", padding: "16px" }}>
      <div style={{ fontSize: "13px", color: t.textMuted, fontWeight: 700, marginBottom: "8px" }}>{label}</div>
      <div style={{ fontSize: "15px", fontWeight: 900, color: valueColor, fontFamily: mono ? "'Courier New', monospace" : "inherit" }}>{value}</div>
    </div>
  );
}

function MiniStat({ label, value, t }: { label: string; value: string; t: any }) {
  return (
    <div style={{ background: t.inputBg, border: `1px solid ${t.cardBorder}`, borderRadius: "14px", padding: "12px 14px" }}>
      <div style={{ fontSize: "12px", color: t.textMuted, fontWeight: 900 }}>{label}</div>
      <div style={{ marginTop: "6px", fontSize: "14px", fontWeight: 900, color: t.text }}>{value}</div>
    </div>
  );
}
