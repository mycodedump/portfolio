import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { X, ExternalLink, RotateCcw } from "lucide-react";
import { useIsMobile } from "@/app/useIsMobile";
import { Polaroid } from "@/app/components/Polaroid";
import myPhoto from "../../assets/my-photo.jpg";
import photoSketchbook from "../../assets/My photos/20260425_202946 1.jpg";
import photoBookshelf from "../../assets/My photos/20260803_120329 1.jpg";
import photoDosa from "../../assets/My photos/20251125_173441 1.jpg";
import photoVietnam from "../../assets/My photos/IMG_20250816_120031_492 1.jpg";

const SCRAPBOOK = [
  { src: photoSketchbook, caption: "sketching", rot: -7 },
  { src: photoBookshelf, caption: "currently reading", rot: 4 },
  { src: photoDosa, caption: "sunday dosa", rot: -3 },
  { src: photoVietnam, caption: "hanoi coffee", rot: 6 },
];

const PALETTE = ["#c3be6f", "#c67d39", "#dda1ae", "#212012"];

// ── Work experience data ───────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    period: "May 2024 – Present",
    tag: "present",
    role: "Product Designer",
    company: "Canvs Club · ICICI Bank",
    location: "Remote",
    color: "#c3be6f",
    bullets: [
      "Owned end-to-end product design across ICICI Bank's digital ecosystem — UCJ, CSP, RIB, Global App and iMobile — designing 100+ flows across live, in-development, and net-new design environments.",
      "Independently drove the Services platform and led design for Credit Cards and Forex Cards, turning complex banking journeys into clean, accessible experiences.",
      "Partnered closely with developers and cross-functional teams to ship quality work at speed in a fully remote, fast-paced environment, while reworking and scaling the design system independently.",
      "Applied product thinking to ambiguous briefs — diagnosing user problems, optimising existing flows, designing new ones, and adapting layouts across web, tablet and mobile.",
      "Mentored junior designers and led peer design reviews, raising craft and consistency across the team.",
    ],
    skills: ["Product Design", "Design Systems", "Cross-Platform", "Accessibility", "Mentorship"],
  },
  {
    period: "May 2022 – Nov 2022",
    tag: "past",
    role: "Lead UI-UX Designer",
    company: "Space No. 10",
    location: "Bangalore",
    color: "#c67d39",
    bullets: [
      "Led UX/UI design for client projects: redesigned Prakriya Hospital's website for improved user experience and revenue, designed an award-winning prototype for the JeevaRaksha emergency response app, and built Space No. 10's website and brand assets from concept to prototype.",
      "Optimised booking systems, created marketing materials, and established brand identities for client projects.",
      "Collaborated with cross-functional teams including marketing, developers, product managers, and executives through brainstorming sessions and design critiques.",
    ],
    skills: ["UI Design", "User Research", "High Fidelity Wireframing", "Prototyping", "Visual Design"],
  },
  {
    period: "2021 – Now",
    tag: "freelance",
    role: "Freelance UI-UX Designer",
    company: "Self-employed",
    location: "Bangalore",
    color: "#dda1ae",
    bullets: [
      "Addressed user and client challenges through comprehensive research, competitor analysis, and user interviews.",
      "Conceptualised information architectures, crafted user flows, and translated them into visually compelling web and mobile interfaces — websites, dashboards, web apps, and mobile apps.",
      "Developed style guides and design systems to streamline collaboration between design and development.",
    ],
    skills: ["UI Design", "User Research", "Interaction Design", "Problem Solving"],
  },
];

// ── Fun facts (flip cards, replaces the old wall-of-paragraphs bio) ───────────

const FACTS = [
  {
    emoji: "🚀",
    front: "3 years",
    back: "shipping real product from day one — most of it inside ICICI Bank's ecosystem across 100+ flows and 10M+ users.",
    color: "#c3be6f",
  },
  {
    emoji: "🌊",
    front: "the messy middle",
    back: "I like problems with real stakes — banking, healthcare, fintech — where design, product and engineering blur into one thing.",
    color: "#c67d39",
  },
  {
    emoji: "🤖",
    front: "outside of work",
    back: "I write, sketch, and mess around with AI — trying to figure out what it can actually do before everyone else does.",
    color: "#dda1ae",
  },
  {
    emoji: "🎯",
    front: "right now",
    back: "looking for a startup worth getting obsessed over. If that's you — say hi.",
    color: "#212012",
  },
];

// ── FactCard — tap to flip in 3D ────────────────────────────────────────────

function FactCard({ fact, index, isMobile, onFlip }: { fact: typeof FACTS[0]; index: number; isMobile: boolean; onFlip: (i: number) => void }) {
  const [flipped, setFlipped] = useState(false);
  const m = isMobile;
  const h = m ? 108 : 124;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => {
        setFlipped((v) => {
          const next = !v;
          if (next) onFlip(index);
          return next;
        });
      }}
      style={{ height: h, cursor: "pointer", perspective: 900 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            borderRadius: 14, border: `1px solid ${fact.color}40`, backgroundColor: `${fact.color}14`,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            padding: m ? "12px 12px" : "14px 16px",
          }}
        >
          <span style={{ fontSize: m ? 18 : 20 }}>{fact.emoji}</span>
          <div>
            <p className="font-caslon not-italic" style={{ fontSize: m ? 14 : 16, color: "#212012", fontWeight: 600, lineHeight: 1.15 }}>{fact.front}</p>
            <p className="font-inclusive-sans" style={{ fontSize: 9, color: "#625e37", opacity: 0.5, marginTop: 4, letterSpacing: "0.3px" }}>tap to flip</p>
          </div>
        </div>
        {/* Back */}
        <div
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)",
            borderRadius: 14, backgroundColor: fact.color,
            display: "flex", alignItems: "center",
            padding: m ? "12px" : "14px 16px",
          }}
        >
          <p className={fact.color === "#212012" ? "font-inclusive-sans" : "font-inclusive-sans font-medium"} style={{ fontSize: m ? 11 : 12, lineHeight: m ? "16px" : "17px", color: fact.color === "#212012" ? "#e3d9ce" : "#212012" }}>
            {fact.back}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── ExperienceCard — 3D flip instead of accordion ───────────────────────────

function ExperienceCard({ exp, index, isMobile }: { exp: typeof EXPERIENCE[0]; index: number; isMobile: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const m = isMobile;
  const h = m ? 250 : 240;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: h, perspective: 1200 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <button
          onClick={() => setFlipped(true)}
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            width: "100%", height: "100%", background: "none", cursor: "pointer", textAlign: "left",
            borderRadius: m ? 12 : 16, border: "1px solid rgba(33,32,18,0.09)",
            backgroundColor: "rgba(33,32,18,0.02)",
            padding: m ? "16px 16px" : "20px 22px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <span
                style={{ fontSize: 9, letterSpacing: "0.5px", textTransform: "uppercase", backgroundColor: exp.color, color: "#212012", borderRadius: 20, padding: "2px 8px" }}
                className="font-inclusive-sans font-semibold"
              >
                {exp.tag}
              </span>
              <p className="font-inclusive-sans" style={{ fontSize: 11, color: "#625e37", opacity: 0.6 }}>{exp.period}</p>
            </div>
            <p className="font-caslon not-italic" style={{ fontSize: m ? 18 : 22, lineHeight: m ? "23px" : "27px", color: "#212012", fontWeight: 600 }}>
              {exp.role}
            </p>
            <p className="font-inclusive-sans font-medium" style={{ fontSize: m ? 11 : 12, color: "#625e37", marginTop: 2 }}>
              {exp.company} · {exp.location}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, alignSelf: "flex-end" }}>
            <p className="font-inclusive-sans font-medium" style={{ fontSize: 10, color: exp.color, letterSpacing: "0.3px" }}>flip for details</p>
            <span
              style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: `${exp.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}
              className="font-caslon"
            >
              <span style={{ fontSize: 13, color: "#212012" }}>↻</span>
            </span>
          </div>
        </button>

        {/* Back */}
        <div
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)",
            borderRadius: m ? 12 : 16, border: `1px solid ${exp.color}50`,
            backgroundColor: `${exp.color}16`,
            padding: m ? "14px 16px" : "16px 20px",
            display: "flex", flexDirection: "column",
          }}
        >
          <button
            onClick={() => setFlipped(false)}
            style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.4)" }}
          >
            <RotateCcw size={12} color="#212012" />
          </button>
          <div style={{ flex: 1, overflowY: "auto", paddingRight: 4 }}>
            <ul style={{ display: "flex", flexDirection: "column", gap: m ? 7 : 8, listStyle: "none", padding: 0, margin: 0 }}>
              {exp.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: exp.color, flexShrink: 0, marginTop: 6 }} />
                  <p className="font-inclusive-sans" style={{ fontSize: m ? 11 : 12, lineHeight: m ? "16px" : "18px", color: "#212012", opacity: 0.85 }}>{b}</p>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
              {exp.skills.map((s) => (
                <span key={s} style={{ fontSize: 9, color: "#212012", backgroundColor: "rgba(255,255,255,0.5)", padding: "2px 8px", borderRadius: 20 }} className="font-inclusive-sans font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Tilting avatar ───────────────────────────────────────────────────────────

function TiltAvatar({ size }: { size: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: py * -22, ry: px * 22 });
  }, []);

  return (
    <div style={{ perspective: 500 }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        style={{
          width: size, height: size, borderRadius: "50%", flexShrink: 0,
          backgroundColor: "#c3be6f",
          border: "3px solid rgba(255,255,255,0.7)", boxShadow: "0 10px 26px rgba(33,32,18,0.22)",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
          transformStyle: "preserve-3d", position: "relative", overflow: "hidden",
        }}
      >
        <img src={myPhoto} alt="Laxmi Mahajan" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {/* glare */}
        <div
          style={{
            position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none",
            background: `radial-gradient(circle at ${50 + tilt.ry * 1.4}% ${50 - tilt.rx * 1.4}%, rgba(255,255,255,0.55), transparent 55%)`,
          }}
        />
      </div>
    </div>
  );
}

// ── AboutMeDrawer ──────────────────────────────────────────────────────────────

interface AboutMeDrawerProps {
  open: boolean;
  onClose: () => void;
}

const STATS = [
  { target: 3, suffix: "+", label: "years" },
  { target: 100, suffix: "+", label: "flows shipped" },
  { target: 10, suffix: "M+", label: "users reached" },
];

export function AboutMeDrawer({ open, onClose }: AboutMeDrawerProps) {
  const isMobile = useIsMobile(768);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const aboutLabelRef = useRef<HTMLParagraphElement>(null);
  const expLabelRef = useRef<HTMLParagraphElement>(null);
  const statRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const flippedFacts = useRef<Set<number>>(new Set());
  const celebrated = useRef(false);

  const m = isMobile;

  const handleFactFlip = useCallback((i: number) => {
    flippedFacts.current.add(i);
    if (flippedFacts.current.size === FACTS.length && !celebrated.current) {
      celebrated.current = true;
      confetti({ particleCount: 70, spread: 65, startVelocity: 32, gravity: 1.1, colors: PALETTE, origin: { x: 0.85, y: 0.3 }, scalar: 0.8 });
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      setScrolled(false);
    }
    flippedFacts.current = new Set();
    celebrated.current = false;

    // count-up stats
    statRefs.current.forEach((el, i) => {
      if (!el) return;
      const stat = STATS[i];
      const counter = { val: 0 };
      gsap.to(counter, {
        val: stat.target, duration: 1.1, delay: 0.15 + i * 0.12, ease: "power2.out",
        onUpdate: () => { el.textContent = `${Math.round(counter.val)}${stat.suffix}`; },
      });
    });
  }, [open]);

  // GSAP scroll-velocity skew on section eyebrow labels (Codrops-style)
  useEffect(() => {
    if (!open) return;
    const container = scrollRef.current;
    if (!container) return;

    const skewAbout = gsap.quickTo(aboutLabelRef.current, "skewX", { duration: 0.5, ease: "power3.out" });
    const skewExp = gsap.quickTo(expLabelRef.current, "skewX", { duration: 0.5, ease: "power3.out" });
    let lastTop = container.scrollTop;
    let raf = 0;

    const onScroll = () => {
      setScrolled(container.scrollTop > 20);
      const delta = container.scrollTop - lastTop;
      lastTop = container.scrollTop;
      const skew = Math.max(-14, Math.min(14, delta * -0.9));
      skewAbout(skew);
      skewExp(skew);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { skewAbout(0); skewExp(0); });
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => { container.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [open]);

  const drawerWidth = m ? "100%" : 880;
  const drawerBorderRadius = m ? 0 : "24px 0 0 24px";
  const contentPad = m ? 16 : 44;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            key="about-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 499, backgroundColor: "rgba(33,32,18,0.35)", backdropFilter: "blur(4px)" }}
          />

          {/* Drawer */}
          <motion.div
            key="about-drawer"
            initial={{ x: m ? "100%" : 880 }}
            animate={{ x: 0 }}
            exit={{ x: m ? "100%" : 880 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", right: 0, top: 0, bottom: 0,
              width: drawerWidth, zIndex: 500,
              borderRadius: drawerBorderRadius,
              backgroundColor: "#e3d9ce",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Scrollable content */}
            <div
              ref={scrollRef}
              style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}
            >
              {/* Sticky top bar */}
              <div
                style={{
                  position: "sticky", top: 0, zIndex: 5,
                  backgroundColor: "#e3d9ce",
                  padding: scrolled
                    ? `14px ${m ? 52 : 48}px 14px ${contentPad}px`
                    : `${m ? 20 : 32}px ${m ? 52 : 48}px 0 ${contentPad}px`,
                  borderBottom: scrolled ? "1px solid rgba(33,32,18,0.1)" : "1px solid transparent",
                  transition: "padding 0.3s ease, border-color 0.3s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <motion.p
                      className="font-caslon not-italic"
                      animate={{ fontSize: scrolled ? "16px" : m ? "22px" : "26px", lineHeight: scrolled ? "20px" : m ? "28px" : "32px" }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ color: "#212012", fontWeight: 600 }}
                    >
                      Laxmi Mahajan
                    </motion.p>
                    {!scrolled && (
                      <motion.p
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-inclusive-sans font-medium"
                        style={{ fontSize: m ? 11 : 12, color: "#625e37", marginTop: 4, letterSpacing: "0.3px" }}
                      >
                        Product Designer · Bangalore
                      </motion.p>
                    )}
                  </div>
                  {/* Close button — always in header on mobile, absolute on desktop */}
                  {m && (
                    <button
                      onClick={onClose}
                      style={{
                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                        border: "1px solid rgba(33,32,18,0.15)",
                        backgroundColor: "rgba(227,217,206,0.6)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <X size={14} color="#212012" />
                    </button>
                  )}
                </div>
              </div>

              {/* Desktop-only close button */}
              {!m && (
                <button
                  onClick={onClose}
                  style={{
                    position: "absolute", top: 18, right: 18, zIndex: 10,
                    width: 34, height: 34, borderRadius: "50%",
                    backgroundColor: "rgba(33,32,18,0.08)", border: "none",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(33,32,18,0.14)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(33,32,18,0.08)"; }}
                >
                  <X size={15} color="#212012" />
                </button>
              )}

              {/* Hero / intro */}
              <div style={{ padding: `${m ? 16 : 24}px ${contentPad}px 0` }}>

                {/* Avatar + quick stats row */}
                <div style={{ display: "flex", gap: m ? 14 : 20, alignItems: "flex-start", marginBottom: m ? 22 : 30 }}>
                  <TiltAvatar size={m ? 60 : 76} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {STATS.map((stat, i) => (
                        <div key={stat.label} style={{ backgroundColor: "rgba(33,32,18,0.05)", borderRadius: 10, padding: m ? "6px 10px" : "8px 14px", flex: 1, minWidth: 60 }}>
                          <p ref={(el) => { statRefs.current[i] = el; }} className="font-caslon not-italic" style={{ fontSize: m ? 16 : 20, color: "#212012", fontWeight: 600, lineHeight: m ? "20px" : "24px" }}>0{stat.suffix}</p>
                          <p className="font-inclusive-sans" style={{ fontSize: 10, color: "#625e37", opacity: 0.65 }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                      <motion.span
                        animate={{ opacity: [1, 0.25, 1] }}
                        transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#c3be6f", display: "inline-block", flexShrink: 0 }}
                      />
                      <p className="font-inclusive-sans font-medium" style={{ fontSize: 11, color: "#625e37", letterSpacing: "0.4px", textTransform: "uppercase" }}>open to work</p>
                    </div>
                  </div>
                </div>

                {/* Scrapbook — real, tilted, taped-down photos instead of stock imagery */}
                <div style={{ display: "flex", gap: m ? 10 : 4, marginBottom: m ? 24 : 34, overflowX: m ? "auto" : "visible", paddingBottom: 4 }}>
                  {SCRAPBOOK.map((p, i) => (
                    <motion.div
                      key={p.caption}
                      initial={{ opacity: 0, y: 16, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      style={{ flexShrink: 0, marginLeft: !m && i > 0 ? -14 : 0, zIndex: i, position: "relative" }}
                    >
                      <Polaroid src={p.src} caption={p.caption} rotate={p.rot} width={m ? 100 : 128} />
                    </motion.div>
                  ))}
                </div>

                {/* Fun facts — flip cards instead of paragraphs */}
                <div style={{ marginBottom: m ? 20 : 32 }}>
                  <p ref={aboutLabelRef} className="font-inclusive-sans font-medium uppercase" style={{ fontSize: 10, letterSpacing: "0.5px", color: "#625e37", opacity: 0.55, marginBottom: 4, display: "inline-block" }}>
                    about, in four flips
                  </p>
                  <p className="font-inclusive-sans" style={{ fontSize: 11, color: "#625e37", opacity: 0.45, marginBottom: 12 }}>tap a card — flip them all for a surprise</p>
                  <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, 1fr)", gap: m ? 8 : 12 }}>
                    {FACTS.map((fact, i) => (
                      <FactCard key={fact.front} fact={fact} index={i} isMobile={m} onFlip={handleFactFlip} />
                    ))}
                  </div>
                </div>

                {/* Links row */}
                <div style={{ display: "flex", gap: 8, marginBottom: m ? 24 : 36, flexWrap: "wrap" }}>
                  {[
                    { label: "LinkedIn", href: "https://in.linkedin.com/in/laxmi-mahajan" },
                    { label: "Email", href: "mailto:laxmimahajanwork@gmail.com" },
                    { label: "Resume", href: "https://drive.google.com/file/d/1cm1x-y31ugOERxl7MaLuoOYGnNq0r1p0/view?usp=sharing" },
                  ].map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        backgroundColor: "rgba(33,32,18,0.06)", borderRadius: 8,
                        padding: m ? "6px 10px" : "7px 12px", textDecoration: "none",
                        border: "1px solid rgba(33,32,18,0.08)",
                      }}
                    >
                      <p className="font-inclusive-sans font-medium" style={{ fontSize: m ? 11 : 12, color: "#212012" }}>{link.label}</p>
                      <ExternalLink size={10} color="rgba(33,32,18,0.4)" />
                    </motion.a>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: 1, backgroundColor: "rgba(33,32,18,0.09)", marginBottom: m ? 20 : 28 }} />

                {/* Experience */}
                <p ref={expLabelRef} className="font-inclusive-sans font-medium uppercase" style={{ fontSize: 10, letterSpacing: "0.5px", color: "#625e37", opacity: 0.55, marginBottom: 4, display: "inline-block" }}>
                  work experience
                </p>
                <p className="font-inclusive-sans" style={{ fontSize: 11, color: "#625e37", opacity: 0.45, marginBottom: m ? 12 : 16 }}>flip a card to see the details</p>
                <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 12, paddingBottom: m ? 80 : 60 }}>
                  {EXPERIENCE.map((exp, i) => (
                    <div key={exp.company} style={{ gridColumn: !m && i === 0 ? "1 / -1" : undefined }}>
                      <ExperienceCard exp={exp} index={i} isMobile={m} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
