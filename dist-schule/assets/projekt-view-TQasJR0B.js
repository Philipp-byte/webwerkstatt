import{P as v,Q as y,e as j,_ as w,R as E}from"./index-q1WDSUZc.js";import{b as f}from"./preview-dc6lnWue.js";import{t as L}from"./celebrate-CzG_yRvC.js";async function P(i,m){const c=await v(),t=y(),s=c.pages.filter(e=>t.pages[e.id]!=null),b=c.etappen.length,g=Object.keys(t.etappen).length;if(!s.length){i.innerHTML=`<div class="auftritt"><a class="zurueck" href="#/">← Hyperia</a>
      <h1 style="margin-top:0.5rem">🌐 FUNKEN-Website</h1>
      <div class="karte gesperrt-karte"><p style="font-size:2.5rem;margin:0">🚧</p><h2>Noch nichts gebaut</h2>
      <p>Hier entsteht die Festival-Website – Etappe für Etappe, am Ende jeder Lektion. Die erste Etappe wartet in <a href="#/kapitel/02-html-erste-schritte">Runde 2 · Fundament</a>.</p></div></div>`;return}const p=s.find(e=>e.id===m)||s[0];i.innerHTML=`
    <div class="auftritt">
      <a class="zurueck" href="#/">← Hyperia</a>
      <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;margin:0.5rem 0 0.75rem">
        <h1 style="margin:0;flex:1">🌐 FUNKEN-Website</h1>
        <span class="chip chip-farbe" style="--farbe: var(--projekt)">${g} / ${b} Etappen</span>
      </div>
      <div class="projekt-leiste">
        <button class="btn btn-primaer" type="button" id="zip">⬇ Als ZIP herunterladen</button>
        <button class="btn btn-sekundaer" type="button" id="neu-tab">↗ Im eigenen Tab öffnen</button>
        <button class="btn btn-geist" type="button" id="reset" style="margin-left:auto">Projekt zurücksetzen</button>
      </div>
      <div class="projekt-layout">
        <div class="projekt-seiten">
          ${s.map(e=>`<button class="projekt-seite-btn ${e.id===p.id?"aktiv":""}" type="button" data-id="${e.id}"><span>${j(e.titel)}</span><small>${e.datei}</small></button>`).join("")}
          ${t.css!=null?'<div class="projekt-seite-btn" style="cursor:default"><span>style.css</span><small>für alle Seiten</small></div>':""}
          ${t.js!=null?'<div class="projekt-seite-btn" style="cursor:default"><span>script.js</span><small>Startseite</small></div>':""}
        </div>
        <div class="projekt-vorschau"><iframe title="FUNKEN-Website" sandbox="allow-scripts allow-same-origin allow-forms allow-modals"></iframe></div>
      </div>
      <p style="color:var(--muted);font-size:0.85rem;margin-top:0.75rem">Die Vorschau zeigt genau den Stand, den du in den Etappen gebaut hast. Links zwischen den Seiten funktionieren. Das ZIP enthält echte Dateien, die du in jedem Browser öffnen kannst.</p>
    </div>`;const k=i.querySelector("iframe");function d(e){const n=s.find(a=>a.id===e)||s[0];i.querySelectorAll(".projekt-seite-btn[data-id]").forEach(a=>a.classList.toggle("aktiv",a.dataset.id===n.id)),k.srcdoc=f({html:t.pages[n.id],css:t.css||"",js:n.id==="index"&&t.js||""})}i.querySelectorAll(".projekt-seite-btn[data-id]").forEach(e=>e.addEventListener("click",()=>d(e.dataset.id))),window.addEventListener("message",e=>{e.data?.type==="ww-navigate"&&s.some(n=>n.id===e.data.page)&&d(e.data.page)}),d(p.id),i.querySelector("#neu-tab").addEventListener("click",()=>{const e=s.find(a=>a.id===(i.querySelector(".projekt-seite-btn.aktiv")?.dataset.id||"index"))||s[0],n=new Blob([f({html:t.pages[e.id],css:t.css||"",js:e.id==="index"&&t.js||""},{capture:!1})],{type:"text/html"});window.open(URL.createObjectURL(n),"_blank")}),i.querySelector("#zip").addEventListener("click",async()=>{const{default:e}=await w(async()=>{const{default:r}=await import("./jszip.min-BQ7-ZQoZ.js").then(l=>l.j);return{default:r}},[]),n=new e,a=n.folder("funken-website");for(const r of s)a.file(r.datei,t.pages[r.id]);t.css!=null&&a.file("style.css",t.css),t.js!=null&&a.file("script.js",t.js);const u=new Set;for(const r of s)for(const l of t.pages[r.id].matchAll(/(?:src|href)="([^"]+\.(?:svg|wav|mp4|png|jpg))"/g))u.add(l[1]);await Promise.all([...u].map(async r=>{try{const l=await fetch(new URL(`uebung/${r}`,document.baseURI));l.ok&&a.file(r,await l.blob())}catch{}}));const h=await n.generateAsync({type:"blob"}),o=document.createElement("a");o.href=URL.createObjectURL(h),o.download="funken-website.zip",document.body.appendChild(o),o.click(),o.remove(),L({titel:"ZIP heruntergeladen",text:"Entpacken und index.html im Browser öffnen.",icon:"📦",art:"ok"})}),i.querySelector("#reset").addEventListener("click",()=>{confirm("Die FUNKEN-Website auf den Anfang zurücksetzen? Dein Lernfortschritt bleibt, aber alle Etappen-Ergebnisse werden gelöscht.")&&(E(),location.reload())})}export{P as renderProjekt};
