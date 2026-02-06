"use client";
import { useState } from "react";
import Link from "next/link";
import { FireIcon, MapPinIcon, PackageIcon, PhoneIcon, MailIcon, WifiIcon, SunIcon, MoonIcon } from "../components/icons";
import { getTheme } from "../components/theme";

export default function LoginPage() {
  const [dark, setDark] = useState(true);
  const t = getTheme(dark);

  const locations = [
    { name: "Nairobi CBD", address: "Kenyatta Avenue, Nairobi" },
    { name: "Westlands", address: "Ring Road, Westlands" },
    { name: "Kilimani", address: "Argwings Kodhek Road" },
    { name: "Karen", address: "Karen Road, Karen" },
  ];

  const hotspotPackages = [
    { duration: "12 Hours", price: "25", speed: "5 Mbps", popular: false },
    { duration: "24 Hours", price: "45", speed: "10 Mbps", popular: true },
    { duration: "7 Days", price: "250", speed: "15 Mbps", popular: false },
  ];

  const pppoePackages = [
    { name: "Basic", speed: "10 Mbps", price: "2,500", data: "Unlimited" },
    { name: "Standard", speed: "20 Mbps", price: "3,500", data: "Unlimited" },
    { name: "Premium", speed: "50 Mbps", price: "5,500", data: "Unlimited" },
    { name: "Enterprise", speed: "100 Mbps", price: "9,500", data: "Unlimited" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, transition: "background 0.4s, color 0.4s", position: "relative", overflow: "hidden" }}>
      {/* Background blobs */}
      <div style={{ position: "fixed", top: "-120px", left: "-120px", width: "380px", height: "380px", borderRadius: "50%", background: dark ? "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" : "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-100px", right: "-80px", width: "340px", height: "340px", borderRadius: "50%", background: dark ? "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)" : "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", borderBottom: `1px solid ${dark ? "rgba(99,102,241,0.1)" : "#e2e8f0"}`, background: dark ? "rgba(10,14,26,0.7)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FireIcon />
          <span style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.5px", background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HotPot ISP</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="#locations" style={{ color: t.textMuted, textDecoration: "none", fontSize: "14px", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = t.accent} onMouseLeave={e => e.currentTarget.style.color = t.textMuted}>
            Locations
          </Link>
          <Link href="#packages" style={{ color: t.textMuted, textDecoration: "none", fontSize: "14px", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = t.accent} onMouseLeave={e => e.currentTarget.style.color = t.textMuted}>
            Packages
          </Link>
          <Link href="#contact" style={{ color: t.textMuted, textDecoration: "none", fontSize: "14px", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = t.accent} onMouseLeave={e => e.currentTarget.style.color = t.textMuted}>
            Contact
          </Link>
          
          <button onClick={() => setDark(!dark)} style={{ background: dark ? "rgba(99,102,241,0.15)" : "#e2e8f0", border: `1px solid ${dark ? "rgba(99,102,241,0.3)" : "#cbd5e1"}`, borderRadius: "10px", padding: "8px 10px", cursor: "pointer", color: t.text, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link href="/dashboard" style={{ padding: "10px 24px", borderRadius: "10px", background: `linear-gradient(135deg, ${t.accent}, #818cf8)`, color: "#fff", fontSize: "14px", fontWeight: "700", textDecoration: "none", boxShadow: `0 4px 16px ${t.accent}44`, transition: "transform 0.15s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            Client Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ position: "relative", zIndex: 5, maxWidth: "1200px", margin: "0 auto", padding: "80px 48px", textAlign: "center" }}>
        <div style={{ animation: "fadeUp 0.6s ease" }}>
          <h1 style={{ fontSize: "56px", fontWeight: "800", margin: "0 0 20px", letterSpacing: "-1.5px", background: `linear-gradient(135deg, ${t.text}, ${t.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Premium Internet<br />Blazing Fast Speeds
          </h1>
          <p style={{ fontSize: "18px", color: t.textMuted, margin: "0 0 40px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.7" }}>
            Experience reliable, high-speed internet across Nairobi with flexible hotspot vouchers and unlimited PPPoE packages
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#packages" style={{ padding: "16px 36px", borderRadius: "12px", background: `linear-gradient(135deg, ${t.accent}, #818cf8)`, color: "#fff", fontSize: "16px", fontWeight: "700", textDecoration: "none", boxShadow: `0 4px 16px ${t.accent}44`, transition: "transform 0.15s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              View Packages
            </a>
            <a href="#contact" style={{ padding: "16px 36px", borderRadius: "12px", border: `2px solid ${t.accent}`, color: t.accent, fontSize: "16px", fontWeight: "700", textDecoration: "none", transition: "all 0.15s" }} onMouseEnter={e => { e.currentTarget.style.background = `${t.accent}15`; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
              Contact Sales
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginTop: "80px" }}>
          {[
            { label: "Active Users", value: "5,000+", icon: "👥" },
            { label: "Coverage Areas", value: "12", icon: "📍" },
            { label: "Uptime", value: "99.9%", icon: "⚡" },
            { label: "Support 24/7", value: "Always", icon: "💬" },
          ].map((stat, i) => (
            <div key={i} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "28px 24px", textAlign: "center", animation: `fadeUp 0.6s ease ${0.1 * i}s both` }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{stat.icon}</div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: t.accent, marginBottom: "4px" }}>{stat.value}</div>
              <div style={{ fontSize: "13px", color: t.textMuted, fontWeight: "600" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section id="locations" style={{ position: "relative", zIndex: 5, background: dark ? "#0d1117" : "#f8fafc", padding: "80px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: t.accent, fontWeight: "700", margin: "0 0 8px" }}>Coverage</p>
            <h2 style={{ fontSize: "36px", fontWeight: "800", margin: 0 }}>Our Locations</h2>
            <p style={{ fontSize: "16px", color: t.textMuted, marginTop: "12px" }}>We're expanding across Nairobi to serve you better</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {locations.map((loc, i) => (
              <div key={i} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "28px 24px", animation: `fadeUp 0.5s ease ${0.1 * i}s both`, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = t.cardBorder; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", color: t.accent }}>
                  <MapPinIcon />
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>{loc.name}</span>
                </div>
                <p style={{ fontSize: "14px", color: t.textMuted, margin: 0, lineHeight: "1.6" }}>{loc.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" style={{ position: "relative", zIndex: 5, padding: "80px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Hotspot Packages */}
          <div style={{ marginBottom: "80px" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: t.accent2, fontWeight: "700", margin: "0 0 8px" }}>Flexible Access</p>
              <h2 style={{ fontSize: "36px", fontWeight: "800", margin: 0 }}>Hotspot Vouchers</h2>
              <p style={{ fontSize: "16px", color: t.textMuted, marginTop: "12px" }}>Perfect for temporary access and visitors</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {hotspotPackages.map((pkg, i) => (
                <div key={i} style={{ background: t.cardBg, border: pkg.popular ? `2px solid ${t.accent2}` : `1px solid ${t.cardBorder}`, borderRadius: "20px", padding: "32px 28px", position: "relative", animation: `fadeUp 0.5s ease ${0.1 * i}s both`, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                  {pkg.popular && (
                    <span style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${t.accent2}, #fb923c)`, color: "#fff", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", padding: "6px 16px", borderRadius: "20px" }}>★ Popular</span>
                  )}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏱️</div>
                    <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>{pkg.duration}</h3>
                    <div style={{ fontSize: "40px", fontWeight: "800", color: t.accent2, margin: "16px 0 8px" }}>
                      <span style={{ fontSize: "20px", fontWeight: "600", verticalAlign: "super" }}>KSh</span>{pkg.price}
                    </div>
                    <p style={{ fontSize: "14px", color: t.textMuted, marginBottom: "20px" }}>Speed: {pkg.speed}</p>
                    <Link href="/hotspot" style={{ display: "block", padding: "12px 24px", borderRadius: "10px", background: `linear-gradient(135deg, ${t.accent2}, #fb923c)`, color: "#fff", fontSize: "14px", fontWeight: "700", textDecoration: "none", textAlign: "center" }}>
                      Get Voucher
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PPPoE Packages */}
          <div>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: t.accent, fontWeight: "700", margin: "0 0 8px" }}>Monthly Plans</p>
              <h2 style={{ fontSize: "36px", fontWeight: "800", margin: 0 }}>PPPoE Packages</h2>
              <p style={{ fontSize: "16px", color: t.textMuted, marginTop: "12px" }}>Unlimited data with dedicated connections</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
              {pppoePackages.map((pkg, i) => (
                <div key={i} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "20px", padding: "32px 24px", textAlign: "center", animation: `fadeUp 0.5s ease ${0.1 * i}s both`, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = "translateY(-4px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = t.cardBorder; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <PackageIcon />
                  <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "16px 0 8px", color: t.accent }}>{pkg.name}</h3>
                  <div style={{ fontSize: "36px", fontWeight: "800", margin: "12px 0" }}>{pkg.speed}</div>
                  <p style={{ fontSize: "14px", color: t.textMuted, marginBottom: "16px" }}>{pkg.data}</p>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: t.text, marginBottom: "20px" }}>
                    <span style={{ fontSize: "16px", fontWeight: "600", color: t.textMuted }}>KSh</span>{pkg.price}<span style={{ fontSize: "14px", fontWeight: "600", color: t.textMuted }}>/mo</span>
                  </div>
                  <Link href="/dashboard" style={{ display: "block", padding: "12px 24px", borderRadius: "10px", border: `2px solid ${t.accent}`, color: t.accent, fontSize: "14px", fontWeight: "700", textDecoration: "none", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = `${t.accent}15`} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    Subscribe
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ position: "relative", zIndex: 5, background: dark ? "#0d1117" : "#f8fafc", padding: "80px 48px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: t.accent, fontWeight: "700", margin: "0 0 8px" }}>Get in Touch</p>
          <h2 style={{ fontSize: "36px", fontWeight: "800", margin: "0 0 16px" }}>Contact Us</h2>
          <p style={{ fontSize: "16px", color: t.textMuted, marginBottom: "48px" }}>Have questions? Our team is ready to help you 24/7</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "32px 24px" }}>
              <div style={{ color: t.accent, marginBottom: "12px" }}><PhoneIcon /></div>
              <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>Phone</h4>
              <p style={{ fontSize: "16px", color: t.text, margin: 0 }}>+254 712 345 678</p>
            </div>

            <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "32px 24px" }}>
              <div style={{ color: t.accent, marginBottom: "12px" }}><MailIcon /></div>
              <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>Email</h4>
              <p style={{ fontSize: "16px", color: t.text, margin: 0 }}>support@hotpotisp.co.ke</p>
            </div>

            <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "16px", padding: "32px 24px" }}>
              <div style={{ color: t.accent, marginBottom: "12px" }}><WifiIcon active /></div>
              <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>Support</h4>
              <p style={{ fontSize: "16px", color: t.text, margin: 0 }}>24/7 Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 5, borderTop: `1px solid ${dark ? "rgba(99,102,241,0.1)" : "#e2e8f0"}`, padding: "32px 48px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
          <FireIcon />
          <span style={{ fontSize: "18px", fontWeight: "700", background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HotPot ISP</span>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, margin: 0 }}>© 2026 HotPot ISP. Premium Internet Services. All rights reserved.</p>
      </footer>
    </div>
  );
}
