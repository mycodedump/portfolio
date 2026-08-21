import { motion } from "motion/react";
import type { CSSProperties } from "react";

// A tilted, taped-down photo snapshot — the recurring "scrapbook diary" motif
// used in the hero and the about drawer to make the site feel personal rather
// than templated. Straightens and lifts slightly on hover.

interface PolaroidProps {
  src: string;
  caption?: string;
  rotate?: number;
  width?: number;
  tapeColor?: string;
  tapeRotate?: number;
  style?: CSSProperties;
  className?: string;
}

export function Polaroid({
  src, caption, rotate = -4, width = 140, tapeColor = "rgba(255,255,255,0.65)", tapeRotate = -8, style, className,
}: PolaroidProps) {
  return (
    <motion.div
      className={className}
      initial={{ rotate }}
      whileHover={{ rotate: 0, scale: 1.06, y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width,
        backgroundColor: "#fdfbf7",
        padding: "6px 6px 10px",
        borderRadius: 3,
        boxShadow: "0 10px 24px rgba(33,32,18,0.22), 0 2px 6px rgba(33,32,18,0.12)",
        position: "relative",
        cursor: "default",
        ...style,
      }}
    >
      {/* washi tape */}
      <div
        style={{
          position: "absolute", top: -9, left: "50%",
          transform: `translateX(-50%) rotate(${tapeRotate}deg)`,
          width: width * 0.34, height: 15,
          backgroundColor: tapeColor,
          boxShadow: "0 1px 3px rgba(33,32,18,0.15)",
        }}
      />
      <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: 1, backgroundColor: "#e3d9ce" }}>
        <img src={src} alt={caption ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      {caption && (
        <p className="font-caslon not-italic" style={{ fontSize: Math.max(9, width * 0.075), fontStyle: "italic", textAlign: "center", marginTop: 6, color: "#453f24", opacity: 0.75, lineHeight: 1.2 }}>
          {caption}
        </p>
      )}
    </motion.div>
  );
}
