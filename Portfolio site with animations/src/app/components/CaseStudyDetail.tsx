import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Pause, Volume2 } from "lucide-react";
import { useIsMobile } from "@/app/useIsMobile";

// ─── CS1 image assets (ICICI Bank) ────────────────────────────────────────────
import imgStrip1A from "../../imports/FullScrollableForProjects-1/93e70105f7d066f588dc4dbef15d865a2e5d4066.png";
import imgStrip1B from "../../imports/FullScrollableForProjects-1/79ccc98f7098129f020d71e6f7aa77cf20d01c6d.png";
import imgStrip1C from "../../imports/FullScrollableForProjects-1/296d2045c1de41d68219d357e12fd47c6335460e.png";
import imgStrip2A from "../../imports/FullScrollableForProjects-1/7935f8d2f4e0973372a5050d14b5451abd3ae9d6.png";
import imgStrip2B from "../../imports/FullScrollableForProjects-1/4fa179900829b7a1fcc9ca7df6f34891f9f47e99.png";
import imgFlowChart from "../../imports/FullScrollableForProjects-1/ae9b7127606624410916ea9ab4314f4b8d7b3e40.png";
import imgModal1 from "../../imports/FullScrollableForProjects-1/d5a0fc82047b1a02298116147f6c89f8863132ac.png";
import imgModal2 from "../../imports/FullScrollableForProjects-1/016ed0f122d38f391adcadaecde5fbde037d5beb.png";
import imgModal3 from "../../imports/FullScrollableForProjects-1/5614b9f71f532ad5ce9933954383c9b423f997fe.png";
import imgSingleCountry from "../../imports/FullScrollableForProjects-1/6773a4376e1e979186008a7e25d5231d66d8c312.png";
import imgDest1 from "../../imports/FullScrollableForProjects-1/65bdc69ae16263dc2ada8c1d008928d7c8205260.png";
import imgDest2 from "../../imports/FullScrollableForProjects-1/7431037695e857a6ef07aee719c3aa666f5c524d.png";
import imgMulti1 from "../../imports/FullScrollableForProjects-1/4257ae666e8fd23dbd54e3d8a54fc8f6b1b2d6d8.png";
import imgMulti2 from "../../imports/FullScrollableForProjects-1/884412cdbee05805549dd2ba16a622921deadd5b.png";
import imgMulti3 from "../../imports/FullScrollableForProjects-1/5c80203c3c32b2840d077bcc316d0ae47b79c6f5.png";

// ─── CS2 image assets (ICICI FASTag) ──────────────────────────────────────────
import imgFastagNonIcici from "../../assets/FASTag/1.png";
import imgFastagAutoOff from "../../assets/FASTag/2.png";
import imgFastagAutoOn from "../../assets/FASTag/3.png";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CaseStudyInfo {
  index: number;
  slug: string;
  label: string;
  color: string;
  textColor: string;
  imageBg: string;
  dotColor: string;
  title: string;
  type: string;
  role: string;
  status: string;
  year: string;
  client: string;
  designTeam: string;
  crossTeam: string;
  timeline: string;
  statusFull: string;
  overview: string;
}

// ─── Section index definitions per case study ─────────────────────────────────
const SECTIONS_BY_CS: Record<number, { id: string; label: string }[]> = {
  0: [
    { id: "cs-problem", label: "Problem statement" },
    { id: "cs-hmw", label: "How might we" },
    { id: "cs-toggle", label: "Why not a toggle" },
    { id: "cs-flow", label: "Getting users in" },
    { id: "cs-trip", label: "Declaring the trip" },
    { id: "cs-media", label: "Walkthrough" },
  ],
  1: [
    { id: "cs-intro", label: "Introduction" },
    { id: "cs-landing", label: "Landing page" },
    { id: "cs-card", label: "FASTag card exploration" },
    { id: "cs-details", label: "All FASTag details" },
    { id: "cs-recharge", label: "FASTag recharge" },
    { id: "cs-media", label: "Walkthrough" },
  ],
  2: [
    { id: "cs-problem", label: "Problem statement" },
    { id: "cs-process", label: "Process" },
    { id: "cs-findings", label: "Key findings" },
    { id: "cs-media", label: "Walkthrough" },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────
export const CASE_STUDY_DATA: CaseStudyInfo[] = [
  {
    index: 0,
    slug: "icici-bank-onboarding",
    label: "CASE STUDY 1",
    color: "#c3be6f",
    textColor: "#625e37",
    imageBg: "#d2ce93",
    dotColor: "#C3BE6F",
    title: "Redesigning how 10M+ ICICI Bank cardholders activate their card for international travel",
    type: "UX + UI",
    role: "Sole designer",
    status: "Under review",
    year: "2023",
    client: "ICICI Bank",
    designTeam: "Canvs — Harleen Chatha (Design manager), Laxmi Mahajan (Designer)",
    crossTeam: "Product Manager, Engineering, Risk & Compliance (stakeholder reviewers)",
    timeline: "2 weeks",
    statusFull: "Final design iteration complete (Currently with the client for review, pre-launch)",
    overview: "Led end-to-end redesign of ICICI Bank's international card activation for 10M+ cardholders.",
  },
  {
    index: 1,
    slug: "icici-fastag-platform",
    label: "CASE STUDY 2",
    color: "#c67d39",
    textColor: "#212012",
    imageBg: "#d19761",
    dotColor: "#C67D39",
    title: "Bringing India's most-used toll payment system to ICICI's web platform — for the first time.",
    type: "UX + UI",
    role: "Sole designer",
    status: "Ongoing",
    year: "2022–2023",
    client: "Canvs Studio",
    designTeam: "Laxmi Mahajan (Designer), Harleen Chatha (Design Manager)",
    crossTeam: "Engineering leads across 4 client projects",
    timeline: "3 months",
    statusFull: "V1 shipped and adopted across all new client engagements",
    overview: "Created a token-based design system from scratch, reducing handoff time by 60% across 20+ clients.",
  },
  {
    index: 2,
    slug: "ai-design-experiments",
    label: "CASE STUDY 3",
    color: "#dda1ae",
    textColor: "#212012",
    imageBg: "#ebc7cf",
    dotColor: "#DDA1AE",
    title: "AI-assisted design experiments — compressing the exploratory phase",
    type: "UX Research + Prototyping",
    role: "Sole designer",
    status: "Under review",
    year: "2024",
    client: "Self-initiated",
    designTeam: "Laxmi Mahajan",
    crossTeam: "8 external designers (workshop participants)",
    timeline: "6 weeks",
    statusFull: "Research published, workshop format being adapted internally at Canvs",
    overview: "Explored how generative AI can augment design without stripping creative ownership — 3× faster first prototypes.",
  },
];

// ─── Shared spacing system ─────────────────────────────────────────────────────
// .cs-sections  → wraps top-level SectionBlocks: 40px between main sections
// .cs-flow      → wraps a section's content: 16px default rhythm between paragraphs,
//                 24px before a title-2/title-3, 12px after a title-2/title-3,
//                 20px between two consecutive image containers (.cs-img)
// .cs-bullets   → wraps a bullet <ul>: 8px between bullet points
const CS_SPACING_CSS = `
  .cs-sections > * + * { margin-top: 40px; }
  .cs-flow > * + * { margin-top: 16px; }
  .cs-flow > * + .cs-t2, .cs-flow > * + .cs-t3 { margin-top: 24px; }
  .cs-flow > .cs-t2 + *, .cs-flow > .cs-t3 + * { margin-top: 12px; }
  .cs-flow > .cs-img + .cs-img { margin-top: 20px; }
  .cs-bullets > li + li { margin-top: 8px; }
`;

// ─── Shared: card thumbnail placeholder ──────────────────────────────────────
export function ThumbnailPlaceholder({
  bgColor, strokeColor, height = "100%", iconSize = 40,
}: {
  bgColor: string; strokeColor: string; height?: string | number; iconSize?: number;
}) {
  return (
    <div style={{ width: "100%", height, backgroundColor: bgColor, borderRadius: 4, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: [`repeating-linear-gradient(0deg,transparent,transparent 39px,${strokeColor}18 39px,${strokeColor}18 40px)`, `repeating-linear-gradient(90deg,transparent,transparent 39px,${strokeColor}18 39px,${strokeColor}18 40px)`].join(",") }} />
      {iconSize > 0 && (
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none" style={{ position: "relative", zIndex: 1 }}>
          <rect x="4" y="11" width="32" height="22" rx="3" stroke={strokeColor} strokeWidth="1.5" strokeOpacity="0.35" />
          <circle cx="20" cy="22" r="6" stroke={strokeColor} strokeWidth="1.5" strokeOpacity="0.35" />
          <path d="M14 11V10a2 2 0 012-2h8a2 2 0 012 2v1" stroke={strokeColor} strokeWidth="1.5" strokeOpacity="0.35" />
          <circle cx="32" cy="15" r="1.5" fill={strokeColor} fillOpacity="0.35" />
        </svg>
      )}
    </div>
  );
}

// ─── SectionBlock: scroll-reveal wrapper ─────────────────────────────────────
function SectionBlock({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.div
      id={id}
      data-section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-8% 0px -5% 0px" }}
      style={{ scrollMarginTop: 88 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Content helpers ──────────────────────────────────────────────────────────
function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <p className="font-jakarta font-normal" style={{ fontSize: 12, letterSpacing: "0.48px", color: "#c67d39" }}>{label}</p>
      <p className="font-jakarta font-semibold" style={{ fontSize: 12, letterSpacing: "0.1px", color: "#212012", lineHeight: "18px" }}>{value}</p>
    </div>
  );
}

// Mobile meta table — matches Viewport/Expanded Figma exactly
function MobileMetaTable({ cs }: { cs: CaseStudyInfo }) {
  const rows = [
    { label: "Client", value: cs.client },
    { label: "Timeline", value: cs.timeline },
    { label: "Team", value: cs.designTeam },
    { label: "Role", value: cs.role },
    { label: "Team", value: cs.crossTeam },
    { label: "Status", value: cs.statusFull },
  ];
  return (
    <div style={{
      backgroundColor: "#e7ded5", borderRadius: 12,
      border: "1px solid rgba(33,32,18,0.1)",
      padding: 16, display: "flex", flexDirection: "column", gap: 12,
      fontSize: 10, letterSpacing: "0.4px",
    }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
          <div style={{
            width: 60, flexShrink: 0,
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500,
            color: "#c67d39", lineHeight: "normal",
          }}>
            {row.label}
          </div>
          <div style={{
            flex: 1, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
            color: "#212012", lineHeight: "normal", wordBreak: "break-word",
          }}>
            {row.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ children, mobile = false }: { children: React.ReactNode; mobile?: boolean }) {
  return (
    <p className="font-caslon not-italic" style={{
      fontSize: mobile ? 16 : 20,
      color: "#212012", fontWeight: 600, lineHeight: "normal",
    }}>
      {children}
    </p>
  );
}

function BodyText({ children, color = "#444", mobile = false }: { children: React.ReactNode; color?: string; mobile?: boolean }) {
  return (
    <p className="font-jakarta font-normal" style={{
      fontSize: mobile ? 12 : 14,
      lineHeight: mobile ? "18px" : "20px",
      color,
      letterSpacing: mobile ? "0.12px" : "0.14px",
    }}>
      {children}
    </p>
  );
}

function OrangeBlockquote({ children, mobile = false }: { children: React.ReactNode; mobile?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <div style={{ width: 3, borderRadius: 4, backgroundColor: "#c67d39", alignSelf: "stretch", flexShrink: 0 }} />
      <p className="font-caslon not-italic" style={{
        fontSize: mobile ? 13 : 16,
        lineHeight: mobile ? "19px" : "22px",
        color: "#212012", flex: 1,
      }}>
        {children}
      </p>
    </div>
  );
}

function SubHeading({ children, mobile = false }: { children: React.ReactNode; mobile?: boolean }) {
  return (
    <p className="font-jakarta font-semibold cs-t2" style={{
      fontSize: mobile ? 12 : 16,
      lineHeight: mobile ? "18px" : "20px",
      color: "#444",
      letterSpacing: mobile ? "0.12px" : "0.16px",
    }}>
      {children}
    </p>
  );
}

// Carousel — one Figma-exact "Frame 1597884708" card (584×645 @ desktop) shown fully,
// the rest of the slides reduced to 60×40px (scaled down on mobile) clickable thumbnails.
interface CarouselSlide {
  src?: string;
  caption: string;
}

function ImageCarousel({ slides, mobile = false, bgColor = "#e7ded5" }: { slides: CarouselSlide[]; mobile?: boolean; bgColor?: string }) {
  const [active, setActive] = useState(0);
  const current = slides[active];
  const strokeColor = "#c67d39";
  const thumbW = mobile ? 48 : 60;
  const thumbH = mobile ? 32 : 40;

  return (
    <div className="cs-img" style={{ display: "flex", flexDirection: "column", gap: mobile ? 10 : 12 }}>
      {/* Full frame — the one active slide */}
      <div
        style={{
          display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
          padding: mobile ? "16px 16px 14px" : "24px 24px 20px",
          gap: 10,
          width: "100%",
          aspectRatio: "584 / 645",
          backgroundColor: bgColor,
          borderRadius: 8,
        }}
      >
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          gap: mobile ? 12 : 16,
          width: "96.64%",
        }}>
          {/* Image + its outside stroke ring: overflow-hidden box clips the 5px-rounded image,
              a separate inset:-1 sibling draws the 1px white stroke just outside that edge —
              a plain `border` here would sit inside the box and dent the rounded corners. */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "518 / 572", flexShrink: 0 }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 5, overflow: "hidden", backgroundColor: bgColor }}>
              {current.src ? (
                <img src={current.src} alt={current.caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <ThumbnailPlaceholder bgColor={bgColor} strokeColor={strokeColor} height="100%" iconSize={32} />
              )}
            </div>
            <div style={{ position: "absolute", inset: -1, border: "1px solid #ffffff", borderRadius: 6, pointerEvents: "none" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "0 4px", gap: 6, width: "100%", flexShrink: 0 }}>
            <div style={{ width: 3, height: 13, borderRadius: 4, backgroundColor: strokeColor, flexShrink: 0 }} />
            <p className="font-jakarta font-medium" style={{
              flex: 1, minWidth: 0,
              fontSize: 10, lineHeight: "13px", letterSpacing: "0.01em",
              color: "rgba(33,32,18,0.5)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {current.caption}
            </p>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <p className="font-jakarta font-medium" style={{ fontSize: 10, lineHeight: "13px", letterSpacing: "0.01em", color: "#735933" }}>
                {active + 1}
              </p>
              <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(115,89,51,0.3)" }} />
              <p className="font-jakarta font-medium" style={{ fontSize: 10, lineHeight: "13px", letterSpacing: "0.01em", color: "rgba(115,89,51,0.5)" }}>
                {slides.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails — always all N slides (N = the counter's total), active one highlighted.
          Never conditionally removed, so the row never reorders and every slide stays reachable. */}
      {slides.length > 1 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={slide.caption}
              aria-current={i === active}
              style={{
                position: "relative", display: "block", flexShrink: 0,
                width: thumbW, height: thumbH,
                padding: 0, border: "none", background: "none", cursor: "pointer",
                borderRadius: 4, overflow: "hidden",
                opacity: i === active ? 1 : 0.55,
                transition: "opacity 0.15s ease",
              }}
            >
              {slide.src ? (
                <img src={slide.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <ThumbnailPlaceholder bgColor={bgColor} strokeColor={strokeColor} height="100%" iconSize={12} />
              )}
              <div style={{
                position: "absolute", inset: -1, borderRadius: 5, pointerEvents: "none",
                border: i === active ? `1.5px solid ${strokeColor}` : "1px solid #ffffff",
              }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function IterationLabel({ children, mobile = false }: { children: React.ReactNode; mobile?: boolean }) {
  return (
    <p className="font-jakarta font-semibold cs-t3" style={{
      fontSize: mobile ? 12 : 14,
      lineHeight: mobile ? "17px" : "20px",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      color: "#c67d39",
    }}>
      {children}
    </p>
  );
}

function HMWBullet({ num, text, mobile = false }: { num: number; text: string; mobile?: boolean }) {
  return (
    <div style={{ backgroundColor: "rgba(198,125,57,0.1)", borderRadius: 8, border: "1px solid rgba(198,125,57,0.3)", overflow: "hidden", display: "flex", alignItems: "center" }}>
      <div style={{ width: 3, backgroundColor: "#c67d39", alignSelf: "stretch", flexShrink: 0 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: mobile ? "10px 12px" : "12px 16px", flex: 1 }}>
        <div style={{ width: 20, height: 20, borderRadius: 16, backgroundColor: "#c67d39", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <p className="font-jakarta font-bold text-white" style={{ fontSize: 12, lineHeight: "16px", letterSpacing: "0.12px" }}>{num}</p>
        </div>
        <p className="font-jakarta font-normal" style={{
          fontSize: mobile ? 12 : 13,
          lineHeight: mobile ? "18px" : "16px",
          color: "#444", letterSpacing: mobile ? "0.12px" : "0.13px",
        }}>
          {text}
        </p>
      </div>
    </div>
  );
}

// ─── Phone strip image frame ─────────────────────────────────────────────────
// mobile=true: matches "frame_imge - reference" from Figma Viewport/Expanded
// h-272, three 100×222 images at left-16/left-131/right-16 top-16, labels at top-246 in 8px
function PhoneStrip({
  images, labels, bgColor = "#e7ded5", height = 406, mobile = false,
}: {
  images: { src: string; top?: number; left?: number; right?: number; width?: number; height?: number }[];
  labels?: { text: string; left: number; top?: number; bottom?: number }[];
  bgColor?: string;
  height?: number;
  mobile?: boolean;
}) {
  if (mobile) {
    // Figma "frame_imge - reference" layout
    const mobilePos = [
      { left: 16, right: undefined },
      { left: 131, right: undefined },
      { left: undefined, right: 16 },
    ];
    return (
      <div className="cs-img" style={{
        backgroundColor: bgColor, borderRadius: 8, overflow: "hidden",
        position: "relative", height: 272, width: "100%", flexShrink: 0,
      }}>
        {images.slice(0, 3).map((img, i) => {
          const pos = mobilePos[i] ?? { left: 16, right: undefined };
          return (
            <div
              key={i}
              style={{
                position: "absolute", top: 16,
                left: pos.left, right: pos.right,
                width: 100, height: 222,
                borderRadius: 5, overflow: "hidden", pointerEvents: "none",
              }}
            >
              <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 5 }} />
              <div style={{ position: "absolute", inset: -1, border: "1px solid rgba(255,255,255,0.8)", borderRadius: 6, pointerEvents: "none" }} />
            </div>
          );
        })}
        {labels?.slice(0, 3).map((label, i) => {
          // anchor each label under its image: left-16 / left-131 / right-16
          const pos = [
            { left: 16,  right: undefined },
            { left: 131, right: undefined },
            { left: undefined, right: 16 },
          ][i] ?? { left: 16, right: undefined };
          return (
            <div key={i} style={{
              position: "absolute",
              left: pos.left,
              right: pos.right,
              top: 246,
              width: 100,
              display: "flex", alignItems: "flex-start", gap: 4,
            }}>
              <div style={{ width: 3, borderRadius: 4, backgroundColor: "#c67d39", minHeight: 10, flexShrink: 0, alignSelf: "flex-start", marginTop: 2 }} />
              <p className="font-jakarta font-medium" style={{
                fontSize: 8, color: "rgba(33,32,18,0.5)", letterSpacing: "0.08px",
                wordBreak: "break-word", lineHeight: "11px",
              }}>
                {label.text}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="cs-img" style={{ backgroundColor: bgColor, borderRadius: 8, overflow: "hidden", position: "relative", height, width: "100%", flexShrink: 0 }}>
      {images.map((img, i) => (
        <div key={i} style={{ position: "absolute", top: img.top ?? 24, left: img.left, right: img.right, width: img.width ?? 150, height: img.height ?? 333, borderRadius: 5, overflow: "hidden", pointerEvents: "none" }}>
          <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 5 }} />
          <div style={{ position: "absolute", inset: -1, border: "1px solid rgba(255,255,255,0.8)", borderRadius: 6, pointerEvents: "none" }} />
        </div>
      ))}
      {labels?.map((label, i) => (
        <div key={i} style={{ position: "absolute", left: label.left, top: label.top, bottom: label.bottom, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 3, borderRadius: 4, backgroundColor: "#c67d39", height: "100%", minHeight: 14 }} />
          <p className="font-jakarta font-medium" style={{ fontSize: 10, color: "rgba(33,32,18,0.5)", letterSpacing: "0.1px", whiteSpace: "nowrap" }}>{label.text}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Audio player ─────────────────────────────────────────────────────────────
function AudioPlayer({ color }: { color: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
      <p className="font-jakarta font-medium" style={{ fontSize: 11, color: "rgba(227,217,206,0.5)", letterSpacing: "0.5px", textTransform: "uppercase" }}>
        Listen to this case study
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={() => setPlaying(!playing)}
          style={{ width: 34, height: 34, borderRadius: "50%", backgroundColor: color, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
        >
          {playing ? <Pause size={14} fill="#212012" color="#212012" /> : <Play size={14} fill="#212012" color="#212012" />}
        </button>
        <div style={{ flex: 1, height: 2, backgroundColor: "rgba(227,217,206,0.18)", borderRadius: 1, position: "relative" }}>
          <div style={{ width: "28%", height: "100%", backgroundColor: color, borderRadius: 1 }} />
        </div>
        <p className="font-jakarta" style={{ fontSize: 11, color: "rgba(227,217,206,0.4)", letterSpacing: "0.1px", flexShrink: 0 }}>1:24 / 3:52</p>
        <Volume2 size={13} color="rgba(227,217,206,0.35)" style={{ flexShrink: 0 }} />
      </div>
    </div>
  );
}

function VideoFrame({ cs }: { cs: CaseStudyInfo }) {
  return (
    <div style={{ flex: "0 0 320px", height: 180, borderRadius: 8, overflow: "hidden", position: "relative" }}>
      <ThumbnailPlaceholder bgColor={cs.imageBg} strokeColor={cs.textColor} height="100%" iconSize={0} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, backgroundColor: "rgba(33,32,18,0.55)" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Play size={20} fill="#212012" color="#212012" />
        </div>
        <p className="font-jakarta font-medium" style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", letterSpacing: "0.1px", textAlign: "center" }}>Case study walkthrough</p>
      </div>
    </div>
  );
}

// ─── Related case study card ──────────────────────────────────────────────────
function RelatedCard({ cs, onClick }: { cs: CaseStudyInfo; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      style={{ flex: 1, backgroundColor: cs.color, borderRadius: 16, overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: "column" }}
    >
      <div style={{ height: 110, overflow: "hidden", flexShrink: 0 }}>
        <ThumbnailPlaceholder bgColor={cs.imageBg} strokeColor={cs.textColor} height={110} iconSize={24} />
      </div>
      <div style={{ padding: "14px 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "inline-flex", backgroundColor: "rgba(33,32,18,0.12)", padding: "4px 12px", borderRadius: 100, alignSelf: "flex-start" }}>
          <p className="font-jakarta font-semibold" style={{ fontSize: 10, color: cs.textColor, letterSpacing: "0.5px", textTransform: "uppercase" }}>{cs.label}</p>
        </div>
        <p className="font-caslon" style={{ fontSize: 17, lineHeight: "23px", color: "#212012", fontWeight: 600 }}>{cs.title}</p>
      </div>
    </motion.div>
  );
}

// ─── CS1 content ─────────────────────────────────────────────────────────────
function CS1Content({ isMobile }: { isMobile: boolean }) {
  const m = isMobile;
  return (
    <div className="cs-sections" style={{ display: "flex", flexDirection: "column" }}>
      <SectionBlock id="cs-problem">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHeading mobile={m}>THE PROBLEM</SectionHeading>
          <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
            <BodyText mobile={m}>
              ICICI Bank credit cards were declining 30% of international transactions. Not because the cards didn't work abroad (ICICI Bank cards have global acceptance across Visa and Mastercard) but because of a structural reason: by RBI mandate, every new or reissued card ships with international usage switched off by default.
            </BodyText>
            <BodyText mobile={m}>
              It creates an almost invisible trap: a customer lands in Tokyo, taps their card at a convenience store, and gets declined with no idea why. The setting blocking them is buried three menus deep in Services - Card Controls.
            </BodyText>
            <PhoneStrip
              mobile={m}
              images={[{ src: imgStrip1A, left: 24 }, { src: imgStrip1B, left: 217 }, { src: imgStrip1C, left: 410 }]}
              labels={[{ text: "Cards landing", left: 28, top: m ? undefined : 369 }, { text: "Manage card - scrolled", left: 221, top: m ? undefined : 369 }, { text: "Destination", left: 414, top: m ? undefined : 369 }]}
            />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="cs-hmw">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <OrangeBlockquote mobile={m}>
            We're facing a 30% decline rate on international transactions. We're building{" "}
            <em>iTravel</em>, a unified hub where customers declare their travel plans and the bank automatically aligns card usage and fraud monitoring to that profile.
          </OrangeBlockquote>
          <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
            <BodyText mobile={m}>My job was to take that mandate and three open-ended HMWs, and turn them into a complete, shippable product experience.</BodyText>
            <HMWBullet mobile={m} num={1} text="HMW — make international card usage easy to turn on only when needed, so customers feel confident and in control while travelling." />
            <HMWBullet mobile={m} num={2} text="HMW — ensure genuine international transactions get approved, so customers have a seamless payment experience and prefer their ICICI card." />
            <HMWBullet mobile={m} num={3} text={`HMW — create a "one view" for all international transaction issues, so customer travel anxiety is addressed.`} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="cs-toggle">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHeading mobile={m}>Why this isn't just a toggle problem</SectionHeading>
          <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
            <BodyText mobile={m}>{`It's tempting to read "30% decline" and reach for the obvious fix: surface the toggle more prominently. That fix would help, but it doesn't touch the harder layer: RBI's framework requires separate switches for International Cash, POS, ATM, and E-commerce.`}</BodyText>
            <PhoneStrip
              mobile={m}
              images={[{ src: imgStrip2A, left: 120 }, { src: imgStrip2B, left: 313, height: 216 }]}
              labels={m
                ? [{ text: "All limits", left: 131 }, { text: "Entrypoint to iTravel", left: 16 }]
                : [{ text: "All limits", left: 313, top: 252 }, { text: "Entrypoint to iTravel", left: 120, top: 369 }]}
            />
            <BodyText mobile={m}>The real problem wasn't "the toggle is hidden." The bank had no way of knowing a customer was about to travel, until they accidentally revealed it by getting declined. iTravel's job was to close that information gap before the trip.</BodyText>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="cs-flow">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHeading mobile={m}>Getting users into the flow, before they ever need it</SectionHeading>
          <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
            <BodyText mobile={m}>Most ICICI cardholders barely open the iMobile app — bill payments happen through third-party apps like CRED, PhonePe, GPay. If iTravel only lived inside the app, it would only reach people already looking for it.</BodyText>
            <div className="cs-img" style={{ borderRadius: 8, overflow: "hidden" }}>
              <img src={imgFlowChart} alt="Multi-channel entry points" style={{ width: "100%", height: m ? "auto" : 389, objectFit: "cover", borderRadius: 8, display: "block" }} />
            </div>
            <SubHeading mobile={m}>Force modals for different user types</SubHeading>
            <PhoneStrip
              mobile={m}
              images={[{ src: imgModal1, left: 24 }, { src: imgModal2, left: 240 }, { src: imgModal3, left: 410 }]}
              labels={m
                ? [{ text: "User 1 — Has a credit card", left: 16 }, { text: "User 2 — No credit card", left: 131 }]
                : [{ text: "User 1 — Has a credit card", left: 24, top: 369 }, { text: "User 2 — No credit card", left: 240, bottom: 24 }]}
            />
            <BodyText mobile={m}>The interruption is earned by the entry point. This also reframed iTravel as a top-of-funnel acquisition feature — not only a friction fix for existing users.</BodyText>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="cs-trip">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHeading mobile={m}>Declaring the trip — the part that does the real work</SectionHeading>
          <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
            <SubHeading mobile={m}>Once inside the flow, the user declares:</SubHeading>
            <ul className="font-jakarta font-normal cs-bullets" style={{ fontSize: m ? 12 : 14, lineHeight: m ? "18px" : "20px", color: "#444", letterSpacing: m ? "0.12px" : "0.14px", paddingLeft: 18 }}>
              <li><strong>Destination(s)</strong> — single or multi-country, with layover and transit stops</li>
              <li><strong>Travel dates</strong> — start/end, with per-leg duration for multi-country trips</li>
            </ul>
            <PhoneStrip
              mobile={m}
              images={[{ src: imgSingleCountry, left: 24 }]}
              labels={m
                ? [{ text: "Single country, no layover", left: 16 }]
                : [{ text: "User 1 — Has a credit card", left: 24, top: 369 }]}
            />
            <PhoneStrip
              mobile={m}
              height={908}
              images={[{ src: imgDest1, left: 36, top: 53 }, { src: imgDest2, left: 216, top: 53 }, { src: imgMulti1, left: 36, top: 495 }]}
              labels={m
                ? [{ text: "Single country", left: 16 }, { text: "Multiple countries", left: 131 }]
                : [{ text: "Single country, no layover", left: 36, top: 24 }, { text: "Multiple countries / layover", left: 36, bottom: 429 }]}
            />
          </div>
        </div>
      </SectionBlock>
    </div>
  );
}

// ─── CS2 content (ICICI FASTag) ───────────────────────────────────────────────
function CS2Content({ isMobile }: { isMobile: boolean }) {
  const m = isMobile;
  return (
    <div className="cs-sections" style={{ display: "flex", flexDirection: "column" }}>
      <SectionBlock id="cs-intro">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHeading mobile={m}>INTRODUCTION</SectionHeading>
          <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
            <BodyText mobile={m}>
              FASTag is mandatory for all four-wheelers on Indian highways, and ICICI Bank commands nearly 29% of the national FASTag market. Before this project, every one of those customers relied solely on iMobile or a third-party app to manage their tag.
            </BodyText>
            <BodyText mobile={m}>
              I designed the entire FASTag experience for RIB from scratch. No brief. No precedent. Just iMobile's existing flows as reference, a fixed two-week deadline, and three distinct user types that needed to coexist on the same platform.
            </BodyText>

            <SectionHeading mobile={m}>It's 11pm on the highway, and the toll is ahead</SectionHeading>

            <BodyText mobile={m}>
              Think about Job 1 for a second — someone's checking their FASTag balance while driving toward a toll plaza. They're not relaxed, they're not browsing. They need an answer in a glance. Urgent, quick, no room for hunting.
            </BodyText>
            <SubHeading mobile={m}>
              That's exactly why the card works the way it does:
            </SubHeading>
            <ul className="font-jakarta font-normal cs-bullets" style={{ fontSize: m ? 12 : 14, lineHeight: m ? "18px" : "20px", color: "#444", letterSpacing: m ? "0.12px" : "0.14px", paddingLeft: 18 }}>
              <li><strong>Vehicle number and model</strong> — you can scan it in under two seconds, no reading needed</li>
              <li><strong>Balance</strong> — it's the biggest thing on the card, impossible to miss</li>
              <li><strong>Recharge</strong> — one tap, always there, always in the same spot no matter the card state</li>
              <li><strong>Everything else</strong> — tucked behind the three-dot menu or the detail page, out of the way until you actually need it</li>
            </ul>
            <BodyText mobile={m}>
              The secondary stuff (tag replacement, KYC, close tag, raise a query) — sure, it matters. But it's not why someone opens FASTag at 11pm on the highway. Keeping it secondary isn't a compromise. That's the whole point.
            </BodyText>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="cs-landing">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHeading mobile={m}>Landing page</SectionHeading>
          <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
            <BodyText mobile={m}>
              One landing page. Three user types. Multiple card states. Everything had to be readable at a glance — including for fleet owners managing 20+ FASTags simultaneously.
            </BodyText>
            <SubHeading mobile={m}>
              There are 3 user types:
            </SubHeading>
            <ul className="font-jakarta font-normal cs-bullets" style={{ fontSize: m ? 12 : 14, lineHeight: m ? "18px" : "20px", color: "#444", letterSpacing: m ? "0.12px" : "0.14px", paddingLeft: 18 }}>
              <li>New user</li>
              <li>Existing users (ICICI Bank and non-ICICI Bank)</li>
              <li>Fleet owners (ICICI Bank and non-ICICI Bank)</li>
            </ul>

            <SectionHeading mobile={m}>The TAB decision</SectionHeading>
            <BodyText mobile={m}>
              Early versions showed all FASTags in one mixed list — ICICI and non-ICICI together, sorted by recency. The problem: a just-linked third-party FASTag would float to the top, pushing the user's ICICI card down the scroll. Wrong for the user. Wrong for the bank.
            </BodyText>
            <BodyText mobile={m}>
              Splitting into two tabs — My FASTag and Other bank FASTag — solved both at once. ICICI cards always surface first. The tab structure tells the user what service level to expect before they open a single card.
            </BodyText>

            <div className="cs-img" style={{ height: m ? 200 : 264, backgroundColor: "#d19761", borderRadius: 8, overflow: "hidden" }}>
              <ThumbnailPlaceholder bgColor="#d19761" strokeColor="#212012" height={m ? 200 : 264} iconSize={32} />
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="cs-card">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHeading mobile={m}>FASTag card exploration</SectionHeading>
          <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
            <SubHeading mobile={m}>
              The problem
            </SubHeading>
            <BodyText mobile={m}>
              The card had to do five jobs: identify the vehicle, show balance, trigger recharge, flag errors, and indicate auto-recharge status. New edge cases kept arriving after the first drop — RC rejected, KYV pending, low balance, inactive — and each new state changed the layout.
            </BodyText>
            <BodyText mobile={m}>
              I went through multiple rounds before the card resolved.
            </BodyText>

            <IterationLabel mobile={m}>Iteration 1 — Started simple</IterationLabel>
            <div className="cs-img" style={{ height: m ? 200 : 264, backgroundColor: "#d19761", borderRadius: 8, overflow: "hidden" }}>
              <ThumbnailPlaceholder bgColor="#d19761" strokeColor="#212012" height={m ? 200 : 264} iconSize={32} />
            </div>
            <BodyText mobile={m}>
              This card was the gateway to everything — all details, services, history. Get it wrong and the whole page falls apart. The first drop focused on the essentials: vehicle number, model, balance, recharge, overflow menu. The client liked it, then added to it. Urgency signals, auto-recharge status, and other bank FASTag callouts all needed to live here too.
            </BodyText>

            <IterationLabel mobile={m}>Iteration 2 — Absorbed the feedback</IterationLabel>
            <div className="cs-img" style={{ height: m ? 200 : 264, backgroundColor: "#d19761", borderRadius: 8, overflow: "hidden" }}>
              <ThumbnailPlaceholder bgColor="#d19761" strokeColor="#212012" height={m ? 200 : 264} iconSize={32} />
            </div>
            <BodyText mobile={m}>
              It held for simple cases. Then an edge case surfaced: what if a user has low balance and a rejected RC simultaneously? Two unrelated error states, both needing attention, both fighting for the same space. They couldn't be merged — they were different problems requiring different actions. The card broke under the combination.
            </BodyText>

            <IterationLabel mobile={m}>Iteration 3 — Give errors room</IterationLabel>
            <BodyText mobile={m}>
              The fix was giving urgency signals their own space rather than forcing them into the card body. A few more variants, shown to the client, and this was approved, yayy!
            </BodyText>
            <div className="cs-img" style={{ height: m ? 200 : 264, backgroundColor: "#d19761", borderRadius: 8, overflow: "hidden" }}>
              <ThumbnailPlaceholder bgColor="#d19761" strokeColor="#212012" height={m ? 200 : 264} iconSize={32} />
            </div>
            <BodyText mobile={m}>
              The anchor across all states: vehicle number, balance, recharge — always visible, always in the same position.
            </BodyText>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="cs-details">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHeading mobile={m}>All FASTag details</SectionHeading>
          <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
            <SubHeading mobile={m}>Three card types, one layout</SubHeading>
            <BodyText mobile={m}>
              The detail page is structurally identical across all three FASTag types. What changes is the right column — the service set available to that specific tag.
            </BodyText>
            <BodyText mobile={m}>
              For an ICICI FASTag this is the full service suite: Recharge, Auto recharge, Tag replacement, Update RC, Know Your Vehicle, Close FASTag, Raise a query, View tag details.
            </BodyText>
            <BodyText mobile={m}>
              For a non-ICICI FASTag the right column reduces to three options: Recharge, Remove, and Buy ICICI FASTag.
            </BodyText>
            <ImageCarousel
              mobile={m}
              slides={[
                { src: imgFastagNonIcici, caption: "Non-ICICI Bank FASTag" },
                { src: imgFastagAutoOff, caption: "ICICI Bank FASTag — Auto-recharge off" },
                { src: imgFastagAutoOn, caption: "ICICI Bank FASTag — Auto-recharge on" },
              ]}
            />

            <SubHeading mobile={m}>All states</SubHeading>
            <BodyText mobile={m}>
              There have been various states and micro-interactions added to multiple sections of the landing. Scroll to view all the interactions.
            </BodyText>
            <ImageCarousel
              mobile={m}
              slides={[
                { caption: "Placeholder — state 1" },
                { caption: "Placeholder — state 2" },
                { caption: "Placeholder — state 3" },
              ]}
            />

            <SubHeading mobile={m}>Filter and email FASTag history</SubHeading>
            <BodyText mobile={m}>
              <strong>Filter history</strong> — Chips were added for easily filtering of the history. For customized dates, the user can filter by start and end date.
            </BodyText>
            <ImageCarousel
              mobile={m}
              slides={[
                { caption: "Placeholder — filter chips" },
                { caption: "Placeholder — custom date range" },
              ]}
            />
            <BodyText mobile={m}>
              <strong>Email statement</strong> — After the 1st drop, there was an additional requirement from the client that the user can only fetch the history for up to 90 days on the interface, and payments older than that would be emailed to their registered email ID.
            </BodyText>
            <ImageCarousel
              mobile={m}
              slides={[
                { caption: "Placeholder — email statement" },
              ]}
            />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="cs-recharge">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHeading mobile={m}>FASTag recharge</SectionHeading>
          <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
            <SubHeading mobile={m}>The problem with the first version</SubHeading>
            <BodyText mobile={m}>
              The mobile reference flows had three separate recharge experiences depending on where the user came from — ICICI FASTag, linked non-ICICI, and first-time non-linked. Some were modals, some full-page, each with different data points. The same action looked different every time and the client pushed for an experience of keeping them as is. It was unsustainable to maintain, and expensive to build.
            </BodyText>
            <div className="cs-img" style={{ height: m ? 200 : 264, backgroundColor: "#d19761", borderRadius: 8, overflow: "hidden" }}>
              <ThumbnailPlaceholder bgColor="#d19761" strokeColor="#212012" height={m ? 200 : 264} iconSize={32} />
            </div>

            <IterationLabel mobile={m}>The fix</IterationLabel>
            <BodyText mobile={m}>
              One standard recharge flow. Regardless of entry point — dashboard card, detail page, quick action panel — the user lands on the same experience with the same data points.
            </BodyText>
            <SubHeading mobile={m}>
              The vehicle type determines what's shown within that standard flow:
            </SubHeading>
            <ul className="font-jakarta font-normal cs-bullets" style={{ fontSize: m ? 12 : 14, lineHeight: m ? "18px" : "20px", color: "#444", letterSpacing: m ? "0.12px" : "0.14px", paddingLeft: 18 }}>
              <li><strong>For a linked vehicle</strong> — registration number pre-filled, balance visible, straight to amount.</li>
              <li><strong>For a non-linked vehicle (first time)</strong> — registration number entry required, then the same flow.</li>
            </ul>
            <BodyText mobile={m}>
              The entry point context is resolved before the user enters the flow. Inside the flow, it is always the same.
            </BodyText>
            <ImageCarousel
              mobile={m}
              slides={[
                { caption: "Placeholder — linked vehicle" },
                { caption: "Placeholder — non-linked vehicle" },
              ]}
            />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="cs-reflection">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHeading mobile={m}>Currently <em>in-development</em>, but what I took away...</SectionHeading>
          <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
            <BodyText mobile={m}>
              The requirements were half-baked and the timeline was too short for the volume. The biggest thing I learned: negotiate on scope or timeline upfront, not after you're already deep in it.
            </BodyText>
            <BodyText mobile={m}>
              Working solo on something this large taught me what I'm actually capable of under pressure. Every interaction, every click path — I was the only one deciding. That's a different kind of responsibility than working in a team, and I didn't fully appreciate it until I was in it.
            </BodyText>
            <BodyText mobile={m}>
              Redesigning an entire flow midway, defending the decision to stakeholders, and still handing off on time gave me a confidence I didn't have going in. This project showed me I can hold complexity and ship.
            </BodyText>
          </div>
        </div>
      </SectionBlock>
    </div>
  );
}

// ─── Placeholder content for CS3 ──────────────────────────────────────────────
function PlaceholderContent({ cs, isMobile }: { cs: CaseStudyInfo; isMobile: boolean }) {
  const m = isMobile;
  const s3ids = ["cs-problem", "cs-process", "cs-findings"];
  const ids = s3ids;
  const labels = ["Problem Statement", "Process", "Key Findings"];
  const placeholders = [{ h: 264, bg: "#ffffff" }, { h: 200, bg: cs.imageBg }, { h: 200, bg: cs.imageBg }];

  return (
    <div className="cs-sections" style={{ display: "flex", flexDirection: "column" }}>
      {ids.map((id, i) => (
        <SectionBlock key={id} id={id}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionHeading mobile={m}>{labels[i]}</SectionHeading>
            <div className="cs-flow" style={{ display: "flex", flexDirection: "column" }}>
              <BodyText mobile={m}>{cs.overview}</BodyText>
              <div className="cs-img" style={{ height: placeholders[i].h, backgroundColor: placeholders[i].bg, borderRadius: 8, overflow: "hidden" }}>
                <ThumbnailPlaceholder bgColor={placeholders[i].bg === "#ffffff" ? cs.imageBg : placeholders[i].bg} strokeColor={cs.textColor} height={placeholders[i].h} iconSize={32} />
              </div>
            </div>
          </div>
        </SectionBlock>
      ))}
    </div>
  );
}

// ─── Left panel audio button ──────────────────────────────────────────────────
function LeftPanelAudio({ color }: { color: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ paddingTop: 4 }}>
      <p className="font-jakarta font-normal" style={{ fontSize: 11, letterSpacing: "0.5px", color: "rgba(33,32,18,0.4)", textTransform: "uppercase", marginBottom: 8 }}>
        listen
      </p>
      <button
        onClick={() => setPlaying(!playing)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          backgroundColor: playing ? color : "rgba(33,32,18,0.06)",
          border: "none", borderRadius: 10, padding: "10px 14px",
          cursor: "pointer", transition: "background 0.2s", width: "100%",
        }}
      >
        <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: playing ? "rgba(255,255,255,0.3)" : color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {playing ? <Pause size={12} color="#212012" fill="#212012" /> : <Play size={12} color="#212012" fill="#212012" />}
        </div>
        <div style={{ textAlign: "left" }}>
          <p className="font-jakarta font-semibold" style={{ fontSize: 12, color: "#212012", lineHeight: "15px" }}>
            {playing ? "Playing..." : "Hear this case study"}
          </p>
          <p className="font-jakarta" style={{ fontSize: 10, color: "rgba(33,32,18,0.5)", marginTop: 1 }}>
            {playing ? "audio narrative" : "~8 min · audio narrative"}
          </p>
        </div>
      </button>
    </div>
  );
}

// ─── Main drawer component ────────────────────────────────────────────────────
interface Props {
  caseStudy: CaseStudyInfo | null;
  onClose: () => void;
  onNavigate: (cs: CaseStudyInfo) => void;
}

export function CaseStudyDetail({ caseStudy, onClose, onNavigate }: Props) {
  const isMobile = useIsMobile(768);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (!caseStudy) return;
    scrollableRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setScrolled(false);
    setActiveSection("");
  }, [caseStudy?.index]);

  useEffect(() => {
    const el = scrollableRef.current;
    if (!el) return;
    const handle = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", handle, { passive: true });
    return () => el.removeEventListener("scroll", handle);
  }, [caseStudy]);

  // Esc closes the drawer the same way the close icon does.
  useEffect(() => {
    if (!caseStudy) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [caseStudy, onClose]);

  useEffect(() => {
    const el = scrollableRef.current;
    if (!el || !caseStudy) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { root: el, rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    const nodes = el.querySelectorAll("[data-section]");
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, [caseStudy]);

  const scrollToSection = useCallback((id: string) => {
    scrollableRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const sections = caseStudy ? (SECTIONS_BY_CS[caseStudy.index] ?? []) : [];
  const related = CASE_STUDY_DATA.filter((cs) => cs.index !== caseStudy?.index);
  const headerH = scrolled ? 68 : 112;

  return (
    <AnimatePresence>
      {caseStudy && (
        <>
          {/* Scrim */}
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 499, backgroundColor: "rgba(33,32,18,0.6)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: isMobile ? "100%" : 880 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? "100%" : 880 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", right: 0, top: 0, bottom: 0,
              width: isMobile ? "100%" : 880,
              zIndex: 500,
              borderRadius: isMobile ? 0 : "24px 0 0 24px",
              backgroundColor: "#e3d9ce",
              overflow: "hidden",
            }}
          >
            {/* Close button — desktop only (mobile has it in the sticky header) */}
            {!isMobile && (
              <button
                onClick={onClose}
                style={{
                  position: "absolute", top: 20, right: 20, zIndex: 20,
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid rgba(98,94,55,0.2)",
                  backgroundColor: "rgba(227,217,206,0.85)",
                  backdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#212012",
                }}
              >
                <X size={16} />
              </button>
            )}

            {/* Scrollable inner */}
            <div ref={scrollableRef} style={{ height: "100%", overflowY: "auto", scrollbarWidth: "none" }}>
              <style>{CS_SPACING_CSS}</style>

              {/* ── MOBILE LAYOUT ── */}
              {isMobile ? (
                <div style={{ display: "flex", flexDirection: "column", paddingBottom: 80 }}>

                  {/* Sticky mobile header: title + X */}
                  <div style={{
                    position: "sticky", top: 0, zIndex: 10,
                    backgroundColor: "#e3d9ce",
                    padding: "16px 16px 12px",
                    borderBottom: scrolled ? "1px solid rgba(33,32,18,0.1)" : "1px solid transparent",
                    transition: "border-color 0.3s ease",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <p className="font-caslon not-italic" style={{
                        flex: 1, fontSize: 16, lineHeight: "normal", color: "#212012", fontWeight: 600,
                      }}>
                        {caseStudy.title}
                      </p>
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
                    </div>
                    {/* Label pill */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <div style={{ backgroundColor: caseStudy.color, padding: "3px 10px", borderRadius: 100, display: "inline-flex" }}>
                        <p className="font-jakarta font-semibold" style={{ fontSize: 9, color: caseStudy.textColor, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                          {caseStudy.label}
                        </p>
                      </div>
                      <p className="font-jakarta font-medium" style={{ fontSize: 10, color: "#c67d39", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                        {caseStudy.type}
                      </p>
                    </div>
                  </div>

                  {/* Hero image: white, 264px */}
                  <div style={{ height: 264, backgroundColor: "#ffffff", overflow: "hidden", flexShrink: 0 }}>
                    <ThumbnailPlaceholder bgColor={caseStudy.imageBg} strokeColor={caseStudy.textColor} height={264} iconSize={40} />
                  </div>

                  {/* Meta table + content */}
                  <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 20 }}>
                    <MobileMetaTable cs={caseStudy} />

                    {/* Content */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                      {caseStudy.index === 0
                        ? <CS1Content isMobile={true} />
                        : caseStudy.index === 1
                        ? <CS2Content isMobile={true} />
                        : <PlaceholderContent cs={caseStudy} isMobile={true} />
                      }
                    </div>

                    {/* Media strip — dark card */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      style={{ backgroundColor: "#212012", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}
                    >
                      {/* Audio player full-width on mobile */}
                      <AudioPlayer color={caseStudy.color} />
                    </motion.div>

                    {/* Related case studies — vertical stack on mobile */}
                    <div style={{ marginTop: 8 }}>
                      <p className="font-jakarta font-medium" style={{ fontSize: 10, letterSpacing: "0.5px", color: "rgba(33,32,18,0.4)", textTransform: "uppercase", marginBottom: 12 }}>
                        Read more
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {related.map((cs) => (
                          <RelatedCard key={cs.index} cs={cs} onClick={() => onNavigate(cs)} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ── DESKTOP LAYOUT ── */
                <>
                  <style>{`.cs-drawer::-webkit-scrollbar{display:none}`}</style>

                  {/* Sticky shrinking header */}
                  <div
                    style={{
                      position: "sticky", top: 0, zIndex: 10,
                      backgroundColor: "#e3d9ce",
                      padding: scrolled ? "14px 52px 12px 36px" : "36px 52px 20px 36px",
                      borderBottom: `1px solid ${scrolled ? "rgba(98,94,55,0.12)" : "transparent"}`,
                      transition: "padding 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: scrolled ? 4 : 10 }}>
                      <div style={{ backgroundColor: caseStudy.color, padding: "4px 12px", borderRadius: 100, display: "inline-flex" }}>
                        <p className="font-jakarta font-semibold" style={{ fontSize: 10, color: caseStudy.textColor, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                          {caseStudy.label}
                        </p>
                      </div>
                      <p className="font-jakarta font-medium" style={{ fontSize: 11, color: "#c67d39", letterSpacing: "0.48px", textTransform: "uppercase" }}>
                        {caseStudy.type}
                      </p>
                    </div>
                    <motion.p
                      className="font-caslon not-italic"
                      animate={{ fontSize: scrolled ? "16px" : "24px", lineHeight: scrolled ? "22px" : "30px" }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ color: "#212012", fontWeight: 600, paddingRight: 48, maxWidth: 720 }}
                    >
                      {caseStudy.title}
                    </motion.p>
                  </div>

                  {/* Two column body */}
                  <div style={{ display: "flex", gap: 24, padding: "40px 36px 0", position: "relative" }}>

                    {/* Left column */}
                    <div
                      style={{
                        width: 200, flexShrink: 0,
                        position: "sticky", top: headerH, alignSelf: "flex-start",
                        display: "flex", flexDirection: "column", justifyContent: "space-between",
                        height: `calc(100vh - ${headerH + 40}px)`,
                        paddingBottom: 24,
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <MetaField label="Client:" value={caseStudy.client} />
                        <MetaField label="Team" value={caseStudy.designTeam} />
                        <MetaField label="Role:" value={caseStudy.role} />
                        <MetaField label="Team:" value={caseStudy.crossTeam} />
                        <MetaField label="Timeline:" value={caseStudy.timeline} />
                        <MetaField label="Status:" value={caseStudy.statusFull} />
                        <LeftPanelAudio color={caseStudy.color} />
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <p className="font-jakarta font-normal" style={{ fontSize: 11, letterSpacing: "0.5px", color: "rgba(33,32,18,0.4)", textTransform: "uppercase", marginBottom: 4 }}>
                          index
                        </p>
                        {sections.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => scrollToSection(s.id)}
                            style={{ background: "none", border: "none", padding: "2px 0", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 8 }}
                          >
                            <motion.div
                              animate={{ width: activeSection === s.id ? 3 : 0, opacity: activeSection === s.id ? 1 : 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ height: 14, backgroundColor: caseStudy.color, borderRadius: 2, flexShrink: 0, overflow: "hidden" }}
                            />
                            <p
                              className="font-jakarta font-normal"
                              style={{ fontSize: 12, letterSpacing: "0.12px", color: activeSection === s.id ? "#212012" : "rgba(33,32,18,0.4)", transition: "color 0.2s ease" }}
                            >
                              {s.label}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right column */}
                    <div style={{ width: 584, flexShrink: 0 }}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ height: 264, backgroundColor: "#ffffff", borderRadius: 8, marginBottom: 32, overflow: "hidden" }}
                      >
                        <ThumbnailPlaceholder bgColor={caseStudy.imageBg} strokeColor={caseStudy.textColor} height={264} iconSize={48} />
                      </motion.div>

                      {caseStudy.index === 0
                        ? <CS1Content isMobile={false} />
                        : caseStudy.index === 1
                        ? <CS2Content isMobile={false} />
                        : <PlaceholderContent cs={caseStudy} isMobile={false} />
                      }

                      <motion.div
                        id="cs-media"
                        data-section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true, margin: "-5%" }}
                        style={{ marginTop: 48, marginBottom: 8, backgroundColor: "#212012", borderRadius: 16, padding: 24, display: "flex", gap: 20, alignItems: "center", scrollMarginTop: 88 }}
                      >
                        <VideoFrame cs={caseStudy} />
                        <AudioPlayer color={caseStudy.color} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom: related */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    style={{ padding: "48px 36px 60px", paddingLeft: 260 }}
                  >
                    <p className="font-jakarta font-medium" style={{ fontSize: 11, letterSpacing: "0.5px", color: "rgba(33,32,18,0.4)", textTransform: "uppercase", marginBottom: 16 }}>
                      Read more
                    </p>
                    <div style={{ display: "flex", gap: 16 }}>
                      {related.map((cs) => (
                        <RelatedCard key={cs.index} cs={cs} onClick={() => onNavigate(cs)} />
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
