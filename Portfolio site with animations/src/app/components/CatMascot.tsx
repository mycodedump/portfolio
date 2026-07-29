import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

type Mood = "walking" | "sitting" | "sleeping" | "irritated" | "happy";

// ── SVG Cat drawing ───────────────────────────────────────────────────────────
function CatBody({ mood, dir }: { mood: Mood; dir: 1 | -1 }) {
  const eyeRy = mood === "sleeping" ? 0.8 : mood === "irritated" ? 1.8 : 3.5;
  const eyeColor = mood === "irritated" ? "#c67d39" : "#212012";
  const earInner = mood === "irritated" ? "#c67d39" : "#dda1ae";
  const tailAngle = mood === "sleeping" ? 140 : mood === "irritated" ? 40 : mood === "happy" ? 160 : 120;

  return (
    <svg
      width="64" height="60"
      viewBox="0 0 64 60"
      fill="none"
      style={{ transform: dir === -1 ? "scaleX(-1)" : undefined, display: "block" }}
    >
      {/* Tail */}
      <path
        d={mood === "sleeping"
          ? "M44 40 Q56 40 58 32 Q60 24 54 20"
          : mood === "irritated"
          ? "M44 36 Q52 28 58 30 Q64 32 60 26 Q56 20 52 24"
          : `M44 36 Q54 ${tailAngle > 130 ? 28 : 38} 58 ${tailAngle > 130 ? 22 : 34}`}
        stroke="#b0a882" strokeWidth={3} strokeLinecap="round" fill="none"
      />

      {/* Body */}
      <ellipse
        cx={mood === "sleeping" ? "26" : "28"}
        cy={mood === "sleeping" ? "42" : "40"}
        rx={mood === "sleeping" ? "24" : "20"}
        ry={mood === "sleeping" ? "14" : "13"}
        fill="#e3d9ce" stroke="#c3be6f" strokeWidth="1.5"
      />

      {/* Head */}
      <circle cx="28" cy="22" r="14" fill="#e3d9ce" stroke="#c3be6f" strokeWidth="1.5" />

      {/* Left ear */}
      <polygon points="18,12 13,2 25,9" fill="#e3d9ce" stroke="#c3be6f" strokeWidth="1.5" />
      <polygon points="19,11 15,4 23,9" fill={earInner} opacity={0.7} />
      {/* Right ear */}
      <polygon points="38,12 43,2 31,9" fill="#e3d9ce" stroke="#c3be6f" strokeWidth="1.5" />
      <polygon points="37,11 41,4 33,9" fill={earInner} opacity={0.7} />

      {/* Eyes */}
      {mood === "sleeping" ? (
        <>
          <path d="M22 21 Q25 18 28 21" stroke="#212012" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M28 21 Q31 18 34 21" stroke="#212012" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </>
      ) : mood === "happy" ? (
        <>
          <path d="M22 22 Q25 19 28 22" stroke="#212012" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M28 22 Q31 19 34 22" stroke="#212012" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="24" cy="21" rx="2.5" ry={eyeRy} fill={eyeColor} />
          <ellipse cx="32" cy="21" rx="2.5" ry={eyeRy} fill={eyeColor} />
        </>
      )}

      {/* Nose */}
      <path d="M27 25 L28 26.5 L29 25" fill="#dda1ae" />

      {/* Whiskers */}
      <line x1="10" y1="24" x2="21" y2="25" stroke="#625e37" strokeWidth={0.8} opacity={0.4} />
      <line x1="10" y1="27" x2="21" y2="27" stroke="#625e37" strokeWidth={0.8} opacity={0.4} />
      <line x1="35" y1="25" x2="46" y2="24" stroke="#625e37" strokeWidth={0.8} opacity={0.4} />
      <line x1="35" y1="27" x2="46" y2="27" stroke="#625e37" strokeWidth={0.8} opacity={0.4} />

      {/* Mouth */}
      {mood === "irritated" ? (
        <path d="M26 28 Q28 26 30 28" stroke="#212012" strokeWidth={1} strokeLinecap="round" fill="none" />
      ) : (
        <path d="M26 28 Q28 30 30 28" stroke="#212012" strokeWidth={1} strokeLinecap="round" fill="none" />
      )}

      {/* Paws when sitting/sleeping */}
      {(mood === "sitting" || mood === "sleeping" || mood === "happy") && (
        <>
          <ellipse cx={mood === "sleeping" ? "14" : "18"} cy="51" rx="5" ry="3.5" fill="#e3d9ce" stroke="#c3be6f" strokeWidth="1.2" />
          <ellipse cx={mood === "sleeping" ? "26" : "28"} cy="51" rx="5" ry="3.5" fill="#e3d9ce" stroke="#c3be6f" strokeWidth="1.2" />
        </>
      )}
    </svg>
  );
}

// ── Speech bubble ─────────────────────────────────────────────────────────────
function Bubble({ text, color = "#e3d9ce" }: { text: string; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6, y: 4 }}
      transition={{ duration: 0.2, ease: "backOut" }}
      style={{
        position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
        background: color, borderRadius: 10, padding: "6px 12px", marginBottom: 6,
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 600,
        color: "#212012", whiteSpace: "nowrap",
        boxShadow: "0 2px 12px rgba(33,32,18,0.15)",
        border: "1.5px solid rgba(255,255,255,0.6)",
      }}
    >
      {text}
      {/* tail */}
      <div style={{ position: "absolute", bottom: -7, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `7px solid ${color}` }} />
    </motion.div>
  );
}

// ── Zzz bubbles ───────────────────────────────────────────────────────────────
function ZzzBubbles() {
  return (
    <>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.9, 0], y: [-4, -22 - i * 10], x: [0, i * 5 - 4], scale: [0.5, 0.9 + i * 0.1, 0.4] }}
          transition={{ duration: 2.2, delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: -14 - i * 10, right: -4 + i * 6,
            fontFamily: "'Libre Caslon Condensed', serif", fontSize: 11 + i * 3,
            color: "#625e37", fontStyle: "italic", lineHeight: 1,
          }}
        >
          z
        </motion.span>
      ))}
    </>
  );
}

// ── Hearts ────────────────────────────────────────────────────────────────────
function Hearts() {
  return (
    <>
      {[0, 1].map(i => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], y: [-8, -32 - i * 12], scale: [0.5, 1.1, 0.7] }}
          transition={{ duration: 1.4, delay: i * 0.4, ease: "easeOut" }}
          style={{ position: "absolute", top: -14 - i * 10, right: 2 + i * 12, fontSize: 14, lineHeight: 1 }}
        >
          🩷
        </motion.span>
      ))}
    </>
  );
}

// ── Feed button ───────────────────────────────────────────────────────────────
function FeedButton({ onFeed }: { onFeed: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 4, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.2 }}
      onClick={e => { e.stopPropagation(); onFeed(); }}
      style={{
        position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
        background: "#c67d39", color: "#212012", border: "none", cursor: "pointer",
        padding: "5px 11px", borderRadius: 8, fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700, letterSpacing: "0.4px", textTransform: "uppercase", whiteSpace: "nowrap",
        boxShadow: "0 2px 8px rgba(198,125,57,0.3)",
      }}
    >
      🐟 feed
    </motion.button>
  );
}

// ── Main Cat Component ────────────────────────────────────────────────────────
export function CatMascot() {
  const [mood, setMood] = useState<Mood>("walking");
  const [posX, setPosX] = useState(12); // percent from left
  const [dir, setDir] = useState<1 | -1>(1);
  const [hovered, setHovered] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const dirRef = useRef<1 | -1>(1);
  const moodRef = useRef<Mood>("walking");
  const walkTimerRef = useRef<ReturnType<typeof setInterval>>();
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout>>();

  moodRef.current = mood;

  const showBubble = useCallback((text: string, dur = 2200) => {
    setBubble(text);
    clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => setBubble(null), dur);
  }, []);

  // Walking loop
  useEffect(() => {
    if (mood !== "walking") {
      clearInterval(walkTimerRef.current);
      return;
    }
    walkTimerRef.current = setInterval(() => {
      setPosX(prev => {
        const next = prev + dirRef.current * 0.22;
        if (next > 82) { dirRef.current = -1; setDir(-1); }
        if (next < 4) { dirRef.current = 1; setDir(1); }
        return Math.max(4, Math.min(82, next));
      });
    }, 50);
    return () => clearInterval(walkTimerRef.current);
  }, [mood]);

  // Idle sit: sit occasionally while walking
  useEffect(() => {
    if (mood !== "walking") return;
    const t = setTimeout(() => {
      if (moodRef.current !== "walking") return;
      setMood("sitting");
      showBubble("...", 2000);
      setTimeout(() => { if (moodRef.current === "sitting") setMood("walking"); }, 3500);
    }, 12000 + Math.random() * 8000);
    return () => clearTimeout(t);
  }, [mood, showBubble]);

  const handleBodyClick = () => {
    if (mood === "sleeping") {
      setMood("sitting");
      showBubble("hiss! >:(", 2000);
      return;
    }
    if (mood === "sitting" || mood === "walking") {
      setMood("irritated");
      showBubble("stop poking me!", 2000);
      setTimeout(() => { setMood("walking"); }, 2200);
    }
  };

  const handleFeed = () => {
    if (mood === "sleeping") return;
    setMood("happy");
    showBubble("yummy! 🐟", 2500);
    setTimeout(() => {
      setMood("sleeping");
      setTimeout(() => { setMood("walking"); }, 9000);
    }, 2800);
  };

  return (
    <motion.div
      animate={{ left: `${posX}%` }}
      transition={{ type: "tween", duration: 0.05, ease: "linear" }}
      style={{
        position: "fixed", bottom: 0, zIndex: 40,
        userSelect: "none",
      }}
    >
      <div
        style={{ position: "relative", cursor: "pointer" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleBodyClick}
      >
        {/* Bubble */}
        <AnimatePresence>
          {bubble && <Bubble text={bubble} />}
        </AnimatePresence>

        {/* Feed button on hover */}
        <AnimatePresence>
          {hovered && mood !== "sleeping" && mood !== "happy" && (
            <FeedButton onFeed={handleFeed} />
          )}
        </AnimatePresence>

        {/* Zzz when sleeping */}
        <AnimatePresence>
          {mood === "sleeping" && <ZzzBubbles />}
        </AnimatePresence>

        {/* Hearts when happy/fed */}
        <AnimatePresence>
          {mood === "happy" && <Hearts />}
        </AnimatePresence>

        {/* Walking bob */}
        <motion.div
          animate={mood === "walking" ? { y: [0, -2, 0] } : { y: 0 }}
          transition={mood === "walking" ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" } : {}}
        >
          {/* Irritated shake */}
          <motion.div
            animate={mood === "irritated" ? { x: [-3, 3, -3, 3, 0] } : { x: 0 }}
            transition={mood === "irritated" ? { duration: 0.4, ease: "easeInOut" } : {}}
          >
            <CatBody mood={mood} dir={dir} />
          </motion.div>
        </motion.div>

        {/* Ground shadow */}
        <div style={{
          width: 48, height: 6, background: "rgba(33,32,18,0.08)", borderRadius: "50%",
          margin: "0 auto", transform: "scaleX(0.9)",
        }} />
      </div>
    </motion.div>
  );
}
