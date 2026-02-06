"use client";
import { useState } from "react";
import { ActivityIcon, UsersIcon, CreditCardIcon, WifiIcon } from "../components/icons";
import { getTheme } from "../components/theme";

export default function DashboardPage() {
  const [dark] = useState(true);
  const t = getTheme(dark);

  const stats = [
    { label: "Active Sessions", value: "127", change: "+12%", icon: <WifiIcon active />, color: t.accent },
    { label: "Total Users", value: "1,543", change: "+8%", icon: <UsersIcon />, color: t.accent2 },
    { label: "Revenue (MTD)", value: "KSh 287K", change: "+15%", icon: <CreditCardIcon />, color: "#22c55e" },
    { label: "Bandwidth Usage", value: "4.2 TB", change: "+5%", icon: <ActivityIcon />, color: "#f59e0b" },
  ];

  const recentActivity = [
    { user: "user@254712345678", action: "Purchased 24hr voucher", time: "2 mins ago", amount: "KSh 45" },
    { user: "user@254723456789", action: "Redeemed voucher", time: "5 mins ago", amount: "-" },
    { user: "user@254734567890", action: "Purchased 12hr voucher", time: "12 mins ago", amount: "KSh 25" },
    { user: "user@254745678901", action: "Subscription renewed", time: "25 mins ago", amount: "KSh 3,500" },
    { user: "user@254756789012", action: "Purchased 24hr voucher", time: "1 hour ago", amount: "KSh 45" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 8px" }}>Welcome back!</h2>
        <p style={{ fontSize: "15px", color: t.textMuted, margin: 0 }}>Here's what's happening with your network today</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px", animation: `fadeUp 0.5s ease ${0.1 * i}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${stat.color}15`, border: `1px solid ${stat.color}33`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
                {stat.icon}
              </div>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#22c55e", background: "rgba(34,197,94,0.1)", padding: "4px 10px", borderRadius: "12px" }}>
                {stat.change}
              </span>
            </div>
            <div style={{ fontSize: "32px", fontWeight: "800", marginBottom: "4px", color: t.text }}>{stat.value}</div>
            <div style={{ fontSize: "13px", color: t.textMuted, fontWeight: "500" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "28px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
          <ActivityIcon /> Recent Activity
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {recentActivity.map((activity, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: dark ? "rgba(99,102,241,0.04)" : "#f8fafc", borderRadius: "12px", border: `1px solid ${dark ? "rgba(99,102,241,0.08)" : "#f1f5f9"}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: t.text, marginBottom: "4px" }}>{activity.user}</div>
                <div style={{ fontSize: "13px", color: t.textMuted }}>{activity.action}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: activity.amount.startsWith("KSh") ? t.accent : t.textMuted, marginBottom: "4px" }}>
                  {activity.amount}
                </div>
                <div style={{ fontSize: "12px", color: t.textMuted }}>{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "32px" }}>
        {[
          { label: "Generate Voucher", color: t.accent },
          { label: "View All Users", color: t.accent2 },
          { label: "Export Reports", color: "#22c55e" },
        ].map((action, i) => (
          <button key={i} style={{ padding: "16px 24px", borderRadius: "12px", border: "none", background: `${action.color}15`, color: action.color, fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = `${action.color}25`}
            onMouseLeave={e => e.currentTarget.style.background = `${action.color}15`}>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
