"use client";
import { useState } from "react";
import { CreditCardIcon, CheckIcon } from "../../components/icons";
import { getTheme } from "../../components/theme";

export default function PaymentsPage() {
  const [dark] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "completed" | "failed">("all");
  const t = getTheme(dark);

  const transactions = [
    { id: "TXN-001", phone: "0712 345 678", type: "24hr Voucher", amount: "45", status: "completed", time: "2:34 PM", date: "Feb 6, 2026" },
    { id: "TXN-002", phone: "0723 456 789", type: "12hr Voucher", amount: "25", status: "completed", time: "1:15 PM", date: "Feb 6, 2026" },
    { id: "TXN-003", phone: "0734 567 890", type: "PPPoE - Standard", amount: "3,500", status: "pending", time: "12:45 PM", date: "Feb 6, 2026" },
    { id: "TXN-004", phone: "0745 678 901", type: "24hr Voucher", amount: "45", status: "failed", time: "11:30 AM", date: "Feb 6, 2026" },
    { id: "TXN-005", phone: "0756 789 012", type: "12hr Voucher", amount: "25", status: "completed", time: "10:22 AM", date: "Feb 6, 2026" },
    { id: "TXN-006", phone: "0767 890 123", type: "PPPoE - Premium", amount: "5,500", status: "completed", time: "9:15 AM", date: "Feb 6, 2026" },
  ];

  const filteredTransactions = filter === "all" 
    ? transactions 
    : transactions.filter(t => t.status === filter);

  const statusColors = {
    completed: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)", text: "#22c55e" },
    pending: { bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)", text: "#f97316" },
    failed: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", text: "#ef4444" },
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 8px" }}>Payments & Transactions</h2>
        <p style={{ fontSize: "15px", color: t.textMuted, margin: 0 }}>Track all payments and manage billing</p>
      </div>

      {/* Revenue Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {[
          { label: "Today's Revenue", value: "KSh 4,140", change: "+18%", color: "#22c55e" },
          { label: "This Week", value: "KSh 23,750", change: "+12%", color: t.accent },
          { label: "This Month", value: "KSh 287,400", change: "+15%", color: t.accent2 },
          { label: "Pending", value: "KSh 3,500", change: "1 txn", color: "#f59e0b" },
        ].map((stat, i) => (
          <div key={i} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "14px", padding: "20px", animation: `fadeUp 0.5s ease ${0.1 * i}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", color: t.textMuted, fontWeight: "600" }}>{stat.label}</span>
              <span style={{ fontSize: "11px", fontWeight: "700", color: stat.color, background: `${stat.color}15`, padding: "4px 10px", borderRadius: "12px" }}>
                {stat.change}
              </span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: t.text }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters & Actions */}
      <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {(["all", "pending", "completed", "failed"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{ padding: "8px 18px", borderRadius: "10px", border: filter === status ? `2px solid ${t.accent}` : `1px solid ${t.cardBorder}`, background: filter === status ? `${t.accent}15` : "transparent", color: filter === status ? t.accent : t.textMuted, fontSize: "13px", fontWeight: "700", cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s" }}
              >
                {status}
              </button>
            ))}
          </div>

          <button style={{ padding: "10px 20px", borderRadius: "10px", background: `linear-gradient(135deg, ${t.accent}, #818cf8)`, color: "#fff", border: "none", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>
            Export CSV
          </button>
        </div>

        {/* Transaction Table */}
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                {["Transaction ID", "Phone Number", "Type", "Amount", "Status", "Date & Time"].map((header) => (
                  <th key={header} style={{ textAlign: "left", padding: "12px 16px", fontSize: "12px", fontWeight: "700", color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn, i) => (
                <tr key={txn.id} style={{ borderBottom: `1px solid ${t.cardBorder}`, animation: `fadeUp 0.4s ease ${0.1 * i}s both` }}>
                  <td style={{ padding: "16px", fontSize: "14px", fontFamily: "'Courier New', monospace", color: t.accent, fontWeight: "600" }}>{txn.id}</td>
                  <td style={{ padding: "16px", fontSize: "14px", fontFamily: "'Courier New', monospace", color: t.text }}>{txn.phone}</td>
                  <td style={{ padding: "16px", fontSize: "14px", color: t.textMuted }}>{txn.type}</td>
                  <td style={{ padding: "16px", fontSize: "16px", fontWeight: "700", color: t.text }}>
                    KSh {txn.amount}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span style={{ 
                      padding: "6px 14px", 
                      borderRadius: "12px", 
                      background: statusColors[txn.status as keyof typeof statusColors].bg, 
                      border: `1px solid ${statusColors[txn.status as keyof typeof statusColors].border}`,
                      color: statusColors[txn.status as keyof typeof statusColors].text, 
                      fontSize: "12px", 
                      fontWeight: "700", 
                      textTransform: "capitalize",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}>
                      {txn.status === "completed" && <CheckIcon />}
                      {txn.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px", fontSize: "14px", color: t.textMuted }}>
                    <div>{txn.date}</div>
                    <div style={{ fontSize: "12px", marginTop: "2px" }}>{txn.time}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }}>💳</div>
            <p style={{ fontSize: "16px", color: t.textMuted, margin: 0 }}>No {filter !== "all" ? filter : ""} transactions found</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        {[
          { icon: <CreditCardIcon />, label: "M-Pesa Payments", value: "98.5%", color: "#22c55e" },
          { icon: <CheckIcon />, label: "Success Rate", value: "99.2%", color: t.accent },
        ].map((stat, i) => (
          <div key={i} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "14px", padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${stat.color}15`, border: `1px solid ${stat.color}33`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: "13px", color: t.textMuted, marginBottom: "4px" }}>{stat.label}</div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: t.text }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
