"use client";
import { useState } from "react";
import Link from "next/link";
import { HelpIcon, FireIcon, WifiIcon, CreditCardIcon, SunIcon, MoonIcon } from "../../components/icons";
import { getTheme } from "../../components/theme";

export default function HotspotHelpPage() {
  const [dark, setDark] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const t = getTheme(dark);

  const faqs = [
    {
      question: "How do I use a voucher code?",
      answer: "Enter your 8-character voucher code in the input field on the main page and click 'Submit Voucher'. Your internet access will activate immediately upon successful validation."
    },
    {
      question: "Can I use my voucher on multiple devices?",
      answer: "No, each voucher code is valid for one device only. Once activated, it will remain tied to that specific device for the duration of the package."
    },
    {
      question: "What happens when my time expires?",
      answer: "Your internet connection will automatically disconnect when your voucher time expires. You'll need to purchase a new voucher to continue accessing the internet."
    },
    {
      question: "How do I check my remaining time?",
      answer: "You can view your remaining time and data usage on the Status page. A notification will appear when you have 1 hour remaining on your voucher."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept M-Pesa payments. Simply enter your phone number when purchasing a voucher, and you'll receive an M-Pesa prompt to complete the payment."
    },
    {
      question: "Can I get a refund?",
      answer: "Vouchers are non-refundable once purchased. However, unused vouchers remain valid for 30 days from the purchase date."
    },
  ];

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
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: `${t.accent}15`, border: `2px solid ${t.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: t.accent }}>
            <HelpIcon />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "800", margin: "0 0 12px" }}>Help & Support</h1>
          <p style={{ fontSize: "16px", color: t.textMuted }}>Find answers to common questions</p>
        </div>

        {/* Quick Links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {[
            { icon: <WifiIcon active />, label: "Network Status", desc: "Check connection" },
            { icon: <CreditCardIcon />, label: "Payment Help", desc: "M-Pesa support" },
            { icon: <HelpIcon />, label: "Contact Us", desc: "24/7 support" },
          ].map((link, i) => (
            <div key={i} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "24px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.cardBorder; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ color: t.accent, marginBottom: "12px", display: "flex", justifyContent: "center" }}>{link.icon}</div>
              <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "4px" }}>{link.label}</div>
              <div style={{ fontSize: "12px", color: t.textMuted }}>{link.desc}</div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "24px" }}>Frequently Asked Questions</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "14px", overflow: "hidden", transition: "all 0.2s" }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  style={{ width: "100%", padding: "20px 24px", background: "transparent", border: "none", color: t.text, fontSize: "15px", fontWeight: "600", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  {faq.question}
                  <span style={{ fontSize: "20px", transition: "transform 0.2s", transform: expandedFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
                </button>
                {expandedFaq === i && (
                  <div style={{ padding: "0 24px 20px", fontSize: "14px", color: t.textMuted, lineHeight: "1.7", animation: "fadeUp 0.3s ease" }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div style={{ marginTop: "48px", background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "32px 28px", textAlign: "center" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>Still need help?</h3>
          <p style={{ fontSize: "14px", color: t.textMuted, marginBottom: "24px" }}>Our support team is available 24/7 to assist you</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+254712345678" style={{ padding: "12px 24px", borderRadius: "10px", background: `linear-gradient(135deg, ${t.accent}, #818cf8)`, color: "#fff", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>
              Call Support
            </a>
            <a href="mailto:support@hotpotisp.co.ke" style={{ padding: "12px 24px", borderRadius: "10px", border: `2px solid ${t.accent}`, color: t.accent, fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>
              Email Us
            </a>
          </div>
        </div>

        {/* Back Button */}
        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <Link href="/hotspot" style={{ color: t.accent, fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
            ← Back to Hotspot
          </Link>
        </div>
      </main>
    </div>
  );
}
