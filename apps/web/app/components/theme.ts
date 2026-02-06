// Design system theme tokens
export const getTheme = (dark: boolean) => ({
  bg: dark ? "#0a0e1a" : "#f0f4f8",
  cardBg: dark ? "#131828" : "#ffffff",
  cardBorder: dark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.12)",
  text: dark ? "#e8eaf6" : "#1e293b",
  textMuted: dark ? "#64748b" : "#64748b",
  accent: "#6366f1",
  accentHover: "#7c7ff5",
  accent2: "#f97316",
  inputBg: dark ? "#0f1320" : "#f1f5f9",
  inputBorder: dark ? "rgba(99,102,241,0.25)" : "#cbd5e1",
  successBg: dark ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.08)",
  errorBg: dark ? "rgba(239,68,68,0.12)" : "rgba(239,68,68,0.08)",
  modalOverlay: "rgba(0,0,0,0.55)",
  modalBg: dark ? "#161b2e" : "#ffffff",
  pill12: "#6366f1",
  pill24: "#f97316",
  sidebarBg: dark ? "#0d1117" : "#ffffff",
  sidebarBorder: dark ? "rgba(99,102,241,0.1)" : "#e2e8f0",
  hoverBg: dark ? "rgba(99,102,241,0.08)" : "#f1f5f9",
});

export type Theme = ReturnType<typeof getTheme>;
