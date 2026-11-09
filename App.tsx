import { useState } from "react";

export default function App() {
  const [showHelp, setShowHelp] = useState(true);
  return <main style={{minHeight:"100vh",background:"#eef2ff",fontFamily:"Inter,Arial,sans-serif"}}>
    {showHelp && <section style={{padding:"12px 18px",background:"#10234b",color:"white",display:"flex",gap:16,alignItems:"center",justifyContent:"space-between",flexWrap:"wrap"}}>
      <div><strong>STEP UP AI Notes Demo</strong><div style={{fontSize:12,opacity:.85}}>Gemini AI panel is integrated into your existing Notes Builder.</div></div>
      <button onClick={()=>setShowHelp(false)} style={{border:0,borderRadius:8,padding:"8px 12px",cursor:"pointer"}}>Hide</button>
    </section>}
    <iframe title="Existing Notes Builder with Gemini AI" src="/assets/aistudio/Exam_Notes_Builder_67ea7fb3.html" style={{width:"100%",height:"calc(100vh - 58px)",minHeight:700,border:0,display:"block",background:"white"}} />
  </main>;
}
