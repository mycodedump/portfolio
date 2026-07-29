import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/app/useIsMobile";

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

// ── ExperienceCard ─────────────────────────────────────────────────────────────

function ExperienceCard({ exp, index, isMobile }: { exp: typeof EXPERIENCE[0]; index: number; isMobile: boolean }) {
  const [expanded, setExpanded] = useState(index === 0);
  const m = isMobile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderRadius: m ? 12 : 16, overflow: "hidden", border: "1px solid rgba(33,32,18,0.09)" }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: m ? "14px 16px" : "18px 20px", textAlign: "left",
          backgroundColor: expanded ? `${exp.color}18` : "rgba(33,32,18,0.02)",
          transition: "background 0.2s",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 9, letterSpacing: "0.5px", textTransform: "uppercase",
                backgroundColor: exp.color, color: "#212012", borderRadius: 20, padding: "2px 8px",
              }}
              className="font-jakarta font-semibold"
            >
              {exp.tag}
            </span>
            <p className="font-jakarta" style={{ fontSize: 11, color: "#625e37", opacity: 0.6 }}>{exp.period}</p>
          </div>
          <p className="font-caslon not-italic" style={{ fontSize: m ? 16 : 20, lineHeight: m ? "21px" : "25px", color: "#212012", fontWeight: 600 }}>
            {exp.role}
          </p>
          <p className="font-jakarta font-medium" style={{ fontSize: m ? 11 : 12, color: "#625e37", marginTop: 2 }}>
            {exp.company} · {exp.location}
          </p>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-caslon"
          style={{ fontSize: 22, color: "rgba(33,32,18,0.3)", flexShrink: 0, lineHeight: 1, marginTop: 2 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: m ? "4px 16px 16px" : "4px 20px 20px" }}>
              <div style={{ height: 1, backgroundColor: "rgba(33,32,18,0.07)", marginBottom: 14 }} />
              <ul style={{ display: "flex", flexDirection: "column", gap: m ? 8 : 10, listStyle: "none", padding: 0, margin: 0 }}>
                {exp.bullets.map((b, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: exp.color, flexShrink: 0, marginTop: 6 }} />
                    <p className="font-jakarta" style={{ fontSize: m ? 12 : 13, lineHeight: m ? "18px" : "20px", color: "#212012", opacity: 0.8 }}>{b}</p>
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                {exp.skills.map((s) => (
                  <span key={s} style={{ fontSize: 10, color: "#625e37", backgroundColor: "rgba(98,94,55,0.1)", padding: "3px 10px", borderRadius: 20 }} className="font-jakarta font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── AboutMeDrawer ──────────────────────────────────────────────────────────────

interface AboutMeDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function AboutMeDrawer({ open, onClose }: AboutMeDrawerProps) {
  const isMobile = useIsMobile(768);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      setScrolled(false);
    }
  }, [open]);

  const m = isMobile;
  const drawerWidth = m ? "100%" : 560;
  const drawerBorderRadius = m ? 0 : "24px 0 0 24px";
  const contentPad = m ? 16 : 30;

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
            initial={{ x: m ? "100%" : 600 }}
            animate={{ x: 0 }}
            exit={{ x: m ? "100%" : 600 }}
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
              onScroll={(e) => setScrolled((e.target as HTMLDivElement).scrollTop > 20)}
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
                        className="font-jakarta font-medium"
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
                <div style={{ display: "flex", gap: m ? 14 : 20, alignItems: "flex-start", marginBottom: m ? 20 : 28 }}>
                  <div style={{ width: m ? 60 : 72, height: m ? 60 : 72, borderRadius: "50%", backgroundColor: "#c3be6f", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid rgba(255,255,255,0.7)" }}>
                    <p className="font-caslon" style={{ fontSize: m ? 22 : 28, color: "#212012", fontWeight: 600, fontStyle: "italic" }}>L</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {[
                        { val: "3+", label: "years" },
                        { val: "100+", label: "flows shipped" },
                        { val: "10M+", label: "users reached" },
                      ].map((stat) => (
                        <div key={stat.label} style={{ backgroundColor: "rgba(33,32,18,0.05)", borderRadius: 10, padding: m ? "6px 10px" : "8px 14px", flex: 1, minWidth: 60 }}>
                          <p className="font-caslon not-italic" style={{ fontSize: m ? 16 : 20, color: "#212012", fontWeight: 600, lineHeight: m ? "20px" : "24px" }}>{stat.val}</p>
                          <p className="font-jakarta" style={{ fontSize: 10, color: "#625e37", opacity: 0.65 }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                      <motion.span
                        animate={{ opacity: [1, 0.25, 1] }}
                        transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#c3be6f", display: "inline-block", flexShrink: 0 }}
                      />
                      <p className="font-jakarta font-medium" style={{ fontSize: 11, color: "#625e37", letterSpacing: "0.4px", textTransform: "uppercase" }}>open to work</p>
                    </div>
                  </div>
                </div>

                {/* About me copy */}
                <div style={{ marginBottom: m ? 20 : 32 }}>
                  <p className="font-jakarta font-medium uppercase" style={{ fontSize: 10, letterSpacing: "0.5px", color: "#625e37", opacity: 0.55, marginBottom: 10 }}>
                    about
                  </p>
                  <p className="font-jakarta" style={{ fontSize: m ? 13 : 15, lineHeight: m ? "21px" : "25px", color: "#212012", opacity: 0.85, marginBottom: 14 }}>
                    I'm a product designer based in Bangalore with three years of shipping real product at scale. Most of that time was at Canvs Club — designing for ICICI Bank's digital ecosystem across five platforms, 100+ flows, and millions of users.
                  </p>
                  <p className="font-jakarta" style={{ fontSize: m ? 13 : 15, lineHeight: m ? "21px" : "25px", color: "#212012", opacity: 0.85, marginBottom: 14 }}>
                    I'm drawn to problems with real stakes, the kind where clarity of thought and care in execution actually change how people experience something important. Banking, healthcare, fintech. I like working in the messy middle where product, design, and engineering blur into one thing.
                  </p>
                  <p className="font-jakarta" style={{ fontSize: m ? 13 : 15, lineHeight: m ? "21px" : "25px", color: "#212012", opacity: 0.85 }}>
                    Outside of work I write, sketch, and experiment with AI — trying to understand what it can do before everyone else figures it out. Currently looking for a startup worth getting obsessed over.
                  </p>
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
                      <p className="font-jakarta font-medium" style={{ fontSize: m ? 11 : 12, color: "#212012" }}>{link.label}</p>
                      <ExternalLink size={10} color="rgba(33,32,18,0.4)" />
                    </motion.a>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: 1, backgroundColor: "rgba(33,32,18,0.09)", marginBottom: m ? 20 : 28 }} />

                {/* Experience */}
                <p className="font-jakarta font-medium uppercase" style={{ fontSize: 10, letterSpacing: "0.5px", color: "#625e37", opacity: 0.55, marginBottom: m ? 12 : 16 }}>
                  work experience
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: m ? 80 : 60 }}>
                  {EXPERIENCE.map((exp, i) => (
                    <ExperienceCard key={exp.company} exp={exp} index={i} isMobile={m} />
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
