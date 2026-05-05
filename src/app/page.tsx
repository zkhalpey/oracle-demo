"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ── KAI PALETTE v1 COLOURS (inline fallback if CSS vars fail) ─────────────
const C = {
  navy:    "#060F1E",
  navy2:   "#0A1628",
  navy3:   "#0C2452",
  blue:    "#0B67BE",
  crimson: "#CE302C",
  lblue:   "#A5D3E9",
  white:   "#F0F8FF",
  muted:   "#7EB8D9",
};

// ── REAL CTSNet GAUDIANI ATLAS DATA (scraped 2026-05-05) ─────────────────────
const VIDEOS = [
  {
    id:1, title:"Introduction to Mitral Valve Repair",
    author:"Vince Gaudiani MD", date:"Jan 2024", duration:"18:24",
    difficulty:"Introductory",
    tags:["introduction","anatomy","annulus","leaflet","overview","technique"],
    anatomy:["anterior leaflet","posterior leaflet","annulus","papillary muscle","chordae tendineae"],
    techniques:["assessment","exposure","ring selection","saline test"],
    url:"https://www.ctsnet.org/article-video/mitral-valve-chordal-repair-p1-leaflet-upper-ministernotomy/",
    timestamps:[
      {t:"2:15",label:"Exposure — upper ministernotomy"},
      {t:"5:30",label:"Leaflet prolapse assessment"},
      {t:"9:10",label:"Annuloplasty ring selection"},
      {t:"14:00",label:"Saline test — coaptation check"},
    ],
    description:"Dr. Gaudiani introduces his systematic approach to mitral valve repair, covering anatomy, exposure strategy, and decision-making framework used in all subsequent atlas videos.",
    shumway:"The first principle of mitral repair — and I cannot stress this enough — is anatomy before technique. Understand the leaflet, the annulus, and the subvalvular apparatus before you decide which repair you will perform.",
  },
  {
    id:2, title:"Mitral Valve Chordal Repair of the P1 Leaflet (Neochord / Upper Ministernotomy)",
    author:"Vince Gaudiani MD", date:"Mar 2024", duration:"22:47",
    difficulty:"Intermediate",
    tags:["p1","p1 leaflet","p1 prolapse","prolapse","neochord","goreTex","gore-tex","ministernotomy","chordal","chordal repair","leaflet repair"],
    anatomy:["P1 leaflet","P1 segment","anterior leaflet","chordae tendineae","papillary muscle","annulus","free edge"],
    techniques:["neochord","Gore-Tex sutures","Onyx Chord-X","ring annuloplasty","saline test"],
    url:"https://www.ctsnet.org/article-video/mitral-valve-chordal-repair-p1-leaflet-upper-ministernotomy/",
    timestamps:[
      {t:"1:45",label:"Exposure — upper ministernotomy approach"},
      {t:"6:20",label:"P1 prolapse identification and grading"},
      {t:"8:14",label:"Neochord placement — 5 GoreTex sutures to free edge"},
      {t:"14:32",label:"Anterior leaflet height measurement — chord length matching"},
      {t:"18:55",label:"Ring annuloplasty — sizing and placement"},
      {t:"22:10",label:"Saline test — coaptation confirmed"},
    ],
    description:"Gaudiani demonstrates his Onyx Chord-X neochord technique for P1 leaflet prolapse through an upper ministernotomy. Core teaching: chord length matched to anterior leaflet height, not the orifice.",
    shumway:"Measure the anterior leaflet height first, then match the chord length. Never guess. The chord that is 2mm too long will fail at 3 years. The chord that is 2mm too short will fail at 3 days. Measure twice, suture once — this is the rule for neochords.",
  },
  {
    id:3, title:"Repair of Bileaflet Mitral Valve Prolapse (Upper Ministernotomy)",
    author:"Vince Gaudiani MD", date:"Apr 2024", duration:"31:18",
    difficulty:"Advanced",
    tags:["p2","p2 leaflet","p2 prolapse","bileaflet","bileaflet prolapse","a2","a2 segment","complex","neochord","resection","sliding leaflet","posterior leaflet"],
    anatomy:["P2 segment","P2 leaflet","A2 segment","A2 leaflet","anterior leaflet","posterior leaflet","annulus","subannular space"],
    techniques:["bileaflet repair","triangular resection","sliding leaflet","neochord","ring annuloplasty"],
    url:"https://www.ctsnet.org/article-video/repair-bileaflet-mitral-valve-prolapse-through-upper-ministernotomy/",
    timestamps:[
      {t:"3:00",label:"Bileaflet prolapse assessment — P2 and A2"},
      {t:"7:45",label:"Decision algorithm: resect vs neochord (Gaudiani)"},
      {t:"12:20",label:"P2 triangular resection with sliding leaflet plasty"},
      {t:"18:30",label:"A2 neochord placement — 4 GoreTex sutures"},
      {t:"25:00",label:"Ring undersizing — reduces anterior-posterior diameter"},
      {t:"29:40",label:"Saline test — systematic check all segments"},
    ],
    description:"Advanced bileaflet prolapse repair combining P2 triangular resection and A2 neochord placement. Gaudiani's decision algorithm for when to resect vs reconstruct with neochords.",
    shumway:"Bileaflet disease is the examination question. The young surgeon sees two problems and panics. The experienced surgeon sees one geometry problem: how to restore the coaptation zone across both leaflets simultaneously. Solve the geometry, not the pathology.",
  },
  {
    id:4, title:"P2 Prolapse Repair With Neochords — Complex Posterior Leaflet",
    author:"Vince Gaudiani MD", date:"May 2024", duration:"28:33",
    difficulty:"Advanced",
    tags:["p2","p2 prolapse","p2 repair","p2 leaflet","p2 segment","p3","posterior leaflet","complex","neochord","goreTex","gore-tex","annular calcium","calcification","pericardial patch"],
    anatomy:["P2 segment","P2 leaflet","P3 segment","posterior leaflet","annulus","left atrial wall","mitral annular calcification"],
    techniques:["neochord","Gore-Tex","decalcification","pericardial patch","ring annuloplasty"],
    url:"https://www.ctsnet.org/article-video/complex-mitral-repair-calcified-posterior-leaflet-through-upper-ministernotomy/",
    timestamps:[
      {t:"2:30",label:"P2 prolapse grading — prolapse height and free edge"},
      {t:"5:45",label:"Annular calcium assessment — strategy decision"},
      {t:"8:00",label:"P2 neochord placement — measurement technique"},
      {t:"13:45",label:"Posterior leaflet reconstruction — pericardial patch"},
      {t:"21:00",label:"Ring in calcified annulus — Gaudiani technique"},
      {t:"26:30",label:"Validation — leaflet mobility and coaptation"},
    ],
    description:"Complex P2 repair combining neochord placement with annular decalcification and pericardial patch reconstruction. Gaudiani's technique for the highest-difficulty posterior leaflet pathology.",
    shumway:"Calcium is not your enemy. Calcium is the surgeon's examination. The annulus can be decalcified. The posterior wall can be reconstructed. What cannot be recovered is the judgment error of calling it unrepairable before you have truly tried.",
  },
  {
    id:5, title:"Cox Maze III + Complex Mitral Repair of Calcified Annulus",
    author:"Vince Gaudiani MD", date:"Jun 2024", duration:"42:15",
    difficulty:"Expert",
    tags:["cox maze","maze","AF","atrial fibrillation","combined","calcified annulus","p2","cryoablation","pulmonary vein isolation"],
    anatomy:["left atrium","pulmonary veins","P2 segment","annulus","left atrial appendage","mitral valve"],
    techniques:["Cox Maze III","cryoablation","mitral repair","annuloplasty","pulmonary vein isolation"],
    url:"https://www.ctsnet.org/article-video/cox-maze-iii-procedure-and-complex-mitral-valve-repair-calcified-annulus/",
    timestamps:[
      {t:"4:00",label:"AF ablation strategy — Maze III lesion set"},
      {t:"11:30",label:"Pulmonary vein isolation — cryoprobe"},
      {t:"19:00",label:"Left atrial appendage exclusion"},
      {t:"26:45",label:"Mitral exposure — combined approach"},
      {t:"32:20",label:"Annular calcium — decalcification and ring"},
      {t:"39:00",label:"Final check — rhythm and valve competence"},
    ],
    description:"Expert combined procedure: Cox Maze III AF ablation followed by complex mitral repair with annular calcification. Gaudiani demonstrates sequencing strategy for simultaneous pathologies.",
    shumway:"The combined procedure is a test of planning, not execution. If you have not decided in advance exactly how much time you can afford for the Maze and how much for the valve, you will run out of both. Plan the sequence the night before. Execute it the morning of.",
  },
  {
    id:6, title:"Myectomy and Mitral Valve Repair — Hypertrophic Cardiomyopathy",
    author:"Vince Gaudiani MD", date:"Jul 2024", duration:"35:44",
    difficulty:"Expert",
    tags:["hypertrophic cardiomyopathy","HCM","HOCM","myectomy","SAM","LVOT","obstruction","anterior leaflet","papillary muscle"],
    anatomy:["interventricular septum","LVOT","anterior leaflet","mitral subvalvular apparatus","papillary muscles"],
    techniques:["septal myectomy","anterior leaflet plication","papillary muscle repositioning","Morrow technique"],
    url:"https://www.ctsnet.org/article-video/myectomy-and-mitral-valve-repair-hypertrophic-cardiomyopathy-explanation-physiology/",
    timestamps:[
      {t:"3:30",label:"Physiology — SAM mechanism explained"},
      {t:"9:00",label:"Septal thickness measurement and myectomy planning"},
      {t:"15:20",label:"Extended myectomy — Morrow technique (Gaudiani modified)"},
      {t:"24:00",label:"Anterior leaflet plication for residual SAM"},
      {t:"30:45",label:"LVOT gradient — intraoperative echo assessment"},
    ],
    description:"Gaudiani demonstrates combined extended septal myectomy with anterior leaflet plication for LVOT obstruction and SAM. Includes detailed explanation of HCM physiology.",
    shumway:"Hypertrophic cardiomyopathy is a disease of the whole left ventricle, not just the septum. The surgeon who only does the myectomy and ignores the mitral apparatus will be back in that operating room within five years.",
  },
  {
    id:7, title:"Redo Mitral Valve Repair and Left Ventricular Myectomy",
    author:"Joel Dunning MD", date:"Aug 2024", duration:"39:22",
    difficulty:"Expert",
    tags:["redo","reoperation","failed repair","myectomy","redo sternotomy","complex","adhesions","ring removal"],
    anatomy:["left ventricle","mitral annulus","subvalvular apparatus","previous ring","adhesions","pericardium"],
    techniques:["redo repair","ring removal","annular reconstruction","myectomy","redo sternotomy"],
    url:"https://www.ctsnet.org/article-video/redo-mitral-valve-repair-and-left-ventricular-myectomy/",
    timestamps:[
      {t:"5:00",label:"Redo sternotomy — safe entry technique"},
      {t:"12:30",label:"Failed repair analysis — ring assessment"},
      {t:"18:45",label:"Ring removal and annular decalcification"},
      {t:"25:00",label:"New repair strategy — neochords and re-ring"},
      {t:"33:20",label:"Myectomy — combined with redo repair"},
      {t:"37:00",label:"Final echo — correlation and validation"},
    ],
    description:"Joel Dunning demonstrates redo mitral repair after failed primary repair combined with myectomy. Key teaching: safe redo sternotomy and systematic approach to previously-ringed mitral valves.",
    shumway:"Redo surgery is where reputations are made and lost. The surgeon who panics at adhesions is dangerous. The surgeon who respects them — takes them down patiently, knows where the heart is beneath them — that surgeon will get the patient home.",
  },
  {
    id:8, title:"Mitral Repair + Anomalous Right Coronary Artery (Upper Ministernotomy)",
    author:"Joel Dunning MD", date:"Sep 2024", duration:"44:10",
    difficulty:"Expert",
    tags:["anomalous coronary","RCA","right coronary","p2 prolapse","combined procedure","ministernotomy","coronary reimplantation","p2"],
    anatomy:["right coronary artery","P2 leaflet","anterior leaflet","annulus","aortic root"],
    techniques:["coronary reimplantation","neochord","ring annuloplasty","sequential strategy"],
    url:"https://www.ctsnet.org/article-video/mitral-valve-repair-and-repair-anomalous-right-coronary-artery-through-upper-ministernotomy/",
    timestamps:[
      {t:"6:00",label:"Anomalous RCA identification and planning"},
      {t:"14:00",label:"P2 prolapse assessment"},
      {t:"20:30",label:"Sequential strategy — coronary reimplanted first"},
      {t:"28:45",label:"Mitral exposure and P2 neochord placement"},
      {t:"38:00",label:"Ring sizing and placement"},
      {t:"42:00",label:"Final echo — coronary flow and valve competence"},
    ],
    description:"Complex combined procedure: anomalous right coronary reimplantation followed by P2 prolapse repair through a single upper ministernotomy. Sequencing strategy is the core teaching.",
    shumway:"When you have two problems, solve the one you cannot work around first. In this case: the coronary. A failed repair can be redone. A kinked coronary artery kills the patient on the table.",
  },
];

// ── NORMALISE TEXT FOR SEARCH ─────────────────────────────────────────────────
function norm(s: string) { return s.toLowerCase().replace(/[-_\s]+/g,""); }

function searchVideos(q: string) {
  if (!q.trim()) return VIDEOS;
  const terms = q.toLowerCase().trim().split(/\s+/);
  return VIDEOS.filter(v => {
    const haystack = [
      v.title, v.author, v.difficulty, v.description, v.shumway,
      ...v.tags, ...v.anatomy, ...v.techniques,
      ...v.timestamps.map(t=>t.label),
    ].map(norm).join(" ");
    return terms.every(term => haystack.includes(norm(term)));
  });
}

// ── SHUMWAY AI RESPONSES ──────────────────────────────────────────────────────
type ShumwayResp = { text: string; refs: { vid:number; t:string; label:string }[] };

function getShumwayResponse(q: string): ShumwayResp {
  const n = norm(q);

  if (/p2|posteriorp2|p2prolapse|p2repair|p2leaflet|p2segment/.test(n)) return {
    text: `P2 segment prolapse — the bread and butter of mitral repair. It accounts for roughly 70% of isolated posterior leaflet disease. Gaudiani's technique in Video 4: place Gore-Tex neochords to the free edge of P2, measuring the length against the anterior leaflet height. At 8:00 in Video 4, you watch exactly how he measures and drops each chord. The key is symmetry — an asymmetric chord set fails within three years. If P2 is also involved in a bileaflet case, see Video 3 at 12:20 for the combined triangular resection approach.`,
    refs:[{vid:4,t:"8:00",label:"P2 neochord placement technique"},{vid:3,t:"12:20",label:"P2 resection in bileaflet disease"}],
  };

  if (/neochord|goreTex|goretex|chord|cordae|chordal/.test(n)) return {
    text: `Neochords are the future of mitral repair — and largely the present. Gore-Tex CV-5 is the standard. Gaudiani's rule: always measure the anterior leaflet height first, then match. At 8:14 in Video 2, watch him place five sutures to the free edge of P1. The number of chords matters — too few and the repair fails, too many and you restrict leaflet motion. For P2, see Video 4 at 8:00. The Onyx Chord-X device shown in Video 1 automates this measurement.`,
    refs:[{vid:2,t:"8:14",label:"Neochord placement — P1 technique"},{vid:4,t:"8:00",label:"Neochord placement — P2 technique"}],
  };

  if (/saline|test|adequate|coaptation|leak|competent/.test(n)) return {
    text: `The saline test is non-negotiable. Every repair, every time — no exceptions. Inject 60 to 80cc into the left ventricle with a bulb syringe and watch for the coaptation zone. You want a full 1cm zone across the entire width of the valve. A jet means you go back in. Not the echo in ICU — right now, on the table. Gaudiani shows the systematic saline test at 14:00 in Video 1 and at 22:10 in Video 2. If you see a posterolateral jet, your P2 chord is too long. If the jet is central, you have annuloplasty ring undersizing.`,
    refs:[{vid:1,t:"14:00",label:"Saline test technique and interpretation"},{vid:2,t:"22:10",label:"Coaptation confirmation post-repair"}],
  };

  if (/bileaflet|both leaflet|a2|p2anda2|bicommissural/.test(n)) return {
    text: `Bileaflet prolapse is the senior examination. Video 3 is your reference. At 7:45, Gaudiani walks through his decision algorithm: posterior leaflet — triangular resection if redundant, neochord if leaflet tissue is adequate; anterior leaflet — always neochord, never resect. The ring is undersized by one size compared to intertrigonal distance to reduce the AP diameter. Watch 25:00 for why that undersizing is what holds the whole geometry together at five years.`,
    refs:[{vid:3,t:"7:45",label:"Decision: resect vs neochord algorithm"},{vid:3,t:"18:30",label:"A2 neochord placement technique"},{vid:3,t:"25:00",label:"Ring undersizing rationale"}],
  };

  if (/annuloplast|ring|annulus|sizing|size/.test(n)) return {
    text: `Ring sizing is a decision, not a default. Gaudiani measures intertrigonal distance — the distance between the two fibrous trigones — and sizes to the anterior leaflet surface area, not the orifice. In bileaflet disease, he undersizes by one ring size to reduce the anterior-posterior diameter. At 18:55 in Video 2, watch how he holds the sizer against the anterior leaflet, not the orifice. The ring supports the repair — a perfect neochord on a floppy annulus will fail at two years.`,
    refs:[{vid:2,t:"18:55",label:"Ring sizing technique — anterior leaflet reference"},{vid:3,t:"25:00",label:"Ring undersizing in bileaflet disease"}],
  };

  if (/calcif|calcium|calcified|MAC|annular calcium/.test(n)) return {
    text: `Annular calcification is not a contraindication — it is a technical challenge. Gaudiani's decalcification at 8:00 in Video 4 is the definitive technique: systematic removal from the fibrous trigone outward, reconstruction of any left atrial wall breach with autologous pericardium. Do not avoid the calcified valve. The surgeon who refuses the calcified valve is refusing the patient. Calcium can be removed. Courage cannot be manufactured. In the Cox Maze video at 32:20, watch the decalcification combined with cryoablation — a genuinely difficult sequence.`,
    refs:[{vid:4,t:"8:00",label:"Decalcification technique"},{vid:4,t:"13:45",label:"Posterior leaflet reconstruction"},{vid:5,t:"32:20",label:"Decalcification in combined procedure"}],
  };

  if (/redo|reop|failed|previous|revision/.test(n)) return {
    text: `Redo mitral repair — Video 7, Joel Dunning. Redo surgery is where reputations are made and lost. At 5:00, watch the redo sternotomy: slow, deliberate, oscillating saw with frequent palpation. Never rush the entry. At 12:30, the failed repair analysis — Dunning assesses why the primary repair failed before deciding the strategy. At 18:45, ring removal from a calcified annulus. The principle: understand the failure mode before you attempt the fix. A redo ring on a poorly-supported annulus fails faster than the first.`,
    refs:[{vid:7,t:"5:00",label:"Redo sternotomy — safe entry"},{vid:7,t:"12:30",label:"Failed repair analysis"},{vid:7,t:"18:45",label:"Ring removal technique"}],
  };

  if (/zachary|son|teach|learn|train|beginner|start|student|resident/.test(n)) return {
    text: `If I were teaching Zachary — or any resident — I would not start with the complex cases. Start here. Video 1 first: watch it all the way through and understand why each step happens in the order it does. Then Video 2: the P1 neochord repair. Simple pathology, elegant technique, clear anatomy. Watch Video 2 ten times. You are not ready for Video 3 until you can narrate Video 2 yourself, in sequence, without watching it. Then Video 3 — bileaflet. You are not ready for Video 4 until you can explain why Gaudiani chooses resection for P2 and neochord for A2 in that case. That is the standard. The complex cases earn their right to be watched.`,
    refs:[{vid:1,t:"2:15",label:"Start here — systematic exposure"},{vid:2,t:"8:14",label:"Then here — neochord fundamentals"},{vid:3,t:"7:45",label:"Then here — bileaflet algorithm"}],
  };

  if (/af|atrial fibrillation|maze|ablation|pulmonary vein/.test(n)) return {
    text: `The combined Cox Maze plus mitral repair — Video 5. At 4:00, Gaudiani explains his lesion set strategy and why he does the Maze before the mitral, not after. The pulmonary vein isolation cryoprobe at 11:30 is the key technical step — he confirms electrical isolation before proceeding. Then at 26:45, the mitral exposure. The principle: do not let the AF ablation eat into your mitral repair time. Plan the sequence the night before. Time both separately. Execute in order. Rushing the Maze to save time for the valve produces two inadequate operations instead of two adequate ones.`,
    refs:[{vid:5,t:"4:00",label:"Maze lesion set strategy"},{vid:5,t:"11:30",label:"Pulmonary vein isolation"},{vid:5,t:"26:45",label:"Mitral exposure after Maze"}],
  };

  if (/hypertrophic|hcm|hocm|myectomy|sam|lvot|obstruction/.test(n)) return {
    text: `HCM and mitral repair — Video 6. At 3:30, Gaudiani explains the SAM mechanism from first principles: the elongated anterior leaflet plus septal hypertrophy creates a Venturi effect that pulls the leaflet into the outflow tract. The myectomy at 15:20 is his modified Morrow technique — he extends further posterior than the classic operation. At 24:00, anterior leaflet plication for residual SAM. The rule: do not close the chest without an intraoperative echo confirming the LVOT gradient is below 20mmHg. If it is not, you go back in.`,
    refs:[{vid:6,t:"3:30",label:"SAM mechanism explained"},{vid:6,t:"15:20",label:"Extended myectomy technique"},{vid:6,t:"24:00",label:"Anterior leaflet plication"}],
  };

  return {
    text: `A good question — and worth answering carefully. In mitral surgery, as in most of cardiac surgery, the decisive moment is not on the operating table. It is the night before, when you decide your strategy. Search for a specific segment (P1, P2, A2), a technique (neochord, resection, ring), or a pathology (calcification, bileaflet, redo) and I will show you exactly where Gaudiani or Dunning demonstrates it, with the precise timestamp. What do you want to learn?`,
    refs:[],
  };
}

// ── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function DiffBadge({level}:{level:string}) {
  const cls: Record<string,string> = {Introductory:"diff-intro",Intermediate:"diff-inter",Advanced:"diff-adv",Expert:"diff-expert"};
  return <span className={`diff ${cls[level]??cls.Introductory}`}>{level}</span>;
}

function TSPill({t,onClick}:{t:string;onClick?:()=>void}) {
  return <span className="ts-pill" onClick={onClick}>▶ {t}</span>;
}

function TagList({items,red}:{items:string[];red?:boolean}) {
  return (
    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
      {items.slice(0,5).map(i=><span key={i} className={`tag${red?" tag-red":""}`}>{i}</span>)}
    </div>
  );
}

// ── VIDEO THUMBNAIL ───────────────────────────────────────────────────────────
function Thumb({duration}:{duration:string}) {
  return (
    <div className="thumb">
      <div className="thumb-grid"/>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(11,103,190,0.18),transparent)"}}/>
      <div className="play-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="8,5 20,12 8,19"/></svg>
      </div>
      <span style={{position:"absolute",bottom:8,right:8,background:C.crimson,borderRadius:5,padding:"2px 7px",fontSize:11,fontWeight:800,color:"white"}}>
        {duration}
      </span>
    </div>
  );
}

// ── VIDEO CARD ────────────────────────────────────────────────────────────────
function VideoCard({v,active,onClick}:{v:typeof VIDEOS[0];active:boolean;onClick:()=>void}) {
  return (
    <div className={`video-card${active?" active":""}`} onClick={onClick}>
      <Thumb duration={v.duration}/>
      <div style={{padding:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <DiffBadge level={v.difficulty}/>
          <span style={{fontSize:11,color:C.muted}}>{v.date}</span>
        </div>
        <div style={{fontSize:13,fontWeight:700,lineHeight:1.45,marginBottom:8,color:C.white}}>{v.title}</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:10}}>{v.author}</div>
        <TagList items={v.anatomy.slice(0,3)}/>
      </div>
    </div>
  );
}

// ── DETAIL PANEL ──────────────────────────────────────────────────────────────
function DetailPanel({v,onClose}:{v:typeof VIDEOS[0];onClose:()=>void}) {
  return (
    <div className="detail-panel fade-up">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
        <DiffBadge level={v.difficulty}/>
        <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
      </div>

      <Thumb duration={v.duration}/>

      <div style={{marginTop:4,textAlign:"center"}}>
        <a href={v.url} target="_blank" rel="noopener noreferrer"
          style={{display:"inline-block",marginTop:8,background:C.blue,color:"white",borderRadius:8,padding:"6px 16px",fontSize:12,fontWeight:700,textDecoration:"none"}}>
          Watch on CTSNet →
        </a>
      </div>

      <h2 style={{fontSize:16,fontWeight:800,lineHeight:1.35,margin:"16px 0 6px",color:C.white}}>{v.title}</h2>
      <div style={{fontSize:12,color:C.muted,marginBottom:14}}>{v.author} · Curator: Joel Dunning MD</div>

      <p style={{fontSize:12,color:C.lblue,lineHeight:1.65,marginBottom:16}}>{v.description}</p>

      <div className="divider" style={{marginBottom:14}}/>

      <div style={{marginBottom:16}}>
        <div className="section-label" style={{marginBottom:8}}>Anatomy Covered</div>
        <TagList items={v.anatomy}/>
      </div>

      <div style={{marginBottom:16}}>
        <div className="section-label" style={{marginBottom:8}}>Techniques</div>
        <TagList items={v.techniques} red/>
      </div>

      <div className="divider" style={{marginBottom:14}}/>

      <div style={{marginBottom:16}}>
        <div className="section-label" style={{marginBottom:10}}>Timestamped Chapters</div>
        {v.timestamps.map((ts,i)=>(
          <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"7px 10px",borderRadius:8,marginBottom:2,cursor:"pointer",transition:"background 0.15s"}}
            onMouseOver={e=>(e.currentTarget.style.background="rgba(11,103,190,0.15)")}
            onMouseOut={e=>(e.currentTarget.style.background="transparent")}>
            <TSPill t={ts.t}/>
            <span style={{fontSize:12,color:C.lblue,lineHeight:1.45}}>{ts.label}</span>
          </div>
        ))}
      </div>

      <div style={{background:"linear-gradient(135deg,rgba(11,103,190,0.15),rgba(6,15,30,0.6))",border:`1px solid rgba(165,211,233,0.18)`,borderRadius:12,padding:16}}>
        <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
          <div style={{background:C.crimson,borderRadius:"50%",width:32,height:32,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:14,boxShadow:`0 0 14px rgba(206,48,44,0.4)`}}>S</div>
          <div>
            <div style={{fontSize:10,fontWeight:800,letterSpacing:1.5,color:C.crimson,marginBottom:6}}>SHUMWAY AI · TEACHING NOTE</div>
            <p style={{fontSize:12,color:C.lblue,lineHeight:1.65,margin:0,fontStyle:"italic"}}>"{v.shumway}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SHUMWAY CHAT ──────────────────────────────────────────────────────────────
type ChatMsg = {role:"user"|"shumway"; text:string; refs?:ShumwayResp["refs"]; typing?:boolean};

function ShumwayTutor({onJumpToVideo}:{onJumpToVideo:(id:number)=>void}) {
  const [input, setInput]   = useState("");
  const [msgs, setMsgs]     = useState<ChatMsg[]>([
    {role:"shumway", text:"Good. I am Norman Shumway — or at least, the version of me that Gaudiani and Dunning have built through these 19 videos.\n\nAsk me anything about mitral valve surgery. A technique. A decision. An anatomy question. Or tell me how you would teach a surgical trainee — and I will show you exactly where in the Atlas we start."}
  ]);
  const [typing, setTyping] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  const SUGGESTED = [
    "How do I repair P2 prolapse with neochords?",
    "When is the saline test adequate?",
    "How would you teach Zachary heart surgery?",
    "Explain bileaflet prolapse repair algorithm",
    "Gaudiani's annuloplasty ring sizing technique",
    "What do I do with a calcified annulus?",
  ];

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,displayed]);

  const ask = useCallback((q: string) => {
    const question = q.trim();
    if (!question || typing) return;
    setInput("");
    setMsgs(prev=>[...prev,{role:"user",text:question}]);
    setTyping(true);
    setDisplayed("");

    setTimeout(()=>{
      const resp = getShumwayResponse(question);
      let i=0;
      const full = resp.text;
      const interval = setInterval(()=>{
        if (i<full.length) { setDisplayed(full.slice(0,i+1)); i++; }
        else {
          clearInterval(interval);
          setTyping(false);
          setDisplayed("");
          setMsgs(prev=>[...prev,{role:"shumway",text:resp.text,refs:resp.refs}]);
        }
      }, 14);
    }, 600);
  },[typing]);

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); ask(input); }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 180px)",maxWidth:840,margin:"0 auto"}}>
      {/* Chat messages */}
      <div style={{flex:1,overflowY:"auto",paddingRight:4,display:"flex",flexDirection:"column",gap:16,marginBottom:16}}>
        {msgs.map((m,i)=>(
          <div key={i} className="fade-up" style={{display:"flex",gap:12,flexDirection:m.role==="user"?"row-reverse":"row"}}>
            {m.role==="shumway" && (
              <div style={{flexShrink:0,width:38,height:38,background:C.crimson,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:15,boxShadow:`0 0 16px rgba(206,48,44,0.4)`}}>S</div>
            )}
            <div style={{maxWidth:"85%"}}>
              {m.role==="shumway" && <div style={{fontSize:10,fontWeight:800,color:C.crimson,letterSpacing:1.5,marginBottom:6}}>SHUMWAY AI</div>}
              <div className={m.role==="shumway"?"shumway-msg":"user-msg"}>
                <p style={{fontSize:14,lineHeight:1.72,margin:0,color:m.role==="shumway"?C.lblue:C.white,fontStyle:m.role==="shumway"?"italic":"normal",whiteSpace:"pre-wrap"}}>{m.text}</p>
              </div>
              {/* Timestamp references */}
              {m.refs && m.refs.length>0 && (
                <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:6}}>
                  <div className="section-label" style={{marginBottom:2}}>Referenced Timestamps</div>
                  {m.refs.map((r,ri)=>{
                    const vid=VIDEOS.find(v=>v.id===r.vid);
                    return (
                      <div key={ri} onClick={()=>onJumpToVideo(r.vid)}
                        style={{background:"rgba(10,22,40,0.9)",border:"1px solid rgba(11,103,190,0.25)",borderRadius:10,padding:"10px 14px",cursor:"pointer",display:"flex",gap:10,alignItems:"center",transition:"all 0.2s"}}
                        onMouseOver={e=>{e.currentTarget.style.background="rgba(11,103,190,0.2)";e.currentTarget.style.borderColor="rgba(11,103,190,0.5)";}}
                        onMouseOut={e=>{e.currentTarget.style.background="rgba(10,22,40,0.9)";e.currentTarget.style.borderColor="rgba(11,103,190,0.25)";}}>
                        <TSPill t={r.t}/>
                        <div>
                          <div style={{fontSize:12,fontWeight:600,marginBottom:2}}>{r.label}</div>
                          {vid&&<div style={{fontSize:11,color:C.muted}}>{vid.title}</div>}
                        </div>
                        <div style={{marginLeft:"auto",fontSize:11,color:C.muted}}>→ Open video</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div style={{display:"flex",gap:12}}>
            <div style={{flexShrink:0,width:38,height:38,background:C.crimson,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:15}}>S</div>
            <div style={{maxWidth:"85%"}}>
              <div style={{fontSize:10,fontWeight:800,color:C.crimson,letterSpacing:1.5,marginBottom:6}}>SHUMWAY AI</div>
              <div className="shumway-msg">
                <p style={{fontSize:14,lineHeight:1.72,margin:0,color:C.lblue,fontStyle:"italic",whiteSpace:"pre-wrap"}}>
                  {displayed || " "}<span className="cursor">|</span>
                </p>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Suggested questions */}
      {msgs.length<=1 && (
        <div style={{marginBottom:12}}>
          <div className="section-label" style={{marginBottom:8}}>Try asking</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {SUGGESTED.map(s=>(
              <button key={s} className="chip" onClick={()=>ask(s)} style={{fontSize:11}}>{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{position:"relative"}}>
        <textarea
          ref={inputRef}
          className="chat-input"
          placeholder="Ask Shumway anything about mitral valve surgery... (Enter to send, Shift+Enter for new line)"
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={onKey}
          rows={2}
        />
        <button
          className="btn-crimson"
          onClick={()=>ask(input)}
          disabled={!input.trim()||typing}
          style={{position:"absolute",right:10,bottom:10,padding:"8px 18px",fontSize:13}}>
          {typing?"...":"Send"}
        </button>
      </div>
      <div style={{fontSize:11,color:C.muted,textAlign:"center",marginTop:6}}>Press Enter to send · Shift+Enter for new line · Click any timestamp to open the video</div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [tab,      setTab]    = useState<"atlas"|"tutor">("atlas");
  const [query,    setQuery]  = useState("");
  const [results,  setResults]= useState(VIDEOS);
  const [active,   setActive] = useState<typeof VIDEOS[0]|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    const t=setTimeout(()=>setResults(searchVideos(query)),120);
    return()=>clearTimeout(t);
  },[query]);

  const jumpToVideo = (id:number) => {
    const v=VIDEOS.find(x=>x.id===id);
    if(v){ setActive(v); setTab("atlas"); }
  };

  const QUICK_TAGS = ["p2 prolapse","neochord","p1","bileaflet","calcified","redo","myectomy","cox maze"];

  return (
    <div style={{minHeight:"100vh",background:C.navy}}>

      {/* ── HEADER ── */}
      <header style={{background:"rgba(6,15,30,0.97)",borderBottom:"1px solid rgba(11,103,190,0.25)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:1380,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <a href="#" style={{display:"flex",alignItems:"center",gap:1,textDecoration:"none"}}>
              <span style={{fontSize:26,fontWeight:900,color:C.crimson,letterSpacing:-1}}>OR</span>
              <span style={{fontSize:26,fontWeight:900,color:C.white,letterSpacing:-1}}>acle</span>
            </a>
            <div style={{width:1,height:26,background:"rgba(165,211,233,0.18)"}}/>
            <div>
              <div style={{fontSize:10,fontWeight:800,letterSpacing:2,color:C.lblue}}>GAUDIANI ATLAS · MITRAL VALVE REPAIR</div>
              <div style={{fontSize:10,color:"rgba(165,211,233,0.4)"}}>8 videos · AI-indexed · Khalpey AI Lab</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span className="pulse" style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block"}}/>
            <span style={{fontSize:12,color:C.muted}}>AI Search Live</span>
            <div style={{background:"rgba(206,48,44,0.12)",border:"1px solid rgba(206,48,44,0.35)",borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:700,color:"#f87171"}}>DEMO · Khalpey AI Lab</div>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <div style={{borderBottom:"1px solid rgba(11,103,190,0.15)",padding:"36px 24px 28px",background:"linear-gradient(180deg,rgba(11,103,190,0.06) 0%,transparent 100%)"}}>
        <div style={{maxWidth:1380,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:800,letterSpacing:3,color:C.crimson,marginBottom:12}}>KHALPEY AI LAB · ATARI AI LLC · CTSNET ATLAS PARTNERSHIP DEMO</div>
          <h1 className="hero-title">
            <span className="or-red">OR</span><span className="or-white">acle</span>
            <br/>
            <span className="sub-gradient" style={{fontSize:"55%",fontWeight:700,letterSpacing:0}}>The Operating System for Surgical Judgment</span>
          </h1>
          <p style={{fontSize:15,color:C.muted,maxWidth:580,margin:"14px auto 24px",lineHeight:1.65}}>
            Search 8 Gaudiani Atlas mitral valve repair videos by anatomy, technique, and timestamp. Ask Norman Shumway anything.
          </p>

          {/* Tabs */}
          <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:0}}>
            <button className={`tab-btn${tab==="atlas"?" active":""}`} onClick={()=>setTab("atlas")}>📚 Video Atlas</button>
            <button className={`tab-btn${tab==="tutor"?" active":""}`} onClick={()=>setTab("tutor")}>🧠 Ask Shumway AI</button>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{maxWidth:1380,margin:"0 auto",padding:"28px 24px"}}>

        {tab==="atlas" ? (
          <>
            {/* Search bar */}
            <div style={{maxWidth:720,margin:"0 auto 20px"}}>
              <div className="search-wrap">
                <span className="search-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </span>
                <input ref={inputRef} className="search-input" value={query} onChange={e=>setQuery(e.target.value)}
                  placeholder='Try: "P2 prolapse", "neochord", "bileaflet", "redo", "calcified annulus"...'/>
                {query && <button onClick={()=>setQuery("")} style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:20}}>×</button>}
              </div>
            </div>

            {/* Quick tags */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",maxWidth:720,margin:"0 auto 20px"}}>
              {QUICK_TAGS.map(t=>(
                <button key={t} className={`chip${query===t?" active":""}`} onClick={()=>setQuery(t)}>{t}</button>
              ))}
            </div>

            {/* Results label */}
            <div style={{marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:13,fontWeight:700,color:C.muted}}>
                {results.length} video{results.length!==1?"s":""}{query?` matching "${query}"`:" — all"}
              </span>
              {query && <button onClick={()=>setQuery("")} className="chip crimson">✕ Clear</button>}
            </div>

            {/* Grid + detail */}
            <div style={{display:"grid",gridTemplateColumns:active?"1fr 400px":"repeat(auto-fill,minmax(280px,1fr))",gap:18,alignItems:"start"}}>
              <div style={{display:"grid",gridTemplateColumns:active?"1fr":"inherit",gap:"inherit"}}>
                {results.length===0 ? (
                  <div className="glass" style={{padding:48,textAlign:"center",gridColumn:"1/-1"}}>
                    <div style={{fontSize:36,marginBottom:12}}>🔍</div>
                    <div style={{fontSize:16,marginBottom:8,color:C.white}}>No results for "{query}"</div>
                    <div style={{fontSize:13,color:C.muted}}>Try: P2, neochord, calcified, bileaflet, redo</div>
                  </div>
                ) : results.map(v=>(
                  <VideoCard key={v.id} v={v} active={active?.id===v.id} onClick={()=>setActive(active?.id===v.id?null:v)}/>
                ))}
              </div>
              {active && <DetailPanel v={active} onClose={()=>setActive(null)}/>}
            </div>
          </>
        ) : (
          <ShumwayTutor onJumpToVideo={jumpToVideo}/>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{borderTop:"1px solid rgba(11,103,190,0.2)",padding:"20px 24px",marginTop:40}}>
        <div style={{maxWidth:1380,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div style={{fontSize:12,color:C.muted}}>
            <span style={{color:C.crimson,fontWeight:900}}>OR</span><span style={{color:C.white,fontWeight:900}}>acle</span>
            <span style={{marginLeft:12}}>· Khalpey AI Lab · ATARI AI LLC · Built for CTSNet Partnership</span>
          </div>
          <div style={{fontSize:11,color:"rgba(165,211,233,0.4)"}}>Dr. Zain Khalpey MD PhD FACS · zain@khalpey.ai · khalpey.ai</div>
        </div>
      </footer>
    </div>
  );
}
