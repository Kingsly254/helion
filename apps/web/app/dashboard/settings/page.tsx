"use client";
import { useState } from "react";
import { SettingsIcon, CheckIcon } from "../../components/icons";
import { getTheme } from "../../components/theme";

export default function SettingsPage() {
  const [dark] = useState(true);
  const [activeTab, setActiveTab] = useState<"general" | "network" | "pricing" | "notifications">("general");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const t = getTheme(dark);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 8px" }}>Settings</h2>
        <p style={{ fontSize: "15px", color: t.textMuted, margin: 0 }}>Configure your system preferences</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", borderBottom: `1px solid ${t.cardBorder}`, paddingBottom: "0", overflowX: "auto" }}>
        {[
          { id: "general" as const, label: "General" },
          { id: "network" as const, label: "Network" },
          { id: "pricing" as const, label: "Pricing" },
          { id: "notifications" as const, label: "Notifications" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ padding: "14px 24px", borderRadius: "10px 10px 0 0", border: "none", background: activeTab === tab.id ? t.cardBg : "transparent", color: activeTab === tab.id ? t.accent : t.textMuted, fontSize: "14px", fontWeight: "700", cursor: "pointer", borderBottom: activeTab === tab.id ? `2px solid ${t.accent}` : "2px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Save Success Banner */}
      {saveSuccess && (
        <div style={{ background: t.successBg, border: "1px solid rgba(34,197,94,0.3)", borderRadius: "12px", padding: "14px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px", animation: "fadeUp 0.3s ease" }}>
          <span style={{ color: "#22c55e" }}><CheckIcon /></span>
          <span style={{ fontSize: "14px", color: "#22c55e", fontWeight: "600" }}>Settings saved successfully!</span>
        </div>
      )}

      {/* Content */}
      <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "32px" }}>
        {activeTab === "general" && (
          <div style={{ maxWidth: "600px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "24px" }}>General Settings</h3>
            
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>Company Name</label>
              <input
                type="text"
                defaultValue="HotPot ISP"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>Support Email</label>
              <input
                type="email"
                defaultValue="support@hotpotisp.co.ke"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>Support Phone</label>
              <input
                type="tel"
                defaultValue="+254 712 345 678"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>Timezone</label>
              <select style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none" }}>
                <option>Africa/Nairobi (EAT +03:00)</option>
                <option>Africa/Lagos (WAT +01:00)</option>
                <option>Africa/Cairo (EET +02:00)</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "network" && (
          <div style={{ maxWidth: "600px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "24px" }}>Network Configuration</h3>
            
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>Router IP Address</label>
              <input
                type="text"
                defaultValue="192.168.1.1"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none", fontFamily: "'Courier New', monospace" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>RADIUS Server</label>
              <input
                type="text"
                defaultValue="radius.hotpotisp.local"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none", fontFamily: "'Courier New', monospace" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>DNS Servers</label>
              <input
                type="text"
                defaultValue="8.8.8.8, 1.1.1.1"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none", fontFamily: "'Courier New', monospace" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                <span style={{ fontSize: "14px", color: t.text }}>Enable bandwidth throttling</span>
              </label>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                <span style={{ fontSize: "14px", color: t.text }}>Automatically disconnect expired sessions</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div style={{ maxWidth: "600px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "24px" }}>Pricing Configuration</h3>
            
            <div style={{ marginBottom: "32px" }}>
              <h4 style={{ fontSize: "15px", fontWeight: "700", color: t.accent, marginBottom: "16px" }}>Hotspot Vouchers</h4>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>12-Hour Package (KSh)</label>
                <input
                  type="number"
                  defaultValue="25"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>24-Hour Package (KSh)</label>
                <input
                  type="number"
                  defaultValue="45"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>7-Day Package (KSh)</label>
                <input
                  type="number"
                  defaultValue="250"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none" }}
                />
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: "15px", fontWeight: "700", color: t.accent, marginBottom: "16px" }}>PPPoE Packages (Monthly)</h4>
              
              {[
                { name: "Basic (10 Mbps)", price: "2500" },
                { name: "Standard (20 Mbps)", price: "3500" },
                { name: "Premium (50 Mbps)", price: "5500" },
                { name: "Enterprise (100 Mbps)", price: "9500" },
              ].map((pkg, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>{pkg.name} (KSh)</label>
                  <input
                    type="number"
                    defaultValue={pkg.price}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div style={{ maxWidth: "600px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "24px" }}>Notification Preferences</h3>
            
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", marginBottom: "16px" }}>
                <input type="checkbox" defaultChecked style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: t.text }}>New Purchase Notifications</div>
                  <div style={{ fontSize: "12px", color: t.textMuted, marginTop: "2px" }}>Get notified when users purchase vouchers</div>
                </div>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", marginBottom: "16px" }}>
                <input type="checkbox" defaultChecked style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: t.text }}>Low Balance Alerts</div>
                  <div style={{ fontSize: "12px", color: t.textMuted, marginTop: "2px" }}>Alert when voucher inventory is low</div>
                </div>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", marginBottom: "16px" }}>
                <input type="checkbox" style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: t.text }}>Daily Revenue Reports</div>
                  <div style={{ fontSize: "12px", color: t.textMuted, marginTop: "2px" }}>Receive daily summary via email</div>
                </div>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", marginBottom: "16px" }}>
                <input type="checkbox" defaultChecked style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: t.text }}>System Alerts</div>
                  <div style={{ fontSize: "12px", color: t.textMuted, marginTop: "2px" }}>Critical system notifications and errors</div>
                </div>
              </label>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>Notification Email</label>
              <input
                type="email"
                defaultValue="admin@hotpotisp.co.ke"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>SMS Notification Number</label>
              <input
                type="tel"
                defaultValue="+254 712 345 678"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "14px", outline: "none" }}
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: `1px solid ${t.cardBorder}` }}>
          <button
            onClick={handleSave}
            style={{ padding: "14px 32px", borderRadius: "12px", border: "none", background: `linear-gradient(135deg, ${t.accent}, #818cf8)`, color: "#fff", fontSize: "15px", fontWeight: "700", cursor: "pointer", boxShadow: `0 4px 16px ${t.accent}44`, transition: "transform 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
