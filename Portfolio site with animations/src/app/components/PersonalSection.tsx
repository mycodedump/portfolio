import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ExternalLink } from "lucide-react";
import { useIsMobile } from "../useIsMobile";

// ── Data ──────────────────────────────────────────────────────────────────────

const PHOTO_CARDS = [
  { bg: "#c3be6f", label: "sketchbook", idx: "01" },
  { bg: "#dda1ae", label: "bali 2023",  idx: "02" },
  { bg: "#c67d39", label: "wood carving", idx: "03" },
  { bg: "#d2ce93", label: "badminton",  idx: "04" },
  { bg: "#ebc7cf", label: "coffee walks", idx: "05" },
];

const N = PHOTO_CARDS.length;

const CURRENTLY_READING = {
  title: "Master of the Game",
  author: "Sidney Sheldon",
  progress: 68,
  spine: "#c3be6f",
};

const PREVIOUSLY_READ = [
  { title: "Rage of Angels",            author: "Sidney Sheldon", spine: "#dda1ae" },
  { title: "The Other Side of Midnight",author: "Sidney Sheldon", spine: "#c67d39" },
  { title: "The Design of Everyday Things", author: "Don Norman", spine: "#d2ce93" },
  { title: "Show Your Work!",           author: "Austin Kleon",   spine: "#ebc7cf" },
];

const MUSIC = [
  { name: "Aditya Rikhari",       url: "#" },
  { name: "Prateek Kuhad",        url: "#" },
  { name: "Rex Orange County",    url: "#" },
  { name: "Tesher",               url: "#" },
  { name: "Mali",                 url: "#" },
  { name: "Cigarettes After Sex", url: "#" },
];

const FOLLOWING = [
  { name: "Dense Discovery",   platform: "Newsletter", url: "#" },
  { name: "Lenny's Newsletter",platform: "Substack",   url: "#" },
  { name: "MKBHD",             platform: "YouTube",    url: "#" },
  { name: "Better Ideas",      platform: "YouTube",    url: "#" },
  { name: "Pablo Stanley",     platform: "Twitter",    url: "#" },
  { name: "Design Details",    platform: "Podcast",    url: "#" },
];

const BLR: { place: string; cat: "eat" | "explore" | "hangout" }[] = [
  { place: "Koshy's",           cat: "eat"     },
  { place: "Matteo Coffea",     cat: "eat"     },
  { place: "Cubbon Park",       cat: "explore" },
  { place: "NGMA Bangalore",    cat: "explore" },
  { place: "Blossoms Book House",cat:"explore" },
  { place: "Church Street Social",cat:"hangout"},
  { place: "Toit Brewpub",      cat: "hangout" },
];

// fan spread positions — desktop (stack pos 0=bottom → 4=top)
const FAN = [
  { x: -110, y: 18, rot: -16 },
  { x: -56,  y: -6, rot: -8  },
  { x:   0,  y:  0, rot:  0  },
  { x:  58,  y: -6, rot:  8  },
  { x: 112,  y: 18, rot: 16  },
];

// fan spread for mobile (smaller cards, tighter spread)
const FAN_MOBILE = [
  { x: -72, y: 14, rot: -14 },
  { x: -36, y: -4, rot: -7  },
  { x:   0, y:  0, rot:  0  },
  { x:  38, y: -4, rot:  7  },
  { x:  74, y: 14, rot: 14  },
];

// ── GSAP photo stack ───────────────────────────────────────────────────────────

function PhotoStack({ mobile = false }: { mobile?: boolean }) {
  const cardW = mobile ? 200 : 260;
  const cardH = mobile ? 261 : 340;
  const containerW = mobile ? 370 : 500;
  const containerH = mobile ? 330 : 420;
  const fanSpread = mobile ? FAN_MOBILE : FAN;

  const cardRefs   = useRef<Array<HTMLDivElement | null>>([]);
  const orderRef   = useRef<number[]>([0, 1, 2, 3, 4]);
  const hovRef     = useRef(false);
  const tapping    = useRef(false);
  const idleTweens = useRef<gsap.core.Tween[]>([]);
  const [hint, setHint] = useState(mobile ? "tap to cycle" : "hover to fan · click to cycle");

  function els() { return cardRefs.current.filter(Boolean) as HTMLDivElement[]; }

  function stackAll(animate: boolean) {
    orderRef.current.forEach((ci, pos) => {
      const el = els()[ci];
      if (!el) return;
      const props = { x: pos * 3, y: -pos * 1.8, rotation: (pos - 2) * 2, scale: 1 - (N - 1 - pos) * 0.018, zIndex: pos + 1 };
      animate ? gsap.to(el, { ...props, duration: 0.42, ease: "power3.out" }) : gsap.set(el, props);
    });
  }

  function fanAll() {
    orderRef.current.forEach((ci, pos) => {
      const el = els()[ci];
      if (!el) return;
      const f = fanSpread[pos];
      gsap.to(el, { x: f.x, y: f.y, rotation: f.rot, scale: 1, zIndex: pos + 1, duration: 0.46, ease: "power3.out" });
    });
  }

  function startIdle() {
    stopIdle();
    els().forEach((el, i) => {
      idleTweens.current.push(
        gsap.to(el, { y: `+=${5 + i * 1.2}`, duration: 1.9 + i * 0.28, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.22 })
      );
    });
  }

  function stopIdle() {
    idleTweens.current.forEach((t) => t.kill());
    idleTweens.current = [];
  }

  function cycleTop() {
    if (tapping.current) return;
    tapping.current = true;
    const order = orderRef.current;
    const topCi = order[N - 1];
    const el = els()[topCi];
    if (!el) { tapping.current = false; return; }
    stopIdle();
    const exitX = mobile ? 160 : 220;
    gsap.to(el, {
      x: exitX, y: -60, rotation: 24, opacity: 0, scale: 0.8, duration: 0.32, ease: "power2.in",
      onComplete: () => {
        orderRef.current = [topCi, ...order.slice(0, N - 1)];
        gsap.set(el, { x: -50, y: 50, rotation: -18, opacity: 0, scale: 0.8, zIndex: 0 });
        gsap.to(el, { opacity: 1, duration: 0.18, delay: 0.06 });
        if (mobile) {
          fanAll();
        } else {
          stackAll(true);
          if (!hovRef.current) setTimeout(startIdle, 520);
        }
        tapping.current = false;
      },
    });
  }

  useEffect(() => {
    if (mobile) {
      // on mobile: start stacked, fan in after a short delay for a nice reveal
      stackAll(false);
      const t = setTimeout(() => fanAll(), 400);
      return () => clearTimeout(t);
    } else {
      stackAll(false);
      startIdle();
      return () => { stopIdle(); };
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div
        style={{ width: containerW, height: containerH, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
        {...(!mobile && {
          onMouseEnter: () => { hovRef.current = true; stopIdle(); fanAll(); setHint("click any card to cycle"); },
          onMouseLeave: () => { hovRef.current = false; stackAll(true); setTimeout(startIdle, 520); setHint("hover to fan · click to cycle"); },
        })}
      >
        {PHOTO_CARDS.map((p, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            onClick={cycleTop}
            style={{ position: "absolute", width: cardW, height: cardH, borderRadius: 16, backgroundColor: p.bg, border: "3px solid rgba(255,255,255,0.68)", boxShadow: "0 8px 36px rgba(33,32,18,0.16)", cursor: "pointer", overflow: "hidden", willChange: "transform" }}
          >
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} viewBox={`0 0 ${cardW} ${cardH}`}>
              {Array.from({ length: Math.floor(cardW / 20) }).map((_, j) => <line key={`v${j}`} x1={j * 20} y1={0} x2={j * 20} y2={cardH} stroke="#212012" strokeWidth={0.5} />)}
              {Array.from({ length: Math.floor(cardH / 20) }).map((_, j) => <line key={`h${j}`} x1={0} y1={j * 20} x2={cardW} y2={j * 20} stroke="#212012" strokeWidth={0.5} />)}
            </svg>
            <svg style={{ position: "absolute", top: "42%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.14 }} width={40} height={40} viewBox="0 0 24 24" fill="none">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#212012" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="4" stroke="#212012" strokeWidth={1.5} />
            </svg>
            <p className="font-caslon" style={{ position: "absolute", bottom: 14, left: 14, fontSize: mobile ? 11 : 13, color: "#212012", fontStyle: "italic", opacity: 0.42 }}>{p.label}</p>
            <p className="font-spline" style={{ position: "absolute", top: 12, right: 14, fontSize: 10, color: "#212012", opacity: 0.22 }}>{p.idx}</p>
          </div>
        ))}
      </div>
      <p className="font-jakarta" style={{ fontSize: 12, color: "#625e37", opacity: 0.38, textAlign: "center" }}>{hint}</p>
    </div>
  );
}

// ── Shared helpers ─────────────────────────────────────────────────────────────

function CardShell({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ flex: 1, minWidth: 200, borderRadius: 16, border: "1px solid rgba(33,32,18,0.08)", padding: "20px 18px 18px", backgroundColor: "rgba(33,32,18,0.015)" }}
    >
      {children}
    </motion.div>
  );
}

function CardHead({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <span style={{ fontSize: 16 }}>{emoji}</span>
      <p className="font-caslon not-italic" style={{ fontSize: 15, color: "#212012", fontWeight: 600 }}>{title}</p>
    </div>
  );
}

function HoverRowDiv({ children, isLast }: { children: ReactNode; isLast?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding: "8px 6px", borderBottom: isLast ? "none" : "1px solid rgba(33,32,18,0.06)", backgroundColor: hov ? "rgba(33,32,18,0.03)" : "transparent", borderRadius: 6, transition: "background 0.12s" }}
    >
      {children}
    </div>
  );
}

function HoverRowLink({ children, href, isLast }: { children: ReactNode; href: string; isLast?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: "block", padding: "8px 6px", borderBottom: isLast ? "none" : "1px solid rgba(33,32,18,0.06)", textDecoration: "none", cursor: "pointer", backgroundColor: hov ? "rgba(33,32,18,0.03)" : "transparent", borderRadius: 6, transition: "background 0.12s" }}
    >
      {children}
    </a>
  );
}

// ── Interest cards ─────────────────────────────────────────────────────────────

function BookCard() {
  return (
    <CardShell delay={0.05}>
      <CardHead emoji="📚" title="reading" />

      {/* Currently reading */}
      <div style={{ background: "rgba(195,190,111,0.1)", borderRadius: 10, padding: "12px 14px", marginBottom: 12, border: "1px solid rgba(195,190,111,0.25)" }}>
        <p className="font-jakarta font-medium uppercase" style={{ fontSize: 9, letterSpacing: "0.5px", color: "#625e37", marginBottom: 6, opacity: 0.65 }}>currently reading</p>
        <div style={{ display: "flex", alignItems: "stretch", gap: 10 }}>
          <div style={{ width: 4, borderRadius: 4, backgroundColor: CURRENTLY_READING.spine, flexShrink: 0, alignSelf: "stretch", minHeight: 36 }} />
          <div style={{ flex: 1, paddingTop: 2, paddingBottom: 2 }}>
            <p className="font-jakarta font-medium" style={{ fontSize: 13, color: "#212012", lineHeight: "17px" }}>{CURRENTLY_READING.title}</p>
            <p className="font-jakarta" style={{ fontSize: 11, color: "#625e37", opacity: 0.6, marginTop: 1 }}>{CURRENTLY_READING.author}</p>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: 10, height: 3, borderRadius: 3, background: "rgba(98,94,55,0.1)", overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${CURRENTLY_READING.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ height: "100%", borderRadius: 3, background: CURRENTLY_READING.spine }}
          />
        </div>
        <p className="font-jakarta" style={{ fontSize: 10, color: "#625e37", opacity: 0.45, marginTop: 4 }}>{CURRENTLY_READING.progress}% through</p>
      </div>

      {/* Previously read */}
      <p className="font-jakarta font-medium uppercase" style={{ fontSize: 9, letterSpacing: "0.5px", color: "#625e37", marginBottom: 6, opacity: 0.65 }}>previously read</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {PREVIOUSLY_READ.map((book, i) => (
          <HoverRowDiv key={book.title} isLast={i === PREVIOUSLY_READ.length - 1}>
            <div style={{ display: "flex", alignItems: "stretch", gap: 10 }}>
              <div style={{ width: 4, borderRadius: 4, backgroundColor: book.spine, flexShrink: 0, alignSelf: "stretch", minHeight: 34 }} />
              <div style={{ paddingTop: 2, paddingBottom: 2 }}>
                <p className="font-jakarta font-medium" style={{ fontSize: 13, color: "#212012", lineHeight: "17px" }}>{book.title}</p>
                <p className="font-jakarta" style={{ fontSize: 11, color: "#625e37", opacity: 0.6, marginTop: 1 }}>{book.author}</p>
              </div>
            </div>
          </HoverRowDiv>
        ))}
      </div>
    </CardShell>
  );
}

// Animated waveform bars for "now playing"
function Waveform({ active }: { active: boolean }) {
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 14 }}>
      {[5, 9, 6, 12, 7, 10, 5].map((h, j) => (
        <motion.div
          key={j}
          animate={active ? { height: [h, h * 2.2, h] } : { height: h * 0.4 }}
          transition={active ? { duration: 0.5 + j * 0.06, repeat: Infinity, ease: "easeInOut", delay: j * 0.07 } : { duration: 0.3 }}
          style={{ width: 2, borderRadius: 2, backgroundColor: "#1DB954", minHeight: 3 }}
        />
      ))}
    </div>
  );
}

function MusicCard() {
  const [isPlaying] = useState(true);
  const MOCK_TRACK = { name: "pasoori", artist: "ali sethi, shae gill", progress: 62 };

  return (
    <CardShell delay={0.1}>
      <CardHead emoji="🎧" title="on repeat" />

      {/* Now Playing widget */}
      <div style={{ background: "#212012", borderRadius: 12, padding: "14px 14px 12px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Waveform active={isPlaying} />
          <p className="font-jakarta font-medium uppercase" style={{ fontSize: 9, color: "#1DB954", letterSpacing: "0.5px", marginLeft: 2 }}>now playing</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Album art placeholder */}
          <div style={{ width: 44, height: 44, borderRadius: 8, background: "linear-gradient(135deg, #1DB954, #158a3e)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 20 }}>🎵</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="font-jakarta font-medium" style={{ fontSize: 13, color: "#e3d9ce", lineHeight: "16px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{MOCK_TRACK.name}</p>
            <p className="font-jakarta" style={{ fontSize: 11, color: "rgba(227,217,206,0.5)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{MOCK_TRACK.artist}</p>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: 10, height: 2, borderRadius: 2, background: "rgba(255,255,255,0.1)" }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${MOCK_TRACK.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            style={{ height: "100%", borderRadius: 2, background: "#1DB954" }}
          />
        </div>
        <p className="font-jakarta" style={{ fontSize: 9, color: "rgba(227,217,206,0.25)", marginTop: 6, textAlign: "center", letterSpacing: "0.3px" }}>
          connect spotify to see your real activity
        </p>
      </div>

      {/* Top artists */}
      <p className="font-jakarta font-medium uppercase" style={{ fontSize: 9, letterSpacing: "0.5px", color: "#625e37", marginBottom: 6, opacity: 0.65 }}>top artists</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {MUSIC.map((artist, i) => (
          <motion.div
            key={artist.name}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.15 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 6px", borderRadius: 7, cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="font-jakarta" style={{ fontSize: 10, color: "rgba(98,94,55,0.3)", width: 14, textAlign: "right", flexShrink: 0 }}>{i + 1}</span>
              <p className="font-jakarta font-medium" style={{ fontSize: 13, color: "#625e37" }}>{artist.name}</p>
            </div>
            <ExternalLink size={10} color="rgba(98,94,55,0.3)" />
          </motion.div>
        ))}
      </div>
    </CardShell>
  );
}

function FollowCard() {
  return (
    <CardShell delay={0.15}>
      <CardHead emoji="🔗" title="who i follow" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {FOLLOWING.map((item, i) => (
          <HoverRowLink key={item.name} href={item.url} isLast={i === FOLLOWING.length - 1}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <p className="font-jakarta font-medium" style={{ fontSize: 13, color: "#212012" }}>{item.name}</p>
                <ExternalLink size={9} color="rgba(33,32,18,0.2)" />
              </div>
              <span className="font-jakarta" style={{ fontSize: 9, color: "#c67d39", backgroundColor: "rgba(198,125,57,0.1)", padding: "2px 8px", borderRadius: 10, letterSpacing: "0.3px" }}>
                {item.platform}
              </span>
            </div>
          </HoverRowLink>
        ))}
      </div>
    </CardShell>
  );
}

function BLRCard() {
  const cats = ["eat", "explore", "hangout"] as const;
  const catColor: Record<string, string> = { eat: "#c67d39", explore: "#c3be6f", hangout: "#dda1ae" };
  const catBg:    Record<string, string> = { eat: "rgba(198,125,57,0.09)", explore: "rgba(195,190,111,0.1)", hangout: "rgba(221,161,174,0.12)" };

  return (
    <CardShell delay={0.2}>
      <CardHead emoji="📍" title="blr favorites" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {cats.map((cat) => (
          <div key={cat}>
            <p className="font-jakarta font-medium uppercase" style={{ fontSize: 9, letterSpacing: "0.5px", color: catColor[cat], marginBottom: 6 }}>{cat}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {BLR.filter((b) => b.cat === cat).map((item) => (
                <motion.span
                  key={item.place}
                  whileHover={{ scale: 1.05, backgroundColor: catColor[item.cat] }}
                  transition={{ duration: 0.14 }}
                  className="font-jakarta font-medium"
                  style={{ fontSize: 12, color: "#212012", backgroundColor: catBg[item.cat], padding: "4px 10px", borderRadius: 20, border: `1px solid ${catColor[item.cat]}30`, cursor: "pointer" }}
                >
                  {item.place}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

interface PersonalSectionProps {
  onAboutOpen?: () => void;
}

export function PersonalSection({ onAboutOpen }: PersonalSectionProps) {
  const isMobile = useIsMobile();
  const [hovAbout, setHovAbout] = useState(false);

  return (
    <section style={{ padding: isMobile ? "60px 16px 80px" : "80px 40px 100px" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", marginBottom: 56 }}
      >
        <p className="font-jakarta font-medium uppercase" style={{ fontSize: 12, letterSpacing: "0.48px", color: "#625e37", marginBottom: 12 }}>
          beyond pixels
        </p>
        <p className="font-caslon not-italic" style={{ fontSize: isMobile ? 32 : 40, lineHeight: isMobile ? "40px" : "48px", color: "#212012", fontWeight: 600 }}>
          i have a life outside of figma
        </p>
        <p className="font-jakarta" style={{ fontSize: 16, color: "#625e37", opacity: 0.7, marginTop: 12 }}>
          sketches, wood carving, badminton, and opinions on too many things
        </p>

        {/* About me CTA — shown below tagline */}
        {onAboutOpen && (
          <motion.button
            onClick={onAboutOpen}
            onMouseEnter={() => setHovAbout(true)}
            onMouseLeave={() => setHovAbout(false)}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 20, padding: 0 }}
          >
            <p className="font-caslon" style={{ fontSize: 15, color: "#212012", fontStyle: "italic", textDecoration: hovAbout ? "underline" : "none", textUnderlineOffset: 3, transition: "text-decoration 0.1s" }}>
              about me
            </p>
            <motion.p
              animate={{ x: hovAbout ? 4 : 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-caslon"
              style={{ fontSize: 16, color: "#212012", lineHeight: 1 }}
            >
              →
            </motion.p>
          </motion.button>
        )}
      </motion.div>

      <div style={{ marginBottom: isMobile ? 48 : 72, display: "flex", justifyContent: "center", overflow: "hidden" }}>
        <PhotoStack mobile={isMobile} />
      </div>

      <div style={{ display: "flex", gap: 14, flexDirection: isMobile ? "column" : "row", flexWrap: "wrap" }}>
        <BookCard />
        <MusicCard />
        <FollowCard />
        <BLRCard />
      </div>
    </section>
  );
}
