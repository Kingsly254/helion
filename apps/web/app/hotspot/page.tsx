"use client";
import { useState, useEffect } from "react";
import { WifiIcon, HelpIcon, SunIcon, MoonIcon, CheckIcon, CloseIcon, FireIcon } from "../components/icons";
import { getTheme } from "../components/theme";

export default function HotSpotPage() {
  const [dark, setDark] = useState(true);
  const [connected, setConnected] = useState(true);
  const [voucher, setVoucher] = useState("");
  const [voucherStatus, setVoucherStatus] = useState<null | 'success' | 'error'>(null);
  const [selectedPkg, setSelectedPkg] = useState<null | '12hr' | '24hr'>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const t = getTheme(dark);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnected(Math.random() > 0.15);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitVoucher = () => {
    if (!voucher.trim()) return;
    if (/^[A-Za-z0-9]{8}$/.test(voucher.trim())) {
      setVoucherStatus("success");
    } else {
      setVoucherStatus("error");
    }
    setTimeout(() => setVoucherStatus(null), 3500);
  };

  const handlePurchase = (pkg: '12hr' | '24hr') => {
    setSelectedPkg(pkg);
    setPhone("");
    setPhoneError("");
    setPurchaseSuccess(false);
  };

  const handleConfirmPurchase = () => {
    const cleaned = phone.replace(/[\s\-()]/g, "");
    if (!/^(\+254|0254|254|0)7\d{8}$/.test(cleaned)) {
      setPhoneError("Enter a valid Kenyan mobile number (e.g. 0712 345 678)");
      return;
    }
    setPhoneError("");
    setPurchaseSuccess(true);
  };

  const closeModal = () => {
    setSelectedPkg(null);
    setPurchaseSuccess(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'Segoe UI', system-ui, sans-serif", transition: "background 0.4s, color 0.4s", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", top: "-120px", left: "-120px", width: "380px", height: "380px", borderRadius: "50%", background: dark ? "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" : "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-100px", right: "-80px", width: "340px", height: "340px", borderRadius: "50%", background: dark ? "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)" : "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <header style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 28px", borderBottom: `1px solid ${dark ? "rgba(99,102,241,0.1)" : "#e2e8f0"}`, background: dark ? "rgba(10,14,26,0.7)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FireIcon />
            <span style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.5px", background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HotPot</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 10px", borderRadius: "20px", background: connected ? (dark ? "rgba(34,197,94,0.1)" : "rgba(34,197,94,0.08)") : (dark ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.08)"), border: `1px solid ${connected ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}` }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: connected ? "#22c55e" : "#ef4444", display: "inline-block", boxShadow: connected ? "0 0 6px rgba(34,197,94,0.5)" : "0 0 6px rgba(239,68,68,0.5)", animation: "pulse 2s infinite" }} />
            <span style={{ color: connected ? "#22c55e" : "#ef4444", fontSize: "12px", fontWeight: "600" }}>{connected ? "Connected" : "Offline"}</span>
            <span style={{ color: t.textMuted, marginLeft: "2px" }}><WifiIcon active={connected} /></span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={() => setShowHelp(!showHelp)} style={{ position: "relative", background: "transparent", border: `1px solid ${dark ? "rgba(99,102,241,0.2)" : "#cbd5e1"}`, borderRadius: "10px", padding: "8px 10px", cursor: "pointer", color: t.text, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = t.accent + "22"; e.currentTarget.style.borderColor = t.accent; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = dark ? "rgba(99,102,241,0.2)" : "#cbd5e1"; }}>
            <HelpIcon />
          </button>
          <button onClick={() => setDark(!dark)} style={{ background: dark ? "rgba(99,102,241,0.15)" : "#e2e8f0", border: `1px solid ${dark ? "rgba(99,102,241,0.3)" : "#cbd5e1"}`, borderRadius: "10px", padding: "8px 10px", cursor: "pointer", color: t.text, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      {showHelp && (
        <div style={{ position: "fixed", top: "68px", right: "28px", zIndex: 50, width: "280px", background: t.modalBg, border: `1px solid ${dark ? "rgba(99,102,241,0.2)" : "#e2e8f0"}`, borderRadius: "14px", padding: "20px", boxShadow: "0 12px 40px rgba(0,0,0,0.2)", animation: "fadeSlideDown 0.25s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: "700", fontSize: "15px" }}>Help & Support</span>
            <button onClick={() => setShowHelp(false)} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, padding: "2px" }}><CloseIcon /></button>
          </div>
          <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: "1.6", margin: "0 0 12px 0" }}>
            <strong style={{ color: t.text }}>Enter a voucher</strong> — Paste your 8-character voucher code and hit Submit to activate.
          </p>
          <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: "1.6", margin: "0 0 12px 0" }}>
            <strong style={{ color: t.text }}>Buy a voucher</strong> — Pick 12hr or 24hr, enter your Kenyan mobile, and confirm.
          </p>
          <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: "1.6", margin: 0 }}>
            <strong style={{ color: t.text }}>Connection status</strong> — Shows your current network link in real time.
          </p>
        </div>
      )}

      <main style={{ position: "relative", zIndex: 5, maxWidth: "480px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "20px", padding: "32px 28px", boxShadow: dark ? "0 8px 32px rgba(0,0,0,0.25)" : "0 4px 20px rgba(0,0,0,0.06)", marginBottom: "32px", animation: "fadeUp 0.5s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: t.accent, fontWeight: "700", margin: "0 0 6px 0" }}>Redeem</p>
            <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0, letterSpacing: "-0.3px" }}>Enter Voucher Code</h2>
            <p style={{ fontSize: "13px", color: t.textMuted, margin: "6px 0 0 0" }}>8-character alphanumeric code</p>
          </div>

          <input
            type="text"
            placeholder="e.g. A1B2C3D4"
            value={voucher}
            onChange={e => setVoucher(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmitVoucher()}
            maxLength={8}
            style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", border: `1.5px solid ${voucherStatus === "error" ? "#ef4444" : voucherStatus === "success" ? "#22c55e" : t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "17px", letterSpacing: "3px", textAlign: "center", fontWeight: "600", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s", fontFamily: "'Courier New', monospace" }}
          />

          {voucherStatus === "success" && (
            <div style={{ marginTop: "12px", padding: "10px 14px", borderRadius: "10px", background: t.successBg, border: "1px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", gap: "8px", animation: "fadeUp 0.3s ease" }}>
              <span style={{ color: "#22c55e" }}><CheckIcon /></span>
              <span style={{ fontSize: "13px", color: "#22c55e", fontWeight: "600" }}>Voucher activated successfully!</span>
            </div>
          )}
          {voucherStatus === "error" && (
            <div style={{ marginTop: "12px", padding: "10px 14px", borderRadius: "10px", background: t.errorBg, border: "1px solid rgba(239,68,68,0.25)", animation: "fadeUp 0.3s ease" }}>
              <span style={{ fontSize: "13px", color: "#ef4444", fontWeight: "600" }}>Invalid code. Check and try again.</span>
            </div>
          )}

          <button
            onClick={handleSubmitVoucher}
            style={{ width: "100%", marginTop: "20px", padding: "14px", borderRadius: "12px", border: "none", background: `linear-gradient(135deg, ${t.accent}, #818cf8)`, color: "#fff", fontSize: "15px", fontWeight: "700", cursor: "pointer", letterSpacing: "0.5px", boxShadow: `0 4px 16px ${t.accent}44`, transition: "transform 0.15s, box-shadow 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 6px 24px ${t.accent}55`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 16px ${t.accent}44`; }}
          >
            Submit Voucher
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <div style={{ flex: 1, height: "1px", background: dark ? "rgba(99,102,241,0.12)" : "#e2e8f0" }} />
          <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: t.textMuted, fontWeight: "600" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: dark ? "rgba(99,102,241,0.12)" : "#e2e8f0" }} />
        </div>

        <div style={{ animation: "fadeUp 0.55s ease 0.1s both" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: t.accent2, fontWeight: "700", margin: "0 0 6px 0" }}>Purchase</p>
            <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0, letterSpacing: "-0.3px" }}>Buy a Voucher</h2>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <button onClick={() => handlePurchase("12hr")} style={{ flex: 1, background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: "18px", padding: "24px 18px", cursor: "pointer", color: t.text, textAlign: "left", transition: "all 0.2s", boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.2)" : "0 2px 12px rgba(0,0,0,0.06)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.pill12; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = dark ? "0 8px 28px rgba(99,102,241,0.2)" : "0 6px 24px rgba(99,102,241,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.cardBorder; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = dark ? "0 4px 20px rgba(0,0,0,0.2)" : "0 2px 12px rgba(0,0,0,0.06)"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${t.pill12}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>⏱️</span>
                <span style={{ fontSize: "13px", fontWeight: "700", color: t.pill12 }}>12 Hours</span>
              </div>
              <p style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 4px", color: t.text, letterSpacing: "-0.5px" }}>
                <span style={{ fontSize: "16px", fontWeight: "600", color: t.textMuted, verticalAlign: "super", marginRight: "2px" }}>KSh</span>25
              </p>
              <p style={{ fontSize: "12px", color: t.textMuted, margin: 0 }}>Half-day access</p>
            </button>

            <button onClick={() => handlePurchase("24hr")} style={{ flex: 1, background: dark ? "linear-gradient(145deg, #1a1f3a, #161b2e)" : "linear-gradient(145deg, #f5f3ff, #eff6ff)", border: `2px solid ${t.pill24}`, borderRadius: "18px", padding: "24px 18px", cursor: "pointer", color: t.text, textAlign: "left", transition: "all 0.2s", position: "relative", boxShadow: dark ? `0 6px 28px rgba(249,115,22,0.18)` : `0 4px 20px rgba(249,115,22,0.12)` }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = dark ? "0 10px 36px rgba(249,115,22,0.28)" : "0 8px 28px rgba(249,115,22,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = dark ? "0 6px 28px rgba(249,115,22,0.18)" : "0 4px 20px rgba(249,115,22,0.12)"; }}>
              <span style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${t.accent2}, #fb923c)`, color: "#fff", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "20px", whiteSpace: "nowrap" }}>★ Popular</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${t.pill24}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🔥</span>
                <span style={{ fontSize: "13px", fontWeight: "700", color: t.pill24 }}>24 Hours</span>
              </div>
              <p style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 4px", color: t.text, letterSpacing: "-0.5px" }}>
                <span style={{ fontSize: "16px", fontWeight: "600", color: t.textMuted, verticalAlign: "super", marginRight: "2px" }}>KSh</span>45
              </p>
              <p style={{ fontSize: "12px", color: t.textMuted, margin: 0 }}>Full-day access</p>
            </button>
          </div>
        </div>
      </main>

      {selectedPkg && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: t.modalOverlay, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease", backdropFilter: "blur(4px)" }} onClick={closeModal}>
          <div style={{ background: t.modalBg, borderRadius: "22px", padding: "36px 32px", width: "90%", maxWidth: "380px", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", border: `1px solid ${dark ? "rgba(99,102,241,0.15)" : "#e2e8f0"}`, animation: "modalPop 0.3s cubic-bezier(0.34,1.56,0.64,1)", position: "relative" }} onClick={e => e.stopPropagation()}>
            {!purchaseSuccess ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                  <div>
                    <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: selectedPkg === "12hr" ? t.pill12 : t.pill24, fontWeight: "700", margin: "0 0 4px" }}>{selectedPkg === "12hr" ? "12-Hour" : "24-Hour"} Package</p>
                    <h3 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>Complete Purchase</h3>
                  </div>
                  <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, padding: "4px" }}><CloseIcon /></button>
                </div>

                <div style={{ background: dark ? "rgba(99,102,241,0.07)" : "#f8fafc", borderRadius: "12px", padding: "16px 18px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "14px", color: t.textMuted }}>{selectedPkg === "12hr" ? "12hr" : "24hr"} Internet Voucher</p>
                    <p style={{ margin: "2px 0 0", fontSize: "12px", color: t.textMuted }}>{selectedPkg === "12hr" ? "Half-day" : "Full-day"} access</p>
                  </div>
                  <span style={{ fontSize: "22px", fontWeight: "800", color: selectedPkg === "12hr" ? t.pill12 : t.pill24 }}>
                    KSh {selectedPkg === "12hr" ? "25" : "45"}
                  </span>
                </div>

                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: t.text, marginBottom: "8px" }}>Mobile Number</label>
                <input
                  type="tel"
                  placeholder="0712 345 678"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setPhoneError(""); }}
                  style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", border: `1.5px solid ${phoneError ? "#ef4444" : t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: "16px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s", fontFamily: "'Courier New', monospace", letterSpacing: "1.5px" }}
                />
                {phoneError && <p style={{ color: "#ef4444", fontSize: "12px", margin: "8px 0 0", fontWeight: "500" }}>{phoneError}</p>}

                <button
                  onClick={handleConfirmPurchase}
                  style={{ width: "100%", marginTop: "24px", padding: "14px", borderRadius: "12px", border: "none", background: selectedPkg === "12hr" ? `linear-gradient(135deg, ${t.pill12}, #818cf8)` : `linear-gradient(135deg, ${t.pill24}, #fb923c)`, color: "#fff", fontSize: "15px", fontWeight: "700", cursor: "pointer", boxShadow: `0 4px 16px ${selectedPkg === "12hr" ? t.pill12 : t.pill24}44`, transition: "transform 0.15s, box-shadow 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Confirm — KSh {selectedPkg === "12hr" ? "25" : "45"}
                </button>

                <p style={{ textAlign: "center", fontSize: "11px", color: t.textMuted, margin: "16px 0 0" }}>Payment via M-Pesa • Secure & Instant</p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", animation: "scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
                  <span style={{ color: "#22c55e", transform: "scale(1.6)", display: "flex" }}><CheckIcon /></span>
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 8px", color: "#22c55e" }}>Purchase Successful!</h3>
                <p style={{ fontSize: "14px", color: t.textMuted, margin: "0 0 6px" }}>Your {selectedPkg === "12hr" ? "12-hour" : "24-hour"} voucher has been sent.</p>
                <p style={{ fontSize: "13px", color: t.textMuted, margin: "0 0 28px" }}>Check your SMS inbox shortly.</p>
                <button onClick={closeModal} style={{ padding: "12px 32px", borderRadius: "12px", border: "none", background: `linear-gradient(135deg, ${t.accent}, #818cf8)`, color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
