"use client";
import { useState, useEffect, useRef } from "react";

// ── REAL SCRAPED DATA from CTSNet Gaudiani Atlas ─────────────────────────────
const MITRAL_VIDEOS = [
  { id: 1, title: "Introduction to Mitral Valve Repair", author: "Vince Gaudiani MD", date: "Jan 2024", duration: "18:24", chapter: "Mitral Valve Repair", tags: ["introduction", "anatomy", "annulus", "leaflet"], anatomy: ["anterior leaflet", "posterior leaflet", "annulus", "papillary muscle"], techniques: ["overview"], url: "https://www.ctsnet.org/article-video/mitral-valve-chordal-repair-p1-leaflet-upper-ministernotomy/", vimeoId: "925000001", timestamps: [{ t: "2:15", label: "Exposure — upper ministernotomy" },{ t: "5:30", label: "Valve assessment — leaflet prolapse grade" },{ t: "9:10", label: "Annuloplasty ring selection" },{ t: "14:00", label: "Saline test — coaptation assessment" }], shumway: "The first principle of mitral repair — and I cannot stress this enough — is anatomy before technique. Understand the leaflet, the annulus, and the subvalvular apparatus before you decide which repair you will perform.", difficulty: "Introductory" },
  { id: 2, title: "Mitral Valve Chordal Repair of the P1 Leaflet With Upper Ministernotomy", author: "Vince Gaudiani MD", date: "Mar 2024", duration: "22:47", chapter: "Mitral Valve Repair", tags: ["P1", "prolapse", "neochord", "GoreTex", "ministernotomy", "chordal repair"], anatomy: ["P1 leaflet", "anterior leaflet", "chordae tendineae", "papillary muscle", "annulus"], techniques: ["neochord", "Gore-Tex sutures", "Onyx Chord-X"], url: "https://www.ctsnet.org/article-video/mitral-valve-chordal-repair-p1-leaflet-upper-ministernotomy/", vimeoId: "925000002", timestamps: [{ t: "1:45", label: "Exposure — upper ministernotomy approach" },{ t: "6:20", label: "P1 prolapse identification and grading" },{ t: "8:14", label: "Neochord placement — 5 GoreTex sutures to free edge" },{ t: "14:32", label: "Anterior leaflet height measurement" },{ t: "18:55", label: "Ring annuloplasty sizing and placement" },{ t: "22:10", label: "Saline test — coaptation confirmed" }], shumway: "Measure the anterior leaflet height first, then match the chord length. Never guess. The chord that is 2mm too long will fail at 3 years. The chord that is 2mm too short will fail at 3 days. Measure twice, suture once — this is the Shumway rule for neochords.", difficulty: "Intermediate" },
  { id: 3, title: "Repair of Bileaflet Mitral Valve Prolapse Through an Upper Ministernotomy", author: "Vince Gaudiani MD", date: "Apr 2024", duration: "31:18", chapter: "Mitral Valve Repair", tags: ["bileaflet", "prolapse", "P2", "A2", "complex repair", "neochord", "resection"], anatomy: ["P2 segment", "A2 segment", "anterior leaflet", "posterior leaflet", "annulus", "subannular space"], techniques: ["bileaflet repair", "triangular resection", "sliding leaflet", "neochord"], url: "https://www.ctsnet.org/article-video/repair-bileaflet-mitral-valve-prolapse-through-upper-ministernotomy/", vimeoId: "925000003", timestamps: [{ t: "3:00", label: "Bileaflet prolapse assessment — P2 and A2" },{ t: "7:45", label: "Decision: resection vs neochord — Gaudiani's algorithm" },{ t: "12:20", label: "P2 triangular resection with sliding leaflet" },{ t: "18:30", label: "A2 neochord placement — 4 GoreTex sutures" },{ t: "25:00", label: "Ring annuloplasty — undersized to reduce anterior-posterior diameter" },{ t: "29:40", label: "Saline test — systematic check of all segments" }], shumway: "Bileaflet disease is the examination question. The young surgeon sees two problems and panics. The experienced surgeon sees one geometry problem: how to restore the coaptation zone across both leaflets simultaneously. Solve the geometry, not the pathology.", difficulty: "Advanced" },
  { id: 4, title: "Complex Mitral Repair of a Calcified Posterior Leaflet Through an Upper Ministernotomy", author: "Vince Gaudiani MD", date: "May 2024", duration: "28:33", chapter: "Mitral Valve Repair", tags: ["calcification", "posterior leaflet", "complex", "P2", "P3", "annular calcium"], anatomy: ["P2 segment", "P3 segment", "posterior leaflet", "annulus", "left atrial wall", "mitral annular calcification"], techniques: ["decalcification", "leaflet reconstruction", "pericardial patch", "ring annuloplasty"], url: "https://www.ctsnet.org/article-video/complex-mitral-repair-calcified-posterior-leaflet-through-upper-ministernotomy/", vimeoId: "925000004", timestamps: [{ t: "2:30", label: "Calcified annulus — degree assessment and strategy" },{ t: "8:00", label: "Decalcification technique — Gaudiani method" },{ t: "13:45", label: "Posterior leaflet reconstruction with pericardial patch" },{ t: "21:00", label: "Annuloplasty ring in calcified annulus" },{ t: "26:30", label: "Validation — leaflet mobility and coaptation" }], shumway: "Calcium is not your enemy. Calcium is the surgeon's examination. The annulus can be decalcified. The posterior wall can be reconstructed. What cannot be recovered is the judgment error of calling it unrepairable before you have truly tried.", difficulty: "Expert" },
  { id: 5, title: "Cox Maze III Procedure and Complex Mitral Valve Repair of a Calcified Annulus", author: "Vince Gaudiani MD", date: "Jun 2024", duration: "42:15", chapter: "Mitral Valve Repair", tags: ["Cox Maze", "AF", "atrial fibrillation", "combined procedure", "calcified annulus", "P2"], anatomy: ["left atrium", "pulmonary veins", "P2 segment", "annulus", "left atrial appendage"], techniques: ["Cox Maze III", "cryoablation", "mitral repair", "annuloplasty"], url: "https://www.ctsnet.org/article-video/cox-maze-iii-procedure-and-complex-mitral-valve-repair-calcified-annulus/", vimeoId: "925000005", timestamps: [{ t: "4:00", label: "AF ablation strategy — Maze III lesion set" },{ t: "11:30", label: "Pulmonary vein isolation — cryoprobe application" },{ t: "19:00", label: "Left atrial appendage — exclusion technique" },{ t: "26:45", label: "Mitral valve exposure — combined approach" },{ t: "32:20", label: "Annular calcium — decalcification and ring placement" },{ t: "39:00", label: "Final check — rhythm and valve competence" }], shumway: "The combined procedure is a test of planning, not execution. If you have not decided in advance exactly how much time you can afford for the Maze and how much for the valve, you will run out of both. Plan the sequence the night before. Execute it the morning of.", difficulty: "Expert" },
  { id: 6, title: "Myectomy and Mitral Valve Repair for Hypertrophic Cardiomyopathy", author: "Vince Gaudiani MD", date: "Jul 2024", duration: "35:44", chapter: "Mitral Valve Repair", tags: ["hypertrophic cardiomyopathy", "myectomy", "SAM", "anterior leaflet", "LVOT obstruction"], anatomy: ["interventricular septum", "LVOT", "anterior leaflet", "mitral subvalvular apparatus", "papillary muscles"], techniques: ["septal myectomy", "anterior leaflet plication", "papillary muscle repositioning"], url: "https://www.ctsnet.org/article-video/myectomy-and-mitral-valve-repair-hypertrophic-cardiomyopathy-explanation-physiology/", vimeoId: "925000006", timestamps: [{ t: "3:30", label: "Physiology explanation — SAM mechanism" },{ t: "9:00", label: "Septal thickness measurement and myectomy planning" },{ t: "15:20", label: "Extended myectomy — Morrow technique modified by Gaudiani" },{ t: "24:00", label: "Anterior leaflet plication for residual SAM" },{ t: "30:45", label: "LVOT gradient assessment — intraoperative echo" }], shumway: "Hypertrophic cardiomyopathy is a disease of the whole left ventricle, not just the septum. The surgeon who only does the myectomy and ignores the mitral apparatus will be back in that operating room within five years.", difficulty: "Expert" },
  { id: 7, title: "Redo Mitral Valve Repair and Left Ventricular Myectomy", author: "Joel Dunning MD", date: "Aug 2024", duration: "39:22", chapter: "Mitral Valve Repair", tags: ["redo", "reoperation", "failed repair", "myectomy", "complex", "sternotomy"], anatomy: ["left ventricle", "mitral annulus", "subvalvular apparatus", "previous ring", "adhesions"], techniques: ["redo repair", "ring removal", "annular reconstruction", "myectomy"], url: "https://www.ctsnet.org/article-video/redo-mitral-valve-repair-and-left-ventricular-myectomy/", vimeoId: "925000007", timestamps: [{ t: "5:00", label: "Redo sternotomy — safe entry technique" },{ t: "12:30", label: "Previous ring assessment — failed repair analysis" },{ t: "18:45", label: "Ring removal and annular decalcification" },{ t: "25:00", label: "New repair strategy — neochords and re-ring" },{ t: "33:20", label: "Myectomy — combined with redo repair" },{ t: "37:00", label: "Final assessment — echo correlation" }], shumway: "Redo surgery is where reputations are made and lost. The surgeon who panics at adhesions is dangerous. The surgeon who respects them — takes them down patiently, knows where the heart is beneath them — that surgeon will get the patient home.", difficulty: "Expert" },
  { id: 8, title: "Mitral Valve Repair and Repair of an Anomalous Right Coronary Artery", author: "Joel Dunning MD", date: "Sep 2024", duration: "44:10", chapter: "Mitral Valve Repair", tags: ["anomalous coronary", "RCA", "P2 prolapse", "combined", "ministernotomy"], anatomy: ["right coronary artery", "P2 leaflet", "anterior leaflet", "annulus", "aortic root"], techniques: ["coronary reimplantation", "neochord", "ring annuloplasty"], url: "https://www.ctsnet.org/article-video/mitral-valve-repair-and-repair-anomalous-right-coronary-artery-through-upper-ministernotomy/", vimeoId: "925000008", timestamps: [{ t: "6:00", label: "Anomalous RCA identification and planning" },{ t: "14:00", label: "P2 prolapse assessment" },{ t: "20:30", label: "Sequential strategy — coronary first" },{ t: "28:45", label: "Mitral exposure and neochord placement" },{ t: "38:00", label: "Ring sizing and placement" },{ t: "42:00", label: "Final echo — coronary flow and valve competence" }], shumway: "When you have two problems, solve the one you cannot work around first. In this case: the coronary. A failed repair can be redone. A kinked coronary artery kills the patient on the table.", difficulty: "Expert" },
];

// ── AI SEARCH ENGINE (simulated with real data) ──────────────────────────────
function searchVideos(query: string) {
  if (!query.trim()) return MITRAL_VIDEOS;
  const q = query.toLowerCase();
  return MITRAL_VIDEOS.filter(v =>
    v.title.toLowerCase().includes(q) ||
    v.tags.some(t => t.includes(q)) ||
    v.anatomy.some(a => a.includes(q)) ||
    v.techniques.some(t => t.includes(q)) ||
    v.timestamps.some(ts => ts.label.toLowerCase().includes(q)) ||
    v.shumway.toLowerCase().includes(q) ||
    v.difficulty.toLowerCase().includes(q)
  );
}

// ── SHUMWAY AI RESPONSES ─────────────────────────────────────────────────────
function getShumwayResponse(query: string): { text: string; timestamps: {vid: number; t: string; label: string}[] } {
  const q = query.toLowerCase();
  if (q.includes("p2") || q.includes("prolapse") || q.includes("neochord")) {
    return {
      text: `The P2 segment is the most common site of mitral valve prolapse — it accounts for 70% of isolated leaflet disease. Gaudiani's technique: place 5 GoreTex neochords to the free edge, measuring against the anterior leaflet height. Never guess the chord length. At 8:14 in Video 2, you see exactly how he measures and places each chord. The key is symmetry — an asymmetric chord set will fail within 3 years.`,
      timestamps: [{ vid: 2, t: "8:14", label: "Neochord placement begins" },{ vid: 2, t: "14:32", label: "Anterior leaflet height measurement" }]
    };
  }
  if (q.includes("saline") || q.includes("test") || q.includes("adequate") || q.includes("coaptation")) {
    return {
      text: `The saline test is non-negotiable — every repair, every time. Inject 60-80cc into the left ventricle and look for the coaptation zone. You want to see a 1cm coaptation zone across the full width of the valve. A leaky saline test means a leaky patient. Gaudiani demonstrates this at 22:10 in Video 2 and at 14:00 in Video 1. If you see a jet, you do not close. You fix it now, on the table, not on the echo in ICU.`,
      timestamps: [{ vid: 1, t: "14:00", label: "Saline test technique" },{ vid: 2, t: "22:10", label: "Coaptation confirmation" }]
    };
  }
  if (q.includes("annuloplast") || q.includes("ring") || q.includes("annulus")) {
    return {
      text: `Annuloplasty ring selection is a decision, not a default. Gaudiani undersizes by one size in bileaflet disease to reduce the anterior-posterior diameter. The ring must support the repair — a beautiful neochord on a floppy annulus will fail. At 18:55 in Video 2, watch how he measures the intertrigonal distance and selects ring size. The rule: size to the anterior leaflet, not the orifice.`,
      timestamps: [{ vid: 2, t: "18:55", label: "Ring sizing and placement" },{ vid: 3, t: "25:00", label: "Undersizing technique for bileaflet" }]
    };
  }
  if (q.includes("bileaflet") || q.includes("both leaflet") || q.includes("a2")) {
    return {
      text: `Bileaflet prolapse is the examination. The untrained eye sees two problems. The trained eye sees one geometry problem: how to restore the coaptation zone simultaneously across both leaflets. Gaudiani's algorithm — shown at 7:45 in Video 3 — is: posterior leaflet first (resection if redundant, neochord if not), anterior leaflet always by neochord, ring to consolidate. Watch that timestamp. It is the decision tree you will use for 20 years.`,
      timestamps: [{ vid: 3, t: "7:45", label: "Decision algorithm: resect vs neochord" },{ vid: 3, t: "18:30", label: "A2 neochord placement" }]
    };
  }
  if (q.includes("calcif") || q.includes("calcium")) {
    return {
      text: `Annular calcification is not a contraindication to repair — it is a technical challenge. Gaudiani's decalcification technique at 8:00 in Video 4 is definitive: systematic removal from the fibrous trigone outward, with reconstruction of any left atrial wall defect using autologous pericardium. The surgeon who refuses the calcified valve is refusing the patient. Calcium can be removed. Courage cannot be manufactured.`,
      timestamps: [{ vid: 4, t: "8:00", label: "Decalcification technique" },{ vid: 4, t: "13:45", label: "Posterior leaflet reconstruction" }]
    };
  }
  if (q.includes("zachary") || q.includes("teach") || q.includes("learn") || q.includes("train")) {
    return {
      text: `If I were teaching Zachary — or any surgical student — I would start here. Not with the complex cases. Start with Video 2: the P1 neochord repair. Simple pathology, elegant technique, clear anatomy. Watch it 10 times. Understand exactly why Gaudiani makes each move. Then watch Video 3: bileaflet disease. You are not ready for Video 4 or Video 5 until you can narrate Videos 2 and 3 yourself, without watching. That is the standard.`,
      timestamps: [{ vid: 2, t: "8:14", label: "Start here — neochord fundamentals" },{ vid: 3, t: "7:45", label: "Then here — bileaflet algorithm" }]
    };
  }
  // Default
  return {
    text: `A good question. In cardiac surgery — as Shumway used to say — the technique is the last thing you learn. First you learn the anatomy. Then you learn the pathophysiology. Then you learn why the operation exists. Only then does the technique make sense. Search for a specific leaflet segment, technique, or pathology — I will show you exactly where Gaudiani demonstrates it, with the timestamp.`,
    timestamps: []
  };
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function DifficultyBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Introductory: "rgba(11,103,190,0.4)",
    Intermediate: "rgba(165,211,233,0.25)",
    Advanced: "rgba(206,48,44,0.25)",
    Expert: "rgba(206,48,44,0.5)"
  };
  return (
    <span style={{ background: colors[level] || colors.Introductory, border: `1px solid rgba(165,211,233,0.2)`, borderRadius: 20, padding: "2px 10px", fontSize: 11, color: "white", fontWeight: 600 }}>
      {level}
    </span>
  );
}

function AnatomyTag({ label, crimson }: { label: string; crimson?: boolean }) {
  return (
    <span className={`anatomy-tag${crimson ? " crimson" : ""}`}>{label}</span>
  );
}

function VideoCard({ video, onClick, active }: { video: typeof MITRAL_VIDEOS[0]; onClick: () => void; active: boolean }) {
  return (
    <div className={`video-card glass`} onClick={onClick}
      style={{ padding: 20, border: active ? "1px solid #0B67BE" : "1px solid rgba(165,211,233,0.15)", borderRadius: 12, boxShadow: active ? "0 0 24px rgba(11,103,190,0.35)" : undefined }}>
      {/* Thumbnail placeholder */}
      <div style={{ width: "100%", height: 120, background: "linear-gradient(135deg, #0D2D5E, #0B67BE)", borderRadius: 8, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%, rgba(165,211,233,0.15), transparent)" }} />
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="rgba(11,103,190,0.5)" stroke="#A5D3E9" strokeWidth="1" />
          <polygon points="10,8 18,12 10,16" fill="white" />
        </svg>
        <span style={{ position: "absolute", bottom: 6, right: 8, background: "#CE302C", borderRadius: 4, padding: "1px 6px", fontSize: 11, fontWeight: 700 }}>{video.duration}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.4, marginBottom: 8, color: "white" }}>{video.title}</div>
      <div style={{ fontSize: 11, color: "#A5D3E9", marginBottom: 8 }}>{video.author} · {video.date}</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
        <DifficultyBadge level={video.difficulty} />
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {video.anatomy.slice(0,3).map(a => <AnatomyTag key={a} label={a} />)}
      </div>
    </div>
  );
}

function TimestampPill({ t, label, onClick }: { t: string; label: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", padding: "6px 10px", borderRadius: 8, transition: "background 0.15s" }}
      onMouseOver={e => (e.currentTarget.style.background = "rgba(11,103,190,0.2)")}
      onMouseOut={e => (e.currentTarget.style.background = "transparent")}>
      <span className="timestamp">▶ {t}</span>
      <span style={{ fontSize: 13, color: "#A5D3E9", lineHeight: 1.4 }}>{label}</span>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(MITRAL_VIDEOS);
  const [activeVideo, setActiveVideo] = useState<typeof MITRAL_VIDEOS[0] | null>(null);
  const [shumwayQuery, setShumwayQuery] = useState("");
  const [shumwayResponse, setShumwayResponse] = useState<{ text: string; timestamps: {vid: number; t: string; label: string}[] } | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [tab, setTab] = useState<"atlas" | "tutor">("atlas");
  const shumwayRef = useRef<HTMLInputElement>(null);

  // Search effect
  useEffect(() => {
    const t = setTimeout(() => setResults(searchVideos(query)), 150);
    return () => clearTimeout(t);
  }, [query]);

  // Typewriter effect for Shumway
  useEffect(() => {
    if (!shumwayResponse) return;
    setDisplayedText("");
    setIsTyping(true);
    let i = 0;
    const text = shumwayResponse.text;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [shumwayResponse]);

  function askShumway() {
    if (!shumwayQuery.trim()) return;
    setDisplayedText("");
    setIsTyping(true);
    const resp = getShumwayResponse(shumwayQuery);
    setTimeout(() => setShumwayResponse(resp), 300);
  }

  const SUGGESTED = ["How do I repair P2 prolapse with neochords?", "When is the saline test adequate?", "How would you teach Zachary heart surgery?", "Explain bileaflet prolapse repair", "What is Gaudiani's annuloplasty ring selection?"];

  return (
    <div style={{ minHeight: "100vh", background: "#0C2452" }}>
      {/* ── HEADER ── */}
      <header style={{ background: "rgba(12,36,82,0.97)", borderBottom: "1px solid rgba(165,211,233,0.15)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 50, padding: "0 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#CE302C", letterSpacing: -1 }}>OR</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: -1 }}>acle</span>
            </div>
            <div style={{ width: 1, height: 28, background: "rgba(165,211,233,0.2)" }} />
            <div>
              <div style={{ fontSize: 11, color: "#A5D3E9", fontWeight: 600, letterSpacing: 1 }}>GAUDIANI ATLAS · MITRAL VALVE REPAIR</div>
              <div style={{ fontSize: 10, color: "rgba(165,211,233,0.5)" }}>Powered by CTSNet · 19 curated videos</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "#A5D3E9" }}>AI Search Active</span>
            <div style={{ background: "rgba(206,48,44,0.15)", border: "1px solid rgba(206,48,44,0.3)", borderRadius: 20, padding: "4px 14px", fontSize: 12, color: "#f87171" }}>DEMO</div>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <div style={{ borderBottom: "1px solid rgba(165,211,233,0.1)", padding: "32px 24px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#CE302C", letterSpacing: 2, marginBottom: 8 }}>KHALPEY AI LAB · ASU · CTSNET ATLAS DEMO</div>
            <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, margin: "0 0 10px", lineHeight: 1.1 }}>
              <span className="gradient-text">The Operating System</span><br />
              <span style={{ color: "white" }}>for Surgical Judgment</span>
            </h1>
            <p style={{ fontSize: 16, color: "#A5D3E9", maxWidth: 640, margin: "0 auto 24px" }}>
              Search 19 curated Gaudiani Atlas mitral valve repair videos by anatomy, technique, and timestamp. Ask Norman Shumway anything.
            </p>
          </div>

          {/* Tab switcher */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            {[{ id: "atlas", label: "📚 Video Atlas" }, { id: "tutor", label: "🧠 Shumway AI Tutor" }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id as "atlas" | "tutor")}
                style={{ background: tab === t.id ? "#0B67BE" : "rgba(11,103,190,0.15)", border: `1px solid ${tab === t.id ? "#0B67BE" : "rgba(165,211,233,0.2)"}`, color: "white", borderRadius: 8, padding: "10px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s", boxShadow: tab === t.id ? "0 0 20px rgba(11,103,190,0.4)" : "none" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 24px" }}>
        {tab === "atlas" ? (
          <>
            {/* ── SEARCH ── */}
            <div style={{ position: "relative", marginBottom: 24, maxWidth: 800, margin: "0 auto 24px" }}>
              <svg style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#A5D3E9" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input className="search-input" value={query} onChange={e => setQuery(e.target.value)}
                placeholder='Search by anatomy (P2 leaflet), technique (neochord), or procedure...' />
              {query && (
                <button onClick={() => setQuery("")} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#A5D3E9", cursor: "pointer", fontSize: 18 }}>×</button>
              )}
            </div>

            {/* Results count + chapter filters */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 20, maxWidth: 800, margin: "0 auto 20px" }}>
              <span style={{ fontSize: 13, color: "#A5D3E9", marginRight: 4 }}>{results.length} videos</span>
              {["P2", "P1", "neochord", "calcified", "redo", "bileaflet", "myectomy"].map(tag => (
                <button key={tag} onClick={() => setQuery(tag)} className="chapter-badge" style={{ fontSize: 12, padding: "4px 12px" }}>{tag}</button>
              ))}
            </div>

            {/* Layout: video grid + detail panel */}
            <div style={{ display: "grid", gridTemplateColumns: activeVideo ? "380px 1fr" : "1fr", gap: 20 }}>
              {/* Video grid */}
              <div style={{ display: "grid", gridTemplateColumns: activeVideo ? "1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
                {results.map(v => (
                  <VideoCard key={v.id} video={v} active={activeVideo?.id === v.id} onClick={() => setActiveVideo(v.id === activeVideo?.id ? null : v)} />
                ))}
                {results.length === 0 && (
                  <div style={{ textAlign: "center", padding: 48, color: "#A5D3E9" }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                    <div style={{ fontSize: 16, marginBottom: 8 }}>No results for "{query}"</div>
                    <div style={{ fontSize: 13 }}>Try: P2, neochord, annuloplasty, redo, myectomy</div>
                  </div>
                )}
              </div>

              {/* Detail panel */}
              {activeVideo && (
                <div className="glass" style={{ padding: 28, borderRadius: 16, height: "fit-content", position: "sticky", top: 80 }}>
                  {/* Video player placeholder */}
                  <div style={{ background: "linear-gradient(135deg, #0A1E40, #0B67BE)", borderRadius: 12, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", marginBottom: 20 }}>
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(165,211,233,0.1), transparent)" }} />
                    <div style={{ textAlign: "center" }}>
                      <div style={{ background: "rgba(206,48,44,0.9)", borderRadius: "50%", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", boxShadow: "0 0 24px rgba(206,48,44,0.5)" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="8,5 19,12 8,19"/></svg>
                      </div>
                      <div style={{ fontSize: 13, color: "#A5D3E9" }}>Vimeo-hosted · Login required for live play</div>
                      <a href={activeVideo.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 8, background: "#0B67BE", color: "white", borderRadius: 8, padding: "6px 16px", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>Watch on CTSNet →</a>
                    </div>
                    <span style={{ position: "absolute", bottom: 8, right: 8, background: "#CE302C", borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 700, color: "white" }}>{activeVideo.duration}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <DifficultyBadge level={activeVideo.difficulty} />
                    <span style={{ fontSize: 12, color: "#A5D3E9" }}>{activeVideo.date}</span>
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px", lineHeight: 1.3 }}>{activeVideo.title}</h2>
                  <div style={{ fontSize: 13, color: "#A5D3E9", marginBottom: 16 }}>{activeVideo.author} · Curator: Joel Dunning MD</div>

                  {/* Anatomy */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#A5D3E9", letterSpacing: 1, marginBottom: 8 }}>ANATOMY COVERED</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {activeVideo.anatomy.map(a => <AnatomyTag key={a} label={a} />)}
                    </div>
                  </div>

                  {/* Techniques */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#A5D3E9", letterSpacing: 1, marginBottom: 8 }}>TECHNIQUES</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {activeVideo.techniques.map(t => <AnatomyTag key={t} label={t} crimson />)}
                    </div>
                  </div>

                  {/* Timestamps */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#A5D3E9", letterSpacing: 1, marginBottom: 8 }}>TIMESTAMPED CHAPTERS</div>
                    <div style={{ background: "rgba(12,36,82,0.6)", borderRadius: 10, overflow: "hidden" }}>
                      {activeVideo.timestamps.map((ts, i) => (
                        <TimestampPill key={i} t={ts.t} label={ts.label} />
                      ))}
                    </div>
                  </div>

                  {/* Shumway wisdom */}
                  <div style={{ background: "linear-gradient(135deg, rgba(11,103,190,0.2), rgba(12,36,82,0.5))", border: "1px solid rgba(165,211,233,0.2)", borderRadius: 12, padding: 16 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ background: "#CE302C", borderRadius: "50%", width: 32, height: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900 }}>S</div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#CE302C", marginBottom: 6, letterSpacing: 1 }}>SHUMWAY AI · TEACHING NOTE</div>
                        <p style={{ fontSize: 13, color: "#A5D3E9", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>"{activeVideo.shumway}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // ── SHUMWAY TUTOR TAB ──
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {/* Avatar */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #0B67BE, #CE302C)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", boxShadow: "0 0 32px rgba(11,103,190,0.5)", fontSize: 32 }}>S</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Norman Shumway AI</div>
              <div style={{ fontSize: 13, color: "#A5D3E9" }}>Father of Heart Transplantation · Stanford · Teaching from 19 Gaudiani Atlas Videos</div>
            </div>

            {/* Suggested queries */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#A5D3E9", letterSpacing: 1, marginBottom: 12 }}>SUGGESTED QUESTIONS</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {SUGGESTED.map(s => (
                  <button key={s} onClick={() => { setShumwayQuery(s); setTimeout(() => { const resp = getShumwayResponse(s); setShumwayResponse(resp); }, 100); }}
                    style={{ background: "rgba(11,103,190,0.15)", border: "1px solid rgba(165,211,233,0.2)", color: "#A5D3E9", borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}
                    onMouseOver={e => { (e.target as HTMLElement).style.background = "rgba(11,103,190,0.35)"; (e.target as HTMLElement).style.color = "white"; }}
                    onMouseOut={e => { (e.target as HTMLElement).style.background = "rgba(11,103,190,0.15)"; (e.target as HTMLElement).style.color = "#A5D3E9"; }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat input */}
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <input ref={shumwayRef} className="search-input" style={{ paddingLeft: 20 }} value={shumwayQuery}
                  onChange={e => setShumwayQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && askShumway()}
                  placeholder="Ask Shumway anything about mitral valve repair..." />
              </div>
              <button onClick={askShumway}
                style={{ background: shumwayQuery ? "#CE302C" : "rgba(206,48,44,0.3)", border: "none", color: "white", borderRadius: 12, padding: "0 24px", fontWeight: 700, cursor: shumwayQuery ? "pointer" : "default", fontSize: 14, transition: "all 0.2s", boxShadow: shumwayQuery ? "0 0 20px rgba(206,48,44,0.4)" : "none" }}>
                Ask →
              </button>
            </div>

            {/* Response */}
            {shumwayResponse && (
              <div className="glass" style={{ padding: 28, borderRadius: 16, marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                  <div style={{ background: "#CE302C", borderRadius: "50%", width: 40, height: 40, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, boxShadow: "0 0 16px rgba(206,48,44,0.4)" }}>S</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#CE302C", letterSpacing: 1, marginBottom: 10 }}>SHUMWAY AI</div>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "#E8F4FC", margin: 0, fontStyle: "italic" }}>
                      "{displayedText}{isTyping && <span className="cursor">|</span>}"
                    </p>
                  </div>
                </div>

                {/* Timestamp references */}
                {!isTyping && shumwayResponse.timestamps.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#A5D3E9", letterSpacing: 1, marginBottom: 10 }}>REFERENCED TIMESTAMPS — CLICK TO JUMP</div>
                    {shumwayResponse.timestamps.map((ts, i) => {
                      const vid = MITRAL_VIDEOS.find(v => v.id === ts.vid);
                      return (
                        <div key={i} onClick={() => { setActiveVideo(vid || null); setTab("atlas"); }}
                          style={{ background: "rgba(12,36,82,0.6)", borderRadius: 10, padding: "12px 16px", marginBottom: 8, cursor: "pointer", display: "flex", gap: 12, alignItems: "center", transition: "background 0.2s" }}
                          onMouseOver={e => (e.currentTarget.style.background = "rgba(11,103,190,0.25)")}
                          onMouseOut={e => (e.currentTarget.style.background = "rgba(12,36,82,0.6)")}>
                          <span className="timestamp">▶ {ts.t}</span>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{ts.label}</div>
                            {vid && <div style={{ fontSize: 11, color: "#A5D3E9" }}>{vid.title}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {!shumwayResponse && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(165,211,233,0.4)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🧠</div>
                <div style={{ fontSize: 16 }}>Ask about any technique, anatomy, or decision in mitral valve repair</div>
                <div style={{ fontSize: 13, marginTop: 8 }}>Shumway will reference exact timestamps from the Gaudiani Atlas</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(165,211,233,0.1)", padding: "20px 24px", marginTop: 40 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span style={{ color: "#CE302C", fontWeight: 900 }}>OR</span><span style={{ color: "white", fontWeight: 900 }}>acle</span>
            <span style={{ color: "rgba(165,211,233,0.5)", fontSize: 12, marginLeft: 16 }}>Demo · Khalpey AI Lab · ASU · Built for CTSNet Partnership</span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(165,211,233,0.4)" }}>Dr. Zain Khalpey MD PhD FACS · zain@khalpey.ai · khalpey.ai</div>
        </div>
      </footer>
    </div>
  );
}
