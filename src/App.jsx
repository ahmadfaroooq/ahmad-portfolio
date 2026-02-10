import { useState, useRef, useEffect, useCallback } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ghost from "./lib/ghost";

/* ═══════════════════════════════════════════════════════════
   AHMAD FAROOQ — NEO-BRUTALISM PORTFOLIO + GHOST BLOG
   ═══════════════════════════════════════════════════════════ */

const P = {
  bg: "#FFF5E1",
  dark: "#1A1A1A",
  orange: "#FF4D00",
  lime: "#A6FF00",
  blue: "#0066FF",
  pink: "#FF6B9D",
  purple: "#7B2FFF",
  cream: "#FFF8F0",
  gray: "#666",
  lightgray: "#E8E8E8",
  white: "#FFFFFF",
};

/* ─── SCROLL ANIMATION WRAPPER ─── */
function Anim({ children, delay = 0, style = {} }) {
  const [vis, setVis] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── BRUTAL BUTTON ─── */
function BBtn({ children, onClick, bg = P.lime, style: sx = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 13,
        fontWeight: 800,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        padding: "14px 28px",
        background: bg,
        color: bg === P.white || bg === P.lime ? P.dark : P.white,
        border: `3px solid ${P.dark}`,
        boxShadow: `5px 5px 0 ${P.dark}`,
        cursor: "pointer",
        transition: "all 0.15s ease",
        ...sx,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(-3px, -3px)";
        e.currentTarget.style.boxShadow = `8px 8px 0 ${P.dark}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = `5px 5px 0 ${P.dark}`;
      }}
    >
      {children}
    </button>
  );
}

/* ─── BRUTAL TAG ─── */
function BTag({ children, color = P.lime, rotate = -2 }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'Outfit'",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: "uppercase",
        padding: "4px 14px",
        background: color,
        border: `2px solid ${P.dark}`,
        transform: `rotate(${rotate}deg)`,
        boxShadow: `3px 3px 0 ${P.dark}`,
      }}
    >
      {children}
    </span>
  );
}

/* ─── LOGO ─── */
function Logo({ size = 32 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40">
        <rect x="2" y="2" width="36" height="36" fill={P.orange} stroke={P.dark} strokeWidth="3" />
        <polygon points="20,6 34,20 20,34 6,20" fill={P.lime} stroke={P.dark} strokeWidth="2" />
        <circle cx="20" cy="20" r="5" fill={P.dark} />
      </svg>
      <div>
        <div style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: size * 0.5, lineHeight: 1, letterSpacing: -1 }}>AHMAD</div>
        <div style={{ fontFamily: "'Sora'", fontWeight: 400, fontSize: size * 0.3, letterSpacing: 3, color: P.orange }}>FAROOQ</div>
      </div>
    </div>
  );
}

/* ─── CASE STUDY VISUAL ─── */
function CaseVis({ type }) {
  const cfgs = {
    lbank: { bg: P.blue, stat: "4.2x", label: "USER CONVERSION" },
    coinbureau: { bg: "#1A1A2E", stat: "40%", label: "NEWSLETTER GROWTH" },
    nick: { bg: "#0077B5", stat: "10K+", label: "FOLLOWERS BUILT" },
    omillionaire: { bg: "#1b5e20", stat: "$180K+", label: "AD SPEND MANAGED" },
    bitward: { bg: "#0d47a1", stat: "3x", label: "FUNNEL CONVERSION" },
    zara: { bg: "#b71c1c", stat: "5x", label: "ENGAGEMENT RATE" },
    klip: { bg: P.purple, stat: "100+", label: "CHAIN SCORE" },
    design: { bg: P.orange, stat: "10+", label: "BRAND PROJECTS" },
    social: { bg: "#283593", stat: "500K+", label: "IMPRESSIONS" },
    brand: { bg: "#4a148c", stat: "6+", label: "IDENTITY SYSTEMS" },
    content: { bg: "#004d40", stat: "38%", label: "EMAIL OPEN RATE" },
  };
  const c = cfgs[type] || cfgs.lbank;
  return (
    <div
      style={{
        width: "100%",
        height: 190,
        background: c.bg,
        border: `3px solid ${P.dark}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 10, right: 10, width: 60, height: 60, border: "2px solid rgba(255,255,255,0.15)", borderRadius: "50%" }} />
      <div style={{ textAlign: "center", color: P.white, zIndex: 1 }}>
        <div style={{ fontSize: 42, fontWeight: 900, fontFamily: "'Outfit'" }}>{c.stat}</div>
        <div style={{ fontSize: 11, letterSpacing: 3, fontWeight: 600, opacity: 0.85, marginTop: 4 }}>{c.label}</div>
      </div>
    </div>
  );
}

/* ─── STUDIO PROJECT CARD ─── */
function StudioProject({ project, index }) {
  const rotations = [-2, 1.5, -1, 2, -1.5, 0.8, -2.5, 1, -0.5, 2.2];
  const rot = rotations[index % rotations.length];
  const projects = {
    volta: { bg: "linear-gradient(135deg, #0f2027, #2c5364)", name: "VOLTA", sub: "Clean Energy", accent: "#00ff88" },
    noma: { bg: "#1a1206", name: "Noma", sub: "Kitchen & Bar", accent: "#c4a46a", serif: true },
    meridian: { bg: "#0a0e27", name: "MERIDIAN", sub: "Fintech Dashboard", accent: "#6c63ff" },
    atlas: { bg: "linear-gradient(135deg, #ff6b35, #f7931e)", name: "ATLAS", sub: "Outdoor Co.", accent: "#fff" },
    bloom: { bg: "linear-gradient(135deg, #fce4ec, #f48fb1)", name: "bloom", sub: "Wellness", accent: "#880e4f", serif: true },
    cipher: { bg: P.dark, name: "CIPHER", sub: "Protocol", accent: "#00ff00" },
    pulse: { bg: "linear-gradient(135deg, #1a1a2e, #16213e)", name: "PULSE", sub: "Fitness App", accent: "#00e5ff" },
    noir: { bg: "#212121", name: "Noir", sub: "Maison de Mode", accent: "#fff", serif: true },
    terra: { bg: "linear-gradient(135deg, #2d6a4f, #52b788)", name: "TERRAVERDE", sub: "Sustainable Living", accent: "#fff" },
    nexus: { bg: "linear-gradient(135deg, #1a0533, #4a2c96)", name: "NEXUS", sub: "AI Platform", accent: "#a855f7" },
  };
  const p = projects[project];
  if (!p) return null;
  return (
    <div
      style={{ transform: `rotate(${rot}deg)`, transition: "all 0.3s ease", cursor: "pointer", position: "relative" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(0deg) scale(1.05)"; e.currentTarget.style.zIndex = 10; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = `rotate(${rot}deg) scale(1)`; e.currentTarget.style.zIndex = 1; }}
    >
      <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", width: 50, height: 16, background: P.lime, border: `2px solid ${P.dark}`, zIndex: 2, opacity: 0.9 }} />
      <div
        style={{
          width: "100%",
          height: 200,
          background: p.bg,
          border: `3px solid ${P.dark}`,
          boxShadow: `5px 5px 0 ${P.dark}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ textAlign: "center", zIndex: 1 }}>
          <div
            style={{
              fontFamily: p.serif ? "Georgia, serif" : "'Outfit'",
              fontSize: p.serif ? 28 : 22,
              fontWeight: p.serif ? 400 : 800,
              color: p.accent,
              letterSpacing: p.serif ? 0 : 4,
              fontStyle: p.serif ? "italic" : "normal",
            }}
          >
            {p.name}
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 3, marginTop: 4, textTransform: "uppercase" }}>{p.sub}</div>
        </div>
      </div>
      <div style={{ fontFamily: "'Sora'", fontSize: 10, color: P.gray, marginTop: 8, fontStyle: "italic" }}>WIP → Final // {p.sub}</div>
    </div>
  );
}

/* ─── PROCESS STEP (Interactive) ─── */
function ProcessStep({ num, title, desc, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        border: `3px solid ${P.dark}`,
        background: open ? color : P.white,
        boxShadow: open ? `8px 8px 0 ${P.dark}` : `5px 5px 0 ${P.dark}`,
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: open ? "rotate(-1deg)" : "none",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => { if (!open) { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `8px 8px 0 ${P.dark}`; } }}
      onMouseLeave={(e) => { if (!open) { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `5px 5px 0 ${P.dark}`; } }}
    >
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            background: open ? P.dark : color,
            border: `3px solid ${P.dark}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Outfit'",
            fontWeight: 900,
            fontSize: 22,
            color: open ? P.white : P.dark,
            flexShrink: 0,
            transition: "all 0.3s",
          }}
        >
          {num}
        </div>
        <div>
          <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 16, textTransform: "uppercase", letterSpacing: 1 }}>{title}</div>
          {!open && <div style={{ fontSize: 12, color: P.gray, marginTop: 2 }}>Click to reveal →</div>}
        </div>
      </div>
      <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease", borderTop: open ? `2px dashed ${P.dark}` : "none" }}>
        <div style={{ padding: "16px 24px" }}>
          <p style={{ fontFamily: "'Sora'", fontSize: 13, lineHeight: 1.7, color: P.dark }}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── EMAIL SUBSCRIBE FORM ─── */
function SubscribeForm({ label = "Subscribe", source = "blog" }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const handleSubmit = () => {
    if (!email) return;
    fetch("https://formspree.io/f/xpznqkao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    })
      .then(() => setSent(true))
      .catch(() => setSent(true));
  };
  if (sent) {
    return <p style={{ fontFamily: "'Outfit'", fontWeight: 800, color: "#2e7d32" }}>You are in. Thank you!</p>;
  }
  return (
    <div style={{ display: "flex", gap: 0 }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        style={{
          flex: 1,
          padding: "14px 16px",
          border: `3px solid ${P.dark}`,
          borderRight: "none",
          background: P.bg,
          fontSize: 14,
          fontFamily: "'Sora'",
          outline: "none",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: "14px 20px",
          background: P.orange,
          color: P.white,
          border: `3px solid ${P.dark}`,
          fontFamily: "'Outfit'",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: 1,
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => (e.target.style.background = P.dark)}
        onMouseLeave={(e) => (e.target.style.background = P.orange)}
      >
        {label}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════════ */
function Header({ page, nav }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const links = [
    { l: "Home", k: "home" },
    { l: "Services", k: "svc" },
    { l: "Design", k: "design" },
    { l: "Blog", k: "blog" },
    { l: "Playbook", k: "playbook" },
    { l: "Book", k: "book" },
  ];
  const svcs = [
    { l: "Growth Marketing", k: "growth" },
    { l: "LinkedIn Branding", k: "linkedin" },
    { l: "Marketing Strategy", k: "strategy" },
    { l: "Content Writing", k: "content" },
    { l: "Graphic Design", k: "gdesign" },
    { l: "Business Branding", k: "branding" },
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: P.bg, borderBottom: `4px solid ${P.dark}` }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div onClick={() => { nav("home"); setMenuOpen(false); }} style={{ cursor: "pointer" }}>
          <Logo size={30} />
        </div>
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {links.map((n) => (
            <div key={n.k} style={{ position: "relative" }} onMouseEnter={() => n.k === "svc" && setSvcOpen(true)} onMouseLeave={() => n.k === "svc" && setSvcOpen(false)}>
              <button
                onClick={() => n.k !== "svc" && nav(n.k)}
                style={{
                  background: page === n.k ? P.lime : "none",
                  border: page === n.k ? `2px solid ${P.dark}` : "2px solid transparent",
                  padding: "6px 14px",
                  fontFamily: "'Outfit'",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  color: P.dark,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { if (page !== n.k) e.target.style.background = P.lightgray; }}
                onMouseLeave={(e) => { if (page !== n.k) e.target.style.background = "none"; }}
              >
                {n.l}
                {n.k === "svc" ? " ▾" : ""}
              </button>
              {n.k === "svc" && svcOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, background: P.bg, border: `3px solid ${P.dark}`, boxShadow: `6px 6px 0 ${P.dark}`, minWidth: 240, zIndex: 200 }}>
                  {svcs.map((s) => (
                    <button
                      key={s.k}
                      onClick={() => { nav(s.k); setSvcOpen(false); }}
                      style={{ display: "block", width: "100%", background: "none", border: "none", borderBottom: `2px solid ${P.lightgray}`, padding: "12px 18px", textAlign: "left", fontFamily: "'Outfit'", fontSize: 13, fontWeight: 700, cursor: "pointer", color: P.dark, transition: "all 0.15s" }}
                      onMouseEnter={(e) => { e.target.style.background = P.lime; e.target.style.paddingLeft = "24px"; }}
                      onMouseLeave={(e) => { e.target.style.background = "none"; e.target.style.paddingLeft = "18px"; }}
                    >
                      {s.l}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: P.lime, border: `3px solid ${P.dark}`, boxShadow: `3px 3px 0 ${P.dark}`, padding: "8px 12px", cursor: "pointer", fontFamily: "'Outfit'", fontWeight: 900, fontSize: 14 }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: P.bg, borderTop: `3px solid ${P.dark}`, padding: "8px 24px 16px" }}>
          {[{ l: "Home", k: "home" }, ...svcs, { l: "Design", k: "design" }, { l: "Blog", k: "blog" }, { l: "Playbook", k: "playbook" }, { l: "Book", k: "book" }].map((n) => (
            <button
              key={n.k}
              onClick={() => { nav(n.k); setMenuOpen(false); }}
              style={{ display: "block", width: "100%", background: page === n.k ? P.lime : "none", border: `2px solid ${page === n.k ? P.dark : "transparent"}`, padding: "12px 16px", textAlign: "left", fontFamily: "'Outfit'", fontSize: 14, fontWeight: 700, cursor: "pointer", color: P.dark, textTransform: "uppercase", marginBottom: 2 }}
            >
              {n.l}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
function Footer({ nav }) {
  return (
    <footer style={{ background: P.dark, color: P.white, padding: "48px 24px 28px", borderTop: `4px solid ${P.dark}` }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32, marginBottom: 32 }}>
        <div>
          <Logo size={28} />
          <p style={{ fontFamily: "'Sora'", fontSize: 13, color: "#999", lineHeight: 1.8, marginTop: 14 }}>Growth strategist who builds systems, not excuses. Strategy, content, and execution for founders who move fast.</p>
        </div>
        <div>
          <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14, color: P.orange }}>Quick Links</div>
          {[{ l: "Blog", k: "blog" }, { l: "Resources", k: "playbook" }].map(({ l, k }) => (
            <div key={k}>
              <button
                onClick={() => nav(k)}
                style={{ background: "none", border: "none", color: P.white, fontFamily: "'Sora'", fontSize: 13, padding: "4px 0", cursor: "pointer" }}
                onMouseEnter={(e) => (e.target.style.color = P.lime)}
                onMouseLeave={(e) => (e.target.style.color = P.white)}
              >
                {l}
              </button>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14, color: P.orange }}>Contact</div>
          <p style={{ fontFamily: "'Sora'", fontSize: 13, color: "#ccc", marginBottom: 6 }}>byahmadfaroqq@outlook.com</p>
          <p style={{ fontFamily: "'Sora'", fontSize: 13, color: "#ccc", marginBottom: 6 }}>+92 347 2768985</p>
          <p style={{ fontFamily: "'Sora'", fontSize: 13, color: "#ccc" }}>linkedin.com/in/byahmad</p>
        </div>
      </div>
      <div style={{ borderTop: "2px solid #333", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontFamily: "'Sora'", fontSize: 11, color: "#666" }}>&copy; 2026 Ahmad Farooq. Built different.</p>
        <div style={{ fontFamily: "'Outfit'", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: P.orange, textTransform: "uppercase" }}>Neo-Brutalism Edition</div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════ */
function HomePage({ nav }) {
  const clients = [
    { n: "Coin Bureau", c: P.blue },
    { n: "LBank", c: P.orange },
    { n: "O!Millionaire", c: "#2e7d32" },
    { n: "Bitward", c: P.blue },
    { n: "Klip AI", c: P.purple },
    { n: "Helvetiqa", c: P.dark },
    { n: "Nick FarrenKopf", c: "#0077B5" },
    { n: "TradeTravelChill", c: "#00838f" },
    { n: "Zara Shafiq Khan", c: "#c62828" },
    { n: "OneSoft", c: "#1565c0" },
    { n: "Big O Soft", c: P.orange },
    { n: "Zedsource", c: P.purple },
  ];
  const services = [
    { title: "Growth Marketing and Funnel Optimization", desc: "End to end funnel systems that turn traffic into revenue. Landing pages, email sequences, conversion tracking, and everything between.", k: "growth", color: P.orange, num: "01" },
    { title: "LinkedIn Branding and Authority Building", desc: "Your LinkedIn becomes a lead machine. Profile optimization, content strategy, audience growth, and thought leadership.", k: "linkedin", color: P.blue, num: "02" },
    { title: "Marketing Strategy and Optimization", desc: "Data driven strategies that align brand messaging with business objectives. Campaign planning, research, and performance analytics.", k: "strategy", color: P.lime, num: "03" },
    { title: "Content Writing and Strategy", desc: "Copy that converts. Blog posts, email sequences, social content, landing pages, and editorial systems that scale.", k: "content", color: P.pink, num: "04" },
    { title: "Graphic Design and Visual Systems", desc: "Brand identity, social graphics, presentations, and marketing collateral. Design that communicates, not decorates.", k: "gdesign", color: P.purple, num: "05" },
    { title: "Business Branding and Identity Development", desc: "Complete brand identity systems. Logo, messaging, visual guidelines, positioning, and the strategy that ties it all together.", k: "branding", color: "#00838f", num: "06" },
  ];
  const casestudies = [
    { v: "nick", t: "Nick FarrenKopf LinkedIn Build", d: "500 to 10,000+ followers in 6 months. 312% profile visibility increase. 15+ inbound leads monthly.", k: "linkedin" },
    { v: "lbank", t: "LBank Academy Acquisition Funnel", d: "4.2x user conversion improvement. 67% lower acquisition cost. Higher trading volumes from educated users.", k: "growth" },
    { v: "coinbureau", t: "Coin Bureau Growth Strategy", d: "40% newsletter growth. 13% content retention improvement. 38% email open rate on automated sequences.", k: "strategy" },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ background: P.bg, position: "relative", overflow: "hidden", borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ position: "absolute", top: 40, right: 60, width: 180, height: 180, background: P.lime, border: `3px solid ${P.dark}`, transform: "rotate(12deg)", opacity: 0.5, zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: 30, left: 40, width: 120, height: 120, background: P.pink, border: `3px solid ${P.dark}`, borderRadius: "50%", opacity: 0.3, zIndex: 0 }} />
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "80px 24px 72px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "center", position: "relative", zIndex: 1 }}>
          <Anim>
            <BTag color={P.orange} rotate={-3}>Growth Strategist</BTag>
            <h1 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: "clamp(48px, 7vw, 80px)", lineHeight: 0.95, marginTop: 20, marginBottom: 14, color: P.dark, letterSpacing: -2 }}>
              AHMAD<br />
              <span style={{ color: P.orange, WebkitTextStroke: `2px ${P.dark}` }}>FAROOQ</span>
            </h1>
            <p style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: 18, color: P.dark, marginBottom: 8, lineHeight: 1.4 }}>I build the systems that make growth inevitable.</p>
            <p style={{ fontFamily: "'Sora'", fontSize: 14, color: P.gray, lineHeight: 1.8, marginBottom: 32, maxWidth: 440 }}>Strategy, funnels, content, and branding for founders who are done guessing and ready to scale.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <BBtn onClick={() => nav("growth")} bg={P.lime}>Explore Services</BBtn>
              <BBtn onClick={() => nav("book")} bg={P.white}>Book a Call</BBtn>
            </div>
          </Anim>
          <Anim delay={0.2}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", transform: "rotate(2deg)" }}>
                <div
  style={{
    width: 260,
    height: 320,
    background: P.lightgray,
    border: `4px solid ${P.dark}`,
    boxShadow: `8px 8px 0 ${P.dark}`,
    overflow: "hidden",
  }}
>
  <img
    src="/profile.png"
    alt="Ahmad Farooq"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    }}
  />
</div>

                <div style={{ position: "absolute", bottom: -12, right: -12, background: P.lime, border: `3px solid ${P.dark}`, padding: "6px 14px", fontFamily: "'Outfit'", fontWeight: 800, fontSize: 11, transform: "rotate(-3deg)", boxShadow: `3px 3px 0 ${P.dark}` }}>THAT'S ME →</div>
              </div>
            </div>
          </Anim>
        </div>
        <div style={{ background: P.dark, color: P.lime, padding: "10px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
          <div style={{ display: "inline-block", animation: "marquee 20s linear infinite", fontFamily: "'Outfit'", fontWeight: 800, fontSize: 13, letterSpacing: 3, textTransform: "uppercase" }}>
            {Array(4).fill("GROWTH ✦ STRATEGY ✦ FUNNELS ✦ CONTENT ✦ BRANDING ✦ DESIGN ✦ ").join("")}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section style={{ padding: "48px 24px", background: P.cream, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Anim>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <BTag>Trusted By</BTag>
              <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 32, marginTop: 14, textTransform: "uppercase" }}>Brands and Clients</h2>
            </div>
          </Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
            {clients.map((c, i) => (
              <Anim key={i} delay={i * 0.04}>
                <div
                  style={{ padding: "16px 14px", display: "flex", alignItems: "center", justifyContent: "center", background: P.white, border: `3px solid ${P.dark}`, boxShadow: `4px 4px 0 ${P.dark}`, transition: "all 0.15s", cursor: "default" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = c.c; e.currentTarget.style.transform = "translate(-2px, -2px)"; e.currentTarget.style.boxShadow = `6px 6px 0 ${P.dark}`; e.currentTarget.querySelector("span").style.color = P.white; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = P.white; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `4px 4px 0 ${P.dark}`; e.currentTarget.querySelector("span").style.color = c.c; }}
                >
                  <span style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 14, color: c.c, transition: "color 0.15s" }}>{c.n}</span>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "72px 24px", background: P.bg, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Anim>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <BTag color={P.orange} rotate={2}>What I Do</BTag>
              <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 36, marginTop: 14, textTransform: "uppercase" }}>Core Services</h2>
            </div>
          </Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {services.map((svc, i) => (
              <Anim key={i} delay={i * 0.08}>
                <div
                  onClick={() => nav(svc.k)}
                  style={{ background: P.white, border: `3px solid ${P.dark}`, boxShadow: `5px 5px 0 ${P.dark}`, cursor: "pointer", transition: "all 0.15s", overflow: "hidden" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-3px, -3px)"; e.currentTarget.style.boxShadow = `8px 8px 0 ${P.dark}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `5px 5px 0 ${P.dark}`; }}
                >
                  <div style={{ background: svc.color, padding: "12px 20px", borderBottom: `3px solid ${P.dark}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 28, color: svc.color === P.lime ? P.dark : P.white }}>{svc.num}</span>
                    <span style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: 10, letterSpacing: 2, color: svc.color === P.lime ? P.dark : P.white, textTransform: "uppercase" }}>Service</span>
                  </div>
                  <div style={{ padding: "20px 20px 24px" }}>
                    <h3 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 17, marginBottom: 10, textTransform: "uppercase", lineHeight: 1.3 }}>{svc.title}</h3>
                    <p style={{ fontFamily: "'Sora'", fontSize: 13, color: P.gray, lineHeight: 1.7, marginBottom: 16 }}>{svc.desc}</p>
                    <span style={{ fontFamily: "'Outfit'", fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: P.dark, background: svc.color, padding: "4px 12px", border: `2px solid ${P.dark}` }}>Learn More</span>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section style={{ padding: "72px 24px", background: P.cream, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Anim>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <BTag color={P.pink}>Proven Results</BTag>
              <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 36, marginTop: 14, textTransform: "uppercase" }}>Featured Work</h2>
            </div>
          </Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {casestudies.map((cs, i) => (
              <Anim key={i} delay={i * 0.1}>
                <div
                  onClick={() => nav(cs.k)}
                  style={{ background: P.white, border: `3px solid ${P.dark}`, boxShadow: `5px 5px 0 ${P.dark}`, overflow: "hidden", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-3px, -3px) rotate(-0.5deg)"; e.currentTarget.style.boxShadow = `8px 8px 0 ${P.dark}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `5px 5px 0 ${P.dark}`; }}
                >
                  <CaseVis type={cs.v} />
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 16, marginBottom: 8, textTransform: "uppercase" }}>{cs.t}</h3>
                    <p style={{ fontFamily: "'Sora'", fontSize: 13, color: P.gray, lineHeight: 1.7 }}>{cs.d}</p>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN PREVIEW */}
      <section style={{ padding: "72px 24px", background: P.bg, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Anim>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <BTag color={P.purple}>Creative Range</BTag>
              <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 36, marginTop: 14, textTransform: "uppercase" }}>Design Studio</h2>
            </div>
          </Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20 }}>
            {["volta", "noma", "cipher", "noir"].map((p, i) => (
              <Anim key={i} delay={i * 0.08}>
                <StudioProject project={p} index={i} />
              </Anim>
            ))}
          </div>
          <Anim delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <BBtn onClick={() => nav("design")} bg={P.dark} style={{ color: P.white }}>View Full Studio →</BBtn>
            </div>
          </Anim>
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ background: P.dark, padding: "72px 24px", color: P.white, borderBottom: `4px solid ${P.lime}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Anim>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <BTag color={P.lime}>Capabilities</BTag>
              <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 36, marginTop: 14, textTransform: "uppercase", color: P.white }}>Skills</h2>
            </div>
          </Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
            {["Graphic Design", "Content Writing", "SEO", "Social Media", "Funnel Design", "Go to Market Strategy", "Product Design", "Marketing Strategy", "Personal Branding", "Paid Advertising"].map((s, i) => (
              <Anim key={i} delay={i * 0.04}>
                <div
                  style={{ padding: "16px 14px", border: "2px solid #333", textAlign: "center", transition: "all 0.2s", cursor: "default" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = P.lime; e.currentTarget.style.borderColor = P.lime; e.currentTarget.style.color = P.dark; e.currentTarget.style.transform = "scale(1.05) rotate(-1deg)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = P.white; e.currentTarget.style.transform = "none"; }}
                >
                  <div style={{ fontFamily: "'Outfit'", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{s}</div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SERVICE PAGE (Reusable for all 6 services)
   ═══════════════════════════════════════════════════════════ */
function ServicePage({ cfg, nav }) {
  const textColor = cfg.ac === P.lime ? P.dark : P.white;
  return (
    <div>
      <section style={{ background: cfg.ac, borderBottom: `4px solid ${P.dark}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 160, height: 160, border: `4px solid ${P.dark}`, opacity: 0.15, transform: "rotate(15deg)" }} />
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "72px 24px 56px" }}>
          <Anim>
            <BTag color={P.white} rotate={-2}>Service</BTag>
            <h1 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: "clamp(32px, 5vw, 52px)", marginTop: 16, marginBottom: 14, textTransform: "uppercase", lineHeight: 1.05, color: textColor, letterSpacing: -1 }}>{cfg.title}</h1>
            <p style={{ fontFamily: "'Sora'", fontSize: 15, lineHeight: 1.8, maxWidth: 580, marginBottom: 28, color: cfg.ac === P.lime ? P.dark : "rgba(255,255,255,0.9)" }}>{cfg.overview}</p>
            <BBtn onClick={() => nav("book")} bg={cfg.ac === P.lime ? P.dark : P.white} style={{ color: cfg.ac === P.lime ? P.white : P.dark }}>Book This Service</BBtn>
          </Anim>
        </div>
      </section>

      {/* INCLUDES */}
      <section style={{ padding: "72px 24px", background: P.bg, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Anim><h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 28, marginBottom: 24, textTransform: "uppercase" }}>What Is Included</h2></Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {cfg.inc.map((item, i) => (
              <Anim key={i} delay={i * 0.06}>
                <div
                  style={{ padding: 20, border: `3px solid ${P.dark}`, boxShadow: `4px 4px 0 ${P.dark}`, background: P.white, transition: "all 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-2px, -2px)"; e.currentTarget.style.boxShadow = `6px 6px 0 ${P.dark}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `4px 4px 0 ${P.dark}`; }}
                >
                  <h3 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 14, marginBottom: 6, textTransform: "uppercase" }}>{item.t}</h3>
                  <p style={{ fontFamily: "'Sora'", fontSize: 13, color: P.gray, lineHeight: 1.7 }}>{item.d}</p>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section style={{ padding: "72px 24px", background: P.cream, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Anim><h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 28, marginBottom: 28, textTransform: "uppercase" }}>Case Studies</h2></Anim>
          <div style={{ display: "grid", gap: 24 }}>
            {cfg.cases.map((cs, i) => (
              <Anim key={i} delay={i * 0.1}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", background: P.white, border: `3px solid ${P.dark}`, boxShadow: `5px 5px 0 ${P.dark}`, overflow: "hidden" }}>
                  <CaseVis type={cs.v} />
                  <div style={{ padding: 24 }}>
                    <h3 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 20, marginBottom: 14, textTransform: "uppercase" }}>{cs.name}</h3>
                    {["challenge", "solution", "results"].map((k) => (
                      <div key={k} style={{ marginBottom: 10 }}>
                        <div style={{ fontFamily: "'Outfit'", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: P.orange, marginBottom: 3, background: k === "results" ? P.lime : "none", display: "inline-block", padding: k === "results" ? "1px 8px" : 0, border: k === "results" ? `2px solid ${P.dark}` : "none" }}>{k}</div>
                        <p style={{ fontFamily: "'Sora'", fontSize: 13, color: P.gray, lineHeight: 1.7 }}>{cs[k]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "72px 24px", background: P.bg, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Anim><h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 28, marginBottom: 28, textTransform: "uppercase" }}>The Process</h2></Anim>
          <div style={{ display: "grid", gap: 12, maxWidth: 700 }}>
            {cfg.process.map((step, i) => (
              <Anim key={i} delay={i * 0.08}>
                <ProcessStep num={i + 1} title={step.t} desc={step.d} color={[P.lime, P.pink, P.orange + "33", P.blue + "22", P.purple + "22"][i] || P.lime} />
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: P.dark, padding: "64px 24px", color: P.white, textAlign: "center" }}>
        <Anim>
          <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 32, marginBottom: 14, textTransform: "uppercase", color: P.white }}>Ready?</h2>
          <p style={{ fontFamily: "'Sora'", fontSize: 14, color: "#999", marginBottom: 28 }}>Let us build your growth system.</p>
          <BBtn onClick={() => nav("book")} bg={P.lime}>Schedule Strategy Session</BBtn>
        </Anim>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SERVICE CONFIGURATIONS
   ═══════════════════════════════════════════════════════════ */
const SVC = {
  growth: {
    title: "Growth Marketing and Funnel Optimization",
    ac: P.orange,
    overview: "I build end to end marketing funnels that transform visitors into customers. Landing pages, email sequences, conversion tracking, and every touchpoint in between. No guesswork, just systems.",
    inc: [
      { t: "Funnel Architecture", d: "Custom conversion funnels mapped to your buyer journey and business model." },
      { t: "Landing Page Optimization", d: "High converting pages with persuasive copy, strong CTAs, and testing frameworks." },
      { t: "Email Sequence Design", d: "Automated nurture sequences that build trust and drive conversions at scale." },
      { t: "Analytics and Tracking", d: "Full funnel analytics with conversion tracking and performance dashboards." },
    ],
    cases: [
      { v: "lbank", name: "LBank Academy Growth Plan", challenge: "LBank Exchange needed user acquisition beyond paid ads. High costs and low retention.", solution: "Designed LBank Academy as a free educational platform. Students progress through trading curriculum and naturally transition to the exchange.", results: "4.2x user conversion improvement. 67% drop in acquisition cost. Higher trading volumes from educated users." },
      { v: "bitward", name: "Bitward Multi Channel Funnel", challenge: "No structured path from social followers to active product users.", solution: "Built complete social optimization with multi channel funnel, conversion tracking, and content calendar.", results: "3x increase in funnel conversion. Repeatable content system driving consistent growth." },
      { v: "omillionaire", name: "O!Millionaire Performance Marketing", challenge: "Needed to scale acquisition while maintaining ROAS across markets.", solution: "Managed over $180,000 in ad spend with optimized campaigns, audience segmentation, and creative testing.", results: "35% ROAS improvement. Scaled acquisition across target markets through systematic testing." },
    ],
    process: [
      { t: "Audit and Research", d: "Deep dive into current funnel, analytics, competitors, and opportunities." },
      { t: "Strategy Design", d: "Map complete funnel architecture with clear conversion goals at every stage." },
      { t: "Build and Launch", d: "Create landing pages, emails, tracking, and all supporting systems." },
      { t: "Test and Optimize", d: "Split tests, data analysis, and continuous refinement for peak performance." },
    ],
  },
  linkedin: {
    title: "LinkedIn Branding and Authority Building",
    ac: P.blue,
    overview: "Your LinkedIn is not a resume. I turn it into a lead generation engine that positions you as the authority, attracts ideal clients, and builds a community around your expertise.",
    inc: [
      { t: "Profile Optimization", d: "Complete overhaul of headline, about, experience, and featured content." },
      { t: "Content Strategy", d: "Custom calendar with post templates, topic pillars, and engagement tactics." },
      { t: "Audience Growth", d: "Systematic outreach and engagement to grow high value connections." },
      { t: "Thought Leadership", d: "Long form articles and newsletter strategy for deep authority." },
    ],
    cases: [
      { v: "nick", name: "Nick FarrenKopf Authority Build", challenge: "Deep expertise but minimal LinkedIn presence. Under 500 connections, zero inbound leads.", solution: "Complete transformation: optimized profile, content system around expertise pillars, daily engagement targeting decision makers.", results: "500 to 10,000+ engaged followers in 6 months. 312% profile visibility increase. 15+ qualified inbound leads monthly." },
      { v: "zara", name: "Zara Shafiq Khan Personal Brand", challenge: "Needed strong personal brand presence from a standing start.", solution: "Rapid growth strategy with video content development and engagement optimization tailored to her expertise.", results: "5x engagement rate increase. Rapid follower growth. Sustainable content creation system built." },
    ],
    process: [
      { t: "Profile Audit", d: "Analyze presence, positioning gaps, and competitive landscape." },
      { t: "Strategy Blueprint", d: "Define content pillars, schedule, and targeting." },
      { t: "Content System", d: "Build content library, templates, and repurposing framework." },
      { t: "Launch and Grow", d: "Execute strategy and build engagement momentum." },
    ],
  },
  strategy: {
    title: "Marketing Strategy and Optimization",
    ac: P.lime,
    overview: "Great results start with great strategy. I develop comprehensive marketing plans that align messaging with objectives, optimize for ROI, and create frameworks that scale.",
    inc: [
      { t: "Brand Positioning", d: "Define market position, messaging framework, and competitive differentiation." },
      { t: "Campaign Planning", d: "Multi channel strategies with objectives, timelines, and KPIs." },
      { t: "Market Research", d: "Audience analysis, competitor mapping, and opportunity assessment." },
      { t: "Performance Analytics", d: "Custom dashboards, attribution modeling, and ROI analysis." },
    ],
    cases: [
      { v: "coinbureau", name: "Coin Bureau Content Growth", challenge: "Massive audience but underutilized for monetization. Newsletter growth plateaued.", solution: "Comprehensive content strategy: retention optimization, automated email funnel, monetization community strategy.", results: "5% organic traffic lift. 13% retention improvement. 40% newsletter growth. 38% email open rate." },
      { v: "klip", name: "Klip AI Web3 Strategy", challenge: "New Web3 wallet with no clear positioning against established competitors.", solution: "Go to market strategy targeting mobile first crypto newcomers. Social optimization and content approach.", results: "Clear target audience defined. Social discoverability resolved. Growth roadmap for 100+ chain score." },
      { v: "design", name: "Multi Client Brand Systems", challenge: "Multiple clients needed cohesive visual identities scaling across platforms.", solution: "Comprehensive brand systems: social graphics, presentations, marketing collateral with consistent design languages.", results: "10+ distinct brand systems delivered. Complete visual identity packages for each client." },
    ],
    process: [
      { t: "Discovery", d: "Business goals, audience, current landscape." },
      { t: "Research", d: "Competitive analysis, market mapping, segmentation." },
      { t: "Strategy", d: "Comprehensive plan with priorities and tactics." },
      { t: "Execute", d: "Systems, workflows, and implementation support." },
      { t: "Iterate", d: "Track, analyze, optimize, repeat." },
    ],
  },
  content: {
    title: "Content Writing and Strategy",
    ac: P.pink,
    overview: "Words that do the heavy lifting. Blog posts, email sequences, social copy, landing pages, and editorial systems. Strategy first, then execution that converts.",
    inc: [
      { t: "Blog and Article Writing", d: "SEO optimized content that ranks, educates, and converts organic traffic." },
      { t: "Email Copywriting", d: "Sequences, newsletters, and campaigns that maintain engagement and drive action." },
      { t: "Social Media Copy", d: "Platform specific content that stops the scroll and builds community." },
      { t: "Content Strategy", d: "Editorial calendars, topic pillars, and distribution frameworks." },
    ],
    cases: [
      { v: "coinbureau", name: "Coin Bureau Content System", challenge: "Needed structured approach to convert viewership into business outcomes.", solution: "Editorial calendar, repurposing framework, and automated distribution workflow.", results: "13% retention improvement. 40% newsletter signup growth. Sustainable system the team runs independently." },
      { v: "content", name: "LinkedIn Authority Content", challenge: "Multiple clients needed consistent thought leadership content.", solution: "Content frameworks with voice guidelines, topic pillars, and engagement hooks per audience.", results: "312% average visibility increase. 500,000+ monthly impressions. Repeatable templates established." },
    ],
    process: [
      { t: "Content Audit", d: "Review existing content, gaps, and opportunities." },
      { t: "Strategy and Calendar", d: "Build editorial calendar with topic pillars." },
      { t: "Create and Optimize", d: "Write, edit, optimize for platform and SEO." },
      { t: "Distribute and Measure", d: "Publish, promote, track, refine." },
    ],
  },
  gdesign: {
    title: "Graphic Design and Visual Systems",
    ac: P.purple,
    overview: "Design that communicates, not decorates. Brand identity, social graphics, presentations, marketing collateral, and complete visual systems built for real business needs.",
    inc: [
      { t: "Brand Identity Design", d: "Logo, color systems, typography, and visual guidelines." },
      { t: "Social Media Graphics", d: "Templates and custom graphics for consistent platform presence." },
      { t: "Presentation Design", d: "Pitch decks, investor presentations, and internal decks that persuade." },
      { t: "Marketing Collateral", d: "Flyers, brochures, banners, and campaign assets." },
    ],
    cases: [
      { v: "design", name: "Multi Brand Visual Systems", challenge: "Clients across industries needed distinct yet scalable visual identities.", solution: "Created 10+ brand systems spanning fintech, wellness, fashion, outdoor, and tech. Each with full asset libraries.", results: "Complete identity packages adaptable to any medium. Consistent brand presence across all touchpoints." },
      { v: "social", name: "Social Media Design at Scale", challenge: "Clients needed high volume, high quality social graphics without sacrificing brand consistency.", solution: "Built template systems for carousels, stories, and posts. Modular design components for rapid production.", results: "500,000+ monthly impressions on designed content. 4x faster production through template systems." },
    ],
    process: [
      { t: "Brief and Research", d: "Understand brand, audience, competitors, and goals." },
      { t: "Concepts", d: "Multiple creative directions with moodboards." },
      { t: "Refine", d: "Iterate on chosen direction with feedback." },
      { t: "Deliver", d: "Final assets, guidelines, and source files." },
    ],
  },
  branding: {
    title: "Business Branding and Identity Development",
    ac: "#00838f",
    overview: "Your brand is not a logo. It is a complete system. I build brand identities from the ground up: positioning, messaging, visual identity, guidelines, and the strategy that makes it all stick.",
    inc: [
      { t: "Brand Strategy", d: "Market positioning, competitive analysis, audience definition, and brand architecture." },
      { t: "Visual Identity", d: "Logo design, color palette, typography, and comprehensive style guide." },
      { t: "Messaging Framework", d: "Brand voice, tone guidelines, taglines, and key messaging hierarchy." },
      { t: "Brand Guidelines", d: "Complete brand book with usage rules and application examples." },
    ],
    cases: [
      { v: "brand", name: "Complete Brand Identity Projects", challenge: "New businesses and rebrandings needed complete identity systems from scratch.", solution: "Full brand development: market research, positioning strategy, visual identity design, messaging framework, and guidelines.", results: "6+ complete brand identity systems delivered. Clients launched with clear, differentiated market positions." },
      { v: "nick", name: "Personal Brand Architecture", challenge: "Professionals needed to establish recognizable personal brands in competitive spaces.", solution: "Personal brand strategy covering positioning, visual identity, content pillars, and platform optimization.", results: "Clients became recognized authorities in their niches. Consistent brand presence driving inbound opportunities." },
    ],
    process: [
      { t: "Discovery", d: "Business analysis, audience research, and competitive mapping." },
      { t: "Positioning", d: "Define unique market position and brand architecture." },
      { t: "Identity Design", d: "Create visual identity, messaging, and brand assets." },
      { t: "Guidelines", d: "Comprehensive brand book and implementation guide." },
      { t: "Launch", d: "Rollout support and brand consistency training." },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════
   DESIGN PORTFOLIO PAGE (Studio Wall)
   ═══════════════════════════════════════════════════════════ */
function DesignPage({ nav }) {
  const projects = [
    { k: "volta", n: "Volta Energy", t: "Brand Identity" },
    { k: "noma", n: "Noma Kitchen", t: "Restaurant Brand" },
    { k: "meridian", n: "Meridian Finance", t: "Dashboard UI" },
    { k: "atlas", n: "Atlas Outdoor", t: "Adventure Brand" },
    { k: "bloom", n: "Bloom Wellness", t: "Health Brand" },
    { k: "cipher", n: "Cipher Protocol", t: "Web3 Identity" },
    { k: "pulse", n: "Pulse Fitness", t: "App Design" },
    { k: "noir", n: "Studio Noir", t: "Luxury Fashion" },
    { k: "terra", n: "Terraverde", t: "Sustainable Brand" },
    { k: "nexus", n: "Nexus AI", t: "Tech Startup" },
  ];
  return (
    <div>
      <section style={{ background: P.purple, borderBottom: `4px solid ${P.dark}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20, right: 30, fontFamily: "'Outfit'", fontSize: 120, fontWeight: 900, color: "rgba(255,255,255,0.06)", lineHeight: 1 }}>WORK</div>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "72px 24px 56px" }}>
          <Anim>
            <BTag color={P.lime}>Portfolio</BTag>
            <h1 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: "clamp(36px, 5vw, 56px)", marginTop: 16, color: P.white, textTransform: "uppercase", letterSpacing: -1 }}>Design Studio</h1>
            <p style={{ fontFamily: "'Sora'", fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 520, marginTop: 12 }}>This is the studio wall. Raw process, unfinished ideas, and finished work. Every project tells a story from brief to delivery.</p>
          </Anim>
        </div>
      </section>
      <section style={{ padding: "72px 24px", background: P.bg, borderBottom: `4px solid ${P.dark}`, position: "relative" }}>
        <div style={{ position: "absolute", inset: 24, border: "1px dashed rgba(0,0,0,0.08)" }} />
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
            {projects.map((p, i) => (
              <Anim key={i} delay={i * 0.06}>
                <StudioProject project={p.k} index={i} />
              </Anim>
            ))}
          </div>
          <div style={{ fontFamily: "'Sora'", fontSize: 11, color: P.gray, fontStyle: "italic", marginTop: 40, textAlign: "center" }}>↑ Pinned to the studio wall. Hover to straighten. Each project has a story.</div>
        </div>
      </section>
      <section style={{ background: P.dark, padding: "56px 24px", textAlign: "center", borderBottom: `4px solid ${P.lime}` }}>
        <Anim>
          <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 28, color: P.white, textTransform: "uppercase", marginBottom: 14 }}>Need Design Work?</h2>
          <p style={{ fontFamily: "'Sora'", fontSize: 14, color: "#999", marginBottom: 24 }}>Social graphics, brand identity, presentations, and more.</p>
          <BBtn onClick={() => nav("book")} bg={P.lime}>Start a Project</BBtn>
        </Anim>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BLOG PAGE (Ghost CMS)
   ═══════════════════════════════════════════════════════════ */
function BlogPage({ nav, onPostClick }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ghost.posts
      .browse({ limit: 20, include: "authors" })
      .then((results) => {
        setPosts(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ghost fetch error:", err);
        setError("Could not load posts.");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div>
      <section style={{ background: P.blue, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "72px 24px 56px" }}>
          <Anim>
            <BTag color={P.lime}>Blog</BTag>
            <h1 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: "clamp(36px, 5vw, 56px)", marginTop: 16, color: P.white, textTransform: "uppercase" }}>Insights</h1>
            <p style={{ fontFamily: "'Sora'", fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 12, maxWidth: 480 }}>Unfiltered thoughts on growth, funnels, content, and building brands that actually work.</p>
          </Anim>
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: P.bg, minHeight: 400, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {loading && (
            <div style={{ textAlign: "center", padding: 60 }}>
              <div style={{ width: 48, height: 48, border: `4px solid ${P.dark}`, borderTop: `4px solid ${P.lime}`, borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
              <p style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>Loading posts...</p>
            </div>
          )}

          {error && (
            <div style={{ textAlign: "center", padding: 60 }}>
              <div style={{ background: P.pink, border: `3px solid ${P.dark}`, boxShadow: `5px 5px 0 ${P.dark}`, padding: 28, display: "inline-block" }}>
                <p style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 16 }}>{error}</p>
                <p style={{ fontFamily: "'Sora'", fontSize: 13, color: P.gray, marginTop: 8 }}>Check back soon or try refreshing.</p>
              </div>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div style={{ textAlign: "center", padding: 60 }}>
              <div style={{ background: P.lime, width: 80, height: 80, border: `3px solid ${P.dark}`, boxShadow: `4px 4px 0 ${P.dark}`, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-5deg)" }}>
                <span style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 28 }}>?!</span>
              </div>
              <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 26, marginBottom: 10, textTransform: "uppercase" }}>Coming Soon</h2>
              <p style={{ fontFamily: "'Sora'", fontSize: 14, color: P.gray, marginBottom: 36 }}>Articles on growth, funnels, LinkedIn, and content systems. Dropping soon.</p>
              <div style={{ maxWidth: 480, margin: "0 auto", padding: 28, background: P.white, border: `3px solid ${P.dark}`, boxShadow: `5px 5px 0 ${P.dark}` }}>
                <h3 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 18, marginBottom: 8, textTransform: "uppercase" }}>Get Notified</h3>
                <p style={{ fontFamily: "'Sora'", fontSize: 12, color: P.gray, marginBottom: 14 }}>First to read. No spam. Ever.</p>
                <SubscribeForm label="Subscribe" source="blog" />
              </div>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div style={{ display: "grid", gap: 20 }}>
              {posts.map((post, i) => (
                <Anim key={post.id} delay={i * 0.06}>
                  <article
                    onClick={() => onPostClick(post)}
                    style={{
                      background: P.white,
                      border: `3px solid ${P.dark}`,
                      boxShadow: `5px 5px 0 ${P.dark}`,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-3px, -3px)"; e.currentTarget.style.boxShadow = `8px 8px 0 ${P.dark}`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `5px 5px 0 ${P.dark}`; }}
                  >
                    {post.feature_image && (
                      <div style={{ width: "100%", height: 220, overflow: "hidden", borderBottom: `3px solid ${P.dark}` }}>
                        <img src={post.feature_image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}
                    <div style={{ padding: "24px 28px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "'Outfit'", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: P.orange }}>{formatDate(post.published_at)}</span>
                        {post.reading_time && (
                          <span style={{ fontFamily: "'Outfit'", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: P.lime, padding: "2px 10px", border: `2px solid ${P.dark}` }}>{post.reading_time} min read</span>
                        )}
                      </div>
                      <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 22, textTransform: "uppercase", lineHeight: 1.2, marginBottom: 10 }}>{post.title}</h2>
                      {post.custom_excerpt && <p style={{ fontFamily: "'Sora'", fontSize: 13, color: P.gray, lineHeight: 1.7, marginBottom: 12 }}>{post.custom_excerpt}</p>}
                      {!post.custom_excerpt && post.excerpt && <p style={{ fontFamily: "'Sora'", fontSize: 13, color: P.gray, lineHeight: 1.7, marginBottom: 12 }}>{post.excerpt}</p>}
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, background: P.dark, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: P.white, fontFamily: "'Outfit'", fontWeight: 800, fontSize: 12 }}>AF</span>
                        </div>
                        <span style={{ fontFamily: "'Outfit'", fontSize: 12, fontWeight: 700, color: P.dark }}>Ahmad Farooq</span>
                      </div>
                    </div>
                  </article>
                </Anim>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   POST PAGE (Single Ghost Article)
   ═══════════════════════════════════════════════════════════ */
function PostPage({ post, nav }) {
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div>
      {/* HERO */}
      <section style={{ background: P.dark, borderBottom: `4px solid ${P.lime}`, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px 56px" }}>
          <Anim>
            <button
              onClick={() => nav("blog")}
              style={{
                background: P.lime,
                border: `3px solid ${P.white}`,
                boxShadow: `4px 4px 0 ${P.white}`,
                padding: "8px 18px",
                fontFamily: "'Outfit'",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
                cursor: "pointer",
                color: P.dark,
                marginBottom: 24,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-2px, -2px)"; e.currentTarget.style.boxShadow = `6px 6px 0 ${P.white}`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `4px 4px 0 ${P.white}`; }}
            >
              ← Back to Blog
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Outfit'", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: P.lime }}>{formatDate(post.published_at)}</span>
              {post.reading_time && (
                <span style={{ fontFamily: "'Outfit'", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: P.orange, color: P.white, padding: "2px 10px", border: `2px solid ${P.white}` }}>{post.reading_time} min read</span>
              )}
            </div>
            <h1 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: "clamp(28px, 5vw, 46px)", color: P.white, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 20 }}>{post.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, background: P.orange, borderRadius: "50%", border: `2px solid ${P.white}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: P.white, fontFamily: "'Outfit'", fontWeight: 800, fontSize: 14 }}>AF</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Outfit'", fontSize: 13, fontWeight: 700, color: P.white }}>Ahmad Farooq</div>
                <div style={{ fontFamily: "'Sora'", fontSize: 11, color: "#999" }}>Growth Strategist</div>
              </div>
            </div>
          </Anim>
        </div>
      </section>

      {/* FEATURE IMAGE */}
      {post.feature_image && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", transform: "translateY(-1px)" }}>
          <div style={{ border: `4px solid ${P.dark}`, boxShadow: `6px 6px 0 ${P.dark}`, overflow: "hidden" }}>
            <img src={post.feature_image} alt={post.title} style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </div>
      )}

      {/* ARTICLE BODY */}
      <section style={{ padding: "48px 24px 72px", background: P.bg, borderBottom: `4px solid ${P.dark}` }}>
        <div
          className="ghost-content"
          style={{ maxWidth: 720, margin: "0 auto" }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </section>

      {/* SUBSCRIBE CTA */}
      <section style={{ padding: "56px 24px", background: P.cream, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <Anim>
            <div style={{ padding: 32, background: P.white, border: `3px solid ${P.dark}`, boxShadow: `5px 5px 0 ${P.dark}` }}>
              <h3 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 22, marginBottom: 8, textTransform: "uppercase" }}>Enjoyed This?</h3>
              <p style={{ fontFamily: "'Sora'", fontSize: 13, color: P.gray, marginBottom: 20 }}>Get the next one delivered. No spam, no fluff, just growth.</p>
              <SubscribeForm label="Subscribe" source="post" />
            </div>
          </Anim>
          <div style={{ marginTop: 28 }}>
            <BBtn onClick={() => nav("blog")} bg={P.lime}>← More Articles</BBtn>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BOOK PAGE
   ═══════════════════════════════════════════════════════════ */
function BookPage() {
  return (
    <div>
      <section style={{ background: P.orange, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "72px 24px 56px" }}>
          <Anim>
            <BTag color={P.white}>Let Us Talk</BTag>
            <h1 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: "clamp(36px, 5vw, 56px)", marginTop: 16, color: P.white, textTransform: "uppercase" }}>Book a Strategy Session</h1>
            <p style={{ fontFamily: "'Sora'", fontSize: 15, color: "rgba(255,255,255,0.85)", maxWidth: 500, marginTop: 12 }}>30 minutes. No pitch. Just strategy for your growth challenges.</p>
          </Anim>
        </div>
      </section>
      <section style={{ padding: "72px 24px", background: P.bg, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          <Anim>
            <div style={{ border: `3px solid ${P.dark}`, boxShadow: `5px 5px 0 ${P.dark}`, background: P.white, overflow: "hidden" }}>
              <div style={{ background: P.dark, color: P.white, padding: "14px 20px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Outfit'", fontWeight: 800 }}>February 2026</span>
                <span style={{ fontFamily: "'Outfit'", fontWeight: 700 }}>← →</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2, padding: 2, background: P.lightgray }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
                  <div key={i} style={{ background: P.white, padding: "10px 4px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 10, fontWeight: 700, letterSpacing: 1, color: P.gray, marginBottom: 6 }}>{d}</div>
                    <div style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 20 }}>{[10, 11, 12, 13, 14][i]}</div>
                    <div style={{ width: 8, height: 8, background: P.blue, margin: "4px auto 0" }} />
                  </div>
                ))}
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 10, color: P.gray, textTransform: "uppercase" }}>Available Slots</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map((t, i) => (
                    <div
                      key={i}
                      style={{ padding: "10px 6px", textAlign: "center", border: `2px solid ${P.dark}`, fontFamily: "'Outfit'", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", background: P.white }}
                      onMouseEnter={(e) => { e.target.style.background = P.lime; e.target.style.transform = "translate(-2px, -2px)"; e.target.style.boxShadow = `3px 3px 0 ${P.dark}`; }}
                      onMouseLeave={(e) => { e.target.style.background = P.white; e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "8px 14px 14px", fontFamily: "'Sora'", fontSize: 11, color: P.gray, fontStyle: "italic" }}>Calendly integration replaces this mockup.</div>
            </div>
          </Anim>
          <Anim delay={0.15}>
            <div>
              <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 22, marginBottom: 20, textTransform: "uppercase" }}>What to Prepare</h2>
              {["Your current marketing challenges", "Business goals for the next 3 to 6 months", "Existing analytics or marketing materials", "Questions about your growth strategy"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 32, height: 32, background: P.orange, border: `2px solid ${P.dark}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit'", fontWeight: 900, fontSize: 15, color: P.white, flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ fontFamily: "'Sora'", fontSize: 13, color: P.gray, lineHeight: 1.6, paddingTop: 5 }}>{item}</p>
                </div>
              ))}
              <div style={{ marginTop: 28, padding: 22, background: P.white, border: `3px solid ${P.dark}`, boxShadow: `4px 4px 0 ${P.dark}` }}>
                <h3 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 14, marginBottom: 10, textTransform: "uppercase" }}>Reach Out Directly</h3>
                <p style={{ fontFamily: "'Sora'", fontSize: 13, color: P.gray, marginBottom: 4 }}>byahmadfaroqq@outlook.com</p>
                <p style={{ fontFamily: "'Sora'", fontSize: 13, color: P.gray }}>+92 347 2768985</p>
              </div>
            </div>
          </Anim>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PLAYBOOK PAGE
   ═══════════════════════════════════════════════════════════ */
function PlaybookPage() {
  return (
    <div>
      <section style={{ background: P.lime, borderBottom: `4px solid ${P.dark}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "72px 24px 56px" }}>
          <Anim>
            <BTag color={P.white}>Free Stuff</BTag>
            <h1 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: "clamp(36px, 5vw, 56px)", marginTop: 16, color: P.dark, textTransform: "uppercase" }}>Playbook</h1>
          </Anim>
        </div>
      </section>
      <section style={{ padding: "72px 24px", background: P.bg, textAlign: "center", borderBottom: `4px solid ${P.dark}` }}>
        <Anim>
          <h2 style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 26, marginBottom: 10, textTransform: "uppercase" }}>Launching Soon</h2>
          <p style={{ fontFamily: "'Sora'", fontSize: 14, color: P.gray, marginBottom: 32 }}>Free templates, playbooks, and guides. No gatekeeping.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, maxWidth: 600, margin: "0 auto 36px" }}>
            {[{ t: "LinkedIn Growth Playbook", c: P.blue }, { t: "Funnel Optimization Guide", c: P.orange }, { t: "Content Calendar Template", c: P.pink }].map((r, i) => (
              <div key={i} style={{ padding: 20, border: `3px dashed ${P.dark}`, opacity: 0.5 }}>
                <div style={{ width: 24, height: 24, background: r.c, border: `2px solid ${P.dark}`, margin: "0 auto 10px" }} />
                <div style={{ fontFamily: "'Outfit'", fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>{r.t}</div>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 480, margin: "0 auto", padding: 28, background: P.white, border: `3px solid ${P.dark}`, boxShadow: `5px 5px 0 ${P.dark}` }}>
            <h3 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 18, marginBottom: 8, textTransform: "uppercase" }}>Get Early Access</h3>
            <SubscribeForm label="Notify Me" source="playbook" />
          </div>
        </Anim>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP — MAIN ENTRY
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [activePost, setActivePost] = useState(null);
  const scrollRef = useRef(null);

  const nav = useCallback((p) => {
    if (p === "blog") {
      setActivePost(null);
    }
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handlePostClick = useCallback((post) => {
    setActivePost(post);
    setPage("post");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const renderPage = () => {
    if (page === "post" && activePost) return <PostPage post={activePost} nav={nav} />;
    switch (page) {
      case "home": return <HomePage nav={nav} />;
      case "growth": return <ServicePage cfg={SVC.growth} nav={nav} />;
      case "linkedin": return <ServicePage cfg={SVC.linkedin} nav={nav} />;
      case "strategy": return <ServicePage cfg={SVC.strategy} nav={nav} />;
      case "content": return <ServicePage cfg={SVC.content} nav={nav} />;
      case "gdesign": return <ServicePage cfg={SVC.gdesign} nav={nav} />;
      case "branding": return <ServicePage cfg={SVC.branding} nav={nav} />;
      case "design": return <DesignPage nav={nav} />;
      case "blog": return <BlogPage nav={nav} onPostClick={handlePostClick} />;
      case "book": return <BookPage />;
      case "playbook": return <PlaybookPage />;
      default: return <HomePage nav={nav} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Sora:wght@300;400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        .desktop-nav{display:flex!important}
        .mobile-menu-btn{display:none!important}
        @media(max-width:768px){.desktop-nav{display:none!important}.mobile-menu-btn{display:block!important}}
        input::placeholder{color:#999}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        ::selection{background:${P.lime};color:${P.dark}}
        .ghost-content{font-family:'Sora',sans-serif;font-size:15px;line-height:1.85;color:${P.dark}}
        .ghost-content h1,.ghost-content h2,.ghost-content h3,.ghost-content h4{font-family:'Outfit',sans-serif;font-weight:900;text-transform:uppercase;margin:2em 0 0.6em;line-height:1.2}
        .ghost-content h2{font-size:26px}
        .ghost-content h3{font-size:20px}
        .ghost-content p{margin-bottom:1.2em}
        .ghost-content a{color:${P.orange};text-decoration:underline;font-weight:600}
        .ghost-content a:hover{color:${P.dark}}
        .ghost-content blockquote{border-left:4px solid ${P.orange};padding:12px 20px;margin:1.5em 0;background:${P.cream};font-style:italic}
        .ghost-content ul,.ghost-content ol{margin:1em 0 1.5em 1.5em}
        .ghost-content li{margin-bottom:0.5em}
        .ghost-content img{max-width:100%;border:3px solid ${P.dark};box-shadow:5px 5px 0 ${P.dark};margin:1.5em 0}
        .ghost-content pre{background:${P.dark};color:${P.lime};padding:20px;border:3px solid ${P.dark};overflow-x:auto;margin:1.5em 0;font-size:13px;line-height:1.6}
        .ghost-content code{background:${P.lightgray};padding:2px 6px;font-size:0.9em;border:1px solid #ddd}
        .ghost-content pre code{background:none;border:none;padding:0;color:inherit}
        .ghost-content hr{border:none;border-top:3px solid ${P.dark};margin:2em 0}
        .ghost-content figure{margin:1.5em 0}
        .ghost-content figcaption{font-size:12px;color:${P.gray};margin-top:8px;font-style:italic;text-align:center}
        .ghost-content strong{font-weight:700}
      `}</style>
      <div ref={scrollRef} style={{ fontFamily: "'Sora', sans-serif", color: P.dark, background: P.bg, lineHeight: 1.7, fontSize: 15 }}>
        <Header page={page} nav={nav} />
        <main style={{ minHeight: "60vh" }}>{renderPage()}</main>
        <Footer nav={nav} />
      </div>
      <SpeedInsights />
    </>
  );
}
