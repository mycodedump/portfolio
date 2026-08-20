import { useState } from "react";
import { motion } from "motion/react";
import { AI_PROJECTS, isOpenableAiProject, type AiProject } from "../data/aiProjects";
import { AiProjectDrawer } from "./AiProjectDrawer";

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: AiProject;
  index: number;
  onClick?: () => void;
}) {
  const clickable = Boolean(onClick);

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={clickable ? { backgroundColor: "rgba(227,217,206,0.1)", scale: 1.005 } : undefined}
      style={{
        borderRadius: 12,
        padding: "24px",
        cursor: clickable ? "pointer" : "default",
        border: "1px solid rgba(227,217,206,0.08)",
        opacity: clickable ? 1 : 0.6,
        transition: "background 0.15s, border 0.15s",
      }}
      onMouseEnter={(e) => {
        if (clickable) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(227,217,206,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(227,217,206,0.08)";
      }}
    >
      {/* Image placeholder */}
      <div
        style={{
          height: 200,
          backgroundColor: "rgba(227,217,206,0.07)",
          borderRadius: 8,
          marginBottom: 20,
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(227,217,206,0.06)",
        }}
      >
        <svg
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.15,
          }}
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="#e3d9ce"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="#e3d9ce"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="#e3d9ce"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
          }}
        >
          <span
            className="font-inclusive-sans font-medium"
            style={{
              fontSize: 11,
              color: project.accent,
              backgroundColor: `${project.accent}18`,
              padding: "3px 8px",
              borderRadius: 20,
              letterSpacing: "0.4px",
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-inclusive-sans"
            style={{
              fontSize: 11,
              color: "rgba(227,217,206,0.5)",
              backgroundColor: "rgba(227,217,206,0.06)",
              padding: "2px 8px",
              borderRadius: 20,
              letterSpacing: "0.3px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <p
        className="font-caslon not-italic"
        style={{
          fontSize: 22,
          lineHeight: "28px",
          color: "#e3d9ce",
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {project.title}
      </p>
      <p
        className="font-inclusive-sans"
        style={{ fontSize: 14, lineHeight: "20px", color: "rgba(227,217,206,0.6)" }}
      >
        {project.description}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16 }}>
        <p
          className="font-caslon"
          style={{ fontSize: 13, color: "rgba(227,217,206,0.5)", fontStyle: "italic" }}
        >
          {clickable ? (project.kind === "extension" ? "view details" : "open live") : "coming soon"}
        </p>
        {clickable && (
          <p
            className="font-caslon"
            style={{ fontSize: 14, color: "rgba(227,217,206,0.5)", lineHeight: 1 }}
          >
            →
          </p>
        )}
      </div>
    </motion.div>
  );
}

interface AiProjectsPageProps {
  onBack: () => void;
}

export function AiProjectsPage({ onBack }: AiProjectsPageProps) {
  const [selectedProject, setSelectedProject] = useState<AiProject | null>(null);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#212012",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>

      <AiProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Top nav */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "rgba(33,32,18,0.9)",
          backdropFilter: "blur(12px)",
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(227,217,206,0.06)",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "1px solid rgba(227,217,206,0.15)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 8,
            transition: "border 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(227,217,206,0.05)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(227,217,206,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(227,217,206,0.15)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="#e3d9ce" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-inclusive-sans" style={{ fontSize: 13, color: "#e3d9ce" }}>
            back to portfolio
          </p>
        </button>

        <p
          className="font-caslon not-italic"
          style={{ fontSize: 18, color: "#e3d9ce", fontWeight: 600, opacity: 0.85 }}
        >
          Laxmi Mahajan
        </p>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: "64px 48px 48px", maxWidth: 900 }}
      >
        <p
          className="font-inclusive-sans font-medium uppercase"
          style={{ fontSize: 12, letterSpacing: "0.48px", color: "#c3be6f", marginBottom: 16 }}
        >
          AI Experiments
        </p>
        <p
          className="font-caslon not-italic"
          style={{ fontSize: 48, lineHeight: "56px", color: "#e3d9ce", fontWeight: 600, marginBottom: 16 }}
        >
          sometimes i tinker with ai
        </p>
        <p
          className="font-inclusive-sans"
          style={{ fontSize: 18, lineHeight: "28px", color: "rgba(227,217,206,0.6)", maxWidth: 560 }}
        >
          these are all the things i build out of sheer curiosity and cope with anxiety — mostly tools that scratch my own itches as a designer
        </p>
      </motion.div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          backgroundColor: "rgba(227,217,206,0.08)",
          margin: "0 48px 48px",
        }}
      />

      {/* Projects grid */}
      <div
        style={{
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          maxWidth: 1200,
        }}
      >
        {AI_PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onClick={isOpenableAiProject(project) ? () => setSelectedProject(project) : undefined}
          />
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="font-inclusive-sans"
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "rgba(227,217,206,0.25)",
          marginTop: 64,
          padding: "0 48px",
        }}
      >
        more experiments living in private repos and Notion — ask me about them
      </motion.p>
    </div>
  );
}
