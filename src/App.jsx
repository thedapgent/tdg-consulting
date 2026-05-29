import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');`;

const C = {
  navy: "#0B1929",
  navyMid: "#0F2340",
  navyLight: "#162D50",
  gold: "#C9A84C",
  goldLight: "#E2C97E",
  goldDim: "rgba(201,168,76,0.15)",
  cream: "#F5EFE3",
  creamDim: "rgba(245,239,227,0.65)",
  creamFaint: "rgba(245,239,227,0.35)",
  white: "#FDFAF4",
};

const services = [
  {
    id: "personal",
    icon: "✦",
    title: "Personal Style Consulting",
    tagline: "For the man who wants to dress with intention.",
    desc: "One-on-one styling sessions designed around your life, your goals, and the impression you want to make. From a single assessment to a full wardrobe overhaul.",
    tiers: [
      { name: "Style Assessment", price: "$150 – $200", note: "60–75 min" },
      { name: "Closet Audit", price: "$250 – $350", note: "90 min · Most Popular" },
      { name: "Full Style Overhaul", price: "$600 – $1,000+", note: "Multi-session" },
    ],
  },
  {
    id: "corporate",
    icon: "◈",
    title: "Corporate & B2B Consulting",
    tagline: "Elevate the way your team shows up.",
    desc: "From executive styling retainers to full corporate dress code programs, TDG helps organizations present a unified, authoritative image.",
    tiers: [
      { name: "Workplace Style Workshop", price: "$500 – $1,500", note: "Per session" },
      { name: "Corporate Dress Code Program", price: "$1,500 – $5,000+", note: "Project-based · Most Popular" },
      { name: "Executive Styling Retainer", price: "$500 – $1,500/mo", note: "Ongoing" },
    ],
  },
  {
    id: "events",
    icon: "❧",
    title: "Event Styling",
    tagline: "Look the part. Own the room.",
    desc: "Weddings, galas, award shows, and formal occasions. TDG coordinates every detail so you and your party walk in looking exactly as you should.",
    tiers: [
      { name: "Groom Consultation", price: "$300 – $500", note: "Flat fee" },
      { name: "Full Event Package", price: "$800 – $2,000+", note: "Party-size dependent · Most Popular" },
      { name: "Day-of Coordination", price: "$200 – $400", note: "Add-on" },
    ],
  },
  {
    id: "clergy",
    icon: "✙",
    title: "Of the Cloth",
    tagline: "Tailored for the Called.",
    desc: "A dedicated consulting and garment service for men in ministry. Because those who lead deserve to be dressed with the same care they give to their calling.",
    tiers: [
      { name: "Clergy Wardrobe Consultation", price: "$100 – $200", note: "Virtual-friendly" },
      { name: "Church Leadership Workshop", price: "$400 – $800", note: "Per session · Most Popular" },
      { name: "Custom Clergy Garments", price: "Priced per piece", note: "MTM process" },
    ],
  },
  {
    id: "digital",
    icon: "◉",
    title: "Digital Products",
    tagline: "Style knowledge, on your schedule.",
    desc: "Downloadable guides, online courses, and monthly style subscriptions — accessible entry points into the TDG approach to dressing well.",
    tiers: [
      { name: "Style Guide (PDF)", price: "$15 – $35", note: "Digital download" },
      { name: "Online Course / Workshop", price: "$97 – $297", note: "Self-paced · Most Popular" },
      { name: "Style Subscription", price: "$25 – $50/mo", note: "Monthly" },
    ],
  },
];

const testimonials = [
  {
    quote: "Working with Nicholas completely changed how I carry myself at work. My clients noticed before I even said anything.",
    name: "Marcus T.",
    title: "Senior Financial Advisor, Toronto",
  },
  {
    quote: "I never thought I'd pay for a stylist. Now I can't imagine building my wardrobe any other way. The investment paid for itself.",
    name: "David O.",
    title: "Director of Operations, Mississauga",
  },
  {
    quote: "From the consultation to the final fitting, everything was handled with professionalism and a real eye for detail.",
    name: "Raymond K.",
    title: "Executive Pastor, Brampton",
  },
];

const steps = [
  { num: "01", title: "Book a Discovery Call", desc: "We start with a free 15–20 minute conversation to understand your goals, lifestyle, and what you're looking to achieve." },
  { num: "02", title: "Choose Your Service", desc: "Based on our conversation, we'll recommend the right package — whether that's a single session or an ongoing relationship." },
  { num: "03", title: "Transform Your Wardrobe", desc: "We get to work. Every recommendation is specific to you — no generic advice, no filler, just results you can wear." },
];

const CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }
html { font-size: 16px; }
body { background: ${C.navy}; overflow-x: hidden; }

.page { font-family: 'Montserrat', sans-serif; color: ${C.cream}; background: ${C.navy}; min-height: 100vh; }

/* NAV */
.nav { position: sticky; top: 0; z-index: 100; background: rgba(11,25,41,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(201,168,76,0.12); display: flex; align-items: center; justify-content: space-between; padding: 16px 40px; }
.nav-brand { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; letter-spacing: 0.12em; color: ${C.cream}; text-transform: uppercase; }
.nav-brand span { color: ${C.gold}; }
.nav-links { display: flex; gap: 32px; align-items: center; }
.nav-link { font-size: 9px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: ${C.creamDim}; cursor: pointer; transition: color 0.2s; background: none; border: none; }
.nav-link:hover { color: ${C.gold}; }
.nav-cta { font-size: 9px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; background: ${C.gold}; color: ${C.navy}; border: none; padding: 10px 22px; cursor: pointer; transition: all 0.25s; }
.nav-cta:hover { background: ${C.goldLight}; }

/* HERO */
.hero { min-height: 92vh; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 80px 40px 80px; position: relative; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(15,35,64,0.8) 0%, transparent 50%); pointer-events: none; }
.hero-bg-lines { position: absolute; inset: 0; background-image: repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(201,168,76,0.025) 80px, rgba(201,168,76,0.025) 81px); pointer-events: none; }
.hero-eyebrow { font-size: 9px; font-weight: 700; letter-spacing: 0.35em; text-transform: uppercase; color: ${C.gold}; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
.hero-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: ${C.gold}; }
.hero-headline { font-family: 'Cormorant Garamond', serif; font-size: clamp(44px, 7vw, 88px); font-weight: 300; line-height: 1.05; color: ${C.white}; max-width: 780px; margin-bottom: 8px; }
.hero-headline em { font-style: italic; color: ${C.gold}; }
.hero-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(18px, 2.5vw, 26px); font-weight: 300; color: ${C.creamDim}; max-width: 560px; margin: 24px 0 48px; line-height: 1.65; }
.hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
.btn-primary { font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; background: ${C.gold}; color: ${C.navy}; border: none; padding: 16px 36px; cursor: pointer; transition: all 0.25s; }
.btn-primary:hover { background: ${C.goldLight}; transform: translateY(-1px); }
.btn-secondary { font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; background: transparent; color: ${C.cream}; border: 1px solid rgba(245,239,227,0.3); padding: 16px 36px; cursor: pointer; transition: all 0.25s; }
.btn-secondary:hover { border-color: ${C.gold}; color: ${C.gold}; }
.hero-scroll { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.35; }
.hero-scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, ${C.gold}, transparent); animation: scrollPulse 2s ease-in-out infinite; }
.hero-scroll-text { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: ${C.gold}; }
@keyframes scrollPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

/* SECTION COMMON */
.section { padding: 96px 40px; }
.section-alt { background: ${C.navyMid}; }
.section-inner { max-width: 1100px; margin: 0 auto; }
.section-label { font-size: 9px; font-weight: 700; letter-spacing: 0.35em; text-transform: uppercase; color: ${C.gold}; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
.section-label::after { content: ''; display: block; width: 32px; height: 1px; background: ${C.gold}; opacity: 0.5; }
.section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 4.5vw, 52px); font-weight: 400; color: ${C.white}; line-height: 1.15; margin-bottom: 20px; }
.section-body { font-size: 14px; font-weight: 300; line-height: 1.8; color: ${C.creamDim}; max-width: 580px; }

/* WHY */
.pillars { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2px; margin-top: 56px; }
.pillar { background: rgba(255,255,255,0.03); border: 1px solid rgba(201,168,76,0.1); padding: 40px 32px; transition: all 0.3s; }
.pillar:hover { background: rgba(255,255,255,0.06); border-color: rgba(201,168,76,0.35); }
.pillar-num { font-family: 'Cormorant Garamond', serif; font-size: 56px; font-weight: 300; color: ${C.gold}; opacity: 0.15; line-height: 1; margin-bottom: -8px; }
.pillar-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: ${C.white}; margin-bottom: 12px; }
.pillar-desc { font-size: 13px; font-weight: 300; line-height: 1.75; color: ${C.creamDim}; }

/* SERVICES */
.service-tabs { display: flex; gap: 0; flex-wrap: wrap; border-bottom: 1px solid rgba(201,168,76,0.15); margin-bottom: 48px; margin-top: 48px; }
.service-tab { background: none; border: none; padding: 14px 20px; font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: ${C.creamFaint}; cursor: pointer; transition: all 0.2s; position: relative; white-space: nowrap; }
.service-tab:hover { color: ${C.creamDim}; }
.service-tab.active { color: ${C.gold}; }
.service-tab.active::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 2px; background: ${C.gold}; }
.service-content { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
.service-info { }
.service-icon { font-size: 24px; color: ${C.gold}; margin-bottom: 20px; display: block; }
.service-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 400; color: ${C.white}; margin-bottom: 10px; }
.service-tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 18px; color: ${C.gold}; margin-bottom: 24px; font-weight: 300; }
.service-desc { font-size: 13.5px; font-weight: 300; line-height: 1.8; color: ${C.creamDim}; }
.service-tiers { display: flex; flex-direction: column; gap: 12px; }
.tier-card { border: 1px solid rgba(201,168,76,0.15); padding: 22px 24px; display: flex; justify-content: space-between; align-items: center; transition: all 0.25s; }
.tier-card:hover { border-color: rgba(201,168,76,0.4); background: rgba(201,168,76,0.04); }
.tier-card.featured { border-color: ${C.gold}; background: rgba(201,168,76,0.06); }
.tier-left { }
.tier-name { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: ${C.white}; margin-bottom: 4px; }
.tier-note { font-size: 9.5px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: ${C.gold}; opacity: 0.7; }
.tier-price { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; color: ${C.gold}; text-align: right; white-space: nowrap; }

/* HOW IT WORKS */
.steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0; margin-top: 56px; position: relative; }
.steps::before { content: ''; position: absolute; top: 28px; left: 0; right: 0; height: 1px; background: linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent); }
.step { padding: 0 32px 0 0; }
.step-num { font-family: 'Cormorant Garamond', serif; font-size: 72px; font-weight: 300; color: ${C.gold}; opacity: 0.12; line-height: 1; margin-bottom: -12px; }
.step-dot { width: 10px; height: 10px; background: ${C.gold}; border-radius: 50%; margin-bottom: 24px; position: relative; z-index: 1; }
.step-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: ${C.white}; margin-bottom: 12px; }
.step-desc { font-size: 13px; font-weight: 300; line-height: 1.75; color: ${C.creamDim}; }

/* TESTIMONIALS */
.testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 56px; }
.testimonial { border: 1px solid rgba(201,168,76,0.12); padding: 36px 32px; position: relative; background: rgba(255,255,255,0.02); transition: all 0.3s; }
.testimonial:hover { border-color: rgba(201,168,76,0.3); background: rgba(255,255,255,0.04); }
.testimonial-mark { font-family: 'Cormorant Garamond', serif; font-size: 72px; font-weight: 300; color: ${C.gold}; opacity: 0.2; line-height: 0.6; margin-bottom: 20px; display: block; }
.testimonial-quote { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 18px; font-weight: 300; color: ${C.cream}; line-height: 1.7; margin-bottom: 28px; }
.testimonial-rule { width: 32px; height: 1px; background: ${C.gold}; opacity: 0.5; margin-bottom: 16px; }
.testimonial-name { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: ${C.white}; margin-bottom: 4px; }
.testimonial-title { font-size: 11px; font-weight: 300; color: ${C.creamFaint}; }

/* FORM */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 48px; }
.form-full { grid-column: 1 / -1; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-label { font-size: 9px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: ${C.gold}; opacity: 0.75; }
.form-input, .form-select, .form-textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(201,168,76,0.2); color: ${C.cream}; font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 300; padding: 14px 16px; outline: none; transition: border-color 0.2s; width: 100%; }
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: ${C.gold}; }
.form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A84C' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; }
.form-select option { background: ${C.navyMid}; color: ${C.cream}; }
.form-textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
.form-submit { width: 100%; margin-top: 8px; font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; background: ${C.gold}; color: ${C.navy}; border: none; padding: 18px; cursor: pointer; transition: all 0.25s; }
.form-submit:hover { background: ${C.goldLight}; }
.form-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.form-note { font-size: 11px; font-weight: 300; color: ${C.creamFaint}; text-align: center; margin-top: 16px; line-height: 1.6; }
.form-success { text-align: center; padding: 48px 0; }
.form-success-icon { font-size: 32px; color: ${C.gold}; margin-bottom: 16px; display: block; }
.form-success-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; color: ${C.white}; margin-bottom: 12px; }
.form-success-body { font-size: 13px; font-weight: 300; color: ${C.creamDim}; line-height: 1.7; }

/* FOOTER */
.footer { border-top: 1px solid rgba(201,168,76,0.12); padding: 48px 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; gap: 24px; }
.footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: ${C.cream}; opacity: 0.7; }
.footer-brand span { color: ${C.gold}; }
.footer-tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 13px; color: ${C.gold}; opacity: 0.5; margin-top: 4px; }
.footer-right { text-align: right; }
.footer-instagram { font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: ${C.creamDim}; }
.footer-copy { font-size: 10px; font-weight: 300; color: ${C.creamFaint}; margin-top: 6px; }

/* DIVIDER */
.gold-divider { height: 1px; background: linear-gradient(to right, transparent, ${C.gold}44, transparent); }

/* RESPONSIVE */
@media (max-width: 768px) {
  .nav { padding: 14px 20px; }
  .nav-links { display: none; }
  .hero { padding: 60px 20px; min-height: 85vh; }
  .section { padding: 64px 20px; }
  .service-content { grid-template-columns: 1fr; gap: 36px; }
  .form-grid { grid-template-columns: 1fr; }
  .form-full { grid-column: 1; }
  .footer { flex-direction: column; text-align: center; padding: 40px 20px; }
  .footer-right { text-align: center; }
  .steps::before { display: none; }
  .step { padding: 0 0 40px 0; }
}
`;

export default function LandingPage() {
  const [activeService, setActiveService] = useState("personal");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);
  const servicesRef = useRef(null);

  const active = services.find((s) => s.id === activeService);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToServices = () => servicesRef.current?.scrollIntoView({ behavior: "smooth" });

const handleSubmit = async (e) => {
  e.preventDefault();
  setSending(true);
  try {
    const response = await fetch('https://formspree.io/f/xpqnbkgg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setSubmitted(true);
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (err) {
    alert('Something went wrong. Please try again.');
  } finally {
    setSending(false);
  }
};
  return (
    <>
      <style>{FONTS}</style>
      <style>{CSS}</style>

      <div className="page">
        {/* NAV */}
        <nav className="nav">
          <div className="nav-brand">The Dapper <span>Gentleman</span></div>
          <div className="nav-links">
            <button className="nav-link" onClick={scrollToServices}>Services</button>
            <button className="nav-link" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>How It Works</button>
            <button className="nav-link" onClick={scrollToForm}>Contact</button>
            <button className="nav-cta" onClick={scrollToForm}>Book a Call</button>
          </div>
          <button className="nav-cta" style={{ display: 'none' }} onClick={scrollToForm}>Book</button>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-bg-lines" />
          <div className="hero-eyebrow">Style Consulting · Brampton, Ontario</div>
          <h1 className="hero-headline">
            Dress like the man<br />
            <em>you're becoming.</em>
          </h1>
          <p className="hero-sub">
            Custom styling, wardrobe consulting, and made-to-measure suiting for the professional man who understands that how you dress is how you're perceived.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToForm}>Book a Free Discovery Call</button>
            <button className="btn-secondary" onClick={scrollToServices}>Explore Services</button>
          </div>
          <div className="hero-scroll">
            <div className="hero-scroll-line" />
            <span className="hero-scroll-text">Scroll</span>
          </div>
        </section>

        <div className="gold-divider" />

        {/* WHY */}
        <section className="section">
          <div className="section-inner">
            <div className="section-label">Why TDG</div>
            <h2 className="section-title">Style isn't vanity.<br />It's strategy.</h2>
            <p className="section-body">
              The right wardrobe opens doors, commands respect, and communicates who you are before you say a word. TDG exists to give every man access to that kind of intentional, powerful dressing.
            </p>
            <div className="pillars">
              {[
                { num: "I", title: "Made for Your Life", desc: "Every recommendation is built around you — your industry, your body, your budget, and the version of yourself you're building toward." },
                { num: "II", title: "Custom, Not Cookie-Cutter", desc: "No off-the-rack thinking here. From consultation to final garment, everything is tailored to fit you — literally and figuratively." },
                { num: "III", title: "Built on Expertise", desc: "Nicholas A. Russell brings years of experience in men's formal and business wear, custom suiting, and personal styling to every engagement." },
              ].map((p) => (
                <div className="pillar" key={p.num}>
                  <div className="pillar-num">{p.num}</div>
                  <div className="pillar-title">{p.title}</div>
                  <div className="pillar-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gold-divider" />

        {/* SERVICES */}
        <section className="section section-alt" ref={servicesRef}>
          <div className="section-inner">
            <div className="section-label">Services & Investment</div>
            <h2 className="section-title">What we offer.</h2>
            <div className="service-tabs">
              {services.map((s) => (
                <button
                  key={s.id}
                  className={`service-tab${activeService === s.id ? " active" : ""}`}
                  onClick={() => setActiveService(s.id)}
                >
                  {s.title.split(" — ")[0].split(" & ")[0]}
                </button>
              ))}
            </div>
            {active && (
              <div className="service-content">
                <div className="service-info">
                  <span className="service-icon">{active.icon}</span>
                  <div className="service-title">{active.title}</div>
                  <div className="service-tagline">{active.tagline}</div>
                  <div className="service-desc">{active.desc}</div>
                  <div style={{ marginTop: 32 }}>
                    <button className="btn-primary" onClick={scrollToForm}>Inquire About This Service</button>
                  </div>
                </div>
                <div className="service-tiers">
                  {active.tiers.map((t) => (
                    <div key={t.name} className={`tier-card${t.note.includes("Most Popular") ? " featured" : ""}`}>
                      <div className="tier-left">
                        <div className="tier-name">{t.name}</div>
                        <div className="tier-note">{t.note}</div>
                      </div>
                      <div className="tier-price">{t.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="gold-divider" />

        {/* HOW IT WORKS */}
        <section className="section" id="how">
          <div className="section-inner">
            <div className="section-label">The Process</div>
            <h2 className="section-title">Simple. Intentional. Effective.</h2>
            <div className="steps">
              {steps.map((s) => (
                <div className="step" key={s.num}>
                  <div className="step-num">{s.num}</div>
                  <div className="step-dot" />
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gold-divider" />

        {/* TESTIMONIALS */}
        <section className="section section-alt">
          <div className="section-inner">
            <div className="section-label">Client Words</div>
            <h2 className="section-title">Results you can see.</h2>
            <div className="testimonials-grid">
              {testimonials.map((t) => (
                <div className="testimonial" key={t.name}>
                  <span className="testimonial-mark">"</span>
                  <div className="testimonial-quote">{t.quote}</div>
                  <div className="testimonial-rule" />
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-title">{t.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gold-divider" />

        {/* CONTACT FORM */}
        <section className="section" ref={formRef}>
          <div className="section-inner" style={{ maxWidth: 720 }}>
            <div className="section-label">Get Started</div>
            <h2 className="section-title">Let's build your wardrobe.</h2>
            <p className="section-body">
              Fill out the form below and Nicholas will be in touch within 1–2 business days to schedule your complimentary discovery call.
            </p>

            {submitted ? (
              <div className="form-success">
                <span className="form-success-icon">✦</span>
                <div className="form-success-title">Message received.</div>
                <div className="form-success-body">
                  Thank you for reaching out. Nicholas will be in touch within 1–2 business days to schedule your discovery call.<br /><br />
                  In the meantime, follow <strong>@thedappergentleman.ca</strong> on Instagram for daily style inspiration.
                </div>
              </div>
            ) : (
              <div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" placeholder="John Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" placeholder="(416) 000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Service of Interest</label>
                    <select className="form-select" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select a service...</option>
                      <option>Personal Style Consulting</option>
                      <option>Corporate & B2B Consulting</option>
                      <option>Event Styling</option>
                      <option>Of the Cloth — Clergy & Ministry</option>
                      <option>Custom Suiting (MTM)</option>
                      <option>Not sure yet — let's talk</option>
                    </select>
                  </div>
                  <div className="form-group form-full">
                    <label className="form-label">Tell Us About Yourself</label>
                    <textarea className="form-textarea" placeholder="Share a bit about what you're looking for, your goals, and any relevant context..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </div>
                </div>
                <button className="form-submit" disabled={sending || !form.name || !form.email} onClick={handleSubmit}>
                  {sending ? "Sending..." : "Submit Inquiry"}
                </button>
                <p className="form-note">Discovery calls are always free and carry no obligation. We respond within 1–2 business days.</p>
              </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div>
            <div className="footer-brand">The Dapper <span>Gentleman</span></div>
            <div className="footer-tagline">Dress with intention. Present with authority.</div>
          </div>
          <div className="footer-right">
            <div className="footer-instagram">@thedappergentleman.ca</div>
            <div className="footer-copy">© 2025 The Dapper Gentleman · Brampton, Ontario</div>
          </div>
        </footer>
      </div>
    </>
  );
}
